import { populateModuleFixture } from '../../api/test-fixtures/modules';
import { populatePlannerFixture } from '../../api/test-fixtures/planner';
import { populateGraduationRequirementsFixture } from '../../api/test-fixtures/graduationRequirements';
import { populateFocusAreaRequirementsFixture } from '../../api/test-fixtures/focusArea';
import { populateModuleFulfilmentFixture } from '../../api/test-fixtures/moduleFulfilment';

import { Modules } from '../../api/database-controller/module/module';
import { Students } from '../../api/database-controller/student/student';
import { GraduationRequirements } from '../../api/database-controller/graduation-requirement/graduationRequirement';
import { FocusArea } from '../../api/database-controller/focus-area/focusArea';
import { ModuleFulfilments } from '../../api/database-controller/module-fulfilment/moduleFulfilment';
import { Planner } from '../../api/crud-controller/planner/planner';

import { AcademicCohort } from '../../api/database-controller/AcademicCohort/acadCohort';
import { createNewCohort } from '../../api/database-controller/AcademicCohort/methods';
import { moduleInformationParser,
         moduleListParser } from '../../api/database-conversion/moduleInformationParser';
import { parseJSONFileAndStoreToDB} from '../../api/database-conversion/moduleJSONParser';

Meteor.startup(() => {
  //parseJSONFileAndStoreToDB();
  if (Modules.find({}).count() === 0) {
    populateModuleFixture();
  }
  process.env.MAIL_URL = 'smtp://nusoracle%40gmail.com:rainbowheadstudio@smtp.gmail.com:587';
  if (AcademicCohort.find({}).count() === 0) {
    const academicYear = ['AY 2013/2014','AY 2014/2015', 'AY 2015/2016','AY 2016/2017'];
    let i = 0 ;
    for (i = 0; i < academicYear.length; i++){
      createNewCohort(academicYear[i]);
    }
  }
  if (Planner.find({}).count() === 0) {
    populatePlannerFixture();
  }

  if (GraduationRequirements.find({}).count() === 0)  {
    populateGraduationRequirementsFixture();
  }
  if (FocusArea.find({}).count() === 0) {
    populateFocusAreaRequirementsFixture();
  }
  if (ModuleFulfilments.find({}).count() === 0) {
    populateModuleFulfilmentFixture();
  }
});
