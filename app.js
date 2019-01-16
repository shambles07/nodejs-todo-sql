console.log('Running app.js');

const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const _ = require('lodash');
const taskdb = './db/tasks.db';

var argv = require('yargs').argv;
//	.alias('a', 'alljs')
//	.describe('a', 'show all')
//	.usage('Usage: $0 a')
//	.command('alljs', 'show all')

const funcs = require('./crud.js');

var command = argv._[0];

console.log('Running command:',argv);

if (command === 'alljs') {
	funcs.alljs();
} else if (command === 'deletejs') {
	funcs.deletejs();
} else if (command === 'insertjs') {
	funcs.insertjs();
} else if (command === 'selectjs') {
	funcs.selectjs();
} else if (command === 'createjs') {
	funcs.createjs();
} else {
	console.log('Invalid command!');
}
