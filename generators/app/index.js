const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
	prompting() {
		// Have Yeoman greet the user.
		this.log(yosay(
			`Welcome to the amazing ${chalk.red('Webapp boilerplate')} generator!`
		));
	}

	writing() {
		this.fs.copy(
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
	}

	install() {
		this.installDependencies();
	}
};
