# PhotoEz

PhotoEZ app is a solution for organzing your favorite photo albums online. Users can share their favorite images with a easy click.

## Features

* Organize your favorite photos in albums
* Upload and backup your photos in a cloud server
* Add users' comments  
* Ability to like and dislike a photo
* View other users' photos online

## Setup

1. The project uses postgresql. Visit their  [offical website](https://www.postgresql.org/download/) to install it on your system.

## Installation

If you want to install the project on your local machine, please follow the steps below.

1. Download the zip file or clone the github repository
2. Navigate to the root project folder
3. Type ```yarn install``` in your terminal to build project dependencies
4. Run db migration with sequelize-cli
  * Type ```sequelize db:migrate``` in terminal
  * Run the seed file ```sequelize db:seed:all``` to pre-populate with data (optional)
5. ```yarn start``` to start the server.
6. Once the server started, type the address ```http://localhost:3000``` on your favorite browser.
7. Enjoy!

## Usage

* The app is also deployed to heroku.

* [Click here to visit](https://photoez.herokuapp.com/)

## Built with

* [cloudinary API](http://cloudinary.com/documentation/upload_images) - A framework for uploading images to cloud server
* [Passport.js](http://passportjs.org/docs) - A javascript library for handling user authentication
