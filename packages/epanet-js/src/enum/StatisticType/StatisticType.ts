enum StatisticType {
  Series = 0, //!< Report all time series points
  Average = 1, //!< Report average value over simulation period
  Minimum = 2, //!< Report minimum value over simulation period
  Maximum = 3, //!< Report maximum value over simulation period
  Range = 4, //!< Report maximum - minimum over simulation period
}

export default StatisticType;
