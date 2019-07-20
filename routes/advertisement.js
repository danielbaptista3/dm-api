const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const advertisementController = controllers.AdvertisementController;


const advertisementRouter = express.Router();
advertisementRouter.use(bodyParser.json());

//ADD
advertisementRouter.post('/:idCompany', function(req, res) {
   const availabilityDate = req.body.availabilityDate;
   const description = req.body.description;
   const large = req.body.lastName;
   const medium = req.body.zipcode;
   const small = req.body.city;
   const idCompany = req.params.idCompany;

  advertisementController.addAdvertisement(availabilityDate, description, large, medium, small, idCompany)
  .then((advertisement) => {
    res.status(201).json(advertisement);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).end();
  });
});

//GET ALL
advertisementRouter.get('/:idCompany', function(req,res){
  advertisementController.getAllAdvertisement(req.params.idCompany)
  .then((advertisements) => {
    res.status(200).json(advertisements);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).end();
  })
});

//GET ID
advertisementRouter.get('/:idCompany/:idAvertisement' , function(req,res){
  advertisementController.getAdvertisementById(req.params.idCompany, req.params.idAdvertisement)
  .then((advertisement) => {
    res.status(201).json(advertisement);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).end();
  })
});

//UPDATE
advertisementRouter.put('/:idCompany/:idAvertisement' , function(req,res){
    
    const idAdvertisement = req.params.idAdvertisement;
    const availabilityDate = req.body.availabilityDate;
    const description = req.body.description;
    const large = req.body.lastName;
    const medium = req.body.zipcode;
    const small = req.body.city;
    const idCompany = req.params.idCompany;
  
    advertisementController.updateAdvertisement(idAdvertisement, availabilityDate, description, large, medium, small, idCompany)
    .then((advertisement) => {
      res.status(200).json(advertisement);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    })
});

//DELETE
advertisementRouter.delete('/:idCompany/:idAdvertisement' , function(req,res){
    advertisementController.deleteAdvertisementById(req.params.idCompany, req.params.idAdvertisement)
    .then((advertisement) => {
      res.status(204).json(advertisement);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    })
});

module.exports = advertisementRouter;
