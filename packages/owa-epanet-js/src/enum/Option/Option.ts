enum Option {
  Trials = 0, //!< Maximum trials allowed for hydraulic convergence
  Accuracy = 1, //!< Total normalized flow change for hydraulic convergence
  Tolerance = 2, //!< Water quality tolerance
  Emitexpon = 3, //!< Exponent in emitter discharge formula
  DemandMult = 4, //!< Global demand multiplier
  HeadError = 5, //!< Maximum head loss error for hydraulic convergence
  FlowChange = 6, //!< Maximum flow change for hydraulic convergence
  HeadlossForm = 7, //!< Head loss formula (see @ref EN_HeadLossType)
  GlobalEffic = 8, //!< Global pump efficiency (percent)
  GlobalPrice = 9, //!< Global energy price per KWH
  GlobalPattern = 10, //!< Index of a global energy price pattern
  DemandCharge = 11, //!< Energy charge per max. KW usage
  SpGravity = 12, //!< Specific gravity
  SpViscos = 13, //!< Specific viscosity (relative to water at 20 deg C)
  Unbalanced = 14, //!< Extra trials allowed if hydraulics don't converge
  CheckFreq = 15, //!< Frequency of hydraulic status checks
  MaxCheck = 16, //!< Maximum trials for status checking
  DampLimit = 17, //!< Accuracy level where solution damping begins
  SpDiffus = 18, //!< Specific diffusivity (relative to chlorine at 20 deg C)
  BulkOrder = 19, //!< Bulk water reaction order for pipes
  WallOrder = 20, //!< Wall reaction order for pipes (either 0 or 1)
  TankOrder = 21, //!< Bulk water reaction order for tanks
  ConcenLimit = 22, //!< Limiting concentration for growth reactions
}

export default Option;
