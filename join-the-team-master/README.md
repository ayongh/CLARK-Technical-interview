# CLARK Take Home Interview Project
The aim of this project is to allow us to assess your experience with web applications, and see how you work with some of the technology that we use here at CLARK. We have provided you with a simple data layer. There you will find CRUD operations for two resources, tasks and categories.

Your goal is to create a REST API and client application for the data layer provided here. You will be building a task manager that allows the user to view, create, update, and delete tasks - as well as assign and remove tasks from a category.

While you are developing, we'd like you to keep track of the experience in the `DEVLOG.md` file. This should be an ongoing process as you are building the application. Be sure to discuss the problem solving process that you go through when running into any issues or uncertainty. Also, if you would like to draw any special attention to an approach that you took, be sure to discuss that too.

Please feel free to modify any of this repository as you see fit, so long as your application satisfies the user stories listed below. If you do make modifications, discuss them in the dev log.

### The REST API
The REST API should be built using [Express](https://expressjs.com/). Your goal is to create a series of endpoints that expose the create, read, update, and delete operations of the data layer.

### The Client
Once you have a functional API, we'd like you to build the client application using [Angular](https://angular.io/).

# Setup
You will need to have [Node](https://nodejs.org/en/) and [Docker](https://www.docker.com/get-started) installed on your machine to complete this project.

```sh
npm install
```

The following command will start up an instance of [MongoDB](https://www.mongodb.com/), as well as a simple web app that may be helpful for troubleshooting:
```sh
docker-compose up
```

Mongo will be exposed on port 27017. The web app will be availible at localhost:8081. It will be connected to mongo, allowing you to navigate the database and do some simple querying. You are not required to do anything with this application, it is simply provided for your convenience.

If you would like to add some seed data to the database to get a better understanding of the way tasks and categories are stored, you can run:
```sh
node seed.js
```

Once the database has started up, you can run the application with the following command:
```sh
npm start
```

# Requirements
Your application must satisfy the following User Stories:
- As a user, I should be able to create a task.
- As a user, I should be able to rename a task.
- As a user, I should be able to mark a task as complete.
- As a user, I should be able to delete a task.
- As a user, I should be able to create a category.
- As a user, I should be able to delete a category.
- As a user, I should be able to rename a category.
- As a user, I should be able to add a task to a category.
- As a user, I should be able to remove a task from a category.
- As a user, I should be able to sort tasks by the date they were created.
- As a user, I should be able to sort tasks by whether they are completed or not.

# Submitting Your Project
Once you have implemented the above user stories, please send a link to your own repository to pzalep1@students.towson.edu. Your repository must include the source code for the client and API, as well as your Dev Log. Be sure to include instructions on how to start up the application.