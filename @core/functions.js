const config = require('./config.js');
const models = require('./models.js');
const request = require('request');

const isEmpty = function(obj) {
  for(var key in obj) {
    if(obj.hasOwnProperty(key))
      return false;
  }
  return true;
};

const generateRandomString = function(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

const formatDateTime = function(date){
  var promise = new Promise(function(resolve,reject) {
    var formattedDateTime = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(); 
    formattedDateTime = formattedDateTime.toString();
    resolve(formattedDateTime);
  });
  return promise;
}

const formatDate = function(date){
  var date = new Date(date);
  var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  var formattedDate = ordinalSuffixOf(date.getDate())+" "+months[(date.getMonth())] + ", " +date.getFullYear(); 
  //formattedDate = formattedDate.toString();
  return formattedDate;
}


const ordinalSuffixOf = function (i) {
    var j = i % 10,
        k = i % 100;
    if (j === 1 && k !== 11) {
        return i + "st";
    }
    if (j === 2 && k !== 12) {
        return i + "nd";
    }
    if (j === 3 && k !== 13) {
        return i + "rd";
    }
    return i + "th";
}

const generateLandRecordNumber = () => {
  var promise = new Promise(function(resolve, reject) {
    landRecordNumber = Math.floor(Math.random() * 9000) + 10000;
    getLandByLandRecordNumber(landRecordNumber).then(function(landRecord) {
      if(landRecord){
        generateLandRecordNumber;
      }
      resolve(landRecordNumber);
    });
  });
  return promise;
}

const getLandByLandRecordNumber = (landRecordNumber) => {
 var promise = new Promise(function(resolve, reject) {
    models.land_model.findOne({landRecordNumber:landRecordNumber},function(err,data){
      if(err){
        reject(err);
      }else{
        resolve(data);          
      }
    });
  });
  return promise;
}

const findLandOwnerByIdNumber = (idNumber) => {
 var promise = new Promise(function(resolve, reject) {
    models.user_model.findOne({idNumber:idNumber},function(err,data){
      if(err){
        reject(err);
      }else{
        resolve(data);          
      }
    });
  });
  return promise;
}

module.exports = { 
  isEmpty,
  generateRandomString,
  formatDateTime,
  formatDate,
  ordinalSuffixOf,
  findLandOwnerByIdNumber
};
