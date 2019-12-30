#include "emscripten.h"
#include "epanet2_2.h"

#include "stdio.h"

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
int getversion2(int *i)
{
  return EN_getversion(i);
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