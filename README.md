# VD KeyValue Store
A REST-API version controlled key-value store.

## Technologies
Dependencies:
* mongodb (running on port `27017`)

This project uses: 
* node
* express

Development Tools:
* mocha
* chai
* chai-http
* nodemon
* postman (not listed in package.json)


## Setup
To run this project, download and install via:
```
$ git clone https://github.com/gabrielwu84/vd-keyvalue-store.git
$ cd vd-keyvalue-store
$ npm install
```

(Please ensure _mongodb_ is installed and running on port `27017`. Instructions for installing _mongodb_ can be found [here](https://docs.mongodb.com/manual/administration/install-community/).)

To run server, execute: 
`npm start`

To run test cases, execute: 
`npm test`

## Features/Usage
An excellent tool for executing the following REST API request is [postman](https://www.postman.com/). 

Add/update key via `/POST /object` with the following in the body `{"value"; "value1"}`

(The following can be done in the browser)

Retrieve key via `/GET /object/mykey`. 

http://gabrielwu84.ddns.net:3000/object/mykey

Retrieve previous versions of key via `/GET /object/mykey?timestamp=1621231007704`

http://gabrielwu84.ddns.net:3000/object/mykey?timestamp=1621231007704