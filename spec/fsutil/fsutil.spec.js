'use strict';

const FSUtil = require('../../src/FSUtil');

describe('FSUtil', () => {
  const currentPath = __dirname;
  let fsUtil;

  beforeEach(() => {
    fsUtil = new FSUtil();
  });

  it('should return 0 files for an empty folder', async () => {
    // Arrange
    const emptyFolder = `${currentPath}/empty`;
    const expected = 0;

    // Act
    const files = await fsUtil.getSorteFiles(emptyFolder);

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
