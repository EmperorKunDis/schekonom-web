import type { AnalysisDetail } from "./types";
import { section01Analyses } from "./section-01";
import { section02Analyses } from "./section-02";
import { section03Analyses } from "./section-03";
import { section04Analyses } from "./section-04";
import { section05Analyses } from "./section-05";
import { section06Analyses } from "./section-06";
import { section07Analyses } from "./section-07";
import { section08Analyses } from "./section-08";
import { section09Analyses } from "./section-09";
import { section10Analyses } from "./section-10";
import { section11Analyses } from "./section-11";
import { section12Analyses } from "./section-12";
import { section13Analyses } from "./section-13";
import { section14Analyses } from "./section-14";
import { section15Analyses } from "./section-15";
import { section16Analyses } from "./section-16";
import { section17Analyses } from "./section-17";
import { section18Analyses } from "./section-18";
import { section19Analyses } from "./section-19";
import { section20Analyses } from "./section-20";
import { section21Analyses } from "./section-21";
import { section22Analyses } from "./section-22";
import { section23Analyses } from "./section-23";

export type { AnalysisDetail, ShortAnalysis } from "./types";

const allDetailed: AnalysisDetail[] = [
  ...section01Analyses,
  ...section02Analyses,
  ...section03Analyses,
  ...section04Analyses,
  ...section05Analyses,
  ...section06Analyses,
  ...section07Analyses,
  ...section08Analyses,
  ...section09Analyses,
  ...section10Analyses,
  ...section11Analyses,
  ...section12Analyses,
  ...section13Analyses,
  ...section14Analyses,
  ...section15Analyses,
  ...section16Analyses,
  ...section17Analyses,
  ...section18Analyses,
  ...section19Analyses,
  ...section20Analyses,
  ...section21Analyses,
  ...section22Analyses,
  ...section23Analyses,
];

// All analyses are now fully detailed in their respective section files.
// The previous `shortAnalyses` array contained duplicates that have been removed.
const allAnalyses: AnalysisDetail[] = [...allDetailed];

export function getAnalysisById(id: string): AnalysisDetail | undefined {
  return allAnalyses.find((a) => a.id === id);
}

export function getAllAnalyses(): AnalysisDetail[] {
  return allAnalyses;
}

export function getAnalysesBySection(sectionId: number): AnalysisDetail[] {
  return allAnalyses.filter((a) => a.sectionId === sectionId);
}
