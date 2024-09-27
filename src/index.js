require('w3-css/w3.css'); 
require('@fortawesome/fontawesome-free/css/fontawesome.min.css');
require('@fortawesome/fontawesome-free/css/solid.min.css');

require('./css/html.css');
require('./css/keyframes.css');
require('./css/classes.css');
require('./css/media.css');

const app = require( './js/app');
const swreg = require('./js/sw-reg');
const nodrag = require('./js/nodrag')

app();
swreg();
nodrag();