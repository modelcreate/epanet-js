import Workspace from '../src/Workspace';
import Project from '../src/Project';

//const workspace = new Workspace();
test('Returns workspace version', () => {
  const ws = new Workspace();
  const model = new Project(ws);

  model.init('report.rpt', 'out.bin', 0, 0);
  const nodeId = model.addnode('J1', 0);
  model.setjuncdata(nodeId, 700, 0, '');
  model.saveinpfile('example2.inp');

  expect(ws.readFile('example2.inp')).toBe('asd');
});
