// Global imports
import 'babel-polyfill';
import 'whatwg-fetch';

import FastClick from 'fastclick';

import App from './app';

const app = new App();

// Eliminates the 300ms delay between a physical tap
// and the firing of a click event on mobile browsers
// https://github.com/ftlabs/fastclick
FastClick.attach(document.body);

app.sayHi('RaduM');
app.loadPortfolioItems();
