console.log('Running app.js');

const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');
const taskdb = './db/tasks.db';

const funcs = require('./crud.js');

const argv = yargs.argv;
var command = argv._[0];

console.log('Running command:',command);

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
