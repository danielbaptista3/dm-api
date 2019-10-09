const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const commentController = controllers.CommentController;


const commentRouter = express.Router();
commentRouter.use(bodyParser.json());
commentRouter.use(bodyParser.urlencoded({ extended: true }));

//ADD
commentRouter.post('/', function(req, res) {
  const date = new Date();
  const subject = req.body.subject;
  const message = req.body.message;
  const idUser = req.params.idUser;
  const idRemoval = req.params.idRemoval;

  commentController.addComment(date, subject, message, idUser, idRemoval)
  .then((comment) => {
    res.status(201).json(comment);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).end();
  });
});

//GET ALL
commentRouter.get('/', function(req,res){
  commentController.getAllComment()
  .then((comments) => {
    res.status(200).json(comments);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).end();
  })
});

//GET ID
commentRouter.get('/:id' , function(req,res){
  commentController.getCommentById(req.params.id)
  .then((comment) => {
    res.status(201).json(comment);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).end();
  })
});

//UPDATE
commentRouter.put('/:id' , function(req,res){
    const idComment = req.params.id;
    const newSubject = req.body.subject;
    const newMessage = req.body.message;

    removalController.updateRemoval(idComment, newSubject, newMessage)
    .then((removal) => {
      res.status(200).json(removal);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    })
});

//DELETE
commentRouter.delete('/:id' , function(req,res){
    commentController.deleteCommentById(req.params.id)
    .then((comment) => {
      res.status(204).json(comment);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    })
});

module.exports = commentRouter;
