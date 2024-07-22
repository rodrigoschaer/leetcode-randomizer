import { studyPlanDetail, studyPlanProgress } from "./src/assets/index.js";
import clipboardy from "clipboardy";

function retrieveQuestions(studyPlan) {
  let managedData = studyPlan
    .map((obj) => {
      return [...obj.questions];
    })
    .flat();

  return managedData;
}

function mergeQuestionsWithStatus(questions, statusBySlug) {
  let statusByTitle = {};
  statusBySlug.forEach((qst) => {
    let { titleSlug, status } = qst;
    statusByTitle[titleSlug] = status;
  });

  let res = questions.map((qst) => {
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

  return res;
}

function getRandom(arr, n) {
  if (n > arr.length) {
    console.warn(`The number of elements in the array is smaller than ${n}`);
    return arr;
  }

  const shuffled = arr.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

function randomizer(questionsList) {
  const MEDIUM_QUESTIONS = 7;
  const EASY_QUESTIONS = 3;
  const HARD_QUESTIONS = 0;

  let todo = questionsList.filter(
    (qst) => qst.status === "TO_DO" || qst.status === "PAST_SOLVED"
  );
  let easyList = todo.filter((qst) => qst.difficulty === "EASY");
  let mediumList = todo.filter((qst) => qst.difficulty === "MEDIUM");
  let hardList = todo.filter((qst) => qst.difficulty === "HARD");

  console.log(`There are ${todo.length} problems left:`);
  console.log(` - Easy: ${easyList.length},`);
  console.log(` - Medium: ${mediumList.length},`);
  console.log(` - Hard: ${hardList.length},`);

  let randomized = [
    ...getRandom(easyList, EASY_QUESTIONS),
    ...getRandom(mediumList, MEDIUM_QUESTIONS),
    ...getRandom(hardList, HARD_QUESTIONS),
  ];

  let urls = randomized.map(
    (qst) => `window.open('${qst.url}', '_blank').focus();\n `
  );

  console.log("%% PASTE IN THE CONSOLE %%");

  let output = "";
  urls.forEach((url) => {
    output += url;
  });
  clipboardy.writeSync(output);

  console.log("%% WINDOWS ADDED TO CLIPBOARD %%");

  return randomized;
}

let questions = retrieveQuestions(
  studyPlanDetail.data.studyPlanV2Detail.planSubGroups
);

let statusBySlug = retrieveQuestions(
  studyPlanProgress.data.studyPlanV2ProgressDetail.studyPlanDetail.planSubGroups
);

let merged = mergeQuestionsWithStatus(questions, statusBySlug);
console.log("There are " + merged.length + " questions in the study plan");

randomizer(merged);
