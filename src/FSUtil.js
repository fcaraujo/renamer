'use strict';

const fs = require('fs');

class FSUtil {
  constructor() {}

  async getSorteFiles(sourcePath) {
    const files = await fs.promises.readdir(sourcePath);
    const orderedFiles = files.sort();

    return orderedFiles;
  }
}

module.exports = FSUtil;
