# Update `gent_base`

This guide describes how to upgrade your project to a newer version of the
`gent_base` theme.

## Upgrade from `7.x` to `7.2.x`

From `7.2.x` onwards, the styleguide no longer uses the deprecated `sass-lint`
package. It has been replaced by **Stylelint**. If your project uses a
`gent_base` subtheme, you’ll need to update that subtheme accordingly when
upgrading from `7.x` to `7.2.x` (or higher).

### 1) Update `gent_base`

```shell
composer require gent-drupal/gent_base:^7.2.0
```

### 2) Go to your subtheme source directory

Open a terminal and navigate to the `source` folder of your `gent_base`
subtheme:

`web/themes/custom/[subtheme_name]/source`

Make sure you are using the node version within the project:

```shell
nvm use
```

### 3) Remove sass-lint

```shell
npm remove gulp-sass-lint
```

or

```shell
yarn remove gulp-sass-lint
```

And delete the `.sass-lint.yml` file in the source directory.

### 4) Install Stylelint and required plugins

```shell
npm i -D stylelint@16 \
  stylelint-scss@^6 \
  stylelint-config-standard-scss@^13 \
  stylelint-order@^6 \
  stylelint-config-property-sort-order-smacss@10 \
  gulp-stylelint-esm
```

or

```shell
yarn add -D stylelint@16 \
  stylelint-scss@^6 \
  stylelint-config-standard-scss@^13 \
  stylelint-order@^6 \
  stylelint-config-property-sort-order-smacss@10 \
  gulp-stylelint-esm
```

### 5) Update your gulpfile.js

Edit gulpfile.js in: `web/themes/custom/[subtheme_name]/source`.

Remove the sass-lint import:

```js
import sassLint from 'gulp-sass-lint';
```

Add the Stylelint import:

```js
import stylelint from 'gulp-stylelint-esm';
```

Find the `gulp.task('styles:build'` task and replace its implementation with
(replace sass lint by stylelint):

```js
/**
 * Styles build task.
 *
 * Includes:
 * - Sass globbing
 * - SCSS linting
 * - Compresssed output style
 * - Autoprefixer
 */
gulp.task('styles:build', function () {
  return gulp.src(globalConfig.sassDir + '/**/*.s+(a|c)ss')
    .pipe(plumber())
    .pipe(sassGlob())
    .pipe(sourcemaps.init())
    .pipe(stylelint({
      failAfterError: true,
      fix: false,
      reporters: [
        { formatter: 'stylish', console: true },
      ],
      debug: false,
    }))
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: SASS_LOAD_PATHS,
      loadPaths: SASS_LOAD_PATHS,
    })).on('error', sass.logError)
    .pipe(autoprefixer())
    .pipe(postcss([calc]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(globalConfig.cssDir));
});
```

Then find the `gulp.task('styles:validate'` task and replace its implementation
with:

```js
/**
 * Validate SCSS files.
 *
 * Includes:
 *  - Stylelint
 */
gulp.task('styles:validate', () => {
  return gulp.src(globalConfig.sassDir + '/**/*.s+(a|c)ss')
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

### 6) Copy Stylelint configuration files

Copy these files from the gent_base theme source directory into your subtheme
source directory:

- `.stylelintignore`
- `.stylelintrc.cjs`

Target location: `web/themes/custom/[subtheme_name]/source`.

### 7) Add lint scripts to package.json

Add the following `lint:` scripts to `package.json`:

```json
  "scripts": {
    "build": "gulp build",
    "lint:css": "stylelint \"sass/**/*.scss\"",
    "lint:css:fix": "stylelint \"sass/**/*.scss\" --fix",
    "start": "gulp"
  }
```

### 8) Fix issues reported by Stylelint

Run Stylelint to check for issues:

```shell
npm run lint:css
```

Stylelint can often fix a portion of the issues automatically:

```shell
npm run lint:css:fix
```

Fix the remaining issues by hand.

### 9) Remove usage of stylelint shortcuts

The gent_base sass provides shortcuts to use the grid, icons and buttons mixins.
These are now deprecated.

Remove the `'../../../contrib/gent_base/source/sass/shortcuts',` and
`contrib/gent_base/source/node_modules/breakpoint-sass/stylesheets` directories
from the `SASS_LOAD_PATHS`:

```scss
const SASS_LOAD_PATHS = [
  '../../../contrib/',
  '../../../contrib/gent_base/build',
  '../../../contrib/gent_base/source/sass/shortcuts', // REMOVE THIS LINE
  '../../../contrib/gent_base/source/node_modules/breakpoint-sass/stylesheets', // AND THIS LINE
  '../../../custom/',
];
```

Replace the shortcuts usages by the actual files from the styleguide:

Grid mixins:

```scss
-@use 'gent_styleguide/grid-mixins' as *;
+@use 'styleguide/sass/11-base/grid/flexbox-grid/mixins/grid-mixins' as *;
```

Icon mixins:

```scss
-@use 'gent_styleguide/icon-mixins' as *;
+@use 'styleguide/sass/11-base/fonts/icons' as *;
```

Button mixins (all, or use the specific files who are needed):

```scss
-@use 'gent_styleguide/button-mixins' as *;
+@use 'styleguide/sass/21-atoms/button/button' as *;
```

### 10) Commit changes

Commit the changes, the update is now finished.
