import { populateModuleFixture } from '../../api/test-fixtures/modules';
import { populatePlannerFixture } from '../../api/test-fixtures/planner';
import { populateGraduationRequirementsFixture } from '../../api/test-fixtures/graduationRequirements';

import { Modules } from '../../api/database-controller/module/module';
import { Students } from '../../api/database-controller/student/student';
import { GraduationRequirements } from '../../api/database-controller/graduation-requirement/graduationRequirement';
import { Planner } from '../../api/crud-controller/planner/planner';

import { AcademicCohort } from '../../api/database-controller/AcademicCohort/acadCohort';
import { moduleInformationParser,
         moduleListParser } from '../../api/database-conversion/moduleInformationParser';

Meteor.startup(() => {
  if (Modules.find({}).count() === 0) {
    populateModuleFixture();
  }

  if (Planner.find({}).count() === 0) {
    populatePlannerFixture();
  }

  if (GraduationRequirements.find({}).count() === 0)  {
    populateGraduationRequirementsFixture();
  }
});
