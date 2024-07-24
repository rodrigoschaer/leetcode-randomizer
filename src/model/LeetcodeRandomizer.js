import { studyPlanDetail } from "./assets/index.js";
import clipboardy from "clipboardy";

export class LeetcodeRandomizer {
  constructor() {
    this._questions = [];
    this.studyPlan = this.#manageData(
      studyPlanDetail.data.studyPlanV2Detail.planSubGroups
    );
  }

  get questions() {
    return this._questions;
  }

  set questions(progressPlan) {
    let progress = this.#manageData(progressPlan);
    let statusByTitle = this.#getQuestionToStatusMap(progress);
    let questions = this.#mergeProgressWithPlan(statusByTitle);

    this._questions = questions;
    return questions;
  }

  #manageData(plan) {
    return plan.map((obj) => [...obj.questions]).flat();
  }

  #getQuestionToStatusMap(questions) {
    let statusByTitle = {};

    for (let question of questions) {
      let { titleSlug, status } = question;
      statusByTitle[titleSlug] = status;
    }

    return statusByTitle;
  }

  #mergeProgressWithPlan(statusByTitle) {
    return this.studyPlan.map((qst) => {
      let { titleSlug, difficulty, topicTags } = qst;
      let topicTagsSet = new Set(
        topicTags.map((obj) => {
          return obj.slug;
        })
      );

      let status = statusByTitle[qst.titleSlug];
      let url = `https://leetcode.com/problems/${titleSlug}/description/?envType=study-plan-v2&envId=top-interview-150`;
      return { titleSlug, difficulty, status, url, topicTags: topicTagsSet };
    });
  }

  #getRandom(questions, amount) {
    if (amount > questions.length) {
      console.warn(
        `The number of elements in the array is smaller than ${amount}`
      );
      return questions;
    }

    const shuffled = questions.slice().sort(() => 0.5 - Math.random());
    return shuffled.slice(0, amount);
  }

  randomize({
    easy: easyQuestionsAmount,
    medium: mediumQuestionsAmount,
    hard: hardQuationsAmount,
  }) {
    const todo = this.#getMissingQuestions();

    const easyList = todo.filter((qst) => qst.difficulty === "EASY");
    const mediumList = todo.filter((qst) => qst.difficulty === "MEDIUM");
    const hardList = todo.filter((qst) => qst.difficulty === "HARD");

    console.log(`There are ${todo.length} problems left:`);
    console.log(` - Easy: ${easyList.length},`);
    console.log(` - Medium: ${mediumList.length},`);
    console.log(` - Hard: ${hardList.length},`);

    const randomized = [
      ...this.#getRandom(easyList, easyQuestionsAmount),
      ...this.#getRandom(mediumList, mediumQuestionsAmount),
      ...this.#getRandom(hardList, hardQuationsAmount),
    ];

    const urls = randomized.map(
      (qst) => `window.open('${qst.url}', '_blank').focus();\n `
    );

    console.log("%% PASTE IN THE CONSOLE %%");

    let output = "";
    urls.forEach((url) => {
      output += url;
    });

    clipboardy.writeSync(output);

    return randomized;
  }

  #getMissingQuestions() {
    return this._questions.filter(
      (qst) => qst.status === "TO_DO" || qst.status === "PAST_SOLVED"
    );
  }

  get missingQuestions() {
    return this.#getMissingQuestions();
  }
}
