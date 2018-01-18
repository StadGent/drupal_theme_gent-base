#Installation

## Theme compilation

Navigate to the theme directory.
```
cd web/themes/custom/starterkit
```

Rename the directory and all instances of "staterkit" to your desired themename (e.g. "sg_theme").

Go to the source directory.
```
cd source
```


[Install NodeJS](https://nodejs.org/en/download/) and required dev node packages (gulp, ...).
```
$ npm install --only=dev
```

You should be all set and able to run gulp tasks:

#### Development
```
$ gulp
$ gulp watch
```
Running these will watch for SCSS and JS changes inside the source/sass and source/js folders.

```
$ gulp validate
```
This command lets you validate your SCSS and JS files inside the source directory.

#### Compiling for development or production
```
$ gulp compile
$ gulp compile:dev
```
Running these command you can compile your assets into a the build folder. Either without minification (with `gulp compile:dev` or with minification `gulp compile`).


```
$ gulp build
```
Run the `gulp build` command when you are ready and want production code.
