enum RuleOperator {
  EqualTo = 0, //!< Equal to | EN_R_EQ
  NotEqualTo = 1, //!< Not equal | EN_R_NE
  LessOrEqualTo = 2, //!< Less than or equal to | EN_R_LE
  GreaterOrEqualTo = 3, //!< Greater than or equal to | EN_R_GE
  LessThan = 4, //!< Less than | EN_R_LT
  GreaterThan = 5, //!< Greater than | EN_R_GT
  Is = 6, //!< Is equal to | EN_R_IS
  Not = 7, //!< Is not equal to | EN_R_NOT
  Below = 8, //!< Is below | EN_R_BELOW
  Above = 9, //!< Is above | EN_R_ABOVE
}

export default RuleOperator;
