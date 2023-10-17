#include "emscripten.h"
#include "epanet2_2.h"

EMSCRIPTEN_KEEPALIVE
int getversion()
{
    int i;
    EN_getversion(&i);
    return i;
}