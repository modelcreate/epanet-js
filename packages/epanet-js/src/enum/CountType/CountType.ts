enum CountType {
  NodeCount = 0, //!< Number of nodes (junctions + tanks + reservoirs)
  TankCount = 1, //!< Number of tanks and reservoirs
  LinkCount = 2, //!< Number of links (pipes + pumps + valves)
  PatCount = 3, //!< Number of time patterns
  CurveCount = 4, //!< Number of data curves
  ControlCount = 5, //!< Number of simple controls
  RuleCount = 6, //!< Number of rule-based controls
}

export default CountType;
