const Player = () => {

  let handle = 'x';

  const setHandle = (val) => {
    handle = val
  }

  const getHandle = () =>{
    return handle
  }

  return {
    setHandle, getHandle
  }
};

// making gameboard

const gameBoard = (() => {
  "use strict";
  const container = document.getElementById("container");
  // x and o buttons
  const xbtn = document.getElementById('x');
  const obtn = document.getElementById('o');

  // console.log(xbtn, obtn);

  const player = Player();

  xbtn.onclick = () => player.setHandle('x');
  obtn.onclick = () => player.setHandle('o')
  
  function setUpBoard() {
    container.setAttribute(
      "style",
      `grid-template-columns:repeat(3, ${container.clientWidth / 3}px);
        grid-template-rows:repeat(3, ${container.clientHeight / 3}px)`
    );

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const div = document.createElement("div");
        console.log(i,j);
        div.setAttribute("data-id", `${i} ${j}`);
        div.setAttribute('data-available', 'inactive')
        div.addEventListener('mousedown', (e)=>{
          click(e);
        })
        container.appendChild(div);
      }
    }
  }

  function click(e){
    let check = e.target.getAttribute('data-available');
    if (check === 'inactive'){
      console.log(e.target);
      e.target.setAttribute('data-available', 'active')
      let handle = player.getHandle();
      e.target.innerHTML = handle;
    } else {
      return;
    }

  }

  return {
    setUpBoard,
  };
})();

window.onload = () => {
  gameBoard.setUpBoard();
};