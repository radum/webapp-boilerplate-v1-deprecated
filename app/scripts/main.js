/* global document */

// Global imports
import 'babel-polyfill';
import 'whatwg-fetch';
import fastClick from 'fastclick';
import App from './app';

// Eliminates the 300ms delay between a physical tap
// and the firing of a click event on mobile browsers
// https://github.com/ftlabs/fastclick
fastClick(document.body);

const app = new App();

app.sayHi('RaduM');
app.loadPortfolioItems();
