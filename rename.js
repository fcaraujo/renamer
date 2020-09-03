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

// console.log(argv)
// const originFolder = 'c:/dev/test';
// const startFrom = 2;
// const destinationFolder = 'c:/dev/test-dest';

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

        // await fs.copyFile(source, destination, (err) => {
        //     if (err) throw err;
        // });

        console.log(`> ${source} --> ${destination}`);
    }
}

if (argv._.includes('episodes')) {
    const sourceFolder = argv.source;
    const destinationFolder = argv.destination;
    const countFrom = argv.counter;
    const prefix = argv.prefix;

    console.log('Renaming episodes:')
    copyFrom(sourceFolder, destinationFolder, countFrom, prefix).catch(console.error);
}
