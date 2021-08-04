#!/usr/bin/env node
'use strict';

// TODO: consider the wording 'rename' as it's actually just copying files

const colors = require('colors/safe');
const fs = require('fs');
const path = require('path');
const yargs = require('yargs');

const argv = yargs
  .usage('Usage: $0 <command>')
  .example('$0 episodes -s source -d destination -i 2 -p prefix -dry')
  .command('episodes', 'It renames episodes! :)', {
    source: {
      alias: 's',
      type: 'string',
      describe: 'Source directory which contains the files',
    },
    destination: {
      alias: 'd',
      type: 'string',
      describe: 'Destination directory which files will be copied',
    },
    counter: {
      alias: 'c',
      type: 'number',
      default: 1,
      describe: 'Counter to start copying',
    },
    prefix: {
      alias: 'p',
      type: 'string',
      default: 'S01E',
      describe: 'Prefix to specify the season',
    },
    dryRun: {
      alias: 'dry',
      type: 'boolean',
      default: false,
      describe: 'Run through without making any changes',
    },
  })
  .help()
  .alias('help', 'h').argv;

const executeAsync = async (
  sourcePath,
  destinationPath,
  countFrom,
  prefix,
  isDryRun
) => {
  const files = await fs.promises.readdir(sourcePath);
  const orderedFiles = files.sort();

  let counter = countFrom;
  for (const file of orderedFiles) {
    const extension = path.extname(file);
    const number = counter < 10 ? `0${counter++}` : counter++;
    const result = `${prefix}${number}${extension}`;

    const source = `${sourcePath}/${file}`;
    const destination = `${destinationPath}/${result}`;

    if (!isDryRun) {
      fs.copyFileSync(source, destination, (err) => {
        if (err) {
          console.error(`Failed to copy ${source}`);
          throw err;
        }
      });
    }

    console.log(`> ${file} --> ${result}`);
  }
};

if (argv._.includes('episodes')) {
  const sourceFolder = argv.source;
  const destinationFolder = argv.destination;
  const countFrom = argv.counter;
  const prefix = argv.prefix;
  const isDryRun = argv.dryRun;

  // Console command message
  const commandTitle = (isDryRun) ? 'Dry running' : 'Copying episodes';
  const titleColor = colors.bgBrightCyan.black;

  console.log(
    titleColor(`${commandTitle} from ${sourceFolder} to ${destinationFolder}:`)
  );

  // Execute copy action
  const action = executeAsync(
    sourceFolder,
    destinationFolder,
    countFrom,
    prefix,
    isDryRun
  );

  action.catch(console.error);
}
