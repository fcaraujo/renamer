# Renamer
NodeJS script to rename files, first it copies all files from source path (picking alphabetically) then paste following the pattern S01E01.

**P.S.:** it keeps the original files, remember to delete them if you want.

# Usage
Basically you just need NodeJS and NPM, so you just clone the repo then install the package's dependencies running `npm i`.
```js
$ node rename help
Usage: rename <command>

Commands:
  rename episodes  Rename episodes! :O

Options:
  --version   Show version number                                      [boolean]
  --help, -h  Show help                                                [boolean]

Examples:
  rename episodes -s source -d destination -i 2 -p prefix
```

```js
$ node rename episodes help
rename episodes

Rename episodes! :O

Options:
  --version          Show version number                               [boolean]
  --help, -h         Show help                                         [boolean]
  --source, -s                                                          [string]
  --destination, -d                                                     [string]
  --counter, -c                                            [number] [default: 1]
  --prefix, -p                                        [string] [default: "S01E"]

```

# Examples:
Simplest case for the first season:

`node rename episodes -s ../../media/animes/S01/rename/ -d ../../media/animes/S01/`

Optionally you can change the prefix passing `-p S02E` for instance; and the initial counter passing `-i 2`:

`node rename episodes -s ../../media/animes/S02/rename/ -d ../../media/animes/S02/ -p S02E -i 5`
