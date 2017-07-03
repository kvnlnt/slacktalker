const alpha = require('./alpha.json');
const package = require('./package');
const commander = require('commander');


// SETUP

commander.version(package.version);

// COMMANDS

commander
    .command('say <words...>')
    .option("-p, --primary-char <primaryChar>", "Primary character", '#')
    .option("-s, --secondary-char <secondaryChar>", "Secondary character", '-')
    .action(function (words, options) {
        var row;
        var letter;
        words.forEach(function (word) {
            for (var i = 0; i < 7; i++) {
                row = "";
                for (var j = 0; j < word.length; j++) {
                    var letter = alpha[word[j].toUpperCase()][i];
                    if (j > 0) letter = letter.substring(1); // compress letters
                    letter = letter.replace(/#/g, options.primaryChar)
                        .replace(/-/g, options.secondaryChar); // replace with slack chars
                    row += letter;
                }
                console.log(row);
            }
        });
    });


if (!process.argv.slice(2)
    .length) {
    commander.outputHelp();
}

// RUN

commander.parse(process.argv);