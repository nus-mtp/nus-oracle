import { HTTP } from 'meteor/http';

export const moduleInformationParser = function() {
  const moduleInfo = HTTP.get('http://api.nusmods.com/2016-2017/modules/');
  //console.log(moduleInfo);
};

export const moduleListParser = function()  {
  const moduleList = HTTP.get('http://api.nusmods.com/2016-2017/modules/ACC3602/index.json');
  console.log(moduleList['data']);
};
