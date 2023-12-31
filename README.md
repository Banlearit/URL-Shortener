﻿# Project Name: Simple URL Shortener

## Introduction
Welcome to the Simple URL Shortener repository! This project is a web-based tool that takes long URLs and squeezes them into fewer characters to make a link that is easier to share, tweet, or email to friends.
- You can visit the website at https://web-shorturl.netlify.app/
## Features
- **Shorten URLs**: Turn unwieldy URLs into short, memorable links.
- **CreateQrCode**: Generate a QR code for each URL, providing a quick and contactless way to direct users to your links. Simply scan the QR code with a smartphone camera or QR reader app to access the URL without typing.
- **Instant Search**: Quickly find any URL in your history using the search bar.
- **History**: Access a historical list of frequently visited websites, organized by popularity.
- **Simple UI**: Navigate through a straightforward and intuitive user interface to manage operations with ease.
## Technologies Used
- **Backend**: Node
- **Frontend**: Vue
- **Database**: Mongodb
- Other notable technologies/libraries/plugins used.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
Before you begin, ensure you have met the following requirements:

- **Node.js**: The runtime environment for running the JavaScript code server-side. You can download it from [Node.js official website](https://nodejs.org/).
- **MongoDB**: The NoSQL database used to store the shortened URLs. Install MongoDB from [MongoDB official site](https://www.mongodb.com/try/download/community) or use a cloud-based solution like MongoDB Atlas.
### Installation

``` sh
git clone https://github.com/Banlearit/URL-Shortener.git
npm i
```
create .env for folder frontend
``` dotenv
VITE_API_URL=your-api
```
create .env for folder backend
``` dotenv
MONGO_URI=mongodb://localhost:27017/urlshortener
PORT=3000
FRONTEND_URL=http://localhost:5173
```
#### Run the application:
run backend
``` sh
node app.js
```
run frontend
``` shell
npm run dev 
```

### Contact
- Banlearit Siriboon - banlearit.siri@gmail.com

