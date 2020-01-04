enum InitHydOption {
  NoSave = 0, //!< Don't save hydraulics; don't re-initialize flows
  Save = 1, //!< Save hydraulics to file, don't re-initialize flows
  InitFlow = 10, //!< Don't save hydraulics; re-initialize flows
  SaveAndInit = 11, //!< Save hydraulics; re-initialize flows
}

export default InitHydOption;
