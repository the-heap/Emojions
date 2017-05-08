const getAllIds = require("../index.js").getAllIds;

const _defaultState = { dom: {} };
const _noValidElements =
  "<div>" + '  <span id="username" />' + '  <button id="button" />' + "</div>";
const _passCondition1 = { dom: { mounts: [] } };

const _singleValidElement =
  "<div>" +
  '  <span id="emojion-skull" />' +
  '  <button id="button" />' +
  "</div>";

const _multipleValidElement =
  "<div>" +
  '  <div id="emojion-banana" />' +
  '  <span id="emojion-skull" />' +
  '  <button id="emojion-rocket" />' +
  "</div>";

describe("getAllIds()", () => {
  it("Should find zero ids", () => {
    document.body.innerHTML = _noValidElements;
    expect(getAllIds(_defaultState)).toEqual(_passCondition1);
  });

  it("Should find a single emojion element", () => {
    document.body.innerHTML = _singleValidElement;
    const currentState = getAllIds(_defaultState);
    expect(currentState.dom.mounts.length).toBe(1);
    expect(currentState.dom.mounts[0].id).toBe("emojion-skull");
  });

  it("Should find two ids", () => {
    document.body.innerHTML = _multipleValidElement;
    const currentState = getAllIds(_defaultState);
    expect(currentState.dom.mounts.length).toBe(3);
    expect(currentState.dom.mounts[0].id).toBe("emojion-banana");
    expect(currentState.dom.mounts[1].id).toBe("emojion-skull");
    expect(currentState.dom.mounts[2].id).toBe("emojion-rocket");
  });
});
