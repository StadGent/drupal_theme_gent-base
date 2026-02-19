# Installation

## Theme compilation

Navigate to the theme directory.
```
cd web/themes/custom/starterkit
```

Rename the directory and all instances of "starterkit" to your desired
themename (e.g. "sg_theme").

Go to the source directory.
```
cd source
```

[Install NodeJS](https://nodejs.org/en/download/) and required node
packages (gulp, ...).

```
$ npm install
```

You should be all set and able to run gulp tasks:

#### Development

```
$ gulp
$ gulp watch
```

Running these will watch for SCSS and JS changes inside the source/sass and
source/js folders.

```
$ gulp validate
```

This command lets you validate your SCSS and JS files inside the source
directory.

#### Compiling for development or production

```
$ gulp compile
$ gulp compile:dev
```

Running these command you can compile your assets into a the build folder.
Either without minification (with `gulp compile:dev` or with minification
`gulp compile`).

```
$ gulp build
```

Run the `gulp build` command when you are ready and want production code.

## CKEditor in-editor styling

For setup and extension details, see:
`/themes/contrib/gent_base/README.md`
section: `CKEditor CSS build flow`.

Starterkit defaults to the base stylesheet from `gent_base`.
`source/sass/ckeditor5.project.scss` is optional and can be removed if unused.
