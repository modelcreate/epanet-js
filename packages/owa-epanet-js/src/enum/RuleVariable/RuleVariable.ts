enum RuleVariable {
  Demand = 0, //!< Nodal demand
  Head = 1, //!< Nodal hydraulic head
  Grade = 2, //!< Nodal hydraulic grade
  Level = 3, //!< Tank water level
  Pressure = 4, //!< Nodal pressure
  Flow = 5, //!< Link flow rate
  Status = 6, //!< Link status
  Setting = 7, //!< Link setting
  Power = 8, //!< Pump power output
  Time = 9, //!< Elapsed simulation time
  ClockTime = 10, //!< Time of day
  FillTime = 11, //!< Time to fill a tank
  DrainTime = 12, //!< Time to drain a tank
}

export default RuleVariable;
