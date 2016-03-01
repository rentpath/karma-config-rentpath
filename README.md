# karma-config-rentpath
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

## Distribution
Execute one of the following commands
```bash
npm version patch -m "Bumped to %s"
npm version minor -m "Bumped to %s"
npm version major -m "Bumped to %s"
```
