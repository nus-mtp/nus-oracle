import { populateModuleFixture,
         populateIndustrialAttachmentModuleFixture,
         populateULRModuleFixture,
         populateFocusAreaModuleFixture } from '../../api/test-fixtures/modules';

import { populatePlannerFixture } from '../../api/test-fixtures/planner';
import { populateModuleFulfilmentFixture,
         populateULRModuleFulfilment } from '../../api/test-fixtures/moduleFulfilment';
import { populateAY1617AcademicCohortFixture } from '../../api/test-fixtures/academicCohort';

import { Modules } from '../../api/database-controller/module/module';
import { Students } from '../../api/profile/student/student';
import { ModuleFulfilments } from '../../api/database-controller/module-fulfilment/moduleFulfilment';
import { Planner } from '../../api/student-logic-controller/crud-controller/planner/planner';
import { AcademicCohort } from '../../api/database-controller/academic-cohort/acadCohort';
import { GraduationRequirements } from '../../api/database-controller/graduation-requirement/graduationRequirement';

import { getAcadCohortDefaultPlannerIDs,
         removeAllCohort,
         getRepackagedDefaultPlannerIDs} from '../../api/database-controller/academic-cohort/methods';
import { parseJSONFileAndStoreToDB} from '../../api/database-conversion/moduleJSONParser';
import { parseDefaultPlanner } from '../../api/database-conversion/samplePlannerParser';
import { populateFocusAreaCollection } from '../../api/database-conversion/focusAreaParser';
import { populateAcadCohortCollection } from '../../api/database-conversion/cohortDatabaseParser';
import { populateModuleFulfilmentCollection } from '../../api/database-conversion/moduleFulfilmentParser';

import { scrapeModuleMappingListingForULR1516 } from '../../api/database-conversion/ULRAfter1516Scraper';
import { scrapeModuleMappingListingForBeforeULR1516 } from '../../api/database-conversion/ULRBefore1516Scraper'//;

/**
At the moment, this is where populating of DB is done. Decision to keep it here is so that we can make use of the existing package that helps
to check the DB data integrity and validity.

When you are populating the data to DB, make sure you have the relevant MONGO_URL key and set it before running meteor locally.
Also, when you make push to the remote repository, do remember to comment all method related to populating the DBs so it won't be run when
the web app is redeployed.
*/
Meteor.startup(() => {
  plannerFileToBeParsed = ["DefaultStudyPlanner1314.json","DefaultStudyPlanner1617.json", "DefaultStudyPlanner1516.json"];
  //parseJSONFileAndStoreToDB();
  //populateFocusAreaCollection();
  //populateAcadCohortCollection();
  //populateModuleFulfilmentCollection();
  //scrapeModuleMappingListingForULR1516();
  //for(var t = 0; t< plannerFileToBeParsed.length ; t++){
  //  parseDefaultPlanner(plannerFileToBeParsed[t], true);
  //}
  //scrapeModuleMappingListingForBeforeULR1516();
  //console.log(JSON.stringify(getRepackagedDefaultPlannerIDs("AY 2016/2017")));
  //parseForLezzgo();
  //console.log(getRepackagedDefaultPlannerIDs("AY 2016/2017"));
  if (Modules.find({}).count() === 0) {
    populateModuleFixture();
    populateIndustrialAttachmentModuleFixture();
    populateULRModuleFixture();
    populateFocusAreaModuleFixture();
  }
  if (AcademicCohort.find({}).count() === 0) {
    populateAY1617AcademicCohortFixture();
  }
  if (Planner.find({}).count() === 0) {
    populatePlannerFixture();
  }
  if (ModuleFulfilments.find({}).count() === 0) {
    populateModuleFulfilmentFixture();
    populateULRModuleFulfilment();
  }
});
