enum NodeResultTypes {
  Demand,
  Head,
  Pressure,
  WaterQuality,
}

enum LinkResultTypes {
  Flow,
  Velcoity,
  Headloss,
  AvgWaterQuality,
  Status,
  Setting,
  ReactionRate,
  Friction,
}

export interface LinkResults {
  flow: number[];
  velcoity: number[];
  headloss: number[];
  avgWaterQuality: number[];
  status: number[];
  setting: number[];
  reactionRate: number[];
  friction: number[];
}

export interface NodeResults {
  id: string;
  demand: number[];
  head: number[];
  pressure: number[];
  waterQuality: number[];
}

export interface EpanetProlog {
  nodeCount: number;
  resAndTankCount: number;
  linkCount: number;
  pumpCount: number;
  valveCount: number;
  reportingPeriods: number;
}

export interface EpanetResults {
  prolog: EpanetProlog;
  results: {
    nodes: NodeResults[];
    links: LinkResults[];
  };
}

export function readBinary(results: Uint8Array): EpanetResults {
  const view1 = new DataView(results.buffer);
  const prolog: EpanetProlog = {
    nodeCount: view1.getInt32(8, true),
    resAndTankCount: view1.getInt32(12, true),
    linkCount: view1.getInt32(16, true),
    pumpCount: view1.getInt32(20, true),
    valveCount: view1.getInt32(24, true),
    reportingPeriods: view1.getInt32(results.byteLength - 12, true),
  };

  const offsetIds = 884;
  const offsetResults =
    offsetIds +
    36 * prolog.nodeCount +
    52 * prolog.linkCount +
    8 * prolog.resAndTankCount +
    28 * prolog.pumpCount +
    4;

  const nodeIds = getNodeIds(prolog, offsetIds, view1);

  const nodes: NodeResults[] = [...Array(prolog.nodeCount)].map((_, i) => {
    return getNodeResults(prolog, offsetResults, i, view1, nodeIds[i]);
  });
  const links: LinkResults[] = [...Array(prolog.linkCount)].map((_, i) => {
    return getLinkResults(prolog, offsetResults, i, view1);
  });

  const data: EpanetResults = {
    prolog,
    results: {
      nodes,
      links,
    },
  };
  return data;
}

const getNodeIds = (
  prolog: EpanetProlog,
  offsetIds: number,
  dataView: DataView
): string[] => {
  const nodeIds: string[] = [];
  const nodeCount = prolog.nodeCount;
  const idBytes = 32;

  for (let i = 0; i < nodeCount; i++) {
    const arrayBuffer = dataView.buffer.slice(
      offsetIds + idBytes * i,
      offsetIds + idBytes * i + idBytes
    );
    nodeIds.push(stringFrom(arrayBuffer));
  }

  return nodeIds;
};

const getNodeResults = (
  prolog: EpanetProlog,
  offsetResults: number,
  nodeIndex: number,
  dataView: DataView,
  nodeId: string = ''
): NodeResults => {
  const nodeResults = {
    id: nodeId,
    demand: [],
    head: [],
    pressure: [],
    waterQuality: [],
  };

  const result: NodeResults = [
    'demand',
    'head',
    'pressure',
    'waterQuality',
  ].reduce((map, obj, i) => {
    return {
      ...map,
      [obj]: getResultByteOffSet(
        prolog,
        offsetResults,
        true,
        nodeIndex,
        i
      ).map(x => dataView.getFloat32(x, true)),
    };
  }, nodeResults);

  return result;
};

const getLinkResults = (
  prolog: EpanetProlog,
  offsetResults: number,
  linkIndex: number,
  dataView: DataView
): LinkResults => {
  const linkResults = {
    flow: [],
    velcoity: [],
    headloss: [],
    avgWaterQuality: [],
    status: [],
    setting: [],
    reactionRate: [],
    friction: [],
  };

  const result: LinkResults = [
    'flow',
    'velcoity',
    'headloss',
    'avgWaterQuality',
    'status',
    'setting',
    'reactionRate',
    'friction',
  ].reduce((map, obj, i) => {
    return {
      ...map,
      [obj]: getResultByteOffSet(
        prolog,
        offsetResults,
        false,
        linkIndex,
        i
      ).map(x => dataView.getFloat32(x, true)),
    };
  }, linkResults);

  return result;
};

const getResultByteOffSet = (
  prolog: EpanetProlog,
  offsetResults: number,
  isNode: boolean,
  objIndex: number,
  resultType: NodeResultTypes | LinkResultTypes
): number[] => {
  const linkResultOffset = isNode ? 0 : 16 * prolog.nodeCount;
  const typeCount = isNode ? prolog.nodeCount : prolog.linkCount;
  const resultSize = 16 * prolog.nodeCount + 32 * prolog.linkCount;
  const answer = [...Array(prolog.reportingPeriods)].map(
    (_, i) =>
      offsetResults +
      resultSize * i +
      linkResultOffset +
      4 * objIndex +
      4 * resultType * typeCount
  );
  return answer;
};

const stringFrom = (arrayBuffer: ArrayBuffer) => {
  const array = new Uint8Array(arrayBuffer);
  const arrayNumber = Array.from(array).filter(o => o > 0);
  return String.fromCharCode.apply(null, arrayNumber);
};
