import studyPlanDetail from './study-plan-detail.json';
import studyPlanProgress from './study-plan-progress.json';

const adaptedDetail = studyPlanDetail.data.studyPlanV2Detail.planSubGroups
  .map((obj) => [...obj.questions])
  .flat();

const adaptedProgress =
  studyPlanProgress.data.studyPlanV2ProgressDetail.studyPlanDetail.planSubGroups
    .map((obj) => [...obj.questions])
    .flat();

export { adaptedDetail, adaptedProgress };
