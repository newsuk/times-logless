const logger = require("../src/logless");
const formatter = require("../src/formatter");

describe("Logless", () => {
  it("should export factory function", () => {
    expect(typeof logger).toBe("function");
  });

  describe("when calling factory without a log function, requestId", () => {
    // eslint-disable-next-line no-console
    console.log = jest.fn();

    const log = logger({ logLevel: "silly" });

    it("should use console.log as default and N/A as requestId", () => {
      log.silly("test");
      const expected = JSON.stringify({
        level: "silly",
        message: "test",
        meta: { requestId: "N/A" }
      });

      // eslint-disable-next-line no-console
      expect(console.log).toBeCalledWith(expected);
    });
  });

  describe("when calling factory function with silly level", () => {
    const logFn = jest.fn();
    const log = logger({ logLevel: "silly", logFn }, "foobar");

    it("should return an object with multiple log functions", () => {
      expect(typeof log).toBe("object");
      expect(typeof log.silly).toBe("function");
      expect(typeof log.debug).toBe("function");
      expect(typeof log.verbose).toBe("function");
      expect(typeof log.info).toBe("function");
      expect(typeof log.warn).toBe("function");
      expect(typeof log.error).toBe("function");
    });

    it("should call logFn when calling silly", () => {
      log.silly("foobar");
      expect(logFn.mock.calls.length).toBe(1);
    });

    it("should call logFn when calling debug", () => {
      log.debug("foobar");
      expect(logFn.mock.calls.length).toBe(2);
    });

    it("should call logFn when calling verbose", () => {
      log.verbose("foobar");
      expect(logFn.mock.calls.length).toBe(3);
    });

    it("should call logFn when calling info", () => {
      log.info("foobar");
      expect(logFn.mock.calls.length).toBe(4);
    });

    it("should call logFn when calling warn", () => {
      log.warn("foobar");
      expect(logFn.mock.calls.length).toBe(5);
    });

    it("should call logFn when calling error", () => {
      log.error("foobar");
      expect(logFn.mock.calls.length).toBe(6);
    });
  });

  describe("when calling factory function with debug level", () => {
    const logFn = jest.fn();
    const log = logger({ logLevel: "debug", logFn }, "foobar");

    it("should not call logFn when calling silly", () => {
      log.silly("foobar");
      expect(logFn.mock.calls.length).toBe(0);
    });

    it("should call logFn when calling debug", () => {
      log.debug("foobar");
      expect(logFn.mock.calls.length).toBe(1);
    });

    it("should call logFn when calling verbose", () => {
      log.verbose("foobar");
      expect(logFn.mock.calls.length).toBe(2);
    });

    it("should call logFn when calling info", () => {
      log.info("foobar");
      expect(logFn.mock.calls.length).toBe(3);
    });

    it("should call logFn when calling warn", () => {
      log.warn("foobar");
      expect(logFn.mock.calls.length).toBe(4);
    });

    it("should call logFn when calling error", () => {
      log.error("foobar");
      expect(logFn.mock.calls.length).toBe(5);
    });
  });

  describe("when calling factory function with verbose level", () => {
    const logFn = jest.fn();
    const log = logger({ logLevel: "verbose", logFn }, "foobar");

    it("should not call logFn when calling silly", () => {
      log.silly("foobar");
      expect(logFn.mock.calls.length).toBe(0);
    });

    it("should not call logFn when calling debug", () => {
      log.debug("foobar");
      expect(logFn.mock.calls.length).toBe(0);
    });

    it("should call logFn when calling verbose", () => {
      log.verbose("foobar");
      expect(logFn.mock.calls.length).toBe(1);
    });

    it("should call logFn when calling info", () => {
      log.info("foobar");
      expect(logFn.mock.calls.length).toBe(2);
    });

    it("should call logFn when calling warn", () => {
      log.warn("foobar");
      expect(logFn.mock.calls.length).toBe(3);
    });

    it("should call logFn when calling error", () => {
      log.error("foobar");
      expect(logFn.mock.calls.length).toBe(4);
    });
  });

  describe("when calling factory function with info level", () => {
    const logFn = jest.fn();
    const log = logger({ logLevel: "info", logFn }, "foobar");

    it("should not call logFn when calling silly", () => {
      log.silly("foobar");
      expect(logFn.mock.calls.length).toBe(0);
    });

    it("should not call logFn when calling debug", () => {
      log.debug("foobar");
      expect(logFn.mock.calls.length).toBe(0);
    });

    it("should not call logFn when calling verbose", () => {
      log.verbose("foobar");
      expect(logFn.mock.calls.length).toBe(0);
    });

    it("should call logFn when calling info", () => {
      log.info("foobar");
      expect(logFn.mock.calls.length).toBe(1);
    });

    it("should call logFn when calling warn", () => {
      log.warn("foobar");
      expect(logFn.mock.calls.length).toBe(2);
    });

    it("should call logFn when calling error", () => {
      log.error("foobar");
      expect(logFn.mock.calls.length).toBe(3);
    });
  });

  describe("when calling factory function with warn level", () => {
    const logFn = jest.fn();
    const log = logger({ logLevel: "warn", logFn }, "foobar");

    it("should not call logFn when calling silly", () => {
      log.silly("foobar");
      expect(logFn.mock.calls.length).toBe(0);
    });

    it("should not call logFn when calling debug", () => {
      log.debug("foobar");
      expect(logFn.mock.calls.length).toBe(0);
    });

    it("should not call logFn when calling verbose", () => {
      log.verbose("foobar");
      expect(logFn.mock.calls.length).toBe(0);
    });

    it("should call not logFn when calling info", () => {
      log.info("foobar");
      expect(logFn.mock.calls.length).toBe(0);
    });

    it("should call logFn when calling warn", () => {
      log.warn("foobar");
      expect(logFn.mock.calls.length).toBe(1);
    });

    it("should call logFn when calling error", () => {
      log.error("foobar");
      expect(logFn.mock.calls.length).toBe(2);
    });
  });

  describe("when calling factory function with error level", () => {
    const logFn = jest.fn();
    const log = logger({ logLevel: "error", logFn }, "foobar");

    it("should not call logFn when calling silly", () => {
      log.silly("foobar");
      expect(logFn.mock.calls.length).toBe(0);
    });

    it("should not call logFn when calling debug", () => {
      log.debug("foobar");
      expect(logFn.mock.calls.length).toBe(0);
    });

    it("should not call logFn when calling verbose", () => {
      log.verbose("foobar");
      expect(logFn.mock.calls.length).toBe(0);
    });

    it("should call not logFn when calling info", () => {
      log.info("foobar");
      expect(logFn.mock.calls.length).toBe(0);
    });

    it("should call logFn when calling warn", () => {
      log.warn("foobar");
      expect(logFn.mock.calls.length).toBe(0);
    });

    it("should call logFn when calling error", () => {
      log.error("foobar");
      expect(logFn.mock.calls.length).toBe(1);
    });
  });

  describe("when creating factory function with wrong log level", () => {
    const logFn = jest.fn();
    const log = logger({ logLevel: "unknown", logFn }, "foobar");

    describe("when calling a log function", () => {
      it("should always log error message", () => {
        const expectedLogMessage = formatter(
          "error",
          "LoggerError: Unable to log at level 'unknown'",
          { requestId: "foobar" }
        );

        log.silly("foobar");
        expect(logFn).toBeCalledWith(expectedLogMessage);
      });
    });
  });
});
