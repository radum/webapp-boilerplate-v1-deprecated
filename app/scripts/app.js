/* global $ */

import Logger from './lib/logger'
import Flickr from './lib/flickr-api';

class App {
	constructor() {
		this.reply = 'Hello';

		this.logger = new Logger();
		this.flickr = new Flickr();
	}

	sayHi(name) {
		this.logger.log(this.reply + ' ' + name);
	}

	loadPortfolioItems() {
		this.flickr.getPhotos().then((data) => {
			return this.flickr.getPhotoSourceURLs(data);
		}).then((data) => {
			document.querySelectorAll('.Portfolio__item').forEach((media, index) => {
				media.querySelector('img').src = data[index].url;
				media.querySelector('.Portfolio__title h2').textContent = data[index].title;
			});
		});
	}
}

export default App;
