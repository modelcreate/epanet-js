#include "emscripten.h"
#include "epanet2_2.h"

#include "stdio.h"

EMSCRIPTEN_KEEPALIVE
int netbuilder()
{
  int errcode;
  EN_Project ph;

  char errmsg[256] = "";
  EN_geterror(219, errmsg, 255);
  printf("%s\n", errmsg);
  int i;
  EN_getversion(&i);
  return i;
}