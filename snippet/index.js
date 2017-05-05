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
    populateContainers
  )(state);
  console.log(state);

  // =====================================================
  // Create the functions that will feed into the pipe.
  // =====================================================

  /**
   * Create the style element to style our emoji bar,
   * add an id to it and append it to the head of the page
   *
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
   *
   * @param {object} state
   * @returns {object} state
   */

  function populateStylesheet(state) {
    var style = document.getElementById(STYLE_ID);

    // Style emojion bars
    style.innerHTML = `
      .emojion_container {
        align-items: center;
        background: #eee;
        box-shadow: 0 3px 6px rgba(0,0,0,0.15);
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
        margin: 10px 0 15px;
      }

      .emojion_single {
        background: #fff;
        border-bottom: 1px solid #ddd;
        border-top: 1px solid #ddd;
        box-sizing: content-box;
        flex: 1 0 auto;
        margin: 0;
        min-width: 30px;
        padding: 5px 10px 8px;
        text-align: center;
        transition: background 0.25s ease;
      }

      .emojion_single:first-of-type {
        border-left: 1px solid #ddd;
      }

      .emojion_single:last-of-type {
        border-right: 1px solid #ddd;
      }

      .emojion_container:hover .emojion_single {
        background: #efefef;
      }

      .emojion_container .emojion_single:hover {
        background: #fff;
      }
    `;

    return state;
  }

  /**
   * Get all the ids from the page,
   * filter out the ones we want to mount emojion bar on
   *
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
   * @param {obj} state
   * @returns {obj} state - now with emoji structures
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

      // set a value on our html attribute (ie. class = " emojion_container") -> add to dom element
      containerClass.value = "emojion_container";
      containerMapId.value = mount.id;
      emojiContainer.setAttributeNode(containerClass);
      emojiContainer.setAttributeNode(containerMapId);

      mount.appendChild(emojiContainer);
      state.dom.containers.push(emojiContainer);
    });
    return state;
  }

  /**
   * Go through all of OUR containers, and fill out the emojion bar
   * Pair Dom elements up with data structure so they receive the correct emojion bar
   * @param {any} state
   * @returns
   */
  function populateContainers(state) {
    state.dom.containers.forEach(container => {
      const id = container.attributes.data_map_id.value;
      // create an html TEMPLATE, and display it.
      container.innerHTML = state.emojis[id]
        .map((emoji, index) => {
          return `
          <div class="emojion_single">
            ${emoji.icon} ${emoji.count}
          </div>
        `;
        })
        .join(""); // remove commas between elements
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
