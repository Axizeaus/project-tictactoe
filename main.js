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
  obtn.onclick = () => player.setHandle('o');
  
  function setUpBoard() {
    container.setAttribute(
      "style",
      `grid-template-columns:repeat(3, ${container.clientWidth / 3}px);
        grid-template-rows:repeat(3, ${container.clientHeight / 3}px)`
    );

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const div = document.createElement("div");
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
      e.target.setAttribute('data-available', 'active')
      let handle = player.getHandle();
      e.target.innerHTML = handle;
      winCheck(e);
    } else {
      return;
    }
  }

  function winPattern(arr){
    pattern = [
      ["0 0", "0 1", "0 2"],
      ["1 0", "1 1", "1 2"],
      ["2 0", "2 1", "2 2"],
      ["0 0", "1 0", "2 0"],
      ["0 1", "1 1", "2 1"],
      ["0 2", "1 2", "2 2"],
      ["0 0", "1 1", "2 2"],
      ["0 2", "1 1", "2 0"]
    ]
  }

  function winCheck(e){
    const xArr = [];
    const oArr = [];
    for (let i = 0; i < container.childNodes.length; i++){
      let check = container.childNodes[i].dataset.available;
      if (check === 'active'){
       if (container.childNodes[i].innerHTML === 'x'){
        xArr.push(container.childNodes[i].dataset.id)
       } else if (container.childNodes[i].innerHTML === 'o'){
        oArr.push(container.childNodes[i].dataset.id)
       }
      }
    }

    console.log('xArr:', xArr);
    console.log('oArr:', oArr);
  }

  return {
    setUpBoard,
  };
})();

window.onload = () => {
  gameBoard.setUpBoard();
};