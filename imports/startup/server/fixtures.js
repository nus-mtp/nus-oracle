import { populateModuleFixture,
         populateIndustrialAttachmentModuleFixture,
         populateULRModuleFixture,
         populateFocusAreaModuleFixture } from '../../api/test-fixtures/modules';

import { populatePlannerFixture } from '../../api/test-fixtures/planner';
import { populateModuleFulfilmentFixture,
         populateULRModuleFulfilment } from '../../api/test-fixtures/moduleFulfilment';
import { populateAY1617AcademicCohortFixture } from '../../api/test-fixtures/academicCohort';

import { Modules } from '../../api/database-controller/module/module';
import { Students } from '../../api/database-controller/student/student';
import { ModuleFulfilments } from '../../api/database-controller/module-fulfilment/moduleFulfilment';
import { Planner } from '../../api/crud-controller/planner/planner';
import { AcademicCohort } from '../../api/database-controller/AcademicCohort/acadCohort';

import { moduleInformationParser,
         moduleListParser } from '../../api/database-conversion/moduleInformationParser';
import { parseJSONFileAndStoreToDB} from '../../api/database-conversion/moduleJSONParser';
import { parseDefaultPlanner } from '../../api/database-conversion/samplePlannerParser';
import { populateFocusAreaCollection } from '../../api/database-conversion/focusAreaParser';
import { populateAcadCohortCollection } from '../../api/database-conversion/cohortDatabaseParser';
import { populateModuleFulfilmentCollection } from '../../api/database-conversion/moduleFulfilmentParser';

import { scrapeModuleMappingListingForULR1516 } from '../../api/database-conversion/ULRAfter1516Scraper';
import { scrapeModuleMappingListingForBeforeULR1516 } from '../../api/database-conversion/ULRBefore1516Scraper';


Meteor.startup(() => {
  plannerFileToBeParsed = ["DefaultStudyPlanner1617.json", "DefaultStudyPlanner1516.json"];

  //populateFocusAreaCollection();
  //populateAcadCohortCollection();
  //populateModuleFulfilmentCollection();
  //scrapeModuleMappingListingForULR1516();
  //for(var t = 0; t< plannerFileToBeParsed.length ; t++){
  //  parseDefaultPlanner(plannerFileToBeParsed[t], true);
  //}
  //scrapeModuleMappingListingForBeforeULR1516();
  //parseJSONFileAndStoreToDB();

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
