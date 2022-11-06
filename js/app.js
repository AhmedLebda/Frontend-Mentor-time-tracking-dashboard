async function main() {
  // fetching data from the json file
  try {
    const response = await fetch("js/data.json");
    const data = await response.json();

    populate(data, timeframe);
  } catch (error) {
    console.error(`Something Went wrong: ${error}`);
  }
}

// DOM Variables

const timeframeBtns = document.querySelectorAll("button");
const cards = document.querySelectorAll(".card");

// Default Timeframe

let timeframe = "daily";

// Adding event listeners for timeframe options buttons

timeframeBtns.forEach((button) => {
  button.addEventListener("click", (e) => {
    timeframe = e.currentTarget.dataset.time;
    main();
  });
});

// populating each card with data

function populate(dataObj, timeframe) {
  cards.forEach((card) => {
    // Card Variables

    const cardTitle = card.children[0].children[0].children[0];
    const timeframeCurrent = card.children[0].children[1].children[0];
    const timeframePrevious = card.children[0].children[1].children[1];

    loop1: for (let cardObj of dataObj) {
      const cardName = cardObj["title"].toLowerCase().split(" ").join("-");
      if (card.classList.contains(cardName)) {
        cardTitle.textContent = cardObj["title"];

        for (let option in cardObj.timeframes) {
          if (option === timeframe) {
            // updating the current timeframe with counting animation

            let endVal = cardObj["timeframes"][option]["current"];
            let startVal = 0;
            let counter = setInterval(() => {
              if (startVal === endVal) {
                clearInterval(counter);
              } else {
                startVal += 1;
                timeframeCurrent.textContent = `${startVal} hr`;
              }
            }, Math.floor(150 / endVal));

            timeframePrevious.textContent = `Last Week - ${cardObj["timeframes"][option]["previous"]} hrs`;

            break loop1;
          }
        }
      }
    }
  });
}

main();
