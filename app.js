const alpha = require('./alpha.json');
const emoticons = require('./emoticons');
const package = require('./package');
const commander = require('commander');
const chalk = require('chalk');


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
            word = word.replace(/[^a-zA-Z]+/g, "")
                .toUpperCase();

            console.log("\n", chalk.red(word), "\n");

            // preview version
            try {
                for (var i = 0; i < 7; i++) {
                    row = "";
                    for (var j = 0; j < word.length; j++) {
                        var letter = alpha[word[j]][i];
                        if (j > 0) letter = letter.substring(1); // compress letters
                        letter = letter.replace(/#/g, options.primaryChar)
                            .replace(/-/g, options.secondaryChar); // replace with slack chars
                        row += letter;
                    }
                    var previewRow = row.replace(new RegExp(options.primaryChar, "g"), "\\u" + emoticons[options.primaryChar])
                        .replace(new RegExp(options.secondaryChar, "g"), "\\u" + emoticons[options.secondaryChar]);
                    console.log(eval("'" + previewRow + "'"));
                }
            } catch (err) {
                console.log("Unfortunately one of your emoticons isn't available for preview, so here's the default preview: \n");
                for (var i = 0; i < 7; i++) {
                    row = "";
                    for (var j = 0; j < word.length; j++) {
                        var letter = alpha[word[j]][i];
                        if (j > 0) letter = letter.substring(1); // compress letters
                        row += letter;
                    }
                    console.log(row);
                }
            }


            console.log();

            // translated version
            for (var i = 0; i < 7; i++) {
                row = "";
                for (var j = 0; j < word.length; j++) {
                    var letter = alpha[word[j]][i];
                    if (j > 0) letter = letter.substring(1); // compress letters
                    letter = letter.replace(/#/g, options.primaryChar)
                        .replace(/-/g, options.secondaryChar); // replace with slack chars
                    row += letter;
                }
                console.log(row);
            }

        });
        console.log();
    });


if (!process.argv.slice(2)
    .length) {
    commander.outputHelp();
}

// RUN

commander.parse(process.argv);