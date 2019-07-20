const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const UserController = controllers.UserController;
const jwt = require('jsonwebtoken');

const userRouter = express.Router();
userRouter.use(bodyParser.json());

//ADD
userRouter.post('/', function(req, res) {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const zipCode = req.body.zipCode;
  const city = req.body.city;
  const email = req.body.email;
  const password = req.body.password;

const user =  UserController.addUser(firstName, lastName, zipCode, city, email, password)
  .then((user) => {
    res.status(201).json(user);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).end();
  });
});

//LOGIN
userRouter.post('/login', function(req, res){
  const email = req.body.email;
  const password = req.body.password;

  const user = UserController.login(email, password)
  .then((user) => {
    if(user == null){
      res.send('Accès refusé').end();
      return;
    }

    jwt.sign({user}, 'secretkey', {expiresIn: '1h'}, (err, token) =>{
      res.json({
        token
      });
    });
  })
  .catch((err) => {
    console.error(err);
    res.status(500).end();
  })
});

//GET ALL
userRouter.get('/allUser', function(req,res){
  UserController.getAllUser()
  .then((users) => {
    res.status(201).json(users);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).end();
  })
});

//GET BY ID
userRouter.get('/:id' , function(req,res){
  UserController.getUserById(req.params.id)
  .then((user) => {
    res.status(201).json(user);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).end();
  })
});

//DELETE
userRouter.delete('/:idUser' , function(req,res){
  const token = req.headers["authorization"];
  jwt.verify(token, 'secretkey', (err) =>{
    if(err){
      res.status(403).end('Accès refusé');
      return;
    }
    else{
      const idUser = req.params.idUser;

      if(idUser === undefined){
        res.status(500).end();
        return;
      }
      UserController.deleteUser(idUser)
        .then((user) => {
          res.status(201).json(user);
        })
        .catch((err) => {
          console.error(err);
        })
      }
  });
});

//UPDATE
userRouter.put('/updateUser' , function(req,res){
  const token = req.headers["authorization"];
  jwt.verify(token, 'secretkey', (err) =>{
  if(err){
    res.status(403).end('Accès refusé');
      return;
  }
  else{
    const idUser = req.body.idUser;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const zipCode = req.body.zipCode;
    const city = req.body.city;
    const email = req.body.email;
    const password = req.body.password;

    UserController.updateUser(idUser, firstName, lastName, zipCode, city, email, password)
    .then(()=>{
      console.log("L'utilisateur à été mis à jour");
    })
    .catch((err) => {
      console.error(err);
    });
  }});
});



module.exports = userRouter;
