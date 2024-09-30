import 'w3-css/w3.css'; 
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import '@fortawesome/fontawesome-free/css/solid.min.css';

import './css/html.css';
import './css/keyframes.css';
import './css/classes.css';
import './css/media.css';

import app from './js/app';
import swreg from './js/sw-reg';
import stopuser from './js/stopuser';

(() => {
[app, swreg, stopuser].forEach(func => func());
});
