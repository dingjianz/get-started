var express = require('express')
var path = require('path')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var compression = require('compression')
var ejs = require('ejs')
ejs.delimiter = '$'
var isProduct = process.env.NODE_ENV !== 'development'