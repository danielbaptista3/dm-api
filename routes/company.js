const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const companyController = controllers.CompanyController;


const companyRouter = express.Router();
companyRouter.use(bodyParser.json());

//ADD
companyRouter.post('/', function(req, res) {
  const name = req.body.name;
  const SIREN = req.body.SIREN;
  const city = req.body.city;
  const street = req.body.street;
  const number = req.body.number;
  const zipCode = req.body.zipCode;
  const email = req.body.email;
  const password = req.body.password;

  companyController.addCompany(name, SIREN, city, street, number, zipCode, email, password)
  .then((company) => {
    res.status(201).json(company);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).end();
  });
});

//GET ALL
companyRouter.get('/', function(req,res){
  companyController.getAllCompany()
  .then((companys) => {
    res.status(200).json(companys);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).end();
  })
});

//GET ID
companyRouter.get('/:id' , function(req,res){
  companyController.getCompanyById(req.params.id)
  .then((company) => {
    res.status(201).json(company);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).end();
  })
});

//UPDATE
companyRouter.put('/:id' , function(req,res){
    const idCompany = req.params.id;
    const newName = req.body.name;
    const newSIREN = req.body.SIREN;
    const newCity = req.body.city;
    const newStreet = req.body.street;
    const newNumber = req.body.number;
    const newZipCode = req.body.zipCode;
    const newEmail = req.body.email;
    const newPassword = req.body.password;
  
    companyController.updateCompany(idCompany, newName, newSIREN, newCity, newStreet, newNumber, newZipCode, newEmail, newPassword)
    .then((company) => {
      res.status(200).json(company);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    })
});

//DELETE
companyRouter.delete('/:id' , function(req,res){
    companyController.deleteCompanyById(req.params.id)
    .then((company) => {
      res.status(204).json(company);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    })
});

module.exports = companyRouter;
