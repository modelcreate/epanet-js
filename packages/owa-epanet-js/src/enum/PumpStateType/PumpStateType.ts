enum PumpStateType {
  PumpXHead = 0, //!< Pump closed - cannot supply head
  PumpClosed = 2, //!< Pump closed
  PumpOpen = 3, //!< Pump open
  PumpXFlow = 5, //!< Pump open - cannot supply flow
}

export default PumpStateType;
