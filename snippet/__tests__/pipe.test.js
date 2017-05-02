const pipe = require("../index.js").pipe;

describe("pipe()", () => {
  const functionSpy1 = sinon.spy();
  const functionSpy2 = sinon.spy();
  const result = pipe(functionSpy1, functionSpy2);

  it("returns a function", () => {
    expect(typeof result).toBe("function");
  });

  it("all provided functions are called once when result function is called", () => {
    const calledResult = result();
    expect(functionSpy1.calledOnce).toBe(true);
    expect(functionSpy2.calledOnce).toBe(true);
  });
});
