import { populateModuleFixture } from '../../api/test-fixtures/modules';
import { populatePlannerFixture } from '../../api/test-fixtures/planner';
import { populateFocusAreaRequirementsFixture } from '../../api/test-fixtures/focusArea';
import { populateModuleFulfilmentFixture } from '../../api/test-fixtures/moduleFulfilment';
import { populateAY1617AcademicCohortFixture } from '../../api/test-fixtures/academicCohort';

import { Modules } from '../../api/database-controller/module/module';
import { Students } from '../../api/database-controller/student/student';
import { FocusArea } from '../../api/database-controller/focus-area/focusArea';
import { ModuleFulfilments } from '../../api/database-controller/module-fulfilment/moduleFulfilment';
import { Planner } from '../../api/crud-controller/planner/planner';
import { AcademicCohort } from '../../api/database-controller/AcademicCohort/acadCohort';

import { moduleInformationParser,
         moduleListParser } from '../../api/database-conversion/moduleInformationParser';
import { parseJSONFileAndStoreToDB} from '../../api/database-conversion/moduleJSONParser';

import '../../api/database-conversion/CohortDatabaseParser.js';
Meteor.startup(() => {
  process.env.MAIL_URL = 'smtp://nusoracle%40gmail.com:rainbowheadstudio@smtp.gmail.com:587';
  //parseJSONFileAndStoreToDB();
  if (Modules.find({}).count() === 0) {
    populateModuleFixture();
  }
  if (AcademicCohort.find({}).count() === 0) {
    populateAY1617AcademicCohortFixture();
  }
  if (Planner.find({}).count() === 0) {
    populatePlannerFixture();
  }
  if (FocusArea.find({}).count() === 0) {
    populateFocusAreaRequirementsFixture();
  }
  if (ModuleFulfilments.find({}).count() === 0) {
    populateModuleFulfilmentFixture();
  }

  Meteor.publish('userSetUp', function() {
    if (!this.userId) {
      return this.ready();
    }

    return Meteor.Users.find({_id:this.userId});
  });
});
