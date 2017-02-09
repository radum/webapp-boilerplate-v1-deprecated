/**
* Yeoman Generator Starter Kit
*
* Copyright © 2016-present RaduM. All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE.txt file in the root directory of this source tree.
*/

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
	prompting() {
		// Have Yeoman greet the user.
		this.log(yosay(
			`Welcome to the amazing ${chalk.red('Webapp boilerplate')} generator!`
		));
	},

	writing() {
		this.fs.copyTpl(
			this.templatePath('**/*'),
			this.destinationRoot(),
			{
				globOptions: {
					dot: true,
					ignore: [
						'**/.git',
						'**/.npmignore',
						'**/CONTRIBUTING.md',
					],
				},
			}
		);
	},

	install() {
		this.installDependencies();
	}
};
