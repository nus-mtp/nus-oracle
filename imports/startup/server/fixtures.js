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

import '../../api/database-conversion/ULRAfter1516Scraper.js';

import { populateFocusAreaCollection } from '../../api/database-conversion/focusAreaParser';
  import { populateAcadCohortCollection } from '../../api/database-conversion/cohortDatabaseParser';
import { populateModuleFulfilmentCollection } from '../../api/database-conversion/moduleFulfilmentParser';

import { scrapeModuleMappingListingForULR1516 } from '../../api/database-conversion/ULRAfter1516Scraper';

Meteor.startup(() => {
  process.env.MAIL_URL = 'smtp://nusoracle%40gmail.com:natashaSMASH@smtp.gmail.com:587';
  //process.env.MONGO_URL = 'mongodb://tio:1234@ds145289.mlab.com:45289/nus-oracle';
  //populateFocusAreaCollection();
  //populateAcadCohortCollection();
  //populateModuleFulfilmentCollection();
  //scrapeModuleMappingListingForULR1516();
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
