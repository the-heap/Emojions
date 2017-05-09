~(function() {
  // =====================================================
  // SETUP (vars, conts, function pipe)
  // =====================================================

  // Constants
  const EMOJION_ID = "emojion";
  const EMOJION_NAMESPACE = "emjn_"; // Different to ID
  const STYLE_ID = EMOJION_NAMESPACE + "style";

  const EMOJION_STAMP = () => [
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

  // State to pass through function pipeline
  var state = {
    dom: {
      mounts: [],
      containers: []
    },
    emojis: {}
  };

  /**
   * The All Magical, Beautiful Function Pipe!
   * Creates a function which will run a series of functions into one another in the provided order.
   * Since it returns a function, this can be reused as a function provided with newly provided arguments.
   *
   * @param {...Function} functions An unknown number of functions, add as many as you require.
   * @returns {Function} A single function that can be called to run all provided functions on given
   * data in the originally provided order.
   */
  function pipe(...functions) {
    return functions.reduce((accumulatedFuncs, currentFunc) => (...args) =>
      currentFunc(accumulatedFuncs(...args)));
  }

  // =====================================================
  // THE FUNCTION PIPE IN ACTION!!!
  // =====================================================

  const render = pipe(
    addStylesheet,
    populateStylesheet,
    getAllIds,
    makeEmojionBars,
    makeContainers,
    populateContainers,
    incrementEmojiCount
  )(state);

  // =====================================================
  // Create the functions that will feed into the pipe.
  // =====================================================

  /**
   * Create the style element to style our emoji bar,
   * add an id to it and append it to the head of the page
   * @param {object} state
   * @returns {object} state
   */
  function addStylesheet(state) {
    let styleElement = document.createElement("style");
    let stylesheet = styleElement.sheet;
    let styleId = document.createAttribute("id");

    styleId.value = STYLE_ID;
    styleElement.setAttributeNode(styleId);
    document.head.appendChild(styleElement);
    return state;
  }

  /**
   * Insert styles into the DOM via our <style> tag
   * @param {object} state
   * @returns {object} state
   */
  function populateStylesheet(state) {
    var style = document.getElementById(STYLE_ID);

    // Style emojion bars
    style.innerHTML = `
      .emojion__container {
        display: flex;
        justify-content: center;
        margin: 10px 0;
        width: auto;
      }

      @media screen and (max-width: 320px) {
        .emojion__container {
          flex-flow: column;
        }
      }

      .emojion__single {
        background: #fff;
        border-bottom: 1px solid #eee;
        border-left: 0;
        border-right: 0;
        border-top: 1px solid #eee;
        box-sizing: content-box;
        display: inline-block;
        flex: 1 0 auto;
        font-size: 16px;
        margin: 0;
        min-width: 7px;
        outline: 0;
        padding: 5px 10px 8px;
        transition: background 0.25s ease;
        width: auto;
      }

      .emojion__single:first-of-type {
        border-left: 1px solid #eee;
      }

      .emojion__single:last-of-type {
        border-right: 1px solid #eee;
      }

      .emojion__single:hover {
        cursor: pointer;
      }

      .emojion__container:hover .emojion__single {
        background: #efefef;
      }

      .emojion__container .emojion__single:hover {
        background: #fff;
      }
  `;

    return state;
  }

  /**
   * Get all the ids from the page,
   * filter out the ones we want to mount emojion bar on
   * @param {object} state
   * @returns {object} state
   */
  function getAllIds(state) {
    const ids = [...document.querySelectorAll("[id]")]; // -> converts nodelist to array
    const mounts = ids.filter(node => node.id.includes(EMOJION_ID));
    state.dom.mounts = mounts;
    return state;
  }

  /**
   * Loop through the dom elements that need an emojion bar
   * Generate a new emojio stamp for that dom element.
   * @param {object} state
   * @returns {object} state - now with emoji structures
   */
  function makeEmojionBars(state) {
    state.dom.mounts.forEach(mount => {
      state.emojis[mount.id] = EMOJION_STAMP();
    });
    return state;
  }

  /**
   * Create our own dom element to actually mount our emojion bar in
   * This is different than the mounts that user specifices for where they want the bar.
   * TODO: Rename this.
   * @param {obj} state
   * @returns {obj} state - our custom dom containers for our emoji bars
   */
  function makeContainers(state) {
    state.dom.mounts.forEach(mount => {
      // make our element + attributes
      let emojiContainer = document.createElement("DIV");
      let containerClass = document.createAttribute("class");
      const containerMapId = document.createAttribute("data_map_id");

      // set a value on our html attribute (ie. class = " emojion__container") -> add to dom element
      containerClass.value = "emojion__container";
      containerMapId.value = mount.id;
      emojiContainer.setAttributeNode(containerClass);
      emojiContainer.setAttributeNode(containerMapId);

      mount.appendChild(emojiContainer);
      state.dom.containers.push(emojiContainer);
    });
    return state;
  }

  /**
   * - Go through all of OUR containers, and fill out the emojion bar
   * - Pair Dom elements up with data structure so they receive the correct emojion bar
   * - needs to generate an id for the html for the emoji but _also gets written_ to the data structure:
   * - ie: `<button id="emojion_bar_01">` should match the struct:
   * - `state.emojis.emojion_bar_asdf[0]` => `{ icon: "😅", count: 0, id: "emojion_bar_asdf_01" }`
   * @param {object} state
   * @returns
   */
  function populateContainers(state) {
    state.dom.containers.forEach(container => {
      const id = container.attributes.data_map_id.value;

      container.innerHTML = state.emojis[id]
        .map((emoji, index) => {
          //  unique id to DOM + Data Strutcure => for adding click el's later.
          emoji.id = `${id}_${index}`;
          return `<button id="${emoji.id}" class="emojion__single">
            ${emoji.icon} ${emoji.count}
          </button>`;
        })
        .join(""); // remove commas between elements
    });
    return state;
  }

  /**
   * Loop over containers of emojis in the DOM
   * Add event listeners to each one
   * Run a function on click that should increment the count of a single emoji
   * @param {object} state
   * @returns {object}
   */
  function incrementEmojiCount(state) {
    state.dom.containers.forEach(container => {
      let containerId = container.attributes.data_map_id.value;
      let emojions = [...container.children];

      emojions.forEach(emoji_el => {
        emoji_el.addEventListener("click", function() {
          let payload = state.emojis[containerId].find(emoji_data => {
            return emoji_el.id === emoji_data.id;
          });
          payload.count++;

          // refresh the dom / data state
          populateContainers(state);
          incrementEmojiCount(state);
        });
      });
    });
    return state;
  }

  // =====================================================
  // Exports required for automated testing.
  // =====================================================

  if (typeof exports !== "undefined") {
    exports.pipe = pipe;
    exports.getAllIds = getAllIds;
    exports.makeEmojionBars = makeEmojionBars;
    exports.makeContainers = makeContainers;
    exports.populateContainers = populateContainers;
  }
})();
