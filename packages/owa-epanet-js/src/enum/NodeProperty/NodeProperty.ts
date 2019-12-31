enum NodeProperty {
  Elevation = 0, //!< Elevation
  BaseDemand = 1, //!< Primary demand baseline value
  Pattern = 2, //!< Primary demand time pattern index
  Emitter = 3, //!< Emitter flow coefficient
  Initqual = 4, //!< Initial quality
  SourceQual = 5, //!< Quality source strength
  SourcePat = 6, //!< Quality source pattern index
  SourceType = 7, //!< Quality source type (see @ref EN_SourceType)
  TankLevel = 8, //!< Current computed tank water level (read only)
  Demand = 9, //!< Current computed demand (read only)
  Head = 10, //!< Current computed hydraulic head (read only)
  Pressure = 11, //!< Current computed pressure (read only)
  Quality = 12, //!< Current computed quality (read only)
  SourceMass = 13, //!< Current computed quality source mass inflow (read only)
  InitVolume = 14, //!< Tank initial volume (read only)
  MixModel = 15, //!< Tank mixing model (see @ref EN_MixingModel)
  MixZoneVol = 16, //!< Tank mixing zone volume (read only)
  TankDiam = 17, //!< Tank diameter
  MinVolume = 18, //!< Tank minimum volume
  VolCurve = 19, //!< Tank volume curve index
  MinLevel = 20, //!< Tank minimum level
  MaxLevel = 21, //!< Tank maximum level
  MixFraction = 22, //!< Tank mixing fraction
  TankKBulk = 23, //!< Tank bulk decay coefficient
  TankVolume = 24, //!< Current computed tank volume (read only)
  MaxVolume = 25, //!< Tank maximum volume (read only)
  CanOverFlow = 26, //!< Tank can overflow (= 1) or not (= 0)
  DemandDeficit = 27, //!< Amount that full demand is reduced under PDA (read only)
}

export default NodeProperty;
