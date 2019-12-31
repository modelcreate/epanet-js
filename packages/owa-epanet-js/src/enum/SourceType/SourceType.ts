enum SourceType {
  Concen = 0, //!< Sets the concentration of external inflow entering a node
  Mass = 1, //!< Injects a given mass/minute into a node
  SetPoint = 2, //!< Sets the concentration leaving a node to a given value
  FlowPaced = 3, //!< Adds a given value to the concentration leaving a node
}

export default SourceType;
