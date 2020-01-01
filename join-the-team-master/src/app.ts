import { MongoDriverFactory } from "./MongoConnectorFactory";
import { ObjectID } from "mongodb";

var express = require('express')
var bodyParser =  require("body-parser")

var app = express()

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/**
 * Creates new task
 */
app.post('/createTask', function (req, res) 
{
  
  var dtext = req.body.text;
  var dcompleted = req.body.completed;

  var data ={ text: dtext, completed: dcompleted}
 
  MongoDriverFactory.build().then(async function call(datastore) {
    datastore.createTask(data).then(function(result)
    {
      res.status(201).send({message:"Task created with id of " + result})

    }).catch(e => {
      res.status(400).send({error:"unable to create a task"})
    });

    datastore.disconnect
  })
  
})

/**
 * updates task
 */
app.put('/renametask/:id', function(req, res)
{
  var id = req.params.id
  var dtext = req.body.text;

  var newTaskValue = {_id:new ObjectID(id) , text:dtext}

  MongoDriverFactory.build().then(async function call(datastore) {
    datastore.updateTask(newTaskValue).then(function (result){
      res.status(200).send({message: "Successfully updated the value"})
    }).catch(e=>
    {
      res.status(404).send({error:"unable to update the "+id})

    })
    datastore.disconnect
  })
})

app.put('/markTaskComplete/:id', function(req, res)
{
  var id = req.params.id
  var dcompleted = req.body.completed;
  console.log(dcompleted)

  var newTaskValue = {_id:new ObjectID(id) , completed:dcompleted}
  console.log(newTaskValue)
  MongoDriverFactory.build().then(async function call(datastore) {
    datastore.updateTask(newTaskValue).then(function (result){
      res.status(200).send({message: "Successfully updated the value"})
    }).catch(e=>
    {
      res.status(404).send({error:"unable to update the " + id})

    })
    datastore.disconnect
  })
})

/**
 * Reads specific task given ID
 */

app.get('/readTask/:id', function (req, res) 
{
  var id = req.params.id;

  MongoDriverFactory.build().then(async function call(datastore) {
    datastore.readTask(id).then(function(result)
    {
      res.status(200).send(result)
  
    }).catch(e => {
      res.status(404).send({message:"Result Not found"})
    });
    datastore.disconnect
  })
})

app.get('/readallTask', function (req, res) 
{
  MongoDriverFactory.build().then(async function call(datastore) {
    datastore.listTasks().then(function(result)
    {
      res.status(200).send(result)
  
    }).catch(e => {
      res.status(404).send({message:"unable to retrive list of task"})
    });
    datastore.disconnect
  })
})

/**
 * Deletes specifc task given ID
 */
app.delete('/deleteTask/:id', function (req, res) 
{
  var id = req.params.id;

  MongoDriverFactory.build().then(async function call(datastore) {
    datastore.deleteTask(id).then(function(result)
    {
      res.status(200).send({message: id+" Successfully deleted"})
    }).catch(e => {
      res.status(404).send({message:"Error occure when deleting the task"})
    });
    datastore.disconnect
  })
})

/**
 * -------------------- Categories -----------------------
 */

app.post('/createCategorie', function(req, res ){

  var dname = req.body.name;

  MongoDriverFactory.build().then(async function call(datastore) {
    datastore.createCategory(dname).then(function(result){
      res.status(200).send({message:"sucessfully created a categorie with id"+result})
    }).catch(e=>{
      res.status(400).send({message:"Unable to create a categorie"})
    })
    datastore.disconnect
  })

})

app.put('/updateCategorie/:id', function(req, res ){

  var id = req.params.id
  var dname = req.body.name;

  if(dname === undefined)
  {
    res.status(400).send({message:"name can't be null"})
  }

  MongoDriverFactory.build().then(async function call(datastore) {
    datastore.updateCategory(id,dname).then(function(result){
      res.status(200).send({message:"Updated "+id+" categories name succesfully"})
    }).catch(e=>{
      res.status(400).send({message:"Unable to update categorie name"})
    })
    datastore.disconnect
  })

})


app.get('/getCategorie/:id',function(req, res)
{
  var id = req.params.id

  if(id === undefined)
  {
    res.status(400).send({message:"Id cannot be null"})
  }

  MongoDriverFactory.build().then(async function call(datastore) {
    datastore.readCategory(id).then(function (result){
      res.status(200).send(result)
    }).catch(e=>{
      res.status(400).send({message:"No categorie found with id of" + id})
    })
    datastore.disconnect()
  })

})


app.get('/getCategories',function(req, res)
{
  MongoDriverFactory.build().then(async function call(datastore) {
    datastore.listCategories().then(function (result){
      res.status(200).send(result)
    }).catch(e=>{
      res.status(400).send({message:"No categorie found"})
    })
    datastore.disconnect()
  })
  

})

app.put('/addTasktoCategorie/:id',function(req, res)
{
  var id = req.params.id
  var tasksID = req.body.taskIDlist

  if(id === undefined && tasksID === undefined)
  {
    res.status(400).send({message: "The request is invalid "})
  }

  MongoDriverFactory.build().then(async function call(datastore) {
    datastore.addTasksToCategory(id, tasksID).then(function (result){
      res.status(200).send({message:"Successfully added Categorie"})
    }).catch(e=>{
      res.status(400).send({message:"Error occur when adding task"})
    })
    datastore.disconnect()
  })
  

})

app.put('/removeTaskfromCateg/:id', function(req, res){
  var id = req.params.id
  var tasksID = req.body.task

  console.log(id)
  console.log(tasksID)

  MongoDriverFactory.build().then(async function call(datastore) {
    datastore.removeTasksFromCategory(id, tasksID).then(function ()
    {
      res.status(200).send({message:"Sucessfully removed the task"})
    }).catch(e=>{
      res.status(400).send({message:"Failure to remove Task"})
    })

    datastore.disconnect()
  })
})

app.put('/removeTaskfromCateg/:id', function(req, res){
  var id = req.params.id
  var tasksID = req.body.task

  MongoDriverFactory.build().then(async function call(datastore) {
    datastore.removeTasksFromCategory(id, tasksID).then(function ()
    {
      res.status(200).send("Sucessfully removed the task")
    }).catch(e=>{
      res.status(400).send("Failure to remove Task")
    })

    datastore.disconnect()
  })
})

app.delete('/deleteCategorie/:id', function(req, res){
  var id = req.params.id
  MongoDriverFactory.build().then(async function call(datastore) {
    datastore.deleteCategory(id).then(function ()
    {
      res.status(200).send({message:"Sucessfully deleted the Categorie " + id})
    }).catch(e=>{
      res.status(400).send({message:"Failure to remove categorie"})
    })

    datastore.disconnect()
  })
})


app.listen(3000, () => console.log(`app listening on port 3000!`))