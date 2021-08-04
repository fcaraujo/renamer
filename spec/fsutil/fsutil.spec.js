'use strict';

const fs = require('fs');

const FSUtil = require('../../src/FSUtil');

describe('FSUtil', () => {
  const currentPath = __dirname;
  let fsUtil;

  beforeEach(() => {
    fsUtil = new FSUtil();
  });

  it('should return 0 files for an empty folder', async () => {
    // Arrange
    const emptyDir = `${currentPath}/empty`;
    const expected = 0;
    
    const hasDirectory = fs.existsSync(emptyDir);
    if (!hasDirectory) {
      fs.mkdirSync(emptyDir);
    }

    // Act
    const files = await fsUtil.getSorteFiles(emptyDir);

    // Assert
    expect(files.length).toBe(expected);
  });

  it('should return 2 files for the a-b folder', async () => {
    // Arrange
    const abFolder = `${currentPath}/a-b`;
    const expected = 2;

    // Act
    const files = await fsUtil.getSorteFiles(abFolder);

    // Assert
    expect(files.length).toBe(expected);
  });
});
