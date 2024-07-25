import { adaptedProgress } from './assets/index.js';
import { LeetcodeRandomizer } from './model/LeetcodeRandomizer.js';

function initialize() {
  const lcr = new LeetcodeRandomizer();

  return { randomizer: lcr };
}

const { randomizer } = initialize();
randomizer.questions = adaptedProgress;

const easy = 6;
const medium = 14;
const hard = 0;
randomizer.randomize(easy, medium, hard);
