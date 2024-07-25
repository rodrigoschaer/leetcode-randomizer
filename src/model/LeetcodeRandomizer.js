import clipboardy from 'clipboardy';
import { adaptedDetail } from '../assets/index.js';

export class LeetcodeRandomizer {
  constructor() {
    this._questions = [];
    this._studyPlan = adaptedDetail;
  }

  get questions() {
    return this._questions;
  }

  set questions(progressPlan) {
    const statusByTitle = this.#getQuestionToStatusMap(progressPlan);
    const questions = this.#mergeProgressWithPlan(statusByTitle);

    this._questions = questions;
  }

  get studyPlan() {
    return this._studyPlan;
  }

  get missingQuestions() {
    return this._questions.filter(
      (qst) => qst.status === 'TO_DO' || qst.status === 'PAST_SOLVED',
    );
  }

  randomize(easy, medium, hard) {
    const todo = this.missingQuestions;

    const easyList = todo.filter((qst) => qst.difficulty === 'EASY');
    const mediumList = todo.filter((qst) => qst.difficulty === 'MEDIUM');
    const hardList = todo.filter((qst) => qst.difficulty === 'HARD');

    console.log(`There are ${todo.length} problems left:`);
    console.log(` - Easy: ${easyList.length},`);
    console.log(` - Medium: ${mediumList.length},`);
    console.log(` - Hard: ${hardList.length},`);

    const randomized = [
      ...this.#getRandom(easyList, easy),
      ...this.#getRandom(mediumList, medium),
      ...this.#getRandom(hardList, hard),
    ];

    const urls = randomized.map(
      (qst) => `window.open('${qst.url}', '_blank').focus();\n `,
    );

    console.log('%% PASTE IN THE CONSOLE %%');

    let output = '';
    urls.forEach((url) => {
      output += url;
    });

    clipboardy.writeSync(output);

    return randomized;
  }

  #getQuestionToStatusMap(questions) {
    const statusByTitle = {};

    questions.forEach((question) => {
      const { titleSlug, status } = question;
      statusByTitle[titleSlug] = status;
    });

    return statusByTitle;
  }

  #mergeProgressWithPlan(statusByTitle) {
    return this._studyPlan.map((qst) => {
      const { titleSlug, difficulty, topicTags } = qst;
      const topicTagsSet = new Set(topicTags.map((obj) => obj.slug));

      const status = statusByTitle[qst.titleSlug];
      const url = `https://leetcode.com/problems/${titleSlug}/description/?envType=study-plan-v2&envId=top-interview-150`;
      return {
        titleSlug,
        difficulty,
        status,
        url,
        topicTags: topicTagsSet,
      };
    });
  }

  #getRandom(questions, amount) {
    if (amount > questions.length) {
      console.warn(
        `The number of elements in the array is smaller than ${amount}`,
      );
      return questions;
    }

    const shuffled = questions.slice().sort(() => 0.5 - Math.random());
    return shuffled.slice(0, amount);
  }
}
