import { studyPlanProgress } from "./assets/index.js";
import { LeetcodeRandomizer } from "./randomizer.js";

function initialize() {
  let lcr = new LeetcodeRandomizer();

  return { randomizer: lcr };
}

let { randomizer } = initialize();

randomizer.questions =
  studyPlanProgress.data.studyPlanV2ProgressDetail.studyPlanDetail.planSubGroups;

randomizer.randomize({ easy: 6, medium: 14, hard: 0 });
