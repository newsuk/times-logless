# Logless

## About

Logless is a lightweight logging library specially crafted for serverless apps.

## Install

```shell
npm install --save @times/logless
```

## Usage

```javascript
const loggerFactory = require("@times/logless");

const config = { logLevel: "debug" };

const log = loggerFactory(config, requestID);

log("something's up!");
```

### Using a custom log function

By default _logless_ uses `console.log` as a log function. But you can define your own by passing it as a config parameter:

```javascript
const loggerFactory = require("@times/logless");

const myCustomLogFunction = msg => process.stdout.write(msg);

const config = {
  logLevel: "warn",
  logFn: myCustomLogFunction
};

const log = loggerFactory(config, requestID);

log("something's up!");
```

## Contributing

See the CONTRIBUTING.md for an extensive breakdown of the project
