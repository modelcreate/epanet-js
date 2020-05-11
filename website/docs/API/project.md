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
| [Reporting Functions](#Reporting-Functions)                           | These functions are used to report simulation results                 |
| [Analysis Options Functions](#Analysis-Options-Functions)             | These functions are used to get and set analysis options              |
| [Network Node Functions](#Network-Node-Functions)                     | These functions are used for working with network nodes               |
| [Nodal Demand Functions](#Nodal-Demand-Functions)                     | These functions are used for managing nodal demands                   |
| [Network Link Functions](#Network-Link-Functions)                     | These functions are used for working with network links               |
| [Time Pattern Functions](#Time-Pattern-Functions)                     | These functions are used for working with time patterns               |
| [Data Curve Functions](#Data-Curve-Functions)                         | These functions are used for working with data curves                 |
| [Simple Control Functions](#Simple-Control-Functions)                 | These functions are used for working with simple conditional controls |
| [Rule-Based Control Functions](#Rule-Based-Control-Functions)         | These functions are used for working with rule-based controls         |

## Project Functions

These functions are used to manage a project [More...](Project-Functions)

| Function                                                             | Description                                                   |
| -------------------------------------------------------------------- | ------------------------------------------------------------- |
| <a href="Project-Functions#open"><code>open</code></a>               | Opens an EPANET input file & reads in network data.           |
| <a href="Project-Functions#close"><code>close</code></a>             | Closes a project and frees all of its memory.                 |
| <a href="Project-Functions#runProject"><code>runProject</code></a>   | Runs a complete EPANET simulation.                            |
| <a href="Project-Functions#init"><code>init</code></a>               | Initializes an EPANET project.                                |
| <a href="Project-Functions#getCount"><code>getCount</code></a>       | Retrieves the number of objects of a given type in a project. |
| <a href="Project-Functions#getTitle"><code>getTitle</code></a>       | Retrieves the title lines of the project.                     |
| <a href="Project-Functions#setTitle"><code>setTitle</code></a>       | Sets the title lines of the project.                          |
| <a href="Project-Functions#saveInpFile"><code>saveInpFile</code></a> | Saves a project's data to an EPANET-formatted text file.      |

## Hydraulic Analysis Functions

These functions are used to perform a hydraulic analysis. [More...](Hydraulic-Analysis-Functions)

| Function                                                                        | Description                                                                                                                                                            |
| ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a href="Hydraulic-Analysis-Functions#solveH"><code>solveH</code></a>           | Runs a complete hydraulic simulation with results for all time periods written to a temporary hydraulics file.                                                         |
| <a href="Hydraulic-Analysis-Functions#useHydFile"><code>useHydFile</code></a>   | Uses a previously saved binary hydraulics file to supply a project's hydraulics.                                                                                       |
| <a href="Hydraulic-Analysis-Functions#openH"><code>openH</code></a>             | Opens a project's hydraulic solver.                                                                                                                                    |
| <a href="Hydraulic-Analysis-Functions#initH"><code>initH</code></a>             | Initializes a network prior to running a hydraulic analysis.                                                                                                           |
| <a href="Hydraulic-Analysis-Functions#runH"><code>runH</code></a>               | Computes a hydraulic solution for the current point in time.                                                                                                           |
| <a href="Hydraulic-Analysis-Functions#nextH"><code>nextH</code></a>             | Determines the length of time until the next hydraulic event occurs in an extended period simulation.                                                                  |
| <a href="Hydraulic-Analysis-Functions#saveH"><code>saveH</code></a>             | Transfers a project's hydraulics results from its temporary hydraulics file to its binary output file, where results are only reported at uniform reporting intervals. |
| <a href="Hydraulic-Analysis-Functions#saveHydFile"><code>saveHydFile</code></a> | Saves a project's temporary hydraulics file to disk.                                                                                                                   |
| <a href="Hydraulic-Analysis-Functions#closeH"><code>closeH</code></a>           | Closes the hydraulic solver freeing all of its allocated memory.                                                                                                       |

## Water Quality Analysis Functions

These functions are used to perform a water quality analysis. [More...](Water-Quality-Analysis-Functions)

| Function                                                                  | Description                                                                                                                       |
| ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| <a href="Water-Quality-Analysis-Functions#solveQ"><code>solveQ</code></a> | Runs a complete water quality simulation with results at uniform reporting intervals written to the project's binary output file. |
| <a href="Water-Quality-Analysis-Functions#openQ"><code>openQ</code></a>   | Opens a project's water quality solver.                                                                                           |
| <a href="Water-Quality-Analysis-Functions#initQ"><code>initQ</code></a>   | Initializes a network prior to running a water quality analysis.                                                                  |
| <a href="Water-Quality-Analysis-Functions#runQ"><code>runQ</code></a>     | Makes hydraulic and water quality results at the start of the current time period available to a project's water quality solver.  |
| <a href="Water-Quality-Analysis-Functions#nextQ"><code>nextQ</code></a>   | Advances a water quality simulation over the time until the next hydraulic event.                                                 |
| <a href="Water-Quality-Analysis-Functions#stepQ"><code>stepQ</code></a>   | Advances a water quality simulation by a single water quality time step.                                                          |
| <a href="Water-Quality-Analysis-Functions#closeQ"><code>closeQ</code></a> | Closes the water quality solver, freeing all of its allocated memory.                                                             |

## Reporting Functions

These functions are used to report simulation results. [More...](Reporting-Functions)

| Function                                                                       | Description                                                               |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| <a href="Reporting-Functions#writeLine"><code>writeLine</code></a>             | Writes a line of text to a project's report file.                         |
| <a href="Reporting-Functions#report"><code>report</code></a>                   | Writes simulation results in a tabular format to a project's report file. |
| <a href="Reporting-Functions#copyReport"><code>copyReport</code></a>           | Copies the current contents of a project's report file to another file.   |
| <a href="Reporting-Functions#clearReport"><code>clearReport</code></a>         | Clears the contents of a project's report file.                           |
| <a href="Reporting-Functions#resetReport"><code>resetReport</code></a>         | Resets a project's report options to their default values.                |
| <a href="Reporting-Functions#setReport"><code>setReport</code></a>             | Processes a reporting format command.                                     |
| <a href="Reporting-Functions#setStatusReport"><code>setStatusReport</code></a> | Sets the level of hydraulic status reporting.                             |
| <a href="Reporting-Functions#getStatistic"><code>getStatistic</code></a>       | Retrieves a particular simulation statistic.                              |
| <a href="Reporting-Functions#getResultIndex"><code>getResultIndex</code></a>   | Retrieves the order in which a node or link appears in an output file.    |

## Analysis Options Functions

These functions are used to get and set analysis options. [More...](Analysis-Options-Functions)

| Function                                                                                | Description                                                          |
| --------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| <a href="Analysis-Options-Functions#getFlowUnits"><code>getFlowUnits</code></a>         | Retrieves a project's flow units.                                    |
| <a href="Analysis-Options-Functions#getOption"><code>getOption</code></a>               | Retrieves the value of an analysis option.                           |
| <a href="Analysis-Options-Functions#getQualityInfo"><code>getQualityInfo</code></a>     | Gets information about the type of water quality analysis requested. |
| <a href="Analysis-Options-Functions#getQualityType"><code>getQualityType</code></a>     | Retrieves the type of water quality analysis to be run.              |
| <a href="Analysis-Options-Functions#getTimeParameter"><code>getTimeParameter</code></a> | Retrieves the value of a time parameter.                             |
| <a href="Analysis-Options-Functions#setFlowUnits"><code>setFlowUnits</code></a>         | Sets a project's flow units.                                         |
| <a href="Analysis-Options-Functions#setOption"><code>setOption</code></a>               | Sets the value for an anlysis option.                                |
| <a href="Analysis-Options-Functions#setQualityType"><code>setQualityType</code></a>     | Sets the type of water quality analysis to run.                      |
| <a href="Analysis-Options-Functions#setTimeParameter"><code>setTimeParameter</code></a> | Sets the value of a time parameter.                                  |

## Network Node Functions

These functions are used for working with network nodes. [More...](Network-Node-Functions)

| Function                                                                          | Description                                     |
| --------------------------------------------------------------------------------- | ----------------------------------------------- |
| <a href="Network-Node-Functions#addNode"><code>addNode</code></a>                 | Adds a new node to a project.                   |
| <a href="Network-Node-Functions#deleteNode"><code>deleteNode</code></a>           | Deletes a node from a project.                  |
| <a href="Network-Node-Functions#getNodeIndex"><code>getNodeIndex</code></a>       | Gets the index of a node given its ID name.     |
| <a href="Network-Node-Functions#getNodeId"><code>getNodeId</code></a>             | Gets the ID name of a node given its index.     |
| <a href="Network-Node-Functions#setNodeId"><code>setNodeId</code></a>             | Changes the ID name of a node.                  |
| <a href="Network-Node-Functions#getNodeType"><code>getNodeType</code></a>         | Retrieves a node's type given its index.        |
| <a href="Network-Node-Functions#getNodeValue"><code>getNodeValue</code></a>       | Retrieves a property value for a node.          |
| <a href="Network-Node-Functions#setNodeValue"><code>setNodeValue</code></a>       | Sets a property value for a node.               |
| <a href="Network-Node-Functions#setJunctionData"><code>setJunctionData</code></a> | Sets a group of properties for a junction node. |
| <a href="Network-Node-Functions#setTankData"><code>setTankData</code></a>         | Sets a group of properties for a tank node.     |
| <a href="Network-Node-Functions#getCoordinates"><code>getCoordinates</code></a>   | Gets the (x,y) coordinates of a node.           |
| <a href="Network-Node-Functions#setCoordinates"><code>setCoordinates</code></a>   | Sets the (x,y) coordinates of a node.           |

## Nodal Demand Functions

These functions are used for managing nodal demands. [More...](Nodal-Demand-Functions)

| Function                                                                                | Description                                                                          |
| --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| <a href="Nodal-Demand-Functions#addDemand"><code>addDemand</code></a>                   | appends a new demand to a junction node demands list.                                |
| <a href="Nodal-Demand-Functions#deleteDemand"><code>deleteDemand</code></a>             | deletes a demand from a junction node.                                               |
| <a href="Nodal-Demand-Functions#getBaseDemand"><code>getBaseDemand</code></a>           | Gets the base demand for one of a node's demand categories.                          |
| <a href="Nodal-Demand-Functions#getDemandIndex"><code>getDemandIndex</code></a>         | Retrieves the index of a node's named demand category.                               |
| <a href="Nodal-Demand-Functions#getDemandModel"><code>getDemandModel</code></a>         | Retrieves the type of demand model in use and its parameters.                        |
| <a href="Nodal-Demand-Functions#getDemandName"><code>getDemandName</code></a>           | Retrieves the name of a node's demand category.                                      |
| <a href="Nodal-Demand-Functions#getDemandPattern"><code>getDemandPattern</code></a>     | Retrieves the index of a time pattern assigned to one of a node's demand categories. |
| <a href="Nodal-Demand-Functions#getNumberOfDemands"><code>getNumberOfDemands</code></a> | Retrieves the number of demand categories for a junction node.                       |
| <a href="Nodal-Demand-Functions#setBaseDemand"><code>setBaseDemand</code></a>           | Sets the base demand for one of a node's demand categories.                          |
| <a href="Nodal-Demand-Functions#setDemandModel"><code>setDemandModel</code></a>         | Sets the type of demand model to use and its parameters.                             |
| <a href="Nodal-Demand-Functions#setDemandName"><code>setDemandName</code></a>           | Assigns a name to a node's demand category.                                          |
| <a href="Nodal-Demand-Functions#setDemandPattern"><code>setDemandPattern</code></a>     | Sets the index of a time pattern used for one of a node's demand categories.         |

## Network Link Functions

These functions are used for working with network links. [More...](Network-Link-Functions)

| Function                                                                              | Description                                                        |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| <a href="Network-Link-Functions#addLink"><code>addLink</code></a>                     | Adds a new link to a project.                                      |
| <a href="Network-Link-Functions#deleteLink"><code>deleteLink</code></a>               | Deletes a link from the project.                                   |
| <a href="Network-Link-Functions#getLinkIndex"><code>getLinkIndex</code></a>           | Gets the index of a link given its ID name.                        |
| <a href="Network-Link-Functions#getLinkId"><code>getLinkId</code></a>                 | Gets the ID name of a link given its index.                        |
| <a href="Network-Link-Functions#setLinkId"><code>setLinkId</code></a>                 | Changes the ID name of a link.                                     |
| <a href="Network-Link-Functions#getLinkType"><code>getLinkType</code></a>             | Retrieves a link's type.                                           |
| <a href="Network-Link-Functions#setLinkType"><code>setLinkType</code></a>             | Changes a link's type.                                             |
| <a href="Network-Link-Functions#getLinkNodes"><code>getLinkNodes</code></a>           | Gets the indexes of a link's start- and end-nodes.                 |
| <a href="Network-Link-Functions#setLinkNodes"><code>setLinkNodes</code></a>           | Sets the indexes of a link's start- and end-nodes.                 |
| <a href="Network-Link-Functions#getLinkValue"><code>getLinkValue</code></a>           | Retrieves a property value for a link.                             |
| <a href="Network-Link-Functions#setLinkValue"><code>setLinkValue</code></a>           | Sets a property value for a link.                                  |
| <a href="Network-Link-Functions#setPipeData"><code>setPipeData</code></a>             | Sets a group of properties for a pipe link.                        |
| <a href="Network-Link-Functions#getPumpType"><code>getPumpType</code></a>             | Retrieves the type of head curve used by a pump.                   |
| <a href="Network-Link-Functions#getHeadCurveIndex"><code>getHeadCurveIndex</code></a> | Retrieves the curve assigned to a pump's head curve.               |
| <a href="Network-Link-Functions#setHeadCurveIndex"><code>setHeadCurveIndex</code></a> | Assigns a curve to a pump's head curve.                            |
| <a href="Network-Link-Functions#getVertexCount"><code>getVertexCount</code></a>       | Retrieves the number of internal vertex points assigned to a link. |
| <a href="Network-Link-Functions#getVertex"><code>getVertex</code></a>                 | Retrieves the coordinate's of a vertex point assigned to a link.   |
| <a href="Network-Link-Functions#setVertices"><code>setVertices</code></a>             | Assigns a set of internal vertex points to a link.                 |

## Time Pattern Functions

These functions are used for working with time patterns. [More...](Time-Pattern-Functions)

| Function                                                                                        | Description                                                     |
| ----------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| <a href="Time-Pattern-Functions#addPattern"><code>addPattern</code></a>                         | Adds a new time pattern to a project.                           |
| <a href="Time-Pattern-Functions#deletePattern"><code>deletePattern</code></a>                   | Deletes a time pattern from a project.                          |
| <a href="Time-Pattern-Functions#getPatternIndex"><code>getPatternIndex</code></a>               | Retrieves the index of a time pattern given its ID name.        |
| <a href="Time-Pattern-Functions#getPatternId"><code>getPatternId</code></a>                     | Retrieves the ID name of a time pattern given its index.        |
| <a href="Time-Pattern-Functions#setPatternId"><code>setPatternId</code></a>                     | Changes the ID name of a time pattern given its index.          |
| <a href="Time-Pattern-Functions#getPatternLenth"><code>getPatternLenth</code></a>               | Retrieves the number of time periods in a time pattern.         |
| <a href="Time-Pattern-Functions#getPatternValue"><code>getPatternValue</code></a>               | Retrieves a time pattern's factor for a given time period.      |
| <a href="Time-Pattern-Functions#setPatternValue"><code>setPatternValue</code></a>               | Sets a time pattern's factor for a given time period.           |
| <a href="Time-Pattern-Functions#getAveragePatternValue"><code>getAveragePatternValue</code></a> | Retrieves the average of all pattern factors in a time pattern. |
| <a href="Time-Pattern-Functions#setPattern"><code>setPattern</code></a>                         | Sets the pattern factors for a given time pattern.              |

## Data Curve Functions

These functions are used for working with data curves. [More...](Data-Curve-Functions)

| Function                                                                    | Description                                             |
| --------------------------------------------------------------------------- | ------------------------------------------------------- |
| <a href="Data-Curve-Functions#addCurve"><code>addCurve</code></a>           | Adds a new data curve to a project.                     |
| <a href="Data-Curve-Functions#deleteCurve"><code>deleteCurve</code></a>     | Deletes a data curve from a project.                    |
| <a href="Data-Curve-Functions#getCurveIndex"><code>getCurveIndex</code></a> | Retrieves the index of a curve given its ID name.       |
| <a href="Data-Curve-Functions#getCurveId"><code>getCurveId</code></a>       | Retrieves the ID name of a curve given its index.       |
| <a href="Data-Curve-Functions#setCurveId"><code>setCurveId</code></a>       | Changes the ID name of a data curve given its index.    |
| <a href="Data-Curve-Functions#getCurveLenth"><code>getCurveLenth</code></a> | Retrieves the number of points in a curve.              |
| <a href="Data-Curve-Functions#getCurveType"><code>getCurveType</code></a>   | Retrieves a curve's type.                               |
| <a href="Data-Curve-Functions#getCurveValue"><code>getCurveValue</code></a> | Retrieves the value of a single data point for a curve. |
| <a href="Data-Curve-Functions#setCurveValue"><code>setCurveValue</code></a> | Sets the value of a single data point for a curve.      |
| <a href="Data-Curve-Functions#setCurve"><code>setCurve</code></a>           | assigns a set of data points to a curve.                |

## Simple Control Functions

These functions are used for working with simple conditional controls. [More...](Simple-Control-Functions)

| Function                                                                        | Description                                        |
| ------------------------------------------------------------------------------- | -------------------------------------------------- |
| <a href="Simple-Control-Functions#addControl"><code>addControl</code></a>       | Adds a new simple control to a project.            |
| <a href="Simple-Control-Functions#deleteControl"><code>deleteControl</code></a> | Deletes an existing simple control.                |
| <a href="Simple-Control-Functions#getControl"><code>getControl</code></a>       | Retrieves the properties of a simple control.      |
| <a href="Simple-Control-Functions#setControl"><code>setControl</code></a>       | Sets the properties of an existing simple control. |

## Rule-Based Control Functions

These functions are used for working with rule-based controls.[More...](Rule-Based-Control-Functions)

| Function                                                                                  | Description                                                             |
| ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| <a href="Rule-Based-Control-Functions#addRule"><code>addRule</code></a>                   | Adds a new rule-based control to a project.                             |
| <a href="Rule-Based-Control-Functions#deleteRule"><code>deleteRule</code></a>             | Deletes an existing rule-based control.                                 |
| <a href="Rule-Based-Control-Functions#getRule"><code>getRule</code></a>                   | Retrieves summary information about a rule-based control.               |
| <a href="Rule-Based-Control-Functions#getRuleId"><code>getRuleId</code></a>               | Gets the ID name of a rule-based control given its index.               |
| <a href="Rule-Based-Control-Functions#getPremise"><code>getPremise</code></a>             | Gets the properties of a premise in a rule-based control.               |
| <a href="Rule-Based-Control-Functions#setPremise"><code>setPremise</code></a>             | Sets the properties of a premise in a rule-based control.               |
| <a href="Rule-Based-Control-Functions#setPremiseIndex"><code>setPremiseIndex</code></a>   | Sets the index of an object in a premise of a rule-based control.       |
| <a href="Rule-Based-Control-Functions#setPremiseStatus"><code>setPremiseStatus</code></a> | Sets the status being compared to in a premise of a rule-based control. |
| <a href="Rule-Based-Control-Functions#setPremiseValue"><code>setPremiseValue</code></a>   | Sets the value in a premise of a rule-based control.                    |
| <a href="Rule-Based-Control-Functions#getThenAction"><code>getThenAction</code></a>       | Gets the properties of a THEN action in a rule-based control.           |
| <a href="Rule-Based-Control-Functions#setThenAction"><code>setThenAction</code></a>       | Sets the properties of a THEN action in a rule-based control.           |
| <a href="Rule-Based-Control-Functions#getElseAction"><code>getElseAction</code></a>       | Gets the properties of an ELSE action in a rule-based control.          |
| <a href="Rule-Based-Control-Functions#setElseAction"><code>setElseAction</code></a>       | Sets the properties of an ELSE action in a rule-based control.          |
| <a href="Rule-Based-Control-Functions#setRulePriority"><code>setRulePriority</code></a>   | Sets the priority of a rule-based control.                              |
