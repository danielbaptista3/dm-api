const ModelIndex = require('../models');
const PasswordHistory = ModelIndex.PasswordHistory;

const PasswordHistoryController = function() {};

//ADD FOR USER  
PasswordHistoryController.addUserPasswordHistory = function(date, oldPassword, idUser){
  return PasswordHistory.create({
    date: date,
    oldPassword: oldPassword,
    idUser: idUser,
    idCompany: null
  });
};

//ADD FOR COMPANY
PasswordHistoryController.addCompanyPasswordHistory = function(date, oldPassword, idCompany){
  return PasswordHistory.create({
    date: date,
    oldPassword: oldPassword,
    idUser: null,
    idCompany: idCompany
  });
};

//GET LAST BY ID USER
PasswordHistoryController.getLastPasswordsByIdUser = function(idUser){
  return PasswordHistory.findAll({limit: 4 })({
    where: {
      idUser: idUser
    },
    order: [ ['date', 'DESC'] ]
  })
  .catch((err) => {
    console.error(err);
  });
};

//GET LAST BY ID COMPANY
PasswordHistoryController.getLastPasswordsByIdCompany = function(idCompany){
  return PasswordHistory.findAll({limit: 4 })({
    where: {
      idCompany: idCompany
    },
    order: [ ['date', 'DESC'] ]
  })
  .catch((err) => {
    console.error(err);
  });
};

//DELETE ALL HISTORY FROM COMPANY

//DELETE ALL HISTORY FROM USER

module.exports = PasswordHistoryController;
