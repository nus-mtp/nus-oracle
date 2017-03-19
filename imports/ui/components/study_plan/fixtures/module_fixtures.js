/**
 * Study Plan Fixtures mostly for testing on localhost since it isn't
 * connected to the real database
 */
const moduleCodes = ['CS1010', 'CS1010E', 'CS1010J', 'CS1010S', 'CS1010X',
                     'CS1020', 'CS2010', 'CS3230', 'CS1231', 'IS1103',
                     'CS2101', 'ES2660', 'MA1301', 'MA1521', 'MA1101R',
                     'ST2334', 'CM1121', 'CM1131', 'CM1417', 'LSM1301',
                     'LSM1302', 'PC1141', 'PC1142', 'PC1143', 'PC1144',
                     'PC1221', 'PC1221X', 'PC1221FC', 'PC1222', 'PC1222X',
                     'PC1432', 'MA2213', 'MA2214', 'ST2131', 'ST2132', 'CS3283',
                     'CS3284', 'CS3216', 'CS3217', 'CS3281', 'CS3282', 'CS3201', 'CS3202'];
const moduleNames = ['Programming Methodology', 'Programming Methodology',
                     'Programming Methodology', 'Programming Methodology',
                     'Programming Methodology', 'Data Structures and Algorithms I',
                     'Data Structures and Algorithms II',
                     'Design and Analysis of Algorithms', 'Discrete Structures',
                     'Computing and Society', 'Effective Communication for Computing Professionals',
                     'Communicating in the Information Age', 'Introductory Mathematics',
                     'Calculus for Computing', 'Linear Algebra I', 'Probability and Statistics',
                     'Fundamental of Physics I', 'ORGANIC CHEMISTRY 1', 'PHYSICAL CHEMISTRY 1',
                     'FUNDAMENTALS OF CHEMISTRY', 'GENERAL BIOLOGY', 'GENES AND SOCIETY',
                     'PHYSICS I', 'PHYSICS II', 'PHYSICS III', 'PHYSICS IV', 'FUNDAMENTALS OF PHYSICS I',
                     'FUNDAMENTALS OF PHYSICS I', 'FUNDAMENTALS OF PHYSICS I', 'FUNDAMENTALS OF PHYSICS II',
                     'FUNDAMENTALS OF PHYSICS II', 'PHYSICS IIE', 'NUMERICAL ANALYSIS I',
                     'COMBINATORICS AND GRAPHS I', 'Probability', 'Mathematical Statistics',
                     'Media Technology Project I', 'Media Technology Project II', 'Software Product Engineering for Digital Markets',
                     'Software Engineering on Modern Application Platforms', 'Thematic Systems Project I', 'Thematic Systems Project II',
                     'Software Engineering Project I', 'Software Engineering Project II'];

/**
 * Returns the list of all modules from the fixtures in moduleCodes and
 * moduleNames arrays in the JSON format:
 * {
 *     label: moduleCode + " " + moduleName
 *     value: {index of this object in the list of modules}
 *     moduleCode: "CS1010",
 *     moduleName: "Programming Methodology"
 * }
 *
 * @return {Array}     Array of module objects in the specified JSON format
 */
export const getModuleFixtures = function getModuleFixtures() {
  let modules = [];

  // Zip through fixture elements to ensure they are formatted in the correct object
  // schema as required by the react-virtualized-select search bar UI.
  for (var i = 0; i < moduleCodes.length; i++)  {
    const module = {
      label: moduleCodes[i] + " " + moduleNames[i],
      value: i,
      moduleCode: moduleCodes[i],
      moduleName: moduleNames[i]
    };
    modules.push(module);
  }

  console.log("DEVELOPER NOTES: You are currently using module fixtures as the default \
               module search index as you are developing on your localhost and are not \
               connected to the MONGO Database. Please connect to the heroku server if \
               you need to load the entire modules database.")

  return modules;
}
