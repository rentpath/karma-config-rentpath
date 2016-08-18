# karma-config-rentpath
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=plastic)](https://github.com/semantic-release/semantic-release)

Shared Karma config for our apps

## Installation
```bash
$ npm i --save-dev karma-config-rentpath
```

## Usage
The most minimal usage would be to create a `karma.conf.js` file in the root of your app with the following content:
```javascript
module.exports = require('karma-config-rentpath')
```

And then set up an entry file to load the tests at path `/spec/javascripts/tests.bundle.js`:
```javascript
var context = require.context('.', true, /.+_spec\.(coffee|js|jsx)$/);
context.keys().forEach(context);
module.exports = context;
```

If your app requires [jasmine-jquery](https://github.com/velesin/jasmine-jquery) or [jasmine-flight](https://github.com/flightjs/jasmine-flight) you will need to import them at the top of the entry file:
```javascript
require('jasmine-jquery')
require('webpack-jasmine-flight')
```

If your app has special needs, you'll want to apply the shared configuration then any custom configuration. For example:

```javascript
var configure = require('karma-config-rentpath')

module.exports = function(config) {
  // Apply shared configuration
  configure(config)

  // Custom app-specific configuration
  config.files.push('some/extra/file')
}
```

### Running tests

Make sure your app's `package.json` has entries in `scripts` like these:
```json
"test": "karma start --single-run",
"watch:test": "karma start",
```
Kick off either of these with `npm run` (for example: `npm run watch:test`).

Note that the `test` script is a special name and can be run with these shortcuts:
```
# No need to say `run`:
npm test

# Or even more tersely:
npm t
```

## Scripts
* `npm run compile` - Compiles the module to disk (~/lib).
* `npm run compile:watch` - Same as `npm run compile` but watches files for changes.
* `npm run lint` - Lints all files.
* `npm run lint:fix` - Lints all files and attempts to fix any issues.
* `npm run test` - Runs unit tests.
* `npm run test:watch` - Same as `npm test` but watches files for changes.
* `npm run test:cov` - Generates a test coverage report.

## Commitizen
`karma-config-rentpath` uses [Commitizen](https://commitizen.github.io/cz-cli/) to format commit messages.

* Install it globally `$ npm install -g commitizen`

Once you are ready to commit, follow the familiar github workflow, with a slight change.

```
$ git add <files>
$ git cz
```

`$ git cz` will bring up the Commitizen commit prompt, follow the instructions, and `$ git push` as usual.

`Commitizen` formatted commit messages are used with [Semantic-Release](https://github.com/semantic-release/semantic-release) to push new versions to `NPM`. RentPath's NPM packages can be found [here](https://www.npmjs.com/~rentpath).

See the [commitizen-cli docs](https://github.com/commitizen/cz-cli) for information regarding `commit` message format.

