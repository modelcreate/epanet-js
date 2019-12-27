#include <emscripten/bind.h>
#include "epanet2_2.h"

using namespace emscripten;

int getversion(uintptr_t i)
{
  int *ptr = reinterpret_cast<int *>(i);
  return EN_getversion(ptr);
}

class Epanet
{
private:
  EN_Project ph;

public:
  int x, y;

  Epanet(int x1, int y1)
  {
    EN_createproject(&ph);
    EN_init(ph, "", "", EN_GPM, EN_HW);

    int index;
    EN_addnode(ph, (char *)"J1", EN_JUNCTION, &index);
    EN_setjuncdata(ph, index, 700, 0, (char *)"");
    x = x1;
    y = y1;
  }

  int getcount(int obj, uintptr_t count)
  {
    int *ptr = reinterpret_cast<int *>(count);
    return EN_getcount(ph, obj, ptr);
  }

  int getX()
  {
    return x;
  }
  int getY()
  {
    return y;
  }
};

EMSCRIPTEN_BINDINGS(my_module)
{
  function("getversion", &getversion);

  class_<Epanet>("Epanet")
      .constructor<int, int>()
      .function("getcount", &Epanet::getcount)
      .function("getX", &Epanet::getX)
      .function("getY", &Epanet::getY);
}