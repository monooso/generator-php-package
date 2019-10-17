# PHP package generator

[![Build Status](https://img.shields.io/travis/monooso/generator-php-package.svg)](https://travis-ci.org/monooso/generator-php-package)
[![NPM Version](https://img.shields.io/npm/v/@monooso/generator-php-package.svg)](https://www.npmjs.org/package/@monooso/generator-php-package)

## Overview
Yeoman generator for scaffolding a generic PHP package. Generates the following files, based on the information you provide:

- `src/.gitkeep`
- `tests/.gitkeep`
- `.editorconfig`
- `.gitignore`
- `.huskyrc.js`
- `.nvmrc`
- `.php_cs.dist`
- `.scrutinizer.yml`
- `.travis.yml`
- `CHANGELOG.md`
- `composer.json`
- `LICENSE.txt`
- `package.json`
- `phpinsights.php`
- `phpunit.xml`
- `README.md`

## Installation
Install [Yeoman](https://yeoman.io) and this package using [npm](https://npmjs.com).

```
npm install -g yo
npm install -g @monooso/generator-php-package
```

## Usage

```
yo @monooso/php-package
```

## License
This is open source software, released under [the MIT license](https://github.com/monooso/generator-laravel-package/blob/master/LICENSE.txt).
