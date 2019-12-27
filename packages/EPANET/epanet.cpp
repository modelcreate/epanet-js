#include <emscripten/bind.h>
#include "epanet2_2.h"

using namespace emscripten;

int getversion(uintptr_t i)
{
  int *ptr = reinterpret_cast<int *>(i);
  return EN_getversion(ptr);
}

int geterror(int errcode, intptr_t out_errmsg)
{
  char *ptr1 = reinterpret_cast<char *>(out_errmsg);
  return EN_geterror(errcode, ptr1, EN_MAXMSG);
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

  // Project Functions

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

  // Hydraulic Analysis Functions

  int solveH()
  {
    return EN_solveH(ph);
  }

  int usehydfile(std::string filename)
  {
    int errcode;
    char *fName = new char[filename.length() + 1];

    strcpy(fName, filename.c_str());

    errcode = EN_usehydfile(ph, fName);

    delete[] fName;

    return errcode;
  }

  int openH()
  {
    return EN_openH(ph);
  }

  int initH(int initFlag)
  {
    return EN_initH(ph, initFlag);
  }

  int runH(uintptr_t currentTime)
  {
    long *ptr = reinterpret_cast<long *>(currentTime);
    return EN_runH(ph, ptr);
  }

  int nextH(uintptr_t tStep)
  {
    long *ptr = reinterpret_cast<long *>(tStep);
    return EN_nextH(ph, ptr);
  }

  int saveH()
  {
    return EN_saveH(ph);
  }

  int savehydfile(std::string filename)
  {
    int errcode;
    char *fName = new char[filename.length() + 1];

    strcpy(fName, filename.c_str());

    errcode = EN_savehydfile(ph, fName);

    delete[] fName;

    return errcode;
  }

  int closeH()
  {
    return EN_closeH(ph);
  }

  //Water Quality Analysis Functions

  int solveQ()
  {
    return EN_solveQ(ph);
  }
  int openQ()
  {
    return EN_openQ(ph);
  }

  int initQ(int initFlag)
  {
    return EN_initQ(ph, initFlag);
  }

  int runQ(uintptr_t currentTime)
  {
    long *ptr = reinterpret_cast<long *>(currentTime);
    return EN_runQ(ph, ptr);
  }

  int nextQ(uintptr_t tStep)
  {
    long *ptr = reinterpret_cast<long *>(tStep);
    return EN_nextQ(ph, ptr);
  }

  int stepQ(uintptr_t timeLeft)
  {
    long *ptr = reinterpret_cast<long *>(timeLeft);
    return EN_stepQ(ph, ptr);
  }

  int closeQ()
  {
    return EN_closeQ(ph);
  }

  // Reporting Functions

  int writeline(std::string line)
  {
    int errcode;

    char *l1 = new char[line.length() + 1];
    strcpy(l1, line.c_str());

    errcode = EN_writeline(ph, l1);
    delete[] l1;

    return errcode;
  }

  int report()
  {
    return EN_report(ph);
  }

  int copyreport(std::string filename)
  {
    int errcode;

    char *fname = new char[filename.length() + 1];
    strcpy(fname, filename.c_str());

    errcode = EN_copyreport(ph, fname);
    delete[] fname;

    return errcode;
  }

  int clearreport()
  {
    return EN_clearreport(ph);
  }

  int resetreport()
  {
    return EN_resetreport(ph);
  }

  int setreport(std::string format)
  {
    int errcode;

    char *f = new char[format.length() + 1];
    strcpy(f, format.c_str());

    errcode = EN_copyreport(ph, f);
    delete[] f;

    return errcode;
  }

  int setstatusreport(int level)
  {
    return EN_setstatusreport(ph, level);
  }

  int getstatistic(int type, intptr_t value)
  {
    double *ptr1 = reinterpret_cast<double *>(value);
    return EN_getstatistic(ph, type, ptr1);
  }

  int getresultindex(int type, int index, intptr_t value)
  {
    int *ptr1 = reinterpret_cast<int *>(value);
    return EN_getresultindex(ph, type, index, ptr1);
  }
};

EMSCRIPTEN_BINDINGS(my_module)
{
  function("getversion", &getversion);
  function("geterror", &geterror);

  class_<Epanet>("Epanet")
      .constructor<>()
      .function("open", &Epanet::open)
      .function("close", &Epanet::close)
      .function("runproject", &Epanet::runproject)
      .function("init", &Epanet::init)
      .function("getcount", &Epanet::getcount)
      .function("gettitle", &Epanet::gettitle)
      .function("settitle", &Epanet::settitle)
      // Hydraulic Analysis Functions
      .function("saveinpfile", &Epanet::saveinpfile)
      .function("solveH", &Epanet::solveH)
      .function("usehydfile", &Epanet::usehydfile)
      .function("openH", &Epanet::openH)
      .function("initH", &Epanet::initH)
      .function("runH", &Epanet::runH)
      .function("nextH", &Epanet::nextH)
      .function("saveH", &Epanet::saveH)
      .function("savehydfile", &Epanet::savehydfile)
      .function("closeH", &Epanet::closeH)
      //Water Quality Analysis Functions
      .function("closeQ", &Epanet::closeQ)
      .function("initQ", &Epanet::initQ)
      .function("nextQ", &Epanet::nextQ)
      .function("openQ", &Epanet::openQ)
      .function("runQ", &Epanet::runQ)
      .function("solveQ", &Epanet::solveQ)
      .function("stepQ", &Epanet::stepQ)
      // Reporting Functions
      .function("clearreport", &Epanet::clearreport)
      .function("copyreport", &Epanet::copyreport)
      .function("getresultindex", &Epanet::getresultindex)
      .function("getstatistic", &Epanet::getstatistic)
      .function("report", &Epanet::report)
      .function("resetreport", &Epanet::resetreport)
      .function("setreport", &Epanet::setreport)
      .function("setstatusreport", &Epanet::setstatusreport)
      .function("writeline", &Epanet::writeline);
}
