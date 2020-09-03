#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const yargs = require('yargs');

const argv = yargs
    .usage('Usage: $0 <command>')
    .example('$0 episodes -s source -d destination -i 2 -p prefix')
    .command('episodes', 'Rename episodes! :O', {
        source: {
            alias: 's',
            type: 'string',
        },
        destination: {
            alias: 'd',
            type: 'string',
        },
        counter: {
            alias: 'c',
            type: 'number',
            default: 1,
        },
        prefix: {
            alias: 'p',
            type: 'string',
            default: 'S01E',
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

const copyFrom = async (sourcePath, destinationPath, countFrom, prefix) => {
    const url = new URL(`file://${sourcePath}`)
    const files = await fs.promises.readdir(url);
    const orderedFiles = files.sort();

    let counter = countFrom;
    for (const file of orderedFiles) {
        const extension = path.extname(file)
        const number = counter < 10 ? `0${counter++}` : counter++;
        const result = `${prefix}${number}${extension}`;

        const source = `${sourcePath}/${file}`;
        const destination = `${destinationPath}/${result}`;

        fs.copyFileSync(source, destination, (err) => {
            if (err) {
                console.error(`Failed to copy ${source}`);
                throw err;
            }
        });

        console.log(`> ${file} --> ${result}`);
    }
}

if (argv._.includes('episodes')) {
    const sourceFolder = argv.source;
    const destinationFolder = argv.destination;
    const countFrom = argv.counter;
    const prefix = argv.prefix;

    console.log(`Copying episodes from ${sourceFolder} to ${destinationFolder}:`)
    copyFrom(sourceFolder, destinationFolder, countFrom, prefix).catch(console.error);
}
