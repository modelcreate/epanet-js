enum ActionCodeType {
  Unconditional = 0, //!< Delete all controls and connecing links
  Conditional = 1, //!< Cancel object deletion if it appears in controls or has connecting links
}

export default ActionCodeType;
