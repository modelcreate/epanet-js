enum LinkType {
  CVPipe = 0, //!< Pipe with check valve
  Pipe = 1, //!< Pipe
  Pump = 2, //!< Pump
  PRV = 3, //!< Pressure reducing valve
  PSV = 4, //!< Pressure sustaining valve
  PBV = 5, //!< Pressure breaker valve
  FCV = 6, //!< Flow control valve
  TCV = 7, //!< Throttle control valve
  GPV = 8, //!< General purpose valve
}

export default LinkType;
