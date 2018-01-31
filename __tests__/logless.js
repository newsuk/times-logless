const logger = require("../src/logless");
const formatter = require("../src/formatter");

describe("Logless", () => {
  it("should export factory function", () => {
    expect(typeof logger).toBe("function");
  });

  describe("when calling factory function", () => {
    const logFn = jest.fn();
    const log = logger({ logLevel: "verbose", logFn }, "foobar");

    it("should return an object with multiple log functions", () => {
      expect(typeof log).toBe("object");
      expect(typeof log.silly).toBe("function");
      expect(typeof log.debug).toBe("function");
      expect(typeof log.verbose).toBe("function");
      expect(typeof log.info).toBe("function");
      expect(typeof log.warn).toBe("function");
      expect(typeof log.error).toBe("function");
    });

    describe("when calling a log function", () => {
      it("should call logFn function", () => {
        log.warn("foobar");
        expect(logFn.mock.calls.length).toBe(1);
      });

      it("should not call logFn if level does not match", () => {
        log.debug("foobar");
        expect(logFn.mock.calls.length).toBe(1);
      });
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
