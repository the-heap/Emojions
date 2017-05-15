const makeEmojionBars = require("../index.js").makeEmojionBars;

const _defaultState = {
  dom: {
    mounts: [
      { className: "emojion-1" },
      { className: "emojion-2" },
      { className: "emojion-3" }
    ]
  },
  emojis: []
};

const _emojionbarval = [
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

describe("getAllIds()", () => {
  it("Should properly init emojion bar values", () => {
    const currentState = makeEmojionBars(_defaultState);
    currentState.emojis.map(emoji => expect(emoji).toEqual(_emojionBarVal));
  });
});
