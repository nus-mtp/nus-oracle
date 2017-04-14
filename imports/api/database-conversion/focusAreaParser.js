import { FocusArea } from '../database-controller/focus-area/focusArea';
import{ createNewFocusArea } from '../database-controller/focus-area/methods';
/**
This script parse the focus area for the computer science Major. Much like other parser, the file that wanted to be parsed need to be stored
in the /private folder of meteor.

JSON format of the file to be stored are like the following:
{
  "data": [
    {
      "name": "Algorithms & Theory",
      "moduleListPrimary": [ "CS3230", "CS3236" ],
      "moduleListPrimaryFourThousands":["CS4231", "CS4232", "CS4234"],
      "moduleListFourThousands": [ "CS4231", "CS4232", "CS4234", "CS5230", "CS5234", "CS5236", "CS5237", "CS5330", "CS5238" ],
      "moduleListElectives": [  "CS3233", "CS5230", "CS5234", "CS5236", "CS5237", "CS5330", "CS5238" ]
    },
    {
      "name": "Artificial Intelligence",
      "moduleListPrimary": [ "CS3243", "CS3244" ],
      "moduleListPrimaryFourThousands":[ "CS4244", "CS4246" ],
      "moduleListFourThousands": [ "CS4244", "CS4246", "CS4216", "CS4220", "CS4248", "CS5209", "CS5215", "CS5228", "CS5247", "CS5340", "CS5339" ],
      "moduleListElectives": [ "CS4216", "CS4220", "CS4248", "CS5209", "CS5215", "CS5228", "CS5247", "CS5340", "CS5339" ]
    },
    {
      "name": "Computer Graphics and Games",
      "moduleListPrimary": [ "CS3241", "CS3242", "CS3247" ],
      "moduleListPrimaryFourThousands": [ "CS4247", "CS4350" ],
      "moduleListFourThousands":["CS4247", "CS4350","CS4243", "CS4249", "CS4340", "CS4344", "CS4345", "CS5237", "CS5240", "CS5343"],
      "moduleListElectives": [ "CS3218", "CS3240", "CS3249", "CS3343", "CS4243", "CS4249", "CS4340", "CS4344", "CS4345", "CS5237", "CS5240", "CS5343" ]
    }]}
*/
export const populateFocusAreaCollection = function() {
  if(Meteor.isServer){
    console.log(process.env.MONGO_URL);
    const focusAreaFile = "FocusArea.json"
    //Load focus area text
    const focusAreaJSON = JSON.parse(Assets.getText(focusAreaFile));

    //remove all focus area document
    FocusArea.remove({});

    //obtain data
    const focusAreaData = focusAreaJSON["data"];

    //go through array of data
    for(var i = 0 ; i < focusAreaData.length; i++){
        let currentFocusArea = focusAreaData[i];
        // store it into database
        let currentID = createNewFocusArea(currentFocusArea["name"],currentFocusArea["moduleListPrimary"],currentFocusArea["moduleListPrimaryFourThousands"],currentFocusArea["moduleListFourThousands"],currentFocusArea["moduleListElectives"]);
        console.log(currentFocusArea["name"] + ": " + JSON.stringify(currentID) );
    }
  }
}
