require('w3-css/w3.css'); 
require('@fortawesome/fontawesome-free/css/fontawesome.min.css');
require('@fortawesome/fontawesome-free/css/solid.min.css');
require('./css/style.css');

const { app } = require( './js/app');
const sw = require('./js/sw-reg');

app();
sw();