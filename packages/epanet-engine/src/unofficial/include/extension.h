/** @file epanet2_2.h
 @see http://github.com/openwateranalytics/epanet
 */

/*
 ******************************************************************************
 Project:      OWA EPANET
 Version:      2.2
 Module:       epanet2.h
 Description:  API function declarations
 Authors:      see AUTHORS
 Copyright:    see AUTHORS
 License:      see LICENSE
 Last Updated: 10/29/2019
 ******************************************************************************
 */

#ifndef EXTENSION_H
#define EXTENSION_H

#ifdef epanet_py_EXPORTS
  #define DLLEXPORT
#else
  #ifndef DLLEXPORT
    #ifdef _WIN32
      #ifdef epanet2_EXPORTS
        #define DLLEXPORT __declspec(dllexport) __stdcall
      #else
        #define DLLEXPORT __declspec(dllimport) __stdcall
      #endif
    #elif defined(__CYGWIN__)
      #define DLLEXPORT __stdcall
    #else
      #define DLLEXPORT
    #endif
  #endif
#endif

#include "epanet2_enums.h"

// --- Declare the EPANET toolkit functions
#if defined(__cplusplus)
extern "C" {
#endif

/**
 @brief The EPANET Project wrapper object
*/
typedef struct Project *EN_Project;


  int  DLLEXPORT EN_UNOFFICIAL_isnodeincontrol(EN_Project ph, int index, double *out_value);

#if defined(__cplusplus)
}
#endif

#endif //EXTENSION