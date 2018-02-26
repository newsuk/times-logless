# logless

[![Build Status](https://travis-ci.org/newsuk/times-logless.svg?branch=master)](https://travis-ci.org/newsuk/times-logless) [![Coverage Status](https://coveralls.io/repos/github/newsuk/times-logless/badge.svg?branch=master)](https://coveralls.io/github/newsuk/times-logless?branch=master) [![npm version](https://badge.fury.io/js/%40thetimes%2Flogless.svg)](https://badge.fury.io/js/%40thetimes%2Flogless)

## About

Logless is a lightweight logging library specially crafted for serverless apps.

## Install

```shell
npm install --save @thetimes/logless
```

## Usage

```javascript
const loggerFactory = require("@thetimes/logless");

const config = { logLevel: "debug" };

const log = loggerFactory(config, requestID);

log("something's up!");
```

### Using a custom log function

By default _logless_ uses `console.log` as a log function. But you can define your own by passing it as a config parameter:

```javascript
const loggerFactory = require("@thetimes/logless");

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

* `config` (object): { logLevel, logFn }
  * `logLevel` (string): the level of logging. All levels below this will not be logged
  * `logFn` (function): custom log function (if ommited uses `console.log`)
* `requestId` (string): the id of the request being logged

Returns a log function.

`log(message)`:

* `message` (string): the message to be logged

Returns void.

## Contributing

See the CONTRIBUTING.md for a breakdown of the project
