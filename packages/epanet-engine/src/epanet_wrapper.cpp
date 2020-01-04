#include <emscripten/bind.h>
#include "epanet2_2.h"
#include <stdio.h>

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

  // Analysis Options Functions
  int getflowunits(uintptr_t units)
  {
    int *ptr = reinterpret_cast<int *>(units);
    return EN_getflowunits(ph, ptr);
  }

  int getoption(int option, uintptr_t value)
  {
    double *ptr = reinterpret_cast<double *>(value);
    return EN_getoption(ph, option, ptr);
  }

  int getqualinfo(uintptr_t qualType, uintptr_t out_chemName, uintptr_t out_chemUnits, uintptr_t traceNode)
  {
    int *ptr1 = reinterpret_cast<int *>(qualType);
    char *ptr2 = reinterpret_cast<char *>(out_chemName);
    char *ptr3 = reinterpret_cast<char *>(out_chemUnits);
    int *ptr4 = reinterpret_cast<int *>(traceNode);

    return EN_getqualinfo(ph, ptr1, ptr2, ptr3, ptr4);
  }
  int getqualtype(uintptr_t qualType, uintptr_t traceNode)
  {
    int *ptr1 = reinterpret_cast<int *>(qualType);
    int *ptr2 = reinterpret_cast<int *>(traceNode);
    return EN_getqualtype(ph, ptr1, ptr2);
  }
  int gettimeparam(int param, uintptr_t value)
  {
    long *ptr1 = reinterpret_cast<long *>(value);
    return EN_gettimeparam(ph, param, ptr1);
  }
  int setflowunits(int units)
  {
    return EN_setflowunits(ph, units);
  }
  int setoption(int option, double value)
  {
    return EN_setoption(ph, option, value);
  }
  int setqualtype(int qualType, std::string chemName, std::string chemUnits, std::string traceNode)
  {
    int errcode;
    char *p1 = new char[chemName.length() + 1];
    char *p2 = new char[chemUnits.length() + 1];
    char *p3 = new char[traceNode.length() + 1];

    strcpy(p1, chemName.c_str());
    strcpy(p2, chemUnits.c_str());
    strcpy(p3, traceNode.c_str());

    errcode = EN_setqualtype(ph, qualType, p1, p2, p3);

    delete[] p1;
    delete[] p2;
    delete[] p3;

    return errcode;
  }

  int settimeparam(int param, long value)
  {
    return EN_settimeparam(ph, param, value);
  }
  // Network Node Functions
  int addnode(std::string id, int nodeType, intptr_t index)
  {
    int errcode;
    int *ptr1 = reinterpret_cast<int *>(index);
    char *idChar = new char[id.length() + 1];

    strcpy(idChar, id.c_str());

    errcode = EN_addnode(ph, idChar, nodeType, ptr1);

    delete[] idChar;
    return errcode;
  }
  int deletenode(int index, int actionCode)
  {
    return EN_deletenode(ph, index, actionCode);
  }
  int getnodeindex(std::string id, intptr_t index)
  {
    int errcode;
    int *ptr1 = reinterpret_cast<int *>(index);
    char *idChar = new char[id.length() + 1];

    strcpy(idChar, id.c_str());

    errcode = EN_getnodeindex(ph, idChar, ptr1);

    delete[] idChar;
    return errcode;
  }
  int getnodeid(int index, intptr_t out_id)
  {
    char *ptr1 = reinterpret_cast<char *>(out_id);
    return EN_getnodeid(ph, index, ptr1);
  }
  int setnodeid(int index, std::string newid)
  {
    int errcode;
    char *idChar = new char[newid.length() + 1];
    strcpy(idChar, newid.c_str());

    errcode = EN_setnodeid(ph, index, idChar);

    delete[] idChar;
    return errcode;
  }
  int getnodetype(int index, intptr_t nodeType)
  {
    int *ptr1 = reinterpret_cast<int *>(nodeType);
    return EN_getnodetype(ph, index, ptr1);
  }
  int getnodevalue(int index, int property, intptr_t value)
  {
    double *ptr1 = reinterpret_cast<double *>(value);
    return EN_getnodevalue(ph, index, property, ptr1);
  }
  int setnodevalue(int index, int property, double value)
  {
    return EN_setnodevalue(ph, index, property, value);
  }
  int setjuncdata(int index, double elev, double dmnd, std::string dmndpat)
  {
    int errcode;
    char *dmndpatChar = new char[dmndpat.length() + 1];
    strcpy(dmndpatChar, dmndpat.c_str());

    errcode = EN_setjuncdata(ph, index, elev, dmnd, dmndpatChar);

    delete[] dmndpatChar;
    return errcode;
  }
  int settankdata(int index, double elev, double initlvl, double minlvl, double maxlvl, double diam, double minvol, std::string volcurve)
  {
    int errcode;
    char *volcurveChar = new char[volcurve.length() + 1];
    strcpy(volcurveChar, volcurve.c_str());

    errcode = EN_settankdata(ph, index, elev, initlvl, minlvl, maxlvl, diam, minvol, volcurveChar);

    delete[] volcurveChar;
    return errcode;
  }
  int getcoord(int index, intptr_t x, intptr_t y)
  {
    double *ptr1 = reinterpret_cast<double *>(x);
    double *ptr2 = reinterpret_cast<double *>(y);
    return EN_getcoord(ph, index, ptr1, ptr2);
  }
  int setcoord(int index, double x, double y)
  {
    return EN_setcoord(ph, index, x, y);
  }
  // Nodal Demand Functions
  int adddemand(int nodeIndex, double baseDemand, std::string demandPattern, std::string demandName)
  {
    int errcode;
    char *demandPatternChar = new char[demandPattern.length() + 1];
    char *demandNameChar = new char[demandName.length() + 1];
    strcpy(demandPatternChar, demandPattern.c_str());
    strcpy(demandNameChar, demandName.c_str());

    errcode = EN_adddemand(ph, nodeIndex, baseDemand, demandPatternChar, demandNameChar);

    delete[] demandPatternChar;
    delete[] demandNameChar;
    return errcode;
  }
  int deletedemand(int nodeIndex, int demandIndex)
  {
    return EN_deletedemand(ph, nodeIndex, demandIndex);
  }

  int getbasedemand(int nodeIndex, int demandIndex, intptr_t baseDemand)
  {
    double *ptr1 = reinterpret_cast<double *>(baseDemand);
    return EN_getbasedemand(ph, nodeIndex, demandIndex, ptr1);
  }

  int getdemandindex(int nodeIndex, std::string demandName, intptr_t demandIndex)
  {
    int errcode;

    int *ptr1 = reinterpret_cast<int *>(demandIndex);

    char *demandNameChar = new char[demandName.length() + 1];
    strcpy(demandNameChar, demandName.c_str());

    errcode = EN_getdemandindex(ph, nodeIndex, demandNameChar, ptr1);

    delete[] demandNameChar;
    return errcode;
  }

  int getdemandmodel(intptr_t type, intptr_t pmin, intptr_t preq, intptr_t pexp)
  {
    int *ptr1 = reinterpret_cast<int *>(type);
    double *ptr2 = reinterpret_cast<double *>(pmin);
    double *ptr3 = reinterpret_cast<double *>(preq);
    double *ptr4 = reinterpret_cast<double *>(pexp);
    return EN_getdemandmodel(ph, ptr1, ptr2, ptr3, ptr4);
  }

  int getdemandname(int nodeIndex, int demandIndex, intptr_t out_demandName)
  {
    char *ptr1 = reinterpret_cast<char *>(out_demandName);
    return EN_getdemandname(ph, nodeIndex, demandIndex, ptr1);
  }

  int getdemandpattern(int nodeIndex, int demandIndex, intptr_t patIndex)
  {
    int *ptr1 = reinterpret_cast<int *>(patIndex);
    return EN_getdemandpattern(ph, nodeIndex, demandIndex, ptr1);
  }

  int getnumdemands(int nodeIndex, intptr_t numDemands)
  {
    int *ptr1 = reinterpret_cast<int *>(numDemands);
    return EN_getnumdemands(ph, nodeIndex, ptr1);
  }

  int setbasedemand(int nodeIndex, int demandIndex, double baseDemand)
  {
    return EN_setbasedemand(ph, nodeIndex, demandIndex, baseDemand);
  }

  int setdemandmodel(int type, double pmin, double preq, double pexp)
  {
    return EN_setdemandmodel(ph, type, pmin, preq, pexp);
  }

  int setdemandname(int nodeIndex, int demandIdx, std::string demandName)
  {
    int errcode;

    char *demandNameChar = new char[demandName.length() + 1];
    strcpy(demandNameChar, demandName.c_str());

    errcode = EN_setdemandname(ph, nodeIndex, demandIdx, demandNameChar);

    delete[] demandNameChar;
    return errcode;
  }

  int setdemandpattern(int nodeIndex, int demandIndex, int patIndex)
  {
    return EN_setdemandpattern(ph, nodeIndex, demandIndex, patIndex);
  }
  // Network Link Functions
  int addlink(std::string id, int linkType, std::string fromNode, std::string toNode, intptr_t index)
  {
    int errcode;
    int *ptr1 = reinterpret_cast<int *>(index);

    char *idChar = new char[id.length() + 1];
    char *fromNodeChar = new char[fromNode.length() + 1];
    char *toNodeChar = new char[toNode.length() + 1];
    strcpy(idChar, id.c_str());
    strcpy(fromNodeChar, fromNode.c_str());
    strcpy(toNodeChar, toNode.c_str());

    errcode = EN_addlink(ph, idChar, linkType, fromNodeChar, toNodeChar, ptr1);

    delete[] idChar;
    delete[] fromNodeChar;
    delete[] toNodeChar;
    return errcode;
  }

  int deletelink(int index, int actionCode)
  {
    return EN_deletelink(ph, index, actionCode);
  }

  int getlinkindex(std::string id, intptr_t index)
  {
    int errcode;
    int *ptr1 = reinterpret_cast<int *>(index);
    char *idChar = new char[id.length() + 1];
    strcpy(idChar, id.c_str());

    errcode = EN_getlinkindex(ph, idChar, ptr1);

    delete[] idChar;
    return errcode;
  }

  int getlinkid(int index, intptr_t out_id)
  {
    char *ptr1 = reinterpret_cast<char *>(out_id);
    return EN_getlinkid(ph, index, ptr1);
  }

  int setlinkid(int index, std::string newid)
  {
    int errcode;
    char *newidChar = new char[newid.length() + 1];
    strcpy(newidChar, newid.c_str());

    errcode = EN_setlinkid(ph, index, newidChar);

    delete[] newidChar;
    return errcode;
  }

  int getlinktype(int index, intptr_t linkType)
  {
    int *ptr1 = reinterpret_cast<int *>(linkType);
    return EN_getlinktype(ph, index, ptr1);
  }

  int setlinktype(intptr_t inout_index, int linkType, int actionCode)
  {
    int *ptr1 = reinterpret_cast<int *>(inout_index);
    return EN_setlinktype(ph, ptr1, linkType, actionCode);
  }

  int getlinknodes(int index, intptr_t node1, intptr_t node2)
  {
    int *ptr1 = reinterpret_cast<int *>(node1);
    int *ptr2 = reinterpret_cast<int *>(node2);
    return EN_getlinknodes(ph, index, ptr1, ptr2);
  }

  int setlinknodes(int index, int node1, int node2)
  {
    return EN_setlinknodes(ph, index, node1, node2);
  }

  int getlinkvalue(int index, int property, intptr_t value)
  {
    double *ptr1 = reinterpret_cast<double *>(value);
    return EN_getlinkvalue(ph, index, property, ptr1);
  }

  int setlinkvalue(int index, int property, double value)
  {
    return EN_setlinkvalue(ph, index, property, value);
  }

  int setpipedata(int index, double length, double diam, double rough, double mloss)
  {
    return EN_setpipedata(ph, index, length, diam, rough, mloss);
  }

  int getpumptype(int linkIndex, intptr_t pumpType)
  {
    int *ptr1 = reinterpret_cast<int *>(pumpType);
    return EN_getpumptype(ph, linkIndex, ptr1);
  }

  int getheadcurveindex(int linkIndex, intptr_t curveIndex)
  {
    int *ptr1 = reinterpret_cast<int *>(curveIndex);
    return EN_getheadcurveindex(ph, linkIndex, ptr1);
  }

  int setheadcurveindex(int linkIndex, int curveIndex)
  {
    return EN_setheadcurveindex(ph, linkIndex, curveIndex);
  }

  int getvertexcount(int index, intptr_t count)
  {
    int *ptr1 = reinterpret_cast<int *>(count);
    return EN_getvertexcount(ph, index, ptr1);
  }

  int getvertex(int index, int vertex, intptr_t x, intptr_t y)
  {
    double *ptr1 = reinterpret_cast<double *>(x);
    double *ptr2 = reinterpret_cast<double *>(y);
    return EN_getvertex(ph, index, vertex, ptr1, ptr2);
  }

  int setvertices(int index, intptr_t x, intptr_t y, int count)
  {
    double *ptr1 = reinterpret_cast<double *>(x);
    double *ptr2 = reinterpret_cast<double *>(y);
    return EN_setvertices(ph, index, ptr1, ptr2, count);
  }
  // Time Pattern Functions
  int addpattern(std::string id)
  {
    int errcode;
    char *idChar = new char[id.length() + 1];
    strcpy(idChar, id.c_str());

    errcode = EN_addpattern(ph, idChar);

    delete[] idChar;
    return errcode;
  }

  int deletepattern(int index)
  {
    return EN_deletepattern(ph, index);
  }

  int getpatternindex(std::string id, intptr_t index)
  {
    int errcode;
    int *ptr1 = reinterpret_cast<int *>(index);

    char *idChar = new char[id.length() + 1];
    strcpy(idChar, id.c_str());

    errcode = EN_getpatternindex(ph, idChar, ptr1);

    delete[] idChar;
    return errcode;
  }

  int getpatternid(int index, intptr_t out_id)
  {
    char *ptr1 = reinterpret_cast<char *>(out_id);

    return EN_getpatternid(ph, index, ptr1);
  }

  int setpatternid(int index, std::string id)
  {
    int errcode;
    char *idChar = new char[id.length() + 1];
    strcpy(idChar, id.c_str());

    errcode = EN_setpatternid(ph, index, idChar);

    delete[] idChar;
    return errcode;
  }

  int getpatternlen(int index, intptr_t len)
  {
    int *ptr1 = reinterpret_cast<int *>(len);
    return EN_getpatternlen(ph, index, ptr1);
  }

  int getpatternvalue(int index, int period, intptr_t value)
  {
    double *ptr1 = reinterpret_cast<double *>(value);
    return EN_getpatternvalue(ph, index, period, ptr1);
  }

  int setpatternvalue(int index, int period, double value)
  {
    return EN_setpatternvalue(ph, index, period, value);
  }

  int getaveragepatternvalue(int index, intptr_t value)
  {
    double *ptr1 = reinterpret_cast<double *>(value);
    return EN_getaveragepatternvalue(ph, index, ptr1);
  }
  int setpattern(int index, intptr_t values, int len)
  {
    double *ptr1 = reinterpret_cast<double *>(values);
    return EN_setpattern(ph, index, ptr1, len);
  }

  // Data Curve Functions
  int addcurve(std::string id)
  {
    int errcode;
    char *idChar = new char[id.length() + 1];
    strcpy(idChar, id.c_str());

    errcode = EN_addcurve(ph, idChar);

    delete[] idChar;
    return errcode;
  }

  int deletecurve(int index)
  {
    return EN_deletecurve(ph, index);
  }

  int getcurveindex(std::string id, intptr_t index)
  {
    int errcode;
    int *ptr1 = reinterpret_cast<int *>(index);
    char *idChar = new char[id.length() + 1];
    strcpy(idChar, id.c_str());

    errcode = EN_getcurveindex(ph, idChar, ptr1);

    delete[] idChar;
    return errcode;
  }

  int getcurveid(int index, intptr_t out_id)
  {
    char *ptr1 = reinterpret_cast<char *>(out_id);
    return EN_getcurveid(ph, index, ptr1);
  }

  int setcurveid(int index, std::string id)
  {
    int errcode;
    char *idChar = new char[id.length() + 1];
    strcpy(idChar, id.c_str());

    errcode = EN_setcurveid(ph, index, idChar);

    delete[] idChar;
    return errcode;
  }

  int getcurvelen(int index, intptr_t len)
  {
    int *ptr1 = reinterpret_cast<int *>(len);
    return EN_getcurvelen(ph, index, ptr1);
  }

  int getcurvetype(int index, intptr_t type)
  {
    int *ptr1 = reinterpret_cast<int *>(type);
    return EN_getcurvetype(ph, index, ptr1);
  }
  int getcurvevalue(int curveIndex, int pointIndex, intptr_t x, intptr_t y)
  {
    double *ptr1 = reinterpret_cast<double *>(x);
    double *ptr2 = reinterpret_cast<double *>(y);
    return EN_getcurvevalue(ph, curveIndex, pointIndex, ptr1, ptr2);
  }

  int setcurvevalue(int curveIndex, int pointIndex, double x, double y)
  {
    return EN_setcurvevalue(ph, curveIndex, pointIndex, x, y);
  }

  int setcurve(int index, intptr_t xValues, intptr_t yValues, int nPoints)
  {
    double *ptr1 = reinterpret_cast<double *>(xValues);
    double *ptr2 = reinterpret_cast<double *>(yValues);
    return EN_setcurve(ph, index, ptr1, ptr2, nPoints);
  }

  // Simple Control Functions
  int addcontrol(int type, int linkIndex, double setting, int nodeIndex, double level, intptr_t index)
  {
    int *ptr1 = reinterpret_cast<int *>(index);
    return EN_addcontrol(ph, type, linkIndex, setting, nodeIndex, level, ptr1);
  }
  int deletecontrol(int index)
  {
    return EN_deletecontrol(ph, index);
  }
  int getcontrol(int index, intptr_t type, intptr_t linkIndex, intptr_t setting, intptr_t nodeIndex, intptr_t level)
  {
    int *ptr1 = reinterpret_cast<int *>(type);
    int *ptr2 = reinterpret_cast<int *>(linkIndex);
    double *ptr3 = reinterpret_cast<double *>(setting);
    int *ptr4 = reinterpret_cast<int *>(nodeIndex);
    double *ptr5 = reinterpret_cast<double *>(level);
    return EN_getcontrol(ph, index, ptr1, ptr2, ptr3, ptr4, ptr5);
  }
  int setcontrol(int index, int type, int linkIndex, double setting, int nodeIndex, double level)
  {
    return EN_setcontrol(ph, index, type, linkIndex, setting, nodeIndex, level);
  }
  // Rule-Based Control Functions
  int addrule(std::string rule)
  {
    int errcode;
    char *ruleChar = new char[rule.length() + 1];
    strcpy(ruleChar, rule.c_str());

    errcode = EN_addrule(ph, ruleChar);

    delete[] ruleChar;
    return errcode;
  }

  int deleterule(int index)
  {
    return EN_deleterule(ph, index);
  }

  int getrule(int index, intptr_t nPremises, intptr_t nThenActions, intptr_t nElseActions, intptr_t priority)
  {
    int *ptr1 = reinterpret_cast<int *>(nPremises);
    int *ptr2 = reinterpret_cast<int *>(nThenActions);
    int *ptr3 = reinterpret_cast<int *>(nElseActions);
    double *ptr4 = reinterpret_cast<double *>(priority);
    return EN_getrule(ph, index, ptr1, ptr2, ptr3, ptr4);
  }

  int getruleID(int index, intptr_t out_id)
  {
    char *ptr1 = reinterpret_cast<char *>(out_id);
    return EN_getruleID(ph, index, ptr1);
  }

  int getpremise(int ruleIndex, int premiseIndex, intptr_t logop, intptr_t object, intptr_t objIndex, intptr_t variable, intptr_t relop, intptr_t status, intptr_t value)
  {
    int *ptr1 = reinterpret_cast<int *>(logop);
    int *ptr2 = reinterpret_cast<int *>(object);
    int *ptr3 = reinterpret_cast<int *>(objIndex);
    int *ptr4 = reinterpret_cast<int *>(variable);
    int *ptr5 = reinterpret_cast<int *>(relop);
    int *ptr6 = reinterpret_cast<int *>(status);
    double *ptr7 = reinterpret_cast<double *>(value);
    return EN_getpremise(ph, ruleIndex, premiseIndex, ptr1, ptr2, ptr3, ptr4, ptr5, ptr6, ptr7);
  }

  int setpremise(int ruleIndex, int premiseIndex, int logop, int object, int objIndex, int variable, int relop, int status, double value)
  {
    return EN_setpremise(ph, ruleIndex, premiseIndex, logop, object, objIndex, variable, relop, status, value);
  }

  int setpremiseindex(int ruleIndex, int premiseIndex, int objIndex)
  {
    return EN_setpremiseindex(ph, ruleIndex, premiseIndex, objIndex);
  }

  int setpremisestatus(int ruleIndex, int premiseIndex, int status)
  {
    return EN_setpremisestatus(ph, ruleIndex, premiseIndex, status);
  }

  int setpremisevalue(int ruleIndex, int premiseIndex, double value)
  {
    return EN_setpremisevalue(ph, ruleIndex, premiseIndex, value);
  }

  int getthenaction(int ruleIndex, int actionIndex, intptr_t linkIndex, intptr_t status, intptr_t setting)
  {
    int *ptr1 = reinterpret_cast<int *>(linkIndex);
    int *ptr2 = reinterpret_cast<int *>(status);
    double *ptr3 = reinterpret_cast<double *>(setting);
    return EN_getthenaction(ph, ruleIndex, actionIndex, ptr1, ptr2, ptr3);
  }

  int setthenaction(int ruleIndex, int actionIndex, int linkIndex, int status, double setting)
  {
    return EN_setthenaction(ph, ruleIndex, actionIndex, linkIndex, status, setting);
  }

  int getelseaction(int ruleIndex, int actionIndex, intptr_t linkIndex, intptr_t status, intptr_t setting)
  {
    int *ptr1 = reinterpret_cast<int *>(linkIndex);
    int *ptr2 = reinterpret_cast<int *>(status);
    double *ptr3 = reinterpret_cast<double *>(setting);
    return EN_getelseaction(ph, ruleIndex, actionIndex, ptr1, ptr2, ptr3);
  }

  int setelseaction(int ruleIndex, int actionIndex, int linkIndex, int status, double setting)
  {
    return EN_setelseaction(ph, ruleIndex, actionIndex, linkIndex, status, setting);
  }
  int setrulepriority(int index, double priority)
  {
    return EN_setrulepriority(ph, index, priority);
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
      .function("writeline", &Epanet::writeline)
      //Analysis Options Functions
      .function("getflowunits", &Epanet::getflowunits)
      .function("getoption", &Epanet::getoption)
      .function("getqualinfo", &Epanet::getqualinfo)
      .function("getqualtype", &Epanet::getqualtype)
      .function("gettimeparam", &Epanet::gettimeparam)
      .function("setflowunits", &Epanet::setflowunits)
      .function("setoption", &Epanet::setoption)
      .function("setqualtype", &Epanet::setqualtype)
      .function("settimeparam", &Epanet::settimeparam)
      // Network Node Functions
      .function("addnode", &Epanet::addnode)
      .function("deletenode", &Epanet::deletenode)
      .function("getcoord", &Epanet::getcoord)
      .function("getnodeid", &Epanet::getnodeid)
      .function("getnodeindex", &Epanet::getnodeindex)
      .function("getnodetype", &Epanet::getnodetype)
      .function("getnodevalue", &Epanet::getnodevalue)
      .function("setcoord", &Epanet::setcoord)
      .function("setjuncdata", &Epanet::setjuncdata)
      .function("setnodeid", &Epanet::setnodeid)
      .function("setnodevalue", &Epanet::setnodevalue)
      .function("settankdata", &Epanet::settankdata)
      // Nodal Demand Functions
      .function("adddemand", &Epanet::adddemand)
      .function("deletedemand", &Epanet::deletedemand)
      .function("getbasedemand", &Epanet::getbasedemand)
      .function("getdemandindex", &Epanet::getdemandindex)
      .function("getdemandmodel", &Epanet::getdemandmodel)
      .function("getdemandname", &Epanet::getdemandname)
      .function("getdemandpattern", &Epanet::getdemandpattern)
      .function("getnumdemands", &Epanet::getnumdemands)
      .function("setbasedemand", &Epanet::setbasedemand)
      .function("setdemandmodel", &Epanet::setdemandmodel)
      .function("setdemandname", &Epanet::setdemandname)
      .function("setdemandpattern", &Epanet::setdemandpattern)
      // Network Link Functions
      .function("addlink", &Epanet::addlink)
      .function("deletelink", &Epanet::deletelink)
      .function("getheadcurveindex", &Epanet::getheadcurveindex)
      .function("getlinkid", &Epanet::getlinkid)
      .function("getlinkindex", &Epanet::getlinkindex)
      .function("getlinknodes", &Epanet::getlinknodes)
      .function("getlinktype", &Epanet::getlinktype)
      .function("getlinkvalue", &Epanet::getlinkvalue)
      .function("getpumptype", &Epanet::getpumptype)
      .function("getvertex", &Epanet::getvertex)
      .function("getvertexcount", &Epanet::getvertexcount)
      .function("setheadcurveindex", &Epanet::setheadcurveindex)
      .function("setlinkid", &Epanet::setlinkid)
      .function("setlinknodes", &Epanet::setlinknodes)
      .function("setlinktype", &Epanet::setlinktype)
      .function("setlinkvalue", &Epanet::setlinkvalue)
      .function("setpipedata", &Epanet::setpipedata)
      .function("setvertices", &Epanet::setvertices)
      // Time Pattern Functions
      .function("addpattern", &Epanet::addpattern)
      .function("deletepattern", &Epanet::deletepattern)
      .function("getaveragepatternvalue", &Epanet::getaveragepatternvalue)
      .function("getpatternid", &Epanet::getpatternid)
      .function("getpatternindex", &Epanet::getpatternindex)
      .function("getpatternlen", &Epanet::getpatternlen)
      .function("getpatternvalue", &Epanet::getpatternvalue)
      .function("setpattern", &Epanet::setpattern)
      .function("setpatternid", &Epanet::setpatternid)
      .function("setpatternvalue", &Epanet::setpatternvalue)
      // Data Curve Functions
      .function("addcurve", &Epanet::addcurve)
      .function("deletecurve", &Epanet::deletecurve)
      .function("getcurveid", &Epanet::getcurveid)
      .function("getcurveindex", &Epanet::getcurveindex)
      .function("getcurvelen", &Epanet::getcurvelen)
      .function("getcurvetype", &Epanet::getcurvetype)
      .function("getcurvevalue", &Epanet::getcurvevalue)
      .function("setcurve", &Epanet::setcurve)
      .function("setcurveid", &Epanet::setcurveid)
      .function("setcurvevalue", &Epanet::setcurvevalue)
      // Simple Control Functions
      .function("addcontrol", &Epanet::addcontrol)
      .function("deletecontrol", &Epanet::deletecontrol)
      .function("getcontrol", &Epanet::getcontrol)
      .function("setcontrol", &Epanet::setcontrol)
      // Rule-Based Control Functions
      .function("addrule", &Epanet::addrule)
      .function("deleterule", &Epanet::deleterule)
      .function("getelseaction", &Epanet::getelseaction)
      .function("getpremise", &Epanet::getpremise)
      .function("getrule", &Epanet::getrule)
      .function("getruleID", &Epanet::getruleID)
      .function("getthenaction", &Epanet::getthenaction)
      .function("setelseaction", &Epanet::setelseaction)
      .function("setpremise", &Epanet::setpremise)
      .function("setpremiseindex", &Epanet::setpremiseindex)
      .function("setpremisestatus", &Epanet::setpremisestatus)
      .function("setpremisevalue", &Epanet::setpremisevalue)
      .function("setrulepriority", &Epanet::setrulepriority)
      .function("setthenaction", &Epanet::setthenaction);
}
