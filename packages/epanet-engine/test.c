#include "emscripten.h"
#include "epanet2_2.h"

#include "stdio.h"
#include <stdlib.h>




EMSCRIPTEN_KEEPALIVE
EN_Project create_project() {
    EN_Project ph = NULL; // EN_Project is already a pointer type.
    int errcode = EN_createproject(&ph);
    if (errcode != 0) {
        // If there was an error, the memory (if allocated) should ideally be freed by the library. 
        // However, if you suspect a leak, you may need to handle it or check library docs.
        return NULL;
    }
    return ph;
}

EMSCRIPTEN_KEEPALIVE
int loadinp(EN_Project ph) {
    int errcode = EN_open(ph, "test.inp", "test.rpt", "test.out");
    return errcode;
}

EMSCRIPTEN_KEEPALIVE
int getNodeIndex(EN_Project ph, char *id) {
    int index;
    EN_getnodeindex(ph, id, &index);
    return index;
}

EMSCRIPTEN_KEEPALIVE
void free_project(EN_Project ph) {
    free(ph);
}




//EMSCRIPTEN_KEEPALIVE
//int loadinp()
//{
//  int errcode;  
//  EN_createproject(&ph);
//  errcode = EN_open(ph, "test.inp", "test.rpt", "test.out");
//
//
//  return errcode;
//}
//
//EMSCRIPTEN_KEEPALIVE
//int getNodeIndex()
//{
//  int index;
//  EN_getnodeindex(ph, "J1", &index);
//  return index;
//}


EMSCRIPTEN_KEEPALIVE
int test()
{
  FILE *pFile;
  char sentence[256];

  printf("Enter sentence to append: ");
  fgets(sentence, 256, stdin);
  pFile = fopen("mylog.txt", "a");
  fputs(sentence, pFile);
  fclose(pFile);
  return 0;
}

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

EMSCRIPTEN_KEEPALIVE
int getversion()
{
  int i;
  EN_getversion(*i);
  return i;
}

void writeConsole(char *s)
{
  fprintf(stdout, "\n%s", s);
}

EMSCRIPTEN_KEEPALIVE
int runEpanet(char *inpFile, char *rptFile, char *outFile)
{
  int errcode;
  EN_Project ph;
  EN_createproject(&ph);
  errcode = EN_runproject(ph, inpFile, rptFile, outFile, &writeConsole);
  EN_deleteproject(ph);
  return errcode;
}