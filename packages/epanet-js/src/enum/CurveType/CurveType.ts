enum CurveType {
  VolumeCurve = 0, //!< Tank volume v. depth curve
  PumpCurve = 1, //!< Pump head v. flow curve
  EfficCurve = 2, //!< Pump efficiency v. flow curve
  HlossCurve = 3, //!< Valve head loss v. flow curve
  GenericCurve = 4, //!< Generic curve
}

export default CurveType;
