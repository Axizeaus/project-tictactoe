// making gameboard

const gameBoard = (() => {
  const container = document.getElementById("container");
  
  function makeNewGame() {
    container.setAttribute(
      "style",
      `grid-template-columns:repeat(3, ${container.clientWidth / 3}px);
        grid-template-rows:repeat(3, ${container.clientHeight / 3}px)`
    );

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const div = document.createElement("div");
        console.log(i);
        div.setAttribute("data-id", `${i} ${j}`);
        div.setAttribute('data-available', 'inactive')
        div.addEventListener('mousedown', clickEvent)
        container.appendChild(div);
      }
    }
  }

  function clickEvent() {
    console.log('clicked');
  }

  return {
    makeNewGame: makeNewGame,
  };
})();




window.onload = () => {
  gameBoard.makeNewGame();
};
