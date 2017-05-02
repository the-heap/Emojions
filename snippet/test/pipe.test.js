const pipe = require("../index.js").pipe;

describe("pipe()", () => {
  const functionSpy1 = sinon.spy();
  const functionSpy2 = sinon.spy();
  const result = pipe(functionSpy1, functionSpy2);

  it("returns a function", () => {
    expect(typeof result).toBe("function");
  });

  it("calls all functions that are provided as arguments", () => {
    const calledResult = result();
    expect(functionSpy1.calledOnce).toBe(true);
    expect(functionSpy2.calledOnce).toBe(true);
  });
});
