import './style.css';

import app from './js/app';
import swreg from './js/sw-reg';
import stopuser from './js/stopuser';

(() => {
[app, swreg, stopuser].forEach(func => func());
});
