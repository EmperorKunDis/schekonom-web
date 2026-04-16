export interface AnalysisDetail {
  id: string;
  sectionId: number;
  sectionTitle: string;
  name: string;
  source: string;
  good: string;
  bad: string;
  description: string;
  methodology: string;
  dataInputs: string[];
  outputMetrics: string[];
  goodScenario: {
    title: string;
    description: string;
    indicators: string[];
    actions: string[];
  };
  badScenario: {
    title: string;
    description: string;
    indicators: string[];
    actions: string[];
  };
  frequency: string;
  automationLevel: string;
  relatedAnalyses: string[];
  businessImpact: string;
  implementationStatus: string;
}

export interface ShortAnalysis {
  id: string;
  sectionId: number;
  sectionTitle: string;
  name: string;
  source: string;
  good: string;
  bad: string;
}
