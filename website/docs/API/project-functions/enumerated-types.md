### Enumerated Types

| Enumerations                            | Description                                       |
| --------------------------------------- | ------------------------------------------------- |
| [ActionCodeType](#ActionCodeType)       | Deletion action codes.                            |
| [AnalysisStatistic](#AnalysisStatistic) | Analysis convergence statistics.                  |
| [ControlType](#ControlType)             | Simple control types.                             |
| [CountType](#CountType)                 | Types of objects to count.                        |
| [CurveType](#CurveType)                 | Types of data curves.                             |
| [DemandModel](#DemandModel)             | Demand models.                                    |
| [FlowUnits](#FlowUnits)                 | Flow units.                                       |
| [HeadLossType](#HeadLossType)           | Head loss formulas.                               |
| [InitHydOption](#InitHydOption)         | Hydraulic initialization options.                 |
| [LinkProperty](#LinkProperty)           | Link properties.                                  |
| [LinkStatusType](#LinkStatusType)       | Link status.                                      |
| [LinkType](#LinkType)                   | Link types.                                       |
| [MixingModel](#MixingModel)             | Tank mixing models.                               |
| [NodeProperty](#NodeProperty)           | Node properties.                                  |
| [NodeType](#NodeType)                   | Node Types.                                       |
| [ObjectType](#ObjectType)               | Types of network objects.                         |
| [Option](#Option)                       | Simulation options.                               |
| [PumpStateType](#PumpStateType)         | Pump states.                                      |
| [PumpType](#PumpType)                   | Types of pump curves.                             |
| [QualityType](#QualityType)             | Types of water quality analyses.                  |
| [RuleObject](#RuleObject)               | Network objects used in rule-based controls.      |
| [RuleOperator](#RuleOperator)           | Comparison operators used in rule-based controls. |
| [RuleStatus](#RuleStatus)               | Link status codes used in rule-based controls.    |
| [RuleVariable](#RuleVariable)           | Object variables used in rule-based controls.     |
| [SizeLimits](#SizeLimits)               | Size Limts.                                       |
| [SourceType](#SourceType)               | Water quality source types.                       |
| [StatisticType](#StatisticType)         | Reporting statistic choices.                      |
| [StatusReport](#StatusReport)           | Status reporting levels.                          |
| [TimeParameter](#TimeParameter)         | Time parameters.                                  |

## ActionCodeType

Deletion action codes.

These codes are used in <a href="Network-Node-Functions#deleteNode"><code>deleteNode</code></a> and <a href="Network-Link-Functions#deleteLink"><code>deleteLink</code></a> to indicate what action should be taken if the node or link being deleted appears in any simple or rule-based controls or if a deleted node has any links connected to it.

#### Enumeration Members

| Member        | Value          | Description                                                               |
| ------------- | -------------- | ------------------------------------------------------------------------- |
| Unconditional | <code>0</code> | Delete all controls and connecing links.                                  |
| Conditional   | <code>1</code> | Cancel object deletion if it appears in controls or has connecting links. |

## AnalysisStatistic

Analysis convergence statistics.

These statistics report the convergence criteria for the most current hydraulic analysis and the cumulative water quality mass balance error at the current simulation time. They can be retrieved with <a href="Reporting-Functions#getStatistic"><code>getStatistic</code></a>.

#### Enumeration Members

| Member          | Value          | Description                                    |
| --------------- | -------------- | ---------------------------------------------- |
| DeficientNodes  | <code>5</code> | Number of pressure deficient nodes.            |
| DemandReduction | <code>6</code> | % demand reduction at pressure deficient nodes |
| Iterations      | <code>0</code> | Number of hydraulic iterations taken.          |
| MassBalance     | <code>4</code> | Cumulative water quality mass balance ratio.   |
| MaxFlowChange   | <code>3</code> | Largest flow change in links.                  |
| MaxHeadError    | <code>2</code> | Largest head loss error for links.             |
| RelativeError   | <code>1</code> | Sum of link flow changes / sum of link flows.  |

## ControlType

Simple control types.

These are the different types of simple (single statement) controls that can be applied to network links. They are used as an argument to <a href="Simple-Control-Functions#addControl"><code>addControl</code></a>, <a href="Simple-Control-Functions#getControl"><code>getControl</code></a>, and <a href="Simple-Control-Functions#setControl"><code>setControl</code></a>.

#### Enumeration Members

| Member    | Value          | Description                                             |
| --------- | -------------- | ------------------------------------------------------- |
| HiLevel   | <code>1</code> | Act when pressure or tank level rises above a setpoint. |
| LowLevel  | <code>0</code> | Act when pressure or tank level drops below a setpoint. |
| TimeOfDay | <code>3</code> | Act at a particular time of day.                        |
| Timer     | <code>2</code> | Act at a prescribed elapsed amount of time.             |

## CountType

Types of objects to count.

These options tell <a href="Project-Functions#getCount"><code>getCount</code></a> which type of object to count.

#### Enumeration Members

| Member       | Value          | Description                                      |
| ------------ | -------------- | ------------------------------------------------ |
| ControlCount | <code>5</code> | Number of simple controls.                       |
| CurveCount   | <code>4</code> | Number of data curves.                           |
| LinkCount    | <code>2</code> | Number of links (pipes + pumps + valves)         |
| NodeCount    | <code>0</code> | Number of nodes (junctions + tanks + reservoirs) |
| PatCount     | <code>3</code> | Number of time patterns.                         |
| RuleCount    | <code>6</code> | Number of rule-based controls.                   |
| TankCount    | <code>1</code> | Number of tanks and reservoirs.                  |

## CurveType

Types of data curves.

These are the different types of physical relationships that a data curve can represent as returned by calling <a href="Data-Curve-Functions#getCurveType"><code>getCurveType</code></a>.

#### Enumeration Members

| Member       | Value          | Description                    |
| ------------ | -------------- | ------------------------------ |
| EfficCurve   | <code>2</code> | Pump efficiency v. flow curve. |
| GenericCurve | <code>4</code> | Generic curve.                 |
| HlossCurve   | <code>3</code> | Valve head loss v. flow curve. |
| PumpCurve    | <code>1</code> | Pump head v. flow curve.       |
| VolumeCurve  | <code>0</code> | Tank volume v. depth curve.    |

## DemandModel

Demand models.

These choices for modeling consumer demands are used with <a href="Nodal-Demand-Functions#getDemandModel"><code>getDemandModel</code></a> and <a href="Nodal-Demand-Functions#setDemandModel"><code>setDemandModel</code></a>.

A demand driven analysis requires that a junction's full demand be supplied in each time period independent of how much pressure is available. A pressure driven analysis makes demand be a power function of pressure, up to the point where the full demand is met.

#### Enumeration Members

| Member | Value          | Description               |
| ------ | -------------- | ------------------------- |
| DDA    | <code>0</code> | Demand driven analysis.   |
| PDA    | <code>1</code> | Pressure driven analysis. |

## FlowUnits

Flow units.

These choices for flow units are used with <a href="Analysis-Options-Functions#getFlowUnits"><code>getFlowUnits</code></a> and <a href="Analysis-Options-Functions#setFlowUnits"><code>setFlowUnits</code></a>. They are also used for the flow units type argument in <a href="Project-Functions#init"><code>init</code></a>. If flow units are expressed in US Customary units ( `CFS`, `GPM`, `MGD`, `IMGD`, `AFD` ) then all other quantities are in US Customary units. Otherwise they are in metric units.

#### Enumeration Members

| Member | Value          | Description                       |
| ------ | -------------- | --------------------------------- |
| AFD    | <code>4</code> | Acre-feet per day.                |
| CFS    | <code>0</code> | Cubic feet per second.            |
| CMD    | <code>9</code> | Cubic meters per day.             |
| CMH    | <code>8</code> | Cubic meters per hour.            |
| GPM    | <code>1</code> | Gallons per minute.               |
| IMGD   | <code>3</code> | Imperial million gallons per day. |
| LPM    | <code>6</code> | Liters per minute.                |
| LPS    | <code>5</code> | Liters per second.                |
| MGD    | <code>2</code> | Million gallons per day.          |
| MLD    | <code>7</code> | Million liters per day.           |

## HeadLossType

Head loss formulas.

The available choices for <a href="#LinkProperty"><code>Option.HeadlossForm</code></a> in <a href="Analysis-Options-Functions#getOption"><code>getOption</code></a> and <a href="Analysis-Options-Functions#setOption"><code>setOption</code></a>. They are also used for the head loss type argument in <a href="Project-Functions#init"><code>init</code></a>. Each head loss formula uses a different type of roughness coefficient ( <a href="#LinkProperty"><code>LinkProperty.Roughness</code></a> ) that can be set with <a href="Network-Link-Functions#setLinkValue"><code>setLinkValue</code></a>.

#### Enumeration Members

| Member | Value          | Description     |
| ------ | -------------- | --------------- |
| CM     | <code>2</code> | Chezy-Manning.  |
| DW     | <code>1</code> | Darcy-Weisbach. |
| HW     | <code>0</code> | Hazen-Williams. |

## InitHydOption

Hydraulic initialization options.

These options are used to initialize a new hydraulic analysis when <a href="Hydraulic-Analysis-Functions#initH"><code>initH</code></a> is called.

#### Enumeration Members

| Member      | Value           | Description                                         |
| ----------- | --------------- | --------------------------------------------------- |
| InitFlow    | <code>10</code> | Don't save hydraulics; re-initialize flows.         |
| NoSave      | <code>0</code>  | Don't save hydraulics; don't re-initialize flows.   |
| Save        | <code>1</code>  | Save hydraulics to file, don't re-initialize flows. |
| SaveAndInit | <code>11</code> | Save hydraulics; re-initialize flows.               |

## LinkProperty

Link properties.

These link properties are used with <a href="Network-Link-Functions#getLinkValue"><code>getLinkValue</code></a> and <a href="Network-Link-Functions#setLinkValue"><code>setLinkValue</code></a>. Those marked as read only are computed values that can only be retrieved.

#### Enumeration Members

| Member      | Value           | Description                                                                                           |
| ----------- | --------------- | ----------------------------------------------------------------------------------------------------- |
| Diameter    | <code>0</code>  | Pipe/valve diameter.                                                                                  |
| Energy      | <code>13</code> | Current computed pump energy usage (read only)                                                        |
| Flow        | <code>8</code>  | Current computed flow rate (read only)                                                                |
| Headloss    | <code>10</code> | Current computed head loss (read only)                                                                |
| InitSetting | <code>5</code>  | Initial pump speed or valve setting.                                                                  |
| InitStatus  | <code>4</code>  | Initial status (see <a href="#LinkStatusType"><code>LinkStatusType</code></a>)                        |
| KBulk       | <code>6</code>  | Bulk chemical reaction coefficient.                                                                   |
| KWall       | <code>7</code>  | Pipe wall chemical reaction coefficient.                                                              |
| Length      | <code>1</code>  | Pipe length.                                                                                          |
| LinkPattern | <code>15</code> | Pump speed time pattern index.                                                                        |
| LinkQual    | <code>14</code> | Current computed link quality (read only)                                                             |
| MinorLoss   | <code>3</code>  | Pipe/valve minor loss coefficient.                                                                    |
| PumpECost   | <code>21</code> | Pump average energy price.                                                                            |
| PumpECurve  | <code>20</code> | Pump efficiency v. flow curve index.                                                                  |
| PumpEffic   | <code>17</code> | Current computed pump efficiency (read only)                                                          |
| PumpEPat    | <code>22</code> | Pump energy price time pattern index.                                                                 |
| PumpHCurve  | <code>19</code> | Pump head v. flow curve index.                                                                        |
| PumpPower   | <code>18</code> | Pump constant power rating.                                                                           |
| PumpState   | <code>16</code> | Current computed pump state (read only) (see <a href="#PumpStateType"><code>PumpStateType</code></a>) |
| Roughness   | <code>2</code>  | Pipe roughness coefficient.                                                                           |
| Setting     | <code>12</code> | Current link setting.                                                                                 |
| Status      | <code>11</code> | Current link status (see <a href="#LinkStatusType"><code>LinkStatusType</code></a>)                   |
| Velocity    | <code>9</code>  | Current computed flow velocity (read only)                                                            |

## LinkStatusType

Link status.

One of these values is returned when <a href="Network-Link-Functions#getLinkValue"><code>getLinkValue</code></a> is used to retrieve a link's initial status (<a href="#LinkProperty"><code>LinkProperty.InitStatus</code></a> ) or its current status ( <a href="#LinkProperty"><code>LinkProperty.Status</code></a> ). These options are also used with <a href="Network-Link-Functions#setLinkValue"><code>setLinkValue</code></a> to set values for these same properties.

#### Enumeration Members

| Member | Value          | Description |
| ------ | -------------- | ----------- |
| Closed | <code>0</code> |             |
| Open   | <code>1</code> |             |

## LinkType

Link types.

These are the different types of links that can be returned by calling <a href="Network-Link-Functions#getLinkType"><code>getLinkType</code></a>.

#### Enumeration Members

| Member | Value          | Description                |
| ------ | -------------- | -------------------------- |
| CVPipe | <code>0</code> | Pipe with check valve.     |
| FCV    | <code>6</code> | Flow control valve.        |
| GPV    | <code>8</code> | General purpose valve.     |
| PBV    | <code>5</code> | Pressure breaker valve.    |
| Pipe   | <code>1</code> | Pipe.                      |
| PRV    | <code>3</code> | Pressure reducing valve.   |
| PSV    | <code>4</code> | Pressure sustaining valve. |
| Pump   | <code>2</code> | Pump.                      |
| TCV    | <code>7</code> | Throttle control valve.    |

## MixingModel

Tank mixing models.

These are the different types of models that describe water quality mixing in storage tanks. The choice of model is accessed with <a href="#MixModel"><code>NodeProperty.MixModel</code></a> property of a Tank node using <a href="Network-Node-Functions#getNodeValue"><code>getNodeValue</code></a> and <a href="Network-Node-Functions#setNodeValue"><code>setNodeValue</code></a>.

#### Enumeration Members

| Member | Value          | Description                |
| ------ | -------------- | -------------------------- |
| FIFO   | <code>2</code> | First in, first out model. |
| LIFO   | <code>3</code> | Last in, first out model.  |
| Mix1   | <code>0</code> | Complete mix model.        |
| Mix2   | <code>1</code> | 2-compartment model        |

## NodeProperty

Node properties.

These node properties are used with <a href="Network-Node-Functions#getNodeValue"><code>getNodeValue</code></a> and <a href="Network-Node-Functions#setNodeValue"><code>setNodeValue</code></a>. Those marked as read only are computed values that can only be retrieved.

#### Enumeration Members

| Member        | Value           | Description                                                                 |
| ------------- | --------------- | --------------------------------------------------------------------------- |
| BaseDemand    | <code>1</code>  | Primary demand baseline value.                                              |
| CanOverFlow   | <code>26</code> | Tank can overflow (= 1) or not (= 0)                                        |
| Demand        | <code>9</code>  | Current computed demand (read only)                                         |
| DemandDeficit | <code>27</code> | Amount that full demand is reduced under PDA (read only)                    |
| Elevation     | <code>0</code>  | Elevation.                                                                  |
| Emitter       | <code>3</code>  | Emitter flow coefficient.                                                   |
| Head          | <code>10</code> | Current computed hydraulic head (read only)                                 |
| Initqual      | <code>4</code>  | Initial quality.                                                            |
| InitVolume    | <code>14</code> | Tank initial volume (read only)                                             |
| MaxLevel      | <code>21</code> | Tank maximum level.                                                         |
| MaxVolume     | <code>25</code> | Tank maximum volume (read only)                                             |
| MinLevel      | <code>20</code> | Tank minimum level.                                                         |
| MinVolume     | <code>18</code> | Tank minimum volume.                                                        |
| MixFraction   | <code>22</code> | Tank mixing fraction.                                                       |
| MixModel      | <code>15</code> | Tank mixing model (see <a href="#MixingModel"><code>MixingModel</code></a>) |
| MixZoneVol    | <code>16</code> | Tank mixing zone volume (read only)                                         |
| Pattern       | <code>2</code>  | Primary demand time pattern index.                                          |
| Pressure      | <code>11</code> | Current computed pressure (read only)                                       |
| Quality       | <code>12</code> | Current computed quality (read only)                                        |
| SourceMass    | <code>13</code> | Current computed quality source mass inflow (read only)                     |
| SourcePat     | <code>6</code>  | Quality source pattern index.                                               |
| SourceQual    | <code>5</code>  | Quality source strength.                                                    |
| SourceType    | <code>7</code>  | Quality source type (see <a href="#SourceType"><code>SourceType</code></a>) |
| TankDiam      | <code>17</code> | Tank diameter.                                                              |
| TankKBulk     | <code>23</code> | Tank bulk decay coefficient.                                                |
| TankLevel     | <code>8</code>  | Current computed tank water level (read only)                               |
| TankVolume    | <code>24</code> | Current computed tank volume (read only)                                    |
| VolCurve      | <code>19</code> | Tank volume curve index.                                                    |

## NodeType

Node Types.

These are the different types of nodes that can be returned by calling <a href="Network-Node-Functions#getNodeType"><code>getNodeType</code></a>.

#### Enumeration Members

| Member    | Value          | Description        |
| --------- | -------------- | ------------------ |
| Junction  | <code>0</code> | Junction node.     |
| Reservoir | <code>1</code> | Reservoir node.    |
| Tank      | <code>2</code> | Storage tank node. |

## ObjectType

Types of network objects.

The types of objects that comprise a network model.

#### Enumeration Members

| Member  | Value          | Description      |
| ------- | -------------- | ---------------- |
| Control | <code>4</code> | Simple controls. |
| Curve   | <code>3</code> | Data curves.     |
| Link    | <code>1</code> | Links.           |
| Node    | <code>0</code> | Nodes.           |
| Rule    | <code>5</code> | Control rules.   |
| TimePat | <code>2</code> | Time patterns.   |

## Option

Simulation options.

These constants identify the hydraulic and water quality simulation options that are applied on a network-wide basis. They are accessed using the <a href="Analysis-Options-Functions#getOption"><code>getOption</code></a> and <a href="Analysis-Options-Functions#setOption"><code>setOption</code></a> functions.

#### Enumeration Members

| Member        | Value           | Description                                                                   |
| ------------- | --------------- | ----------------------------------------------------------------------------- |
| Accuracy      | <code>1</code>  | Total normalized flow change for hydraulic convergence.                       |
| BulkOrder     | <code>19</code> | Bulk water reaction order for pipes.                                          |
| CheckFreq     | <code>15</code> | Frequency of hydraulic status checks.                                         |
| ConcenLimit   | <code>22</code> | Limiting concentration for growth reactions.                                  |
| DampLimit     | <code>17</code> | Accuracy level where solution damping begins.                                 |
| DemandCharge  | <code>11</code> | Energy charge per max. KW usage.                                              |
| DemandMult    | <code>4</code>  | Global demand multiplier.                                                     |
| Emitexpon     | <code>3</code>  | Exponent in emitter discharge formula.                                        |
| FlowChange    | <code>6</code>  | Maximum flow change for hydraulic convergence.                                |
| GlobalEffic   | <code>8</code>  | Global pump efficiency (percent)                                              |
| GlobalPattern | <code>10</code> | Index of a global energy price pattern.                                       |
| GlobalPrice   | <code>9</code>  | Global energy price per KWH.                                                  |
| HeadError     | <code>5</code>  | Maximum head loss error for hydraulic convergence.                            |
| HeadlossForm  | <code>7</code>  | Head loss formula (see <a href="#HeadLossType"><code>HeadLossType</code></a>) |
| MaxCheck      | <code>16</code> | Maximum trials for status checking.                                           |
| SpDiffus      | <code>18</code> | Specific diffusivity (relative to chlorine at 20 deg C)                       |
| SpGravity     | <code>12</code> | Specific gravity.                                                             |
| SpViscos      | <code>13</code> | Specific viscosity (relative to water at 20 deg C)                            |
| TankOrder     | <code>21</code> | Bulk water reaction order for tanks.                                          |
| Tolerance     | <code>2</code>  | Water quality tolerance.                                                      |
| Trials        | <code>0</code>  | Maximum trials allowed for hydraulic convergence.                             |
| Unbalanced    | <code>14</code> | Extra trials allowed if hydraulics don't converge.                            |
| WallOrder     | <code>20</code> | Wall reaction order for pipes (either 0 or 1)                                 |

## PumpStateType

Pump states.

One of these codes is returned when <a href="Network-Link-Functions#getLinkValue"><code>getLinkValue</code></a> is used to retrieve a pump's current operating state ( <a href="#LinkProperty"><code>LinkProperty.PumpState</code></a> ). `PumpXHead` indicates that the pump has been shut down because it is being asked to deliver more than its shutoff head. `PumpXFlow` indicates that the pump is being asked to deliver more than its maximum flow.

#### Enumeration Members

| Member     | Value          | Description                       |
| ---------- | -------------- | --------------------------------- |
| PumpClosed | <code>2</code> | Pump closed.                      |
| PumpOpen   | <code>3</code> | Pump open.                        |
| PumpXFlow  | <code>5</code> | Pump open - cannot supply flow.   |
| PumpXHead  | <code>0</code> | Pump closed - cannot supply head. |

## PumpType

Types of pump curves.

<a href="Network-Link-Functions#getPumpType"><code>getPumpType</code></a> returns one of these values when it is called.

#### Enumeration Members

| Member    | Value          | Description                |
| --------- | -------------- | -------------------------- |
| ConstHP   | <code>0</code> | Constant horsepower.       |
| Custom    | <code>2</code> | User-defined custom curve. |
| NoCurve   | <code>3</code> | No curve.                  |
| PowerFunc | <code>1</code> | Power function.            |

## QualityType

Types of water quality analyses.

These are the different types of water quality analyses that EPANET can run. They are used with <a href="Analysis-Options-Functions#getQualityInfo"><code>getQualityInfo</code></a>, <a href="Analysis-Options-Functions#getQualityType"><code>getQualityType</code></a>, and <a href="Analysis-Options-Functions#setQualityType"><code>setQualityType</code></a>.

#### Enumeration Members

| Member | Value          | Description                  |
| ------ | -------------- | ---------------------------- |
| Age    | <code>2</code> | Water age analysis.          |
| Chem   | <code>1</code> | Chemical fate and transport. |
| None   | <code>0</code> | No quality analysis.         |
| Trace  | <code>3</code> | Source tracing analysis.     |

## RuleObject

Network objects used in rule-based controls.

#### Enumeration Members

| Member | Value          | Description                                      |
| ------ | -------------- | ------------------------------------------------ |
| Link   | <code>7</code> | Clause refers to a link.                         |
| Node   | <code>6</code> | Clause refers to a node.                         |
| System | <code>8</code> | Clause refers to a system parameter (e.g., time) |

## RuleOperator

Comparison operators used in rule-based controls.

#### Enumeration Members

| Member           | Value          | Description               |
| ---------------- | -------------- | ------------------------- |
| Above            | <code>9</code> | Is above.                 |
| Below            | <code>8</code> | Is below.                 |
| EqualTo          | <code>0</code> | Equal to.                 |
| GreaterOrEqualTo | <code>3</code> | Greater than or equal to. |
| GreaterThan      | <code>5</code> | Greater than.             |
| Is               | <code>6</code> | Is equal to.              |
| LessOrEqualTo    | <code>2</code> | Less than or equal to.    |
| LessThan         | <code>4</code> | Less than.                |
| Not              | <code>7</code> | Is not equal to.          |
| NotEqualTo       | <code>1</code> | Not equal.                |

## RuleStatus

Link status codes used in rule-based controls.

#### Enumeration Members

| Member   | Value          | Description              |
| -------- | -------------- | ------------------------ |
| IsActive | <code>3</code> | Control valve is active. |
| IsClosed | <code>2</code> | Link is closed.          |
| IsOpen   | <code>1</code> | Link is open.            |

## RuleVariable

Object variables used in rule-based controls.

#### Enumeration Members

| Member    | Value           | Description              |
| --------- | --------------- | ------------------------ |
| ClockTime | <code>10</code> | Time of day.             |
| Demand    | <code>0</code>  | Nodal demand.            |
| DrainTime | <code>12</code> | Time to drain a tank.    |
| FillTime  | <code>11</code> | Time to fill a tank.     |
| Flow      | <code>5</code>  | Link flow rate.          |
| Grade     | <code>2</code>  | Nodal hydraulic grade.   |
| Head      | <code>1</code>  | Nodal hydraulic head.    |
| Level     | <code>3</code>  | Tank water level.        |
| Power     | <code>8</code>  | Pump power output.       |
| Pressure  | <code>4</code>  | Nodal pressure.          |
| Setting   | <code>7</code>  | Link setting.            |
| Status    | <code>6</code>  | Link status.             |
| Time      | <code>9</code>  | Elapsed simulation time. |

## SizeLimits

Size Limts.

Limits on the size of character arrays used to store ID names and text messages.

#### Enumeration Members

| Member | Value            | Description                        |
| ------ | ---------------- | ---------------------------------- |
| MaxId  | <code>31</code>  | Max. # characters in ID name.      |
| MaxMsg | <code>255</code> | Max. # characters in message text. |

## SourceType

Water quality source types.

These are the different types of external water quality sources that can be assigned to a node's property ( see <a href="#NodeProperty"><code>NodeProperty.SourceType</code></a> ) and as used by <a href="Network-Node-Functions#getNodeValue"><code>getNodeValue</code></a> and <a href="Network-Node-Functions#setNodeValue"><code>setNodeValue</code></a>.

#### Enumeration Members

| Member    | Value          | Description                                                |
| --------- | -------------- | ---------------------------------------------------------- |
| Concen    | <code>0</code> | Sets the concentration of external inflow entering a node. |
| FlowPaced | <code>3</code> | Adds a given value to the concentration leaving a node.    |
| Mass      | <code>1</code> | Injects a given mass/minute into a node.                   |
| SetPoint  | <code>2</code> | Sets the concentration leaving a node to a given value.    |

## StatisticType

Reporting statistic choices.

These options determine what kind of statistical post-processing should be done on the time series of simulation results generated before they are reported using <a href="Reporting-Functions#report"><code>report</code></a>. An option can be chosen by using `Statistic` option as the argument to <a href="Reporting-Functions#setReport"><code>setReport</code></a>.

#### Enumeration Members

| Member  | Value          | Description                                      |
| ------- | -------------- | ------------------------------------------------ |
| Average | <code>1</code> | Report average value over simulation period.     |
| Maximum | <code>3</code> | Report maximum value over simulation period.     |
| Minimum | <code>2</code> | Report minimum value over simulation period.     |
| Range   | <code>4</code> | Report maximum - minimum over simulation period. |
| Series  | <code>0</code> | Report all time series points.                   |

## StatusReport

Status reporting levels.

These choices specify the level of status reporting written to a project's report file during a hydraulic analysis. The level is set using the <a href="Reporting-Functions#setStatusReport"><code>setStatusReport</code></a> function.

#### Enumeration Members

| Member       | Value          | Description                       |
| ------------ | -------------- | --------------------------------- |
| FullReport   | <code>2</code> | Full level of status reporting.   |
| NoReport     | <code>0</code> | No status reporting.              |
| NormalReport | <code>1</code> | Normal level of status reporting. |

## TimeParameter

Time parameters.

These time-related options are used with <a href="Analysis-Options-Functions#getTimeParameter"><code>getTimeParameter</code></a> and <a href="Analysis-Options-Functions#setTimeParameter"><code>setTimeParameter</code></a>. All times are expressed in seconds The parameters marked as read only are computed values that can only be retrieved.

#### Enumeration Members

| Member        | Value           | Description                                                                            |
| ------------- | --------------- | -------------------------------------------------------------------------------------- |
| Duration      | <code>0</code>  | Total simulation duration.                                                             |
| HaltFlag      | <code>13</code> | Flag indicating if the simulation was halted (read only)                               |
| HTime         | <code>11</code> | Elapsed time of current hydraulic solution (read only)                                 |
| HydStep       | <code>1</code>  | Hydraulic time step.                                                                   |
| NextEvent     | <code>14</code> | Shortest time until a tank becomes empty or full (read only)                           |
| NextEventTank | <code>15</code> | Index of tank with shortest time to become empty or full (read only)                   |
| PatternStart  | <code>4</code>  | Time when time patterns begin.                                                         |
| PatternStep   | <code>3</code>  | Time pattern period.                                                                   |
| Periods       | <code>9</code>  | Number of reporting time periods (read only)                                           |
| QTime         | <code>12</code> | Elapsed time of current quality solution (read only)                                   |
| QualStep      | <code>2</code>  | Water quality time step.                                                               |
| ReportStart   | <code>6</code>  | Time when reporting starts.                                                            |
| ReportStep    | <code>5</code>  | Reporting time step.                                                                   |
| RuleStep      | <code>7</code>  | Rule-based control evaluation time step.                                               |
| StartTime     | <code>10</code> | Simulation starting time of day.                                                       |
| Statistic     | <code>8</code>  | Reporting statistic code (see <a href="#StatisticType"><code>StatisticType</code></a>) |
