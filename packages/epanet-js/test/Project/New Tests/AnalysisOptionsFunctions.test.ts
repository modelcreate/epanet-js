import { Project, Workspace } from '../../../src';
import {
  FlowUnits,
  NodeType,
  Option,
  QualityType,
  TimeParameter,
} from '../../../src/enum';

const ws = new Workspace();
ws.loadModule();

describe('Analysis Options Functions', () => {
  let model: Project;

  beforeEach(() => {
    model = new Project(ws);
    model.init('report.rpt', 'out.bin', 0, 0);
  });

  afterEach(() => {
    model.close();
  });

  describe('Flow Units', () => {
    test('should get and set flow units', () => {
      // Test default flow units
      expect(model.getFlowUnits()).toBe(FlowUnits.CFS);

      // Test setting different flow units
      model.setFlowUnits(FlowUnits.GPM);
      expect(model.getFlowUnits()).toBe(FlowUnits.GPM);

      model.setFlowUnits(FlowUnits.LPS);
      expect(model.getFlowUnits()).toBe(FlowUnits.LPS);
    });
  });

  describe('Options', () => {
    test('should get and set analysis options', () => {
      // Test default values
      expect(model.getOption(Option.Trials)).toBe(200);
      expect(model.getOption(Option.Accuracy)).toBe(0.001);
      expect(model.getOption(Option.Tolerance)).toBe(0.01);

      // Test setting options
      model.setOption(Option.Trials, 100);
      expect(model.getOption(Option.Trials)).toBe(100);

      model.setOption(Option.Accuracy, 0.0001);
      expect(model.getOption(Option.Accuracy)).toBe(0.0001);

      model.setOption(Option.Tolerance, 0.005);
      expect(model.getOption(Option.Tolerance)).toBe(0.005);
    });
  });

  describe('Quality Info and Type', () => {
    test('should get and set quality info and type', () => {
      // Test default quality info
      const defaultQualityInfo = model.getQualityInfo();
      expect(defaultQualityInfo.qualType).toBe(QualityType.None);
      expect(defaultQualityInfo.chemName).toBe('');
      expect(defaultQualityInfo.chemUnits).toBe('');
      expect(defaultQualityInfo.traceNode).toBe(0);

      // Test setting chemical quality
      model.setQualityType(QualityType.Chem, 'Chlorine', 'mg/L', '');
      const chemQualityInfo = model.getQualityInfo();
      expect(chemQualityInfo.qualType).toBe(QualityType.Chem);
      expect(chemQualityInfo.chemName).toBe('Chlorine');
      expect(chemQualityInfo.chemUnits).toBe('mg/L');

      // Test setting age quality
      model.setQualityType(QualityType.Age, '', '', '');
      const ageQualityInfo = model.getQualityInfo();
      expect(ageQualityInfo.qualType).toBe(QualityType.Age);

      // Create junction J-1 for trace quality test
      model.addNode('J-1', NodeType.Junction);

      // Test setting trace quality
      model.setQualityType(QualityType.Trace, '', '', 'J-1');
      const traceQualityInfo = model.getQualityInfo();
      expect(traceQualityInfo.qualType).toBe(QualityType.Trace);
    });
  });

  describe('Time Parameters', () => {
    test('should get and set time parameters', () => {
      // Test default values
      expect(model.getTimeParameter(TimeParameter.Duration)).toBe(0);
      expect(model.getTimeParameter(TimeParameter.HydStep)).toBe(3600); // 1 hour in seconds
      expect(model.getTimeParameter(TimeParameter.QualStep)).toBe(360); // 6 minutes in seconds
      expect(model.getTimeParameter(TimeParameter.ReportStep)).toBe(3600); // 1 hour in seconds

      // Test setting time parameters
      model.setTimeParameter(TimeParameter.Duration, 86400); // 24 hours
      expect(model.getTimeParameter(TimeParameter.Duration)).toBe(86400);

      model.setTimeParameter(TimeParameter.HydStep, 1800); // 30 minutes
      expect(model.getTimeParameter(TimeParameter.HydStep)).toBe(1800);

      model.setTimeParameter(TimeParameter.QualStep, 600); // 10 minutes
      expect(model.getTimeParameter(TimeParameter.QualStep)).toBe(600);

      model.setTimeParameter(TimeParameter.ReportStep, 7200); // 2 hours
      expect(model.getTimeParameter(TimeParameter.ReportStep)).toBe(7200);
    });
  });
});
