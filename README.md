# Parking Management System

Parking management system API allow you to manage parking spots reservations between users.

The API is RESTful API and uses JWT for user authentication purposes. Currently, return format for all endpoints is JSON.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* Nodejs
* MySQL Database (Create an empty database with name: parking)

### Cloning The Project

* Using HTTPS:
```
$ git clone https://github.com/MaryamSemlali/parking-management-system-api.git
```

* Using SSH:
```
$ git clone git@github.com:MaryamSemlali/parking-management-system-api.git
```

### Install The Dependencies

Just "cd" into parking-management-system-api directory and run npm install, see an example below:

```
$ cd path/to/parking-management-system-api
$ npm install
```

### The .env File

You need to change the .env file so you can put your own configurations, below you will find the configs that needs to be changed

* Environment:
Depends on your environment (development or production)
```
NODE_ENV='development'
```

* Database configs:
If your database is in your local machine it's better to leave the default configs, change only the user and password. 
  Also fill them depending on your development environment
```
DEV_DB_USERNAME='root'
DEV_DB_PASSWORD='azerty123456'
DEV_DB_NAME='parking'
DEV_DB_HOST='127.0.0.1'

PROD_DB_USERNAME=''
PROD_DB_PASSWORD=''
PROD_DB_NAME=''
PROD_DB_HOST=''
```

* JWT Token Key:

This to generate and decrypt token
```
JWT_ENCRYPTION_KEY='GNzwEJZ]NPdJ8+AJ@^bnVJUi>8:^tKX'
```

* Super Admin Info:

The first user that will be created in the first API build. This user is the super admin.
```
SUPER_ADMIN_FIRST_NAME='Maryam'
SUPER_ADMIN_LAST_NAME='Semlali'
SUPER_ADMIN_EMAIL='maryam@test.com'
SUPER_ADMIN_PASSWORD='azerty'
```

## Running The Project

### Default Method
```
$ cd path/to/parking-management-system-api
$ npm start
```

### Using Nodemon
Nodemon helps you with testing, every time there is a change on the project Nodemon restarts the server automatically.

* Install Nodemon
```
$ npm install -g nodemon
```

* Start the project using nodemon
```
$ cd path/to/parking-management-system-api
$ nodemon
```

After using one of the two methods above you can access the API by the following link:
[http://localhost:3000/](http://localhost:3000/).

## Versions
* v1: Ready to use

## FAQ
### What return formats do you support?
Parking Management System API currently returns data in JSON format.

### What kind of authentication is required?
Request access token using the email and password, after that you are good to go just with the access token.

### what are the HTTP methods supported by the API?
- GET
- POST
- PUT
- DELETE
