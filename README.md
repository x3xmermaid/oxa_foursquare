<h1 align="center">ExpressJS - OXA Four square Level badge</h1>

<p align="center">
  <a href="https://nodejs.org/">
    <img alt="restfulapi" title="Restful API" src="https://cdn-images-1.medium.com/max/871/1*d2zLEjERsrs1Rzk_95QU9A.png">
  </a>
</p>

## Table of contents
* [Introduction](#introduction)
* [Requirements](#requirements)
* [How to run the app ?](#how-to-run-the-app-)
* [End Point List](#end-point-list)

## Introduction
[![Express.js](https://img.shields.io/badge/Express.js-4.x-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html)
[![Node.js](https://img.shields.io/badge/Node.js-v.10.16-green.svg?style=rounded-square)](https://nodejs.org/)

Here i was built the oxa foursquare badge level. in this application you must check in to upgrade your badge level, 
you can check in different location all day, but you can just only checkin one day in one location. if check-in meets 
the requirements then the level badge will go up. you must login to check-in

Express.js, or simply Express, is a web application framework for Node.js. [More about Express](https://en.wikipedia.org/wiki/Express.js)

## Requirements
1. node_modules
2. Postman
3. Web Server (ex. localhost)

## How to run the app ?
1. Open CMD or Terminal and enter to the app directory
2. Type `npm install`
3. Turn on Web Server and MySQL can using Third-party tool like xampp, etc.
4. import database to mysql
5. Open Postman desktop application or Chrome web app extension that has installed before
6. Choose HTTP Method and enter request url.(ex. localhost:3000/notes)
7. You can see all the end point [here](#end-point-list)

## Set up connect.js file
Open .env file on your favorite code editor, and copy paste this code below :
```
DB_HOST=localhost
DB_USER=root // default
DB_PASS= // default
DB_NAME=oxa_badge
```

## End Point List
**1. USER**
* post(`/user`) (create new user)
* post('/login') (login api to get token)
  body form json for user<br>
  {
    email: "",
    password: "",
  }

**2. BADGE**
* get(`/badge`) (get badge )
* post(`/badge`) (create new badge )
* patch(`/badge/:id`) (update badge )
* delete(`/badge/:id`) (delete badge )
 body form json for user<br>
  {
    name: "",
    check_in: "",
    level: "",
  }

**3. LOCATION**
* get(`/location`) (get location )
* post(`/location`) (post location )
* patch(`/location/:id`) (update location )
* delete(`/location/:id`) (delete location)
 body form json for user<br>
  {
    name: "",
    check_in: "",
    level: "",
  }

**4. Check In**
* get(`/userbadge`) (get data user with badge)
* get(`/allBadge`) (get all data user with badge)
* patch(`/checkIn`) (check in )
 body form json for checkin<br>
  {
    id_location: "",
  }
<hr>

## Screenshot from the app
<p align='center'>
  <span>
    <img src='https://res.cloudinary.com/dvyonb6zt/image/upload/v1565762778/e_esumjh.png' />
    <img src='https://res.cloudinary.com/dvyonb6zt/image/upload/v1565762778/b_oyao5r.png' />
    <img src='https://res.cloudinary.com/dvyonb6zt/image/upload/v1565762778/a_uhhmc4.png' />
    <img src='https://res.cloudinary.com/dvyonb6zt/image/upload/v1565762778/c_qtsrrb.png' />
    <img src='https://res.cloudinary.com/dvyonb6zt/image/upload/v1565762778/d_usnqbu.png' />
  </span>
</p>

