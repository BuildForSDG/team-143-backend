const express = require('express');
const bodyParser = require('body-parser');
const mongo = require('mongoose');
const ObjectID = require('mongoose').Types.ObjectId;
const cron = require("node-cron");
const request = require('request');
const fs = require('fs');
const http = require('http');
const https = require('https');
const api_key = '';
const DOMAIN = 'localhost';
const mailgun = require('mailgun-js')({apiKey: api_key, domain: DOMAIN});
const PNF = require('google-libphonenumber').PhoneNumberFormat;
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
const currencyFormatter = require('currency-formatter');

var app = express();

app.use(bodyParser.json({limit:'5mb'}));
app.use(bodyParser.urlencoded({extended:true}));

app.use(function(req,res,next){
	res.setHeader('Access-Control-Allow-Origin','*');
	res.setHeader('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT,PATCH,DELETE');
	res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials',true);
	res.setHeader('Content-Type', 'application/json');
	next();
});

var db = mongo.connect("mongodb://127.0.0.1:27017/landRegistry",{ useUnifiedTopology: true , useCreateIndex: true, useNewUrlParser: true, useFindAndModify: false },function(err,response){
	if(err){
		console.log(err);
	}
});

var Schema = mongo.Schema;

var privateKey  = '';
var certificate = '';
var caBundle = '';
var credentials = {key: privateKey, cert: certificate,ca: caBundle };
module.exports = { app, mongo, db, Schema, http, https, credentials ,ObjectID ,mailgun, fs, cron, request, PNF, phoneUtil, currencyFormatter};