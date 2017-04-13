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
import { AcademicCohort } from '../../api/database-controller/AcademicCohort/acadCohort';
import { GraduationRequirements } from '../../api/database-controller/graduation-requirement/graduationRequirement';

import { getAcadCohortDefaultPlannerIDs,
         removeAllCohort,
         getRepackagedDefaultPlannerIDs} from '../../api/database-controller/AcademicCohort/methods';
import { parseJSONFileAndStoreToDB} from '../../api/database-conversion/moduleJSONParser';
import { parseDefaultPlanner } from '../../api/database-conversion/samplePlannerParser';
import { populateFocusAreaCollection } from '../../api/database-conversion/focusAreaParser';
import { populateAcadCohortCollection } from '../../api/database-conversion/cohortDatabaseParser';
import { populateModuleFulfilmentCollection } from '../../api/database-conversion/moduleFulfilmentParser';

import { scrapeModuleMappingListingForULR1516 } from '../../api/database-conversion/ULRAfter1516Scraper';
import { scrapeModuleMappingListingForBeforeULR1516 } from '../../api/database-conversion/ULRBefore1516Scraper'//;

Meteor.startup(() => {
  plannerFileToBeParsed = ["DefaultStudyPlanner1617.json", "DefaultStudyPlanner1516.json"];
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
    //populatePlannerFixture();
  }
  if (ModuleFulfilments.find({}).count() === 0) {
    populateModuleFulfilmentFixture();
    populateULRModuleFulfilment();
  }
});
