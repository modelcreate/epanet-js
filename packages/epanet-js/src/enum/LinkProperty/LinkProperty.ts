enum LinkProperty {
  Diameter = 0, //!< Pipe/valve diameter
  Length = 1, //!< Pipe length
  Roughness = 2, //!< Pipe roughness coefficient
  MinorLoss = 3, //!< Pipe/valve minor loss coefficient
  InitStatus = 4, //!< Initial status (see @ref EN_LinkStatusType)
  InitSetting = 5, //!< Initial pump speed or valve setting
  KBulk = 6, //!< Bulk chemical reaction coefficient
  KWall = 7, //!< Pipe wall chemical reaction coefficient
  Flow = 8, //!< Current computed flow rate (read only)
  Velocity = 9, //!< Current computed flow velocity (read only)
  Headloss = 10, //!< Current computed head loss (read only)
  Status = 11, //!< Current link status (see @ref EN_LinkStatusType)
  Setting = 12, //!< Current link setting
  Energy = 13, //!< Current computed pump energy usage (read only)
  LinkQual = 14, //!< Current computed link quality (read only)
  LinkPattern = 15, //!< Pump speed time pattern index
  PumpState = 16, //!< Current computed pump state (read only) (see @ref EN_PumpStateType)
  PumpEffic = 17, //!< Current computed pump efficiency (read only)
  PumpPower = 18, //!< Pump constant power rating
  PumpHCurve = 19, //!< Pump head v. flow curve index
  PumpECurve = 20, //!< Pump efficiency v. flow curve index
  PumpECost = 21, //!< Pump average energy price
  PumpEPat = 22, //!< Pump energy price time pattern index
}

export default LinkProperty;
