const makeEmojionBars = require("../index.js").makeEmojionBars;

const _defaultState = {
  dom: {
    mounts: [{ id: "emojion-1" }, { id: "emojion-2" }, { id: "emojion-3" }]
  },
  emojis: []
};

const _emojionBarVal = [
  {
    icon: "😅",
    count: 0
  },
  {
    icon: "🗻",
    count: 0
  },
  {
    icon: "⚓",
    count: 0
  },
  {
    icon: "🌵",
    count: 0
  },
  {
    icon: "🚀",
    count: 0
  }
];

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
  it("Should properly init emojion bar values", () => {
    const currentState = makeEmojionBars(_defaultState);
    currentState.emojis.map(emoji => expect(emoji).toEqual(_emojionBarVal));
  });
});
