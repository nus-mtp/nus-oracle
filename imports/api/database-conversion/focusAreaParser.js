import { FocusArea } from '../database-controller/focus-area/focusArea';
import{ createNewFocusArea } from '../database-controller/focus-area/methods';
import{ findModuleAvailability } from '../database-controller/module/methods';

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
        let currentID = createNewFocusArea(currentFocusArea["name"],currentFocusArea["moduleListPrimary"],currentFocusArea["moduleListPrimaryFourThousands"],["moduleListFourThousands"],currentFocusArea["moduleListElectives"]);
        console.log(currentFocusArea["name"] + ": " + JSON.stringify(currentID) );
    }
  }
}
