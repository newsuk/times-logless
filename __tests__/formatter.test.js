const logFormatter = require("../src/formatter");

describe("Formatter", () => {
  it("exports a function", () => {
    expect(typeof logFormatter).toBe("function");
  });

  describe("when input is string", () => {
    const level = "silly";
    const input = "some log";
    const meta = { requestId: "someid" };

    it("returns expected output", () => {
      const result = logFormatter(level, input, meta);
      const expected = JSON.stringify({ level, message: input, meta });

      expect(result).toBe(expected);
    });
  });

  describe("when input is Error", () => {
    const level = "silly";
    const input = new Error("some log");
    const meta = { requestId: "someid" };

    it("returns expected output", () => {
      const result = logFormatter(level, input, meta);
      const expected = JSON.stringify({
        level,
        message: input.message,
        stack: input.stack,
        meta
      });

      expect(result).toBe(expected);
    });
  });

  describe("when input is object", () => {
    const level = "silly";
    const input = {
      message: "some log",
      data: "some data",
      error: new Error("some error")
    };
    const meta = { requestId: "someid" };

    it("returns expected output", () => {
      const result = logFormatter(level, input, meta);
      const expected = JSON.stringify({
        level,
        message: input.message,
        data: input.data,
        error: { message: input.error.message, stack: input.error.stack },
        meta
      });

      expect(result).toBe(expected);
    });
  });
});
