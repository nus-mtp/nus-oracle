import { populateModuleFixture } from '../../api/test-fixtures/modules';
import { populatePlannerFixture } from '../../api/test-fixtures/planner';
import { populateGraduationRequirementsFixture } from '../../api/test-fixtures/graduationRequirements';

import { Modules } from '../../api/database-controller/module/module';
import { Students } from '../../api/database-controller/student/student';
import { GraduationRequirements } from '../../api/database-controller/graduation-requirement/graduationRequirement';
import { Planner } from '../../api/crud-controller/planner/planner';

import { AcademicCohort } from '../../api/database-controller/AcademicCohort/acadCohort';
import { createNewCohort } from '../../api/database-controller/AcademicCohort/methods';
import { moduleInformationParser,
         moduleListParser } from '../../api/database-conversion/moduleInformationParser';

Meteor.startup(() => {
  if (Modules.find({}).count() === 0) {
    populateModuleFixture();
  }
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
});
