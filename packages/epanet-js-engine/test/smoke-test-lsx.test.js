import { it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

// EN_NodeProperty.EN_PRESSURE
const EN_PRESSURE = 11

async function loadEpanet(version) {
  const { default: factory } = await import(`../dist/${version}/index.js`)
  const wasmBinary = readFileSync(join(__dirname, `../dist/${version}/EpanetEngine.wasm`))
  return await factory({ wasmBinary })
}

function openProject(f) {
  const phPtr = f._malloc(4)
  f._EN_createproject(phPtr)
  const ph = f.getValue(phPtr, 'i32')
  f._free(phPtr)
  return ph
}

function enOpen(f, ph, inp) {
  const inpPtr = f.allocateUTF8(inp)
  const rptPtr = f.allocateUTF8('net.rpt')
  const outPtr = f.allocateUTF8('net.out')
  const result = f._EN_open(ph, inpPtr, rptPtr, outPtr)
  f._free(inpPtr)
  f._free(rptPtr)
  f._free(outPtr)
  return result
}

function nodePressure(f, ph, id) {
  const idxPtr = f._malloc(4)
  const idPtr = f.allocateUTF8(id)
  expect(f._EN_getnodeindex(ph, idPtr, idxPtr), `EN_getnodeindex(${id}) failed`).toBe(0)
  const nodeIndex = f.getValue(idxPtr, 'i32')
  f._free(idPtr)
  f._free(idxPtr)

  const valPtr = f._malloc(8)
  expect(f._EN_getnodevalue(ph, nodeIndex, EN_PRESSURE, valPtr), `EN_getnodevalue(${id}) failed`).toBe(0)
  const value = f.getValue(valPtr, 'double')
  f._free(valPtr)
  return value
}

it('EPANET-LSX v2.3.5-lsx runs an embedded Lua [SCRIPT] that controls the network', async () => {
  const f = await loadEpanet('v2.3.5-lsx')

  f.FS.writeFile('net.inp', readFileSync(join(__dirname, 'network_lsx.inp')))

  const ph = openProject(f)
  expect(enOpen(f, ph, 'net.inp'), 'EN_open failed').toBe(0)
  expect(f._EN_solveH(ph), 'EN_solveH failed').toBe(0)

  expect(nodePressure(f, ph, 'J126'), 'scripted set point should be held at J126').toBeCloseTo(25.0, 2)

  f._EN_close(ph)
  f._EN_deleteproject(ph)
})

it('EPANET-LSX v2.3.5-lsx behaves like stock EPANET when there is no [SCRIPT]', async () => {
  const f = await loadEpanet('v2.3.5-lsx')

  f.FS.writeFile('net.inp', readFileSync(join(__dirname, 'network.inp')))

  const ph = openProject(f)
  expect(enOpen(f, ph, 'net.inp'), 'EN_open failed').toBe(0)

  expect(f._EN_solveH(ph), 'EN_solveH failed').toBe(0)
  expect(f._EN_solveQ(ph), 'EN_solveQ failed').toBe(0)
  expect(f._EN_report(ph), 'EN_report failed').toBe(0)

  const rpt = f.FS.readFile('net.rpt', { encoding: 'utf8' })
  expect(rpt.length, 'net.rpt must not be empty').toBeGreaterThan(0)

  f._EN_close(ph)
  f._EN_deleteproject(ph)
})
