function version() {
  const intPointer = Module._malloc(4);
  var result = Module.getversion(intPointer);
  const returnValue = Module.getValue(intPointer, "i32");
  
  Module._free(intPointer);

  return returnValue

}
