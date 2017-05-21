~(function() {
  // ===========================================================================
  // SETUP (vars, conts, function pipe)
  // ===========================================================================

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
   * Creates a function which will run a series of functions into one another
   * in the provided order, Since it returns a function, this can be reused as
   * a function provided with newly provided arguments.
   *
   * @param {...Function} functions An unknown number of functions;
   * add as many as you require.
   * @returns {Function} A single function that can be called to run all
   * provided functions on given data in the originally provided order.
   */
  function pipe(...functions) {
    return functions.reduce((accumulatedFuncs, currentFunc) => (...args) =>
      currentFunc(accumulatedFuncs(...args)));
  }

  // ===========================================================================
  // THE FUNCTION PIPE IN ACTION!!!
  // ===========================================================================

  const render = pipe(
    domGetMounts,
    apiGetEmojis,
    styleCreateSheet,
    styleUpdateSheet

    // instead of running the pipe here with async issues we can move the
    // following function invocations into the apiGetEmojis and it will work
    // however this is hacky and we need to figure out how to use promises
    // to do what we want.

    // domMakeEmojionBars,
    // domMakeContainers,
    // renderContainers,
    // updateEmojiCount
  )(state);

  // Network Functions =========================================================

  /**
   * - Request API for emojis by user's unique ID
   * - TODO: Only run this on page load?
   * - Check if dom mounts id's match data from back end
   * - If yes; populate the corresponding state data forEach mount
   * @param {any} state
   */
  function apiGetEmojis(state) {
    fetch("http://localhost:3000/db")
      .then(response => response.json())
      .then(response => {
        state.apiData = response;
        state.dom.mounts.forEach(mount => {
          var domElementName = getEmojionClassName(mount);
          console.log(
            "domelementname on apidata is",
            state.apiData[domElementName]
          );
          if (state.apiData[domElementName]) {
            //move the data over to the front ened store
            state.emojis[domElementName] = state.apiData[domElementName];
          }
        });

        // async and back in action
        domMakeEmojionBars(state);
        domMakeContainers(state);
        renderContainers(state);
        updateEmojiCount(state);
      });
    return state;
  }

  // Styling Functions =========================================================

  /**
   * - Create the style element to style our emoji bar,
   * - add an id to it and append it to the head of the page
   * @param {object} state
   * @returns {object} state
   */
  function styleCreateSheet(state) {
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
  function styleUpdateSheet(state) {
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
        display: flex;
        align-items: center;
        background: #fff;
        border-bottom: 1px solid #eee;
        border-left: 0;
        border-right: 0;
        border-top: 1px solid #eee;
        box-sizing: content-box;
        flex: 1;
        font-size: 16px;
        margin: 0;
        min-width: 7px;
        outline: 0;
        padding: 5px 10px 8px;
        transition: background 0.25s ease;
      }

      .emojion__icon,
      .emojion__count {
        flex: 1;
      }

      .emojion__icon {
        text-align: right;
        margin-right: 4px;
      }

      .emojion__count {
        text-align: left;
        margin-left: 4px;
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

  // Dom Manipulation ==========================================================

  /**
   * - Get all the classes from the page (convert nodelist -> array)
   * - filter out the ones we want to mount emojion bar on
   * - TODO: If there are zero dom Mounts on page; find way to short circuit pipe
   * @param {object} state
   * @returns {object} state
   */
  function domGetMounts(state) {
    const classes = [...document.querySelectorAll("[class]")];
    const mounts = classes.filter(node => node.className.includes(EMOJION_ID));
    // need to check if dom mount already exists so that we don't overwrite api data.
    state.dom.mounts = mounts;
    return state;
  }

  /**
   * - Loop through the dom elements that need an emojion bar
   * - Generate a new emojion stamp for that dom element.
   * @param {object} state
   * @returns {object} state - now with emoji structures
   */
  function domMakeEmojionBars(state) {
    state.dom.mounts.forEach(mount => {
      let mountClassName = getEmojionClassName(mount);
      if (!state.emojis[mountClassName]) {
        state.emojis[mountClassName] = EMOJION_STAMP();
      }
    });
    console.log(state);
    return state;
  }

  /**
   * - Create our _own_ dom element to mount our emojion bar in
   * - Different from mounts that user specifices for where they want the bar.
   * @param {obj} state
   * @returns {obj} state - our custom dom containers for our emoji bars
   */
  function domMakeContainers(state) {
    state.dom.mounts.forEach(mount => {
      // make our element + attributes
      let emojiContainer = document.createElement("DIV");
      let containerClass = document.createAttribute("class");
      const containerMapId = document.createAttribute("data_map_id");

      // set a value on our html attribute to interact with later
      containerClass.value = "emojion__container";
      containerMapId.value = getEmojionClassName(mount);
      emojiContainer.setAttributeNode(containerClass);
      emojiContainer.setAttributeNode(containerMapId);

      mount.appendChild(emojiContainer);
      state.dom.containers.push(emojiContainer);
    });
    return state;
  }

  // Z. Model / View Funcs =====================================================

  /**
   * - Loop through our view (containers), and fill with data (state.emojis)
   * - Here we create an ID for both the dom elements and the data struct;
   * So that they can communicate with each other. Example:
   * - ie: `<button id="emojion_bar_01">` === `state.emojis.emojion_bar_01 ...`
   * @param {object} state
   * @returns
   */
  function renderContainers(state) {
    state.dom.containers.forEach(container => {
      const id = container.attributes.data_map_id.value;
      console.log("render containers", state.emojis[id], id);
      container.innerHTML = state.emojis[id]
        .map((emoji, index) => {
          //  unique id to DOM + Data Strutcure => for adding click el's later.
          emoji.id = `${id}_${index}`;
          return `<button id="${emoji.id}" class="emojion__single">
            <span class="emojion__icon">${emoji.icon}</span>
            <span class="emojion__count">${emoji.count}</span>
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
  function updateEmojiCount(state) {
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
          renderContainers(state);
          updateEmojiCount(state);
        });
      });
    });
    console.log("end of pipe", state);
    return state;
  }

  // Z. Helpers ================================================

  /**
   * Determine all the classes that are assoicated with passed in mount
   * And extract emojion's classname and return it
   * @param {object} mount
   * @returns {string} the extracted emojion's className
   */
  function getEmojionClassName(mount) {
    return mount.className
      .split(" ")
      .filter(className => className.includes(EMOJION_ID))
      .join();
  }

  // =====================================================
  // Exports required for automated testing.
  // =====================================================

  if (typeof exports !== "undefined") {
    exports.pipe = pipe;
    exports.getAllClasses = domGetMounts;
    exports.makeEmojionBars = domMakeEmojionBars;
    exports.makeContainers = domMakeContainers;
    exports.populateContainers = renderContainers;
  }
})();
