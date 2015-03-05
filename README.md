# grunt-captain-hook

> Insert css and Javascript links into html file

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-captain-hook --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-captain-hook');
```

## The "captain_hook" task

### Overview
In your project's Gruntfile, add a section named `captain_hook` to the data object passed into `grunt.initConfig()`.

#### Basic Injection

```js
grunt.initConfig({
  captain_hook: {
    your_target: {
        template: 'index.html',
        injections: {
            js: ['jquery.js', 'awesome_stuff.js'],
            css: ['reset.css', 'awesome_styling.css']
        }
    }
  }
})
```

Then in your html pages add the directives on where to place css and javascript.

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <!-- begin:css -->
    <!-- end:css -->
  </head>
  <body>
    <!-- begin:js -->
    <!-- end:js -->
  </body>
</html>
```

After running the task it will modify the html file with links and script tags inserted between the directives.


```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <!-- begin:css -->
    <link rel="stylesheet" type="text/css" href="reset.css">
    <link rel="stylesheet" type="text/css" href="awesome_styling.css">
    <!-- end:css -->
  </head>
  <body>
    <!-- begin:js -->
    <script src="jquery.js"></script>
    <script src="awesome_stuff.js"></script>
    <!-- end:js -->
  </body>
</html>
```

#### Multiple blocks

You are not restricted to just using js/css as your injection targets. You can name them anything, and even inject multiple groups of the same filetype.

```js
grunt.initConfig({
  captain_hook: {
    your_target: {
        template: 'index.html',
        injections: {
            js: ['awesome_stuff.js'],
            jsVendor: ['jquery.js'],
            css: ['reset.css', 'awesome_styling.css']
        }
    }
  }
})
```

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <!-- begin:css -->
    <!-- end:css -->
    <!-- begin:jsVendor -->
    <!-- end:jsVendor -->
  </head>
  <body>
    <!-- begin:js -->
    <!-- end:js -->
  </body>
</html>
```


```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <!-- begin:css -->
    <link rel="stylesheet" type="text/css" href="reset.css">
    <link rel="stylesheet" type="text/css" href="awesome_styling.css">
    <!-- end:css -->
    <!-- begin:jsVendor -->
    <script src="jquery.js"></script>
    <!-- end:jsVendor -->
  </head>
  <body>
    <!-- begin:js -->
    <script src="awesome_stuff.js"></script>
    <!-- end:js -->
  </body>
</html>
```

#### Reorder

You can change the order of any injected tag, and it will retain that order when the grunt task is rerun.

```js
grunt.initConfig({
  captain_hook: {
    your_target: {
        template: 'index.html',
        injections: {
            js: ['file1.js', 'file2.js', 'file3.js', 'file4.js', 'file5.js'],
            css: ['reset.css', 'awesome_styling.css']
        }
    }
  }
})
```

The input HTML file below has already had some scripts injected and ordered by the developer.

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <!-- begin:css -->
    <!-- end:css -->
  </head>
  <body>
    <!-- begin:js -->
    <script src="file2.js"></script>
    <script src="file3.js"></script>
    <script src="file1.js"></script>
    <!-- end:js -->
  </body>
</html>
```

After running the grunt task...

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <!-- begin:css -->
    <link rel="stylesheet" type="text/css" href="reset.css">
    <link rel="stylesheet" type="text/css" href="awesome_styling.css">
    <!-- end:css -->
  </head>
  <body>
    <!-- begin:js -->
    <script src="file2.js"></script>
    <script src="file3.js"></script>
    <script src="file1.js"></script>
    <script src="file4.js"></script>
    <script src="file5.js"></script>
    <!-- end:js -->
  </body>
</html>
```

#### SCSS Injection

Captain Hook can also injection references into SCSS files. This is the only alternative type currently supported; but custom templates are coming soon!

```scss
// begin:scss
// end:scss
```

```js
captain_hook: {
  your_target: {
      template: 'main.scss',
      injections: {
          scss: ['file1.scss', 'file2.scss']
      }
  }
```

```scss
// begin:scss
@import "file1.scss";
@import "file2.scss";
// end:scss
```

### Options

#### options.cwd
Type: `String`
Default value: `.`

Path to where to reference all files from (maybe be used for a CDN later).

#### options.nonull
Type: `Boolean`
Default value: `true`

Will return a file path even if it doesn't exist locally. Especially helpful for external links.


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

Tests are written in mocha, and can be run with `npm test`

## Release History
0.1.0 - Initial release.

0.2.0 - Added ability to use arrays in the parameters

0.3.0 - Added ability to use globbing patterns

1.0.0 - Complete rewrite; better testing, modular lib-captain-hook component, and better support for resorting files
