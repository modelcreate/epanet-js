# Project Class

Create a `Project` object by instancing the `epanetJs.Project` class with a `Workspace` object.

```javascript
import { Workspace, Project } from `epanet-js`
const ws = new Workspace()
const model = new Project(ws)
```

## Class Methods

| Functions                                                             | Description                                                           |
| --------------------------------------------------------------------- | --------------------------------------------------------------------- |
| [Project Functions](#project-functions)                               | These functions are used to manage a project                          |
| [Hydraulic Analysis Functions](#hydraulic-analysis-functions)         | These functions are used to perform a hydraulic analysis              |
| [Water Quality Analysis Functions](#water-quality-analysis-functions) | These functions are used to perform a water quality analysis          |
| [Reporting Functions](#reporting-functions)                           | These functions are used to report simulation results                 |
| [Analysis Options Functions](#analysis-options-functions)             | These functions are used to get and set analysis options              |
| [Network Node Functions](#network-node-functions)                     | These functions are used for working with network nodes               |
| [Nodal Demand Functions](#nodal-demand-functions)                     | These functions are used for managing nodal demands                   |
| [Network Link Functions](#network-link-functions)                     | These functions are used for working with network links               |
| [Time Pattern Functions](#time-pattern-functions)                     | These functions are used for working with time patterns               |
| [Data Curve Functions](#data-curve-functions)                         | These functions are used for working with data curves                 |
| [Simple Control Functions](#simple-control-functions)                 | These functions are used for working with simple conditional controls |
| [Rule-Based Control Functions](#rule-based-control-functions)         | These functions are used for working with rule-based controls         |

---

### Project Functions

These functions are used to manage a project [More...](../project-functions/project)

| Function                                                                        | Description                                                   |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| <a href="../project-functions/project#open"><code>open</code></a>               | Opens an EPANET input file & reads in network data.           |
| <a href="../project-functions/project#close"><code>close</code></a>             | Closes a project and frees all of its memory.                 |
| <a href="../project-functions/project#runproject"><code>runProject</code></a>   | Runs a complete EPANET simulation.                            |
| <a href="../project-functions/project#init"><code>init</code></a>               | Initializes an EPANET project.                                |
| <a href="../project-functions/project#getcount"><code>getCount</code></a>       | Retrieves the number of objects of a given type in a project. |
| <a href="../project-functions/project#gettitle"><code>getTitle</code></a>       | Retrieves the title lines of the project.                     |
| <a href="../project-functions/project#settitle"><code>setTitle</code></a>       | Sets the title lines of the project.                          |
| <a href="../project-functions/project#saveinpfile"><code>saveInpFile</code></a> | Saves a project's data to an EPANET-formatted text file.      |

---

### Hydraulic Analysis Functions

These functions are used to perform a hydraulic analysis. [More...](Hydraulic-Analysis-Functions)

| Function                                                                                   | Description                                                                                                                                                            |
| ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a href="../project-functions/hydraulic-analysis#solveh"><code>solveH</code></a>           | Runs a complete hydraulic simulation with results for all time periods written to a temporary hydraulics file.                                                         |
| <a href="../project-functions/hydraulic-analysis#usehydfile"><code>useHydFile</code></a>   | Uses a previously saved binary hydraulics file to supply a project's hydraulics.                                                                                       |
| <a href="../project-functions/hydraulic-analysis#openh"><code>openH</code></a>             | Opens a project's hydraulic solver.                                                                                                                                    |
| <a href="../project-functions/hydraulic-analysis#inith"><code>initH</code></a>             | Initializes a network prior to running a hydraulic analysis.                                                                                                           |
| <a href="../project-functions/hydraulic-analysis#runh"><code>runH</code></a>               | Computes a hydraulic solution for the current point in time.                                                                                                           |
| <a href="../project-functions/hydraulic-analysis#nexth"><code>nextH</code></a>             | Determines the length of time until the next hydraulic event occurs in an extended period simulation.                                                                  |
| <a href="../project-functions/hydraulic-analysis#saveh"><code>saveH</code></a>             | Transfers a project's hydraulics results from its temporary hydraulics file to its binary output file, where results are only reported at uniform reporting intervals. |
| <a href="../project-functions/hydraulic-analysis#savehydfile"><code>saveHydFile</code></a> | Saves a project's temporary hydraulics file to disk.                                                                                                                   |
| <a href="../project-functions/hydraulic-analysis#closeh"><code>closeH</code></a>           | Closes the hydraulic solver freeing all of its allocated memory.                                                                                                       |

---

### Water Quality Analysis Functions

These functions are used to perform a water quality analysis. [More...](Water-Quality-Analysis-Functions)

| Function                                                                             | Description                                                                                                                       |
| ------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| <a href="../project-functions/water-quality-analysis#solveq"><code>solveQ</code></a> | Runs a complete water quality simulation with results at uniform reporting intervals written to the project's binary output file. |
| <a href="../project-functions/water-quality-analysis#openq"><code>openQ</code></a>   | Opens a project's water quality solver.                                                                                           |
| <a href="../project-functions/water-quality-analysis#initq"><code>initQ</code></a>   | Initializes a network prior to running a water quality analysis.                                                                  |
| <a href="../project-functions/water-quality-analysis#runq"><code>runQ</code></a>     | Makes hydraulic and water quality results at the start of the current time period available to a project's water quality solver.  |
| <a href="../project-functions/water-quality-analysis#nextq"><code>nextQ</code></a>   | Advances a water quality simulation over the time until the next hydraulic event.                                                 |
| <a href="../project-functions/water-quality-analysis#stepq"><code>stepQ</code></a>   | Advances a water quality simulation by a single water quality time step.                                                          |
| <a href="../project-functions/water-quality-analysis#closeq"><code>closeQ</code></a> | Closes the water quality solver, freeing all of its allocated memory.                                                             |

---

### Reporting Functions

These functions are used to report simulation results. [More...](Reporting-Functions)

| Function                                                                                  | Description                                                               |
| ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| <a href="../project-functions/reporting#writeline"><code>writeLine</code></a>             | Writes a line of text to a project's report file.                         |
| <a href="../project-functions/reporting#report"><code>report</code></a>                   | Writes simulation results in a tabular format to a project's report file. |
| <a href="../project-functions/reporting#copyreport"><code>copyReport</code></a>           | Copies the current contents of a project's report file to another file.   |
| <a href="../project-functions/reporting#clearreport"><code>clearReport</code></a>         | Clears the contents of a project's report file.                           |
| <a href="../project-functions/reporting#resetreport"><code>resetReport</code></a>         | Resets a project's report options to their default values.                |
| <a href="../project-functions/reporting#setreport"><code>setReport</code></a>             | Processes a reporting format command.                                     |
| <a href="../project-functions/reporting#setstatusreport"><code>setStatusReport</code></a> | Sets the level of hydraulic status reporting.                             |
| <a href="../project-functions/reporting#getstatistic"><code>getStatistic</code></a>       | Retrieves a particular simulation statistic.                              |
| <a href="../project-functions/reporting#getresultindex"><code>getResultIndex</code></a>   | Retrieves the order in which a node or link appears in an output file.    |

---

### Analysis Options Functions

These functions are used to get and set analysis options. [More...](Analysis-Options-Functions)

| Function                                                                                           | Description                                                          |
| -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| <a href="../project-functions/analysis-options#getflowunits"><code>getFlowUnits</code></a>         | Retrieves a project's flow units.                                    |
| <a href="../project-functions/analysis-options#getoption"><code>getOption</code></a>               | Retrieves the value of an analysis option.                           |
| <a href="../project-functions/analysis-options#getqualityinfo"><code>getQualityInfo</code></a>     | Gets information about the type of water quality analysis requested. |
| <a href="../project-functions/analysis-options#getqualitytype"><code>getQualityType</code></a>     | Retrieves the type of water quality analysis to be run.              |
| <a href="../project-functions/analysis-options#gettimeparameter"><code>getTimeParameter</code></a> | Retrieves the value of a time parameter.                             |
| <a href="../project-functions/analysis-options#setflowunits"><code>setFlowUnits</code></a>         | Sets a project's flow units.                                         |
| <a href="../project-functions/analysis-options#setoption"><code>setOption</code></a>               | Sets the value for an anlysis option.                                |
| <a href="../project-functions/analysis-options#setqualitytype"><code>setQualityType</code></a>     | Sets the type of water quality analysis to run.                      |
| <a href="../project-functions/analysis-options#settimeparameter"><code>setTimeParameter</code></a> | Sets the value of a time parameter.                                  |

---

### Network Node Functions

These functions are used for working with network nodes. [More...](Network-Node-Functions)

| Function                                                                                     | Description                                     |
| -------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| <a href="../project-functions/network-node#addnode"><code>addNode</code></a>                 | Adds a new node to a project.                   |
| <a href="../project-functions/network-node#deletenode"><code>deleteNode</code></a>           | Deletes a node from a project.                  |
| <a href="../project-functions/network-node#getnodeindex"><code>getNodeIndex</code></a>       | Gets the index of a node given its ID name.     |
| <a href="../project-functions/network-node#getnodeid"><code>getNodeId</code></a>             | Gets the ID name of a node given its index.     |
| <a href="../project-functions/network-node#setnodeid"><code>setNodeId</code></a>             | Changes the ID name of a node.                  |
| <a href="../project-functions/network-node#getnodetype"><code>getNodeType</code></a>         | Retrieves a node's type given its index.        |
| <a href="../project-functions/network-node#getnodevalue"><code>getNodeValue</code></a>       | Retrieves a property value for a node.          |
| <a href="../project-functions/network-node#setnodevalue"><code>setNodeValue</code></a>       | Sets a property value for a node.               |
| <a href="../project-functions/network-node#setjunctiondata"><code>setJunctionData</code></a> | Sets a group of properties for a junction node. |
| <a href="../project-functions/network-node#settankdata"><code>setTankData</code></a>         | Sets a group of properties for a tank node.     |
| <a href="../project-functions/network-node#getcoordinates"><code>getCoordinates</code></a>   | Gets the (x,y) coordinates of a node.           |
| <a href="../project-functions/network-node#setcoordinates"><code>setCoordinates</code></a>   | Sets the (x,y) coordinates of a node.           |

---

### Nodal Demand Functions

These functions are used for managing nodal demands. [More...](Nodal-Demand-Functions)

| Function                                                                                           | Description                                                                          |
| -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| <a href="../project-functions/nodal-demand#adddemand"><code>addDemand</code></a>                   | appends a new demand to a junction node demands list.                                |
| <a href="../project-functions/nodal-demand#deletedemand"><code>deleteDemand</code></a>             | deletes a demand from a junction node.                                               |
| <a href="../project-functions/nodal-demand#getbasedemand"><code>getBaseDemand</code></a>           | Gets the base demand for one of a node's demand categories.                          |
| <a href="../project-functions/nodal-demand#getdemandindex"><code>getDemandIndex</code></a>         | Retrieves the index of a node's named demand category.                               |
| <a href="../project-functions/nodal-demand#getdemandmodel"><code>getDemandModel</code></a>         | Retrieves the type of demand model in use and its parameters.                        |
| <a href="../project-functions/nodal-demand#getdemandname"><code>getDemandName</code></a>           | Retrieves the name of a node's demand category.                                      |
| <a href="../project-functions/nodal-demand#getdemandpattern"><code>getDemandPattern</code></a>     | Retrieves the index of a time pattern assigned to one of a node's demand categories. |
| <a href="../project-functions/nodal-demand#getnumberofdemands"><code>getNumberOfDemands</code></a> | Retrieves the number of demand categories for a junction node.                       |
| <a href="../project-functions/nodal-demand#setbasedemand"><code>setBaseDemand</code></a>           | Sets the base demand for one of a node's demand categories.                          |
| <a href="../project-functions/nodal-demand#setdemandmodel"><code>setDemandModel</code></a>         | Sets the type of demand model to use and its parameters.                             |
| <a href="../project-functions/nodal-demand#setdemandname"><code>setDemandName</code></a>           | Assigns a name to a node's demand category.                                          |
| <a href="../project-functions/nodal-demand#setdemandpattern"><code>setDemandPattern</code></a>     | Sets the index of a time pattern used for one of a node's demand categories.         |

---

### Network Link Functions

These functions are used for working with network links. [More...](Network-Link-Functions)

| Function                                                                                         | Description                                                        |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------ |
| <a href="../project-functions/network-link#addlink"><code>addLink</code></a>                     | Adds a new link to a project.                                      |
| <a href="../project-functions/network-link#deletelink"><code>deleteLink</code></a>               | Deletes a link from the project.                                   |
| <a href="../project-functions/network-link#getlinkindex"><code>getLinkIndex</code></a>           | Gets the index of a link given its ID name.                        |
| <a href="../project-functions/network-link#getlinkid"><code>getLinkId</code></a>                 | Gets the ID name of a link given its index.                        |
| <a href="../project-functions/network-link#setlinkid"><code>setLinkId</code></a>                 | Changes the ID name of a link.                                     |
| <a href="../project-functions/network-link#getlinktype"><code>getLinkType</code></a>             | Retrieves a link's type.                                           |
| <a href="../project-functions/network-link#setlinktype"><code>setLinkType</code></a>             | Changes a link's type.                                             |
| <a href="../project-functions/network-link#getlinknodes"><code>getLinkNodes</code></a>           | Gets the indexes of a link's start- and end-nodes.                 |
| <a href="../project-functions/network-link#setlinknodes"><code>setLinkNodes</code></a>           | Sets the indexes of a link's start- and end-nodes.                 |
| <a href="../project-functions/network-link#getlinkvalue"><code>getLinkValue</code></a>           | Retrieves a property value for a link.                             |
| <a href="../project-functions/network-link#setlinkvalue"><code>setLinkValue</code></a>           | Sets a property value for a link.                                  |
| <a href="../project-functions/network-link#setpipedata"><code>setPipeData</code></a>             | Sets a group of properties for a pipe link.                        |
| <a href="../project-functions/network-link#getpumptype"><code>getPumpType</code></a>             | Retrieves the type of head curve used by a pump.                   |
| <a href="../project-functions/network-link#getheadcurveindex"><code>getHeadCurveIndex</code></a> | Retrieves the curve assigned to a pump's head curve.               |
| <a href="../project-functions/network-link#setheadcurveindex"><code>setHeadCurveIndex</code></a> | Assigns a curve to a pump's head curve.                            |
| <a href="../project-functions/network-link#getvertexcount"><code>getVertexCount</code></a>       | Retrieves the number of internal vertex points assigned to a link. |
| <a href="../project-functions/network-link#getvertex"><code>getVertex</code></a>                 | Retrieves the coordinate's of a vertex point assigned to a link.   |
| <a href="../project-functions/network-link#setvertices"><code>setVertices</code></a>             | Assigns a set of internal vertex points to a link.                 |

---

### Time Pattern Functions

These functions are used for working with time patterns. [More...](Time-Pattern-Functions)

| Function                                                                                                   | Description                                                     |
| ---------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| <a href="../project-functions/time-pattern#addpattern"><code>addPattern</code></a>                         | Adds a new time pattern to a project.                           |
| <a href="../project-functions/time-pattern#deletepattern"><code>deletePattern</code></a>                   | Deletes a time pattern from a project.                          |
| <a href="../project-functions/time-pattern#getpatternindex"><code>getPatternIndex</code></a>               | Retrieves the index of a time pattern given its ID name.        |
| <a href="../project-functions/time-pattern#getpatternid"><code>getPatternId</code></a>                     | Retrieves the ID name of a time pattern given its index.        |
| <a href="../project-functions/time-pattern#setpatternid"><code>setPatternId</code></a>                     | Changes the ID name of a time pattern given its index.          |
| <a href="../project-functions/time-pattern#getpatternlenth"><code>getPatternLenth</code></a>               | Retrieves the number of time periods in a time pattern.         |
| <a href="../project-functions/time-pattern#getpatternvalue"><code>getPatternValue</code></a>               | Retrieves a time pattern's factor for a given time period.      |
| <a href="../project-functions/time-pattern#setpatternvalue"><code>setPatternValue</code></a>               | Sets a time pattern's factor for a given time period.           |
| <a href="../project-functions/time-pattern#getaveragepatternvalue"><code>getAveragePatternValue</code></a> | Retrieves the average of all pattern factors in a time pattern. |
| <a href="../project-functions/time-pattern#setpattern"><code>setPattern</code></a>                         | Sets the pattern factors for a given time pattern.              |

---

### Data Curve Functions

These functions are used for working with data curves. [More...](Data-Curve-Functions)

| Function                                                                               | Description                                             |
| -------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| <a href="../project-functions/data-curve#addcurve"><code>addCurve</code></a>           | Adds a new data curve to a project.                     |
| <a href="../project-functions/data-curve#deletecurve"><code>deleteCurve</code></a>     | Deletes a data curve from a project.                    |
| <a href="../project-functions/data-curve#getcurveindex"><code>getCurveIndex</code></a> | Retrieves the index of a curve given its ID name.       |
| <a href="../project-functions/data-curve#getcurveid"><code>getCurveId</code></a>       | Retrieves the ID name of a curve given its index.       |
| <a href="../project-functions/data-curve#setcurveid"><code>setCurveId</code></a>       | Changes the ID name of a data curve given its index.    |
| <a href="../project-functions/data-curve#getcurvelenth"><code>getCurveLenth</code></a> | Retrieves the number of points in a curve.              |
| <a href="../project-functions/data-curve#getcurvetype"><code>getCurveType</code></a>   | Retrieves a curve's type.                               |
| <a href="../project-functions/data-curve#getcurvevalue"><code>getCurveValue</code></a> | Retrieves the value of a single data point for a curve. |
| <a href="../project-functions/data-curve#setcurvevalue"><code>setCurveValue</code></a> | Sets the value of a single data point for a curve.      |
| <a href="../project-functions/data-curve#setcurve"><code>setCurve</code></a>           | assigns a set of data points to a curve.                |

---

### Simple Control Functions

These functions are used for working with simple conditional controls. [More...](Simple-Control-Functions)

| Function                                                                                   | Description                                        |
| ------------------------------------------------------------------------------------------ | -------------------------------------------------- |
| <a href="../project-functions/simple-control#addcontrol"><code>addControl</code></a>       | Adds a new simple control to a project.            |
| <a href="../project-functions/simple-control#deletecontrol"><code>deleteControl</code></a> | Deletes an existing simple control.                |
| <a href="../project-functions/simple-control#getcontrol"><code>getControl</code></a>       | Retrieves the properties of a simple control.      |
| <a href="../project-functions/simple-control#setcontrol"><code>setControl</code></a>       | Sets the properties of an existing simple control. |

---

### Rule-Based Control Functions

These functions are used for working with rule-based controls.[More...](Rule-Based-Control-Functions)

| Function                                                                                             | Description                                                             |
| ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| <a href="../project-functions/rule-based-control#addrule"><code>addRule</code></a>                   | Adds a new rule-based control to a project.                             |
| <a href="../project-functions/rule-based-control#deleterule"><code>deleteRule</code></a>             | Deletes an existing rule-based control.                                 |
| <a href="../project-functions/rule-based-control#getrule"><code>getRule</code></a>                   | Retrieves summary information about a rule-based control.               |
| <a href="../project-functions/rule-based-control#getruleid"><code>getRuleId</code></a>               | Gets the ID name of a rule-based control given its index.               |
| <a href="../project-functions/rule-based-control#getpremise"><code>getPremise</code></a>             | Gets the properties of a premise in a rule-based control.               |
| <a href="../project-functions/rule-based-control#setpremise"><code>setPremise</code></a>             | Sets the properties of a premise in a rule-based control.               |
| <a href="../project-functions/rule-based-control#setpremiseindex"><code>setPremiseIndex</code></a>   | Sets the index of an object in a premise of a rule-based control.       |
| <a href="../project-functions/rule-based-control#setpremisestatus"><code>setPremiseStatus</code></a> | Sets the status being compared to in a premise of a rule-based control. |
| <a href="../project-functions/rule-based-control#setpremisevalue"><code>setPremiseValue</code></a>   | Sets the value in a premise of a rule-based control.                    |
| <a href="../project-functions/rule-based-control#getthenaction"><code>getThenAction</code></a>       | Gets the properties of a THEN action in a rule-based control.           |
| <a href="../project-functions/rule-based-control#setthenaction"><code>setThenAction</code></a>       | Sets the properties of a THEN action in a rule-based control.           |
| <a href="../project-functions/rule-based-control#getelseaction"><code>getElseAction</code></a>       | Gets the properties of an ELSE action in a rule-based control.          |
| <a href="../project-functions/rule-based-control#setelseaction"><code>setElseAction</code></a>       | Sets the properties of an ELSE action in a rule-based control.          |
| <a href="../project-functions/rule-based-control#setrulepriority"><code>setRulePriority</code></a>   | Sets the priority of a rule-based control.                              |
