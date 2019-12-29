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
  //  // Nodal Demand Functions
  //  int adddemand(int nodeIndex, double baseDemand, char *demandPattern, char *demandName)
  //  {
  //    return EN_adddemand(nodeIndex, baseDemand, demandPattern, demandName);
  //  }
  //  int deletedemand(int nodeIndex, int demandIndex)
  //  {
  //    return EN_deletedemand(nodeIndex, demandIndex);
  //  }
  //  int getbasedemand(int nodeIndex, int demandIndex, double *baseDemand)
  //  {
  //    return EN_getbasedemand(nodeIndex, demandIndex, baseDemand);
  //  }
  //  int getdemandindex(int nodeIndex, char *demandName, int *demandIndex)
  //  {
  //    return EN_getdemandindex(nodeIndex, demandName, demandIndex);
  //  }
  //  int getdemandmodel(int *type, double *pmin, double *preq, double *pexp)
  //  {
  //    return EN_getdemandmodel(type, pmin, preq, pexp);
  //  }
  //  int getdemandname(int nodeIndex, int demandIndex, char *out_demandName)
  //  {
  //    return EN_getdemandname(nodeIndex, demandIndex, out_demandName);
  //  }
  //  int getdemandpattern(int nodeIndex, int demandIndex, int *patIndex)
  //  {
  //    return EN_getdemandpattern(nodeIndex, demandIndex, patIndex);
  //  }
  //  int getnumdemands(int nodeIndex, int *numDemands)
  //  {
  //    return EN_getnumdemands(nodeIndex, numDemands);
  //  }
  //  int setbasedemand(int nodeIndex, int demandIndex, double baseDemand)
  //  {
  //    return EN_setbasedemand(nodeIndex, demandIndex, baseDemand);
  //  }
  //  int setdemandmodel(int type, double pmin, double preq, double pexp)
  //  {
  //    return EN_setdemandmodel(type, pmin, preq, pexp);
  //  }
  //  int setdemandname(int nodeIndex, int demandIdx, char *demandName)
  //  {
  //    return EN_setdemandname(nodeIndex, demandIdx, demandName);
  //  }
  //  int setdemandpattern(int nodeIndex, int demandIndex, int patIndex)
  //  {
  //    return EN_setdemandpattern(nodeIndex, demandIndex, patIndex);
  //  }
  //  // Network Link Functions
  //  int addlink(char *id, int linkType, char *fromNode, char *toNode, int *index)
  //  {
  //    return EN_addlink(id, linkType, fromNode, toNode, index);
  //  }
  //  int deletelink(int index, int actionCode)
  //  {
  //    return EN_deletelink(index, actionCode);
  //  }
  //  int getlinkindex(char *id, int *index)
  //  {
  //    return EN_getlinkindex(id, index);
  //  }
  //  int getlinkid(int index, char *out_id)
  //  {
  //    return EN_getlinkid(index, out_id);
  //  }
  //  int setlinkid(int index, char *newid)
  //  {
  //    return EN_setlinkid(index, newid);
  //  }
  //  int getlinktype(int index, int *linkType)
  //  {
  //    return EN_getlinktype(index, linkType);
  //  }
  //  int setlinktype(int *inout_index, int linkType, int actionCode)
  //  {
  //    return EN_setlinktype(inout_index, linkType, actionCode);
  //  }
  //  int getlinknodes(int index, int *node1, int *node2)
  //  {
  //    return EN_getlinknodes(index, node1, node2);
  //  }
  //  int setlinknodes(int index, int node1, int node2)
  //  {
  //    return EN_setlinknodes(index, node1, node2);
  //  }
  //  int getlinkvalue(int index, int property, double *value)
  //  {
  //    return EN_getlinkvalue(index, property, value);
  //  }
  //  int setlinkvalue(int index, int property, double value)
  //  {
  //    return EN_setlinkvalue(index, property, value);
  //  }
  //  int setpipedata(int index, double length, double diam, double rough, double mloss)
  //  {
  //    return EN_setpipedata(index, length, diam, rough, mloss);
  //  }
  //  int getpumptype(int linkIndex, int *pumpType)
  //  {
  //    return EN_getpumptype(linkIndex, pumpType);
  //  }
  //  int getheadcurveindex(int linkIndex, int *curveIndex)
  //  {
  //    return EN_getheadcurveindex(linkIndex, curveIndex);
  //  }
  //  int setheadcurveindex(int linkIndex, int curveIndex)
  //  {
  //    return EN_setheadcurveindex(linkIndex, curveIndex);
  //  }
  //  int getvertexcount(int index, int *count)
  //  {
  //    return EN_getvertexcount(index, count);
  //  }
  //  int getvertex(int index, int vertex, double *x, double *y)
  //  {
  //    return EN_getvertex(index, vertex, x, y);
  //  }
  //  int setvertices(int index, double *x, double *y, int count)
  //  {
  //    return EN_setvertices(index, x, y, count);
  //  }
  //  // Time Pattern Functions
  //  int addpattern(char *id)
  //  {
  //    return EN_addpattern(id);
  //  }
  //  int deletepattern(int index)
  //  {
  //    return EN_deletepattern(index);
  //  }
  //  int getpatternindex(char *id, int *index)
  //  {
  //    return EN_getpatternindex(id, index);
  //  }
  //  int getpatternid(int index, char *out_id)
  //  {
  //    return EN_getpatternid(index, out_id);
  //  }
  //  int setpatternid(int index, char *id)
  //  {
  //    return EN_setpatternid(index, id);
  //  }
  //  int getpatternlen(int index, int *len)
  //  {
  //    return EN_getpatternlen(index, len);
  //  }
  //  int getpatternvalue(int index, int period, double *value)
  //  {
  //    return EN_getpatternvalue(index, period, value);
  //  }
  //  int setpatternvalue(int index, int period, double value)
  //  {
  //    return EN_setpatternvalue(index, period, value);
  //  }
  //  int getaveragepatternvalue(int index, double *value)
  //  {
  //    return EN_getaveragepatternvalue(index, value);
  //  }
  //  int setpattern(int index, double *values, int len)
  //  {
  //    return EN_setpattern(index, values, len);
  //  }
  //  // Data Curve Functions
  //  int addcurve(char *id)
  //  {
  //    return EN_addcurve(id);
  //  }
  //  int deletecurve(int index)
  //  {
  //    return EN_deletecurve(index);
  //  }
  //  int getcurveindex(char *id, int *index)
  //  {
  //    return EN_getcurveindex(id, index);
  //  }
  //  int getcurveid(int index, char *out_id)
  //  {
  //    return EN_getcurveid(index, out_id);
  //  }
  //  int setcurveid(int index, char *id)
  //  {
  //    return EN_setcurveid(index, id);
  //  }
  //  int getcurvelen(int index, int *len)
  //  {
  //    return EN_getcurvelen(index, len);
  //  }
  //  int getcurvetype(int index, int *type)
  //  {
  //    return EN_getcurvetype(index, type);
  //  }
  //  int getcurvevalue(int curveIndex, int pointIndex, double *x, double *y)
  //  {
  //    return EN_getcurvevalue(curveIndex, pointIndex, x, y);
  //  }
  //  int setcurvevalue(int curveIndex, int pointIndex, double x, double y)
  //  {
  //    return EN_setcurvevalue(curveIndex, pointIndex, x, y);
  //  }
  //  int setcurve(int index, double *xValues, double *yValues, int nPoints)
  //  {
  //    return EN_setcurve(index, xValues, yValues, nPoints);
  //  }
  //  // Simple Control Functions
  //  int addcontrol(int type, int linkIndex, double setting, int nodeIndex, double level, int *index)
  //  {
  //    return EN_addcontrol(type, linkIndex, setting, nodeIndex, level, index);
  //  }
  //  int deletecontrol(int index)
  //  {
  //    return EN_deletecontrol(index);
  //  }
  //  int getcontrol(int index, int *type, int *linkIndex, double *setting, int *nodeIndex, double *level)
  //  {
  //    return EN_getcontrol(index, type, linkIndex, setting, nodeIndex, level);
  //  }
  //  int setcontrol(int index, int type, int linkIndex, double setting, int nodeIndex, double level)
  //  {
  //    return EN_setcontrol(index, type, linkIndex, setting, nodeIndex, level);
  //  }
  //  // Rule-Based Control Functions
  //  int addrule(char *rule)
  //  {
  //    return EN_addrule(rule);
  //  }
  //  int deleterule(int index)
  //  {
  //    return EN_deleterule(index);
  //  }
  //  int getrule(int index, int *nPremises, int *nThenActions, int *nElseActions, double *priority)
  //  {
  //    return EN_getrule(index, nPremises, nThenActions, nElseActions, priority);
  //  }
  //  int getruleID(int index, char *out_id)
  //  {
  //    return EN_getruleID(index, out_id);
  //  }
  //  int getpremise(int ruleIndex, int premiseIndex, int *logop, int *object, int *objIndex, int *variable, int *relop, int *status, double *value)
  //  {
  //    return EN_getpremise(ruleIndex, premiseIndex, logop, object, objIndex, variable, relop, status, value);
  //  }
  //  int setpremise(int ruleIndex, int premiseIndex, int logop, int object, int objIndex, int variable, int relop, int status, double value)
  //  {
  //    return EN_setpremise(ruleIndex, premiseIndex, logop, object, objIndex, variable, relop, status, value);
  //  }
  //  int setpremiseindex(int ruleIndex, int premiseIndex, int objIndex)
  //  {
  //    return EN_setpremiseindex(ruleIndex, premiseIndex, objIndex);
  //  }
  //  int setpremisestatus(int ruleIndex, int premiseIndex, int status)
  //  {
  //    return EN_setpremisestatus(ruleIndex, premiseIndex, status);
  //  }
  //  int setpremisevalue(int ruleIndex, int premiseIndex, double value)
  //  {
  //    return EN_setpremisevalue(ruleIndex, premiseIndex, value);
  //  }
  //  int getthenaction(int ruleIndex, int actionIndex, int *linkIndex, int *status, double *setting)
  //  {
  //    return EN_getthenaction(ruleIndex, actionIndex, linkIndex, status, setting);
  //  }
  //  int setthenaction(int ruleIndex, int actionIndex, int linkIndex, int status, double setting)
  //  {
  //    return EN_setthenaction(ruleIndex, actionIndex, linkIndex, status, setting);
  //  }
  //  int getelseaction(int ruleIndex, int actionIndex, int *linkIndex, int *status, double *setting)
  //  {
  //    return EN_getelseaction(ruleIndex, actionIndex, linkIndex, status, setting);
  //  }
  //  int setelseaction(int ruleIndex, int actionIndex, int linkIndex, int status, double setting)
  //  {
  //    return EN_setelseaction(ruleIndex, actionIndex, linkIndex, status, setting);
  //  }
  //  int setrulepriority(int index, double priority)
  //  {
  //    return EN_setrulepriority(index, priority);
  //  }
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
      //      // Nodal Demand Functions
      //      .function("adddemand", &Epanet::adddemand)
      //      .function("deletedemand", &Epanet::deletedemand)
      //      .function("getbasedemand", &Epanet::getbasedemand)
      //      .function("getdemandindex", &Epanet::getdemandindex)
      //      .function("getdemandmodel", &Epanet::getdemandmodel)
      //      .function("getdemandname", &Epanet::getdemandname)
      //      .function("getdemandpattern", &Epanet::getdemandpattern)
      //      .function("getnumdemands", &Epanet::getnumdemands)
      //      .function("setbasedemand", &Epanet::setbasedemand)
      //      .function("setdemandmodel", &Epanet::setdemandmodel)
      //      .function("setdemandname", &Epanet::setdemandname)
      //      .function("setdemandpattern", &Epanet::setdemandpattern)
      //      // Network Link Functions
      //      .function("addlink", &Epanet::addlink)
      //      .function("deletelink", &Epanet::deletelink)
      //      .function("getheadcurveindex", &Epanet::getheadcurveindex)
      //      .function("getlinkid", &Epanet::getlinkid)
      //      .function("getlinkindex", &Epanet::getlinkindex)
      //      .function("getlinknodes", &Epanet::getlinknodes)
      //      .function("getlinktype", &Epanet::getlinktype)
      //      .function("getlinkvalue", &Epanet::getlinkvalue)
      //      .function("getpumptype", &Epanet::getpumptype)
      //      .function("getvertex", &Epanet::getvertex)
      //      .function("getvertexcount", &Epanet::getvertexcount)
      //      .function("setheadcurveindex", &Epanet::setheadcurveindex)
      //      .function("setlinkid", &Epanet::setlinkid)
      //      .function("setlinknodes", &Epanet::setlinknodes)
      //      .function("setlinktype", &Epanet::setlinktype)
      //      .function("setlinkvalue", &Epanet::setlinkvalue)
      //      .function("setpipedata", &Epanet::setpipedata)
      //      .function("setvertices", &Epanet::setvertices)
      //      // Time Pattern Functions
      //      .function("addpattern", &Epanet::addpattern)
      //      .function("deletepattern", &Epanet::deletepattern)
      //      .function("getaveragepatternvalue", &Epanet::getaveragepatternvalue)
      //      .function("getpatternid", &Epanet::getpatternid)
      //      .function("getpatternindex", &Epanet::getpatternindex)
      //      .function("getpatternlen", &Epanet::getpatternlen)
      //      .function("getpatternvalue", &Epanet::getpatternvalue)
      //      .function("setpattern", &Epanet::setpattern)
      //      .function("setpatternid", &Epanet::setpatternid)
      //      .function("setpatternvalue", &Epanet::setpatternvalue)
      //      // Data Curve Functions
      //      .function("addcurve", &Epanet::addcurve)
      //      .function("deletecurve", &Epanet::deletecurve)
      //      .function("getcurveid", &Epanet::getcurveid)
      //      .function("getcurveindex", &Epanet::getcurveindex)
      //      .function("getcurvelen", &Epanet::getcurvelen)
      //      .function("getcurvetype", &Epanet::getcurvetype)
      //      .function("getcurvevalue", &Epanet::getcurvevalue)
      //      .function("setcurve", &Epanet::setcurve)
      //      .function("setcurveid", &Epanet::setcurveid)
      //      .function("setcurvevalue", &Epanet::setcurvevalue)
      //      // Simple Control Functions
      //      .function("addcontrol", &Epanet::addcontrol)
      //      .function("deletecontrol", &Epanet::deletecontrol)
      //      .function("getcontrol", &Epanet::getcontrol)
      //      .function("setcontrol", &Epanet::setcontrol)
      //      // Rule-Based Control Functions
      //      .function("addrule", &Epanet::addrule)
      //      .function("deleterule", &Epanet::deleterule)
      //      .function("getelseaction", &Epanet::getelseaction)
      //      .function("getpremise", &Epanet::getpremise)
      //      .function("getrule", &Epanet::getrule)
      //      .function("getruleID", &Epanet::getruleID)
      //      .function("getthenaction", &Epanet::getthenaction)
      //      .function("setelseaction", &Epanet::setelseaction)
      //      .function("setpremise", &Epanet::setpremise)
      //      .function("setpremiseindex", &Epanet::setpremiseindex)
      //      .function("setpremisestatus", &Epanet::setpremisestatus)
      //      .function("setpremisevalue", &Epanet::setpremisevalue)
      //      .function("setrulepriority", &Epanet::setrulepriority)
      //      .function("setthenaction", &Epanet::setthenaction)
      ;
}
