/* global window */

import logger from './lib/logger';
import Flickr from './lib/flickr-api';

class App {
	constructor() {
		this.reply = 'Hello';
		this.document = window.document;

		// this.logger = new Logger();
		this.flickr = new Flickr();
	}

	sayHi(name) {
		logger.log(this.reply + ' ' + name);
	}

	loadPortfolioItems() {
		this.flickr.getPhotos().then(data => Flickr.getPhotoSourceURLs(data))
		.then((data) => {
			this.document.querySelectorAll('.Portfolio__item').forEach((media, index) => {
				const pItemImg = media.querySelector('img');
				const pItemTitle = media.querySelector('.Portfolio__title h2');

				pItemImg.src = data[index].url;
				pItemTitle.textContent = data[index].title;
			});
		});
	}
}

export default App;
