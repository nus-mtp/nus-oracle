import { createNewModuleFulfilment,
         updateModuleMappingOfModuleFulfilment } from '../database-controller/module-fulfilment/methods';
import { ModuleFulfilments } from '../database-controller/module-fulfilment/moduleFulfilment';
/**
This parser parse module Fulfilments json file that have been manually written. Example for the json File format:
{
  "data": [
    {
      "moduleCode": "CS1010",
      "moduleMapping": {
        "AY 2016/2017": {
          "moduleEquivalent": [
            "CS1010X",
            "CS1010E",
            "CS1010S",
            "CS1010FC",
            "CS1101S",
            "CS1010J"
          ]
        },
        "AY 2015/2016": {
          "moduleEquivalent": [
            "CS1010X",
            "CS1010FC",
            "CS1010E",
            "CS1010S",
            "CS1101S",
            "CS1010J"
          ]
        },

        "AY 2014/2015": {
          "moduleEquivalent": [
            "CS1010X",
            "CS1010E",
            "CS1010S",
            "CS1101S",
            "CS1010J"
          ]
        },
        "AY 2013/2014": {
          "moduleEquivalent": [
            "CS1010X",
            "CS1010E",
            "CS1010S",
            "CS1101S",
            "CS1010J"
          ]
        }
      }
    }]}

note: make sure the file to be parsed is stored under the private folder of meteor. 
*/
export const populateModuleFulfilmentCollection = function() {

  if (Meteor.isServer){
    // remove data from ModuleFulfilment
    ModuleFulfilments.remove({});

    const ModuleFulfilmentFile = 'ModuleFulfilment.json';
    const ModuleFulfilmentJSON = JSON.parse(Assets.getText(ModuleFulfilmentFile));


    // obtain data from the json
    const moduleFulfilmentArray = ModuleFulfilmentJSON["data"];

    for (var i = 0; i < moduleFulfilmentArray.length ; i++) {
      let currentModuleFulfilment = moduleFulfilmentArray[i];
      let currentModuleName = moduleFulfilmentArray[i]["moduleCode"];
      let currentModuleMapping = currentModuleFulfilment["moduleMapping"];
      let currentModuleMappingKey = Object.keys(currentModuleMapping);

      for (var j = 0; j < currentModuleMappingKey.length; j++){
        if (j > 0) {
          updateModuleMappingOfModuleFulfilment(currentModuleMappingKey[j], currentModuleName, currentModuleMapping[currentModuleMappingKey[j]]["moduleEquivalent"]);
        } else {
          createNewModuleFulfilment(currentModuleMappingKey[j], currentModuleName, currentModuleMapping[currentModuleMappingKey[j]]["moduleEquivalent"]);
        }
      }
    }
  }
}
