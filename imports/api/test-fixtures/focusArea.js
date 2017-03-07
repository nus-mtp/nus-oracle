import { FocusArea } from '../database-controller/focus-area/methods';
import { createNewFocusArea } from '../database-controller/focus-area/methods';

export const populateFocusAreaRequirementsFixture = function populateFocusAreaRequirementsFixture()  {
  const requirementName = 'Computer Graphics and Games';
  const listOfAcadYear = ['AY 2016/2017'];
  const primaryModules = ['CS3241', 'CS3242', 'CS3247', 'CS4247', 'CS4350'];
  const nonPrimaryModules = ['CS3218', 'CS3240', 'CS3249', 'CS3343', 'CS4243', 'CS4249', 'CS4340',
                             'CS4344', 'CS4345', 'CS5237', 'CS5240', 'CS5343'];
  const fourThousandModules = ['CS4231', 'CS4232', 'CS4234', 'CS5230', 'CS5234', 'CS5236', 'CS5237', 'CS5238', 'CS5330',
                               'CS4244', 'CS4246'];

  createNewFocusArea(requirementName, listOfAcadYear, primaryModules, fourThousandModules, nonPrimaryModules);
}
