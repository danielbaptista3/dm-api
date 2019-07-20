const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const removalController = controllers.RemovalController;


const removalRouter = express.Router();
removalRouter.use(bodyParser.json());

//ADD
removalRouter.post('/', function(req, res) {
  const date = req.body.date;
  const address = req.body.address;
  const arrivalAddress = req.body.arrivalAddress;
  const description = req.body.description;

  removalController.addRemoval(date, address, arrivalAddress, description)
  .then((removal) => {
    res.status(201).json(removal);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).end();
  });
});

//GET ALL
removalRouter.get('/', function(req,res){
  removalController.getAllRemoval()
  .then((removals) => {
    res.status(200).json(removals);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).end();
  })
});

//GET ID
removalRouter.get('/:id' , function(req,res){
  removalController.getRemovalById(req.params.id)
  .then((removal) => {
    res.status(201).json(removal);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).end();
  })
});

//UPDATE
removalRouter.put('/:id' , function(req,res){
    const idRemoval = req.params.id;
    const newDate = req.body.date;
    const newAddress = req.body.address;
    const newArrivalAddress = req.body.arrivalAddress;
    const newDescription = req.body.description;
  
    removalController.updateRemoval(idRemoval, newDate, newAddress, newArrivalAddress, newDescription)
    .then((removal) => {
      res.status(200).json(removal);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    })
});

//DELETE
removalRouter.delete('/:id' , function(req,res){
    removalController.deleteRemovalById(req.params.id)
    .then((removal) => {
      res.status(204).json(removal);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    })
});

module.exports = removalRouter;
