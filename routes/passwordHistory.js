const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const passwordHistoryController = controllers.PasswordHistoryController;


const passwordHistoryRouter = express.Router();
passwordHistoryRouter.use(bodyParser.json());
passwordHistoryRouter.use(bodyParser.urlencoded({ extended: true }));

//ADD FOR USER
passwordHistoryRouter.post('/user/:idUser', function(req, res) {
  const date = new Date();
  const oldPassword = req.body.oldPassword;
  const idUser = req.params.idUser;

  passwordHistoryController.addPasswordHistory(date, oldPassword, idUser, null)
  .then((passwordHistory) => {
    res.status(201).json(passwordHistory);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).end();
  });
});

//ADD FOR COMPANY
passwordHistoryRouter.post('/company/:idCompany', function(req, res) {
    const date = new Date();
    const oldPassword = req.body.oldPassword;
    const idUser = req.params.idCompany;
  
    passwordHistoryController.addPasswordHistory(date, oldPassword, null, idCompany)
    .then((passwordHistory) => {
      res.status(201).json(passwordHistory);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
  });

//GET LAST BY ID USER
passwordHistoryRouter.get('/user/:idUser', function(req,res){
  passwordHistoryController.getLastPasswordsByIdUser(req.params.idUser)
  .then((passwordHistory) => {
    res.status(200).json(passwordHistory);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).end();
  })
});

//GET LAST BY ID COMPANY
passwordHistoryRouter.get('/company/:idCompany', function(req,res){
    passwordHistoryController.getLastPasswordsByIdCompany(req.params.idCompany)
    .then((passwordHistory) => {
      res.status(200).json(passwordHistory);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    })
  });

module.exports = passwordHistoryRouter;
