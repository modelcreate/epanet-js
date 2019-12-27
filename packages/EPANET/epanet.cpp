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
  Epanet()
  {
    EN_createproject(&ph);
  }

  ~Epanet()
  {
    EN_deleteproject(ph);
  }

  int open(std::string inputFile, std::string reportFile, std::string outputFile)
  {

    int errcode;
    char *inpFile = new char[inputFile.length() + 1];
    char *rptFile = new char[reportFile.length() + 1];
    char *outFile = new char[outputFile.length() + 1];

    strcpy(inpFile, inputFile.c_str());
    strcpy(rptFile, reportFile.c_str());
    strcpy(outFile, outputFile.c_str());

    errcode = EN_open(ph, inpFile, rptFile, outFile);

    delete[] inpFile;
    delete[] rptFile;
    delete[] outFile;

    return errcode;
  }

  int close()
  {
    return EN_close(ph);
  }

  int runproject(std::string inputFile, std::string reportFile, std::string outputFile)
  {

    int errcode;
    char *inpFile = new char[inputFile.length() + 1];
    char *rptFile = new char[reportFile.length() + 1];
    char *outFile = new char[outputFile.length() + 1];

    strcpy(inpFile, inputFile.c_str());
    strcpy(rptFile, reportFile.c_str());
    strcpy(outFile, outputFile.c_str());

    errcode = EN_runproject(ph, inpFile, rptFile, outFile, NULL);

    delete[] inpFile;
    delete[] rptFile;
    delete[] outFile;

    return errcode;
  }

  int init(std::string reportFile, std::string outputFile, int unitsType, int headLossType)
  {
    int errcode;
    char *rptFile = new char[reportFile.length() + 1];
    char *outFile = new char[outputFile.length() + 1];

    strcpy(rptFile, reportFile.c_str());
    strcpy(outFile, outputFile.c_str());

    errcode = EN_init(ph, rptFile, outFile, unitsType, headLossType);

    delete[] rptFile;
    delete[] outFile;

    return errcode;
  }

  int getcount(int obj, uintptr_t count)
  {
    int *ptr = reinterpret_cast<int *>(count);
    return EN_getcount(ph, obj, ptr);
  }

  int gettitle(intptr_t out_line1, intptr_t out_line2, intptr_t out_line3)
  {
    char *ptr1 = reinterpret_cast<char *>(out_line1);
    char *ptr2 = reinterpret_cast<char *>(out_line2);
    char *ptr3 = reinterpret_cast<char *>(out_line3);
    return EN_gettitle(ph, ptr1, ptr2, ptr3);
  }

  int settitle(std::string line1, std::string line2, std::string line3)
  {
    int errcode;
    char *l1 = new char[line1.length() + 1];
    char *l2 = new char[line2.length() + 1];
    char *l3 = new char[line3.length() + 1];

    strcpy(l1, line1.c_str());
    strcpy(l2, line2.c_str());
    strcpy(l3, line3.c_str());

    errcode = EN_settitle(ph, l1, l2, l3);

    delete[] l1;
    delete[] l2;
    delete[] l3;

    return errcode;
  }

  int saveinpfile(std::string filename)
  {
    int errcode;
    char *fName = new char[filename.length() + 1];

    strcpy(fName, filename.c_str());

    errcode = EN_saveinpfile(ph, fName);

    delete[] fName;

    return errcode;
  }
};

EMSCRIPTEN_BINDINGS(my_module)
{
  function("getversion", &getversion);

  class_<Epanet>("Epanet")
      .constructor<>()
      .function("open", &Epanet::open)
      .function("close", &Epanet::close)
      .function("runproject", &Epanet::runproject)
      .function("init", &Epanet::init)
      .function("getcount", &Epanet::getcount)
      .function("gettitle", &Epanet::gettitle)
      .function("settitle", &Epanet::settitle)
      .function("saveinpfile", &Epanet::saveinpfile);
}
