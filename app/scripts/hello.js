/* global $ */

import Console from './lib/console';

function Hello() {
	this.reply = 'Hello!';

	this.logger = new Console();
}

Hello.prototype.hi = function hi(name) {
	this.logger.log(this.reply + ' ' + name);
};

Hello.prototype.domUpdate = function domUpdate() {
	setTimeout(() => {
		$('body').css('background-color', '#FF7043');
	}, 2000);
};

export default Hello;
