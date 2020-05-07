# Water Modelling

## What is a hydraulic model

Engineers use hydraulic modelling software to simulate water networks. A model will represent a network consisting of pipes, pumps, valves and storage tanks. The modelling software tracks the flow of water in each pipe, the pressure at each node, the height of water in each tank throughout the network during a multi-period simulation.

## EPANET

### History of the software

EPANET is an industry-standard program, initially developed by the USEPA, to simulate water distribution networks, its source code was released in the public domain. An open-source fork by the Open Water Analytics (OWA) community has been released extending its original capabilities. Read more about [EPANET on Wikipedia](https://en.wikipedia.org/wiki/EPANET) and the [OWA community on their website](http://wateranalytics.org/).

The EPANET Toolkit is an API written in C that allows developers to embed the EPANET's engine in their own applications. Ports of the toolkit exist in Python and Matlab; however, there are limited options to use the EPANET engine in JavaScript.

### EPANET in Javascript

Epanet-js is a full port of version 2.2 OWA-EPANET Toolkit in Typescript, providing access to all 122 functions within the toolkit.

The JavaScript library is for engineers, developers and academics to run and share hydraulic analyses or create custom front end or server-side applications.
