/*
 ******************************************************************************
 Project:      OWA EPANET
 Version:      2.2
 Module:       epanet.c
 Description:  implementation of EPANET's API functions
 Authors:      see AUTHORS
 Copyright:    see AUTHORS
 License:      see LICENSE
 Last Updated: 02/05/2023
 ******************************************************************************
*/

#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <float.h>
#include <math.h>

#include "extension.h"
#include "types.h"
#include "funcs.h"


#ifdef _WIN32
#define snprintf _snprintf
#endif


int DLLEXPORT EN_UNOFFICIAL_isnodeincontrol(EN_Project p, int index, double *value)
{
  double v = 0.0;
  v = (double)incontrols(p, NODE, index);
  *value = v;
  return 0;
}
