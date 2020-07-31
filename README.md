## To reproduce the issue as decribed in the following link

[Unable to use imported/external variables - https://github.com/callstack/linaria/issues/646](https://github.com/callstack/linaria/issues/646)

## Problem statement

### Background and Setup:

This repo contains a minimal setup mocking our actual production setup.

In our project we have a separate package from where we load the variables, function and mixins which are to be used by other packages/components.

Simulating in this example, `stylevars-test` is the package which is published and contains simple exports to variables, function and mixins.
To keep this example simple, I have only added one single variable to the published package. In our actual setup we have a lot of different variables, functions and mixins.

As you can see in the `src/App.js` file, the variables are imported from the external package and then used within the linaria css.

This is source of the example published package that has the variables :

[stylevars-test https://github.com/sambhav-gore/stylevars](https://github.com/sambhav-gore/stylevars)

## Issue:

Until `linaria 2.0.0-alpha.3` this used to compile and work correctly.
After the changes introduced in `linaria 2.0.0-alpha.4` and which are part of `2.0.0-rc.0` as well, our setup and the build does not work correctly and we see the following error (see reproduction instructions):

### Reproduction and Runnning instructions:

#### Success scenario:

1. Clone this repo.
2. Checkout branch `with-2.0.0-alpha.3`
3. `rm -rf node_modules && npm install`
4. `npm run start`
5. Go to http://localhost:8080

You can see that it runs correctly and the padding is applied to the title correctly.

#### Error scenario:

1. Clone this repo.
2. Checkout branch `with-2.0.0-rc-0`
3. `rm -rf node_modules && npm install`
4. `npm run start`
5. Go to http://localhost:8080

It fails to build and run in step 4, with following error message:

```
ERROR in ./src/App.js
Module build failed (from ./node_modules/linaria/loader.js):
TypeError: /home/sambhav/work/playground/linaria/linaria-demo/src/App.js: Cannot destructure property `end` of 'undefined' or 'null'.
    at quasi.quasis.forEach (/home/sambhav/work/playground/linaria/linaria-demo/node_modules/linaria/lib/babel/evaluators/templateProcessor.js:114:21)
    at Array.forEach (<anonymous>)
    at process (/home/sambhav/work/playground/linaria/linaria-demo/node_modules/linaria/lib/babel/evaluators/templateProcessor.js:81:18)
    at state.queue.forEach.item (/home/sambhav/work/playground/linaria/linaria-demo/node_modules/linaria/lib/babel/extract.js:152:39)
    at Array.forEach (<anonymous>)
    at PluginPass.enter (/home/sambhav/work/playground/linaria/linaria-demo/node_modules/linaria/lib/babel/extract.js:152:23)
    at newFn (/home/sambhav/work/playground/linaria/linaria-demo/node_modules/@babel/traverse/lib/visitors.js:175:21)
    at NodePath._call (/home/sambhav/work/playground/linaria/linaria-demo/node_modules/@babel/traverse/lib/path/context.js:55:20)
    at NodePath.call (/home/sambhav/work/playground/linaria/linaria-demo/node_modules/@babel/traverse/lib/path/context.js:42:17)
    at NodePath.visit (/home/sambhav/work/playground/linaria/linaria-demo/node_modules/@babel/traverse/lib/path/context.js:92:31)
```

## PLEASE NOTE:

if the line in the CSS is changed to have only ONE value for `padding` (not repeating the same variable), then Error is Different one, but it still fails to run.
Example change :

```js
padding: ${titlePadding};
```
