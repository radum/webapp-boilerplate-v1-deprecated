/* global $ */

import Console from './lib/console';

class Hello {
	constructor() {
		this.reply = 'Hello!';
		this.logger = new Console();
	}

	static hi(name) {
		this.logger.log(this.reply + ' ' + name);
	}

	static domUpdate() {
		setTimeout(() => {
			$('body').css('background-color', '#FF7043');
		}, 2000);
	}
}

export default Hello;
