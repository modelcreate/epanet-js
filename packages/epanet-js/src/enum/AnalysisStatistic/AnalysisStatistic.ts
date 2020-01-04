enum AnalysisStatistic {
  Iterations = 0, //!< Number of hydraulic iterations taken
  RelativeError = 1, //!< Sum of link flow changes / sum of link flows
  MaxHeadError = 2, //!< Largest head loss error for links
  MaxFlowChange = 3, //!< Largest flow change in links
  MassBalance = 4, //!< Cumulative water quality mass balance ratio
  DeficientNodes = 5, //!< Number of pressure deficient nodes
  DemandReduction = 6, //!< % demand reduction at pressure deficient nodes
}

export default AnalysisStatistic;
