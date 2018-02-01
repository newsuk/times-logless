# times-logless

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

## API

**Available log levels:** silly|debug|verbose|info|warn|error

`factory(config, requestId)`:
- `config` (object): { logLevel, logFn }
  - `logLevel` (string): the level of logging. All levels below this will not be logged
  - `logFn` (function): custom log function (if ommited uses `console.log`)
- `requestId` (string): the id of the request being logged

Returns a log function.

`log(message)`:
- `message` (string): the message to be logged

Returns void.

## Contributing

See the CONTRIBUTING.md for an extensive breakdown of the project
