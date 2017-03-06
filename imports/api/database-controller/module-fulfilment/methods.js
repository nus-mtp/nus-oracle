import {ModuleFulfilments} from './moduleFulfilments';

/**
 * New Schema Reference:
  moduleCode: {
    type: String
  },
  academicYearList: {
    type: [String],
    blackbox: true
  },
  moduleEquivalent: {
    type: [String],
    optional: true
  }
 */

/** Old Schema Reference :
-- ModuleFulfilmentsSchema
 moduleCode: {
   type: String
 },
 moduleMapping: {
  type: [moduleMappingSchema],
  blackbox: true
 }
-- ModuleMappingSchema
  acadYear: {
    type: string,
    optional: false
  },
  areaFulfilled: {
    type: string,
    optional: false
  },
  moduleEquivalent: {
    type: [string],
    optional: true
  }
*/
export const createNewModuleFulfilment = function createNewModuleFulfilmentDocument(moduleCode, academicYearList, equivalentModuleList) {

const newModuleFulfilmentDocument = {
  moduleCode: moduleCode,
  academicYearList:academicYearList,
  moduleEquivalent: equivalentModuleList
};

const isValidSchema = Match.test(newModuleFulfilmentDocument, ModuleFulfilments.simpleSchema());

let result = '';
if (isValidSchema){
  result = ModuleFulfilments.insert(newModuleFulfilmentDocument);
}

return result;
}

export const findModuleMappingByModuleCode = function findMappingByCode(moduleCode, studentAcadCohort) {
  const result = ModuleFulfilments.find({moduleCode:moduleCode}, {limit:1}).fetch();

  if (result = {}) {
    return result
  }

  const isValidForStudentCohort = result.academicYearList.indexOf(studentAcademicCohort);

  if (isValidForStudentCohort == -1){
    return {};
  }

  return result;
}
