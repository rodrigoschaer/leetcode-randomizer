import { studyPlanProgress } from "./assets/index.js";
import { LeetcodeRandomizer } from "./randomizer.js";

let randomizer = new LeetcodeRandomizer();

randomizer.questions =
  studyPlanProgress.data.studyPlanV2ProgressDetail.studyPlanDetail.planSubGroups;

randomizer.randomize({ easy: 6, medium: 14, hard: 0 });
