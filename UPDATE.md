# Update gent_base

Explains the steps to upgrade to newer gent_base theme.

## Upgrade from 7.x > 7.2.x

The styleguide has removed the deprecated sass-lint package an has replaced it
by Stylelint. This requires some changes to the subtheme of gent_base when 
updating from 7.x > 7.2.x or higher.

First update gent_base:

[TODO]

Point your terminal to the source directory within the subtheme of gent_base
within your project.

First update the styleguide version, this should result in a version 7.2.1 or
higher.

```shell
npm update gent_styleguide
```

Remove sass-lint:

```shell
npm remove gulp-sass-lint
```

Install stylelint and plugins:

```shell
npm i -D stylelint@16 stylelint-scss@^6 stylelint-config-standard-scss@^13 stylelint-order@^6 gulp-stylelint-esm 
```

Edit the gulpfile.js in the web/themes/custom/[subtheme_name]/source directory.

First remove the sass-lint import:

```javascript
import sassLint from 'gulp-sass-lint';
```

Add the stylelint import:

```javascript
import stylelint from 'gulp-stylelint-esm';
```

Find the `gulp.task('styles:validate'` task and update its script:

```javascript
/**
 * Validate SCSS files.
 * Includes:
 *  - Stylelint
 */
  gulp.task('styles:validate', () => {
    return _sassFiles()
      .pipe(stylelint({
        failAfterError: false,
        fix: false,
        reporters: [
            { formatter: 'stylish', console: true },
        ],
        debug: false,
      }));
  });
```

Copy the .stylelintignore and .stylelintrc.cjs from the gent_base theme source
directory to web/themes/custom/[subtheme_name]/source directory.

Add the linting related script to package.json:

```json
  "scripts": {
    "build": "gulp build",
    "lint:css": "stylelint \"sass/**/*.scss\"",
    "lint:css:fix": "stylelint \"sass/**/*.scss\" --fix",
    "start": "gulp"
  },
```


