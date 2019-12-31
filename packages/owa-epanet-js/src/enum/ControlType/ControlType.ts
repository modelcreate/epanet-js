enum ControlType {
  LowLevel = 0, //!< Act when pressure or tank level drops below a setpoint
  HiLevel = 1, //!< Act when pressure or tank level rises above a setpoint
  Timer = 2, //!< Act at a prescribed elapsed amount of time
  TimeOfDay = 3, //!< Act at a particular time of day
}

export default ControlType;
