enum TimeParameter {
  Duration = 0, //!< Total simulation duration
  HydStep = 1, //!< Hydraulic time step
  QualStep = 2, //!< Water quality time step
  PatternStep = 3, //!< Time pattern period
  PatternStart = 4, //!< Time when time patterns begin
  ReportStep = 5, //!< Reporting time step
  ReportStart = 6, //!< Time when reporting starts
  RuleStep = 7, //!< Rule-based control evaluation time step
  Statistic = 8, //!< Reporting statistic code (see @ref EN_StatisticType)
  Periods = 9, //!< Number of reporting time periods (read only)
  StartTime = 10, //!< Simulation starting time of day
  HTime = 11, //!< Elapsed time of current hydraulic solution (read only)
  QTime = 12, //!< Elapsed time of current quality solution (read only)
  HaltFlag = 13, //!< Flag indicating if the simulation was halted (read only)
  NextEvent = 14, //!< Shortest time until a tank becomes empty or full (read only)
  NextEventTank = 15, //!< Index of tank with shortest time to become empty or full (read only)
}

export default TimeParameter;
