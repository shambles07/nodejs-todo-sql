const _ = require('lodash');
const yargs = require('yargs');
const argv = yargs.argv;
var command = argv._[0];
// run child process
const { exec } = require('child_process');
// run from stdin
exec(command, (err, stdout, stderr) => {
	if (err) {
		// node couldn't execute the command
		return;
	}
	// buffered output of stdout
	console.log(`${stdout}`);
});
