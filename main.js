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

const Bot = () => {
  let handle = 'o';

  const setHandle = (val) => {
    handle = val
  }

  const getHandle = () =>{
    return handle
  }

  return {
    setHandle, getHandle
  }
}

// making gameboard

const gameBoard = (() => {
  "use strict";
  const container = document.getElementById("container");
  // x and o buttons
  const xbtn = document.getElementById('x');
  const obtn = document.getElementById('o');

  // console.log(xbtn, obtn);

  const player = Player();
  const bot = Bot();

  xbtn.onclick = () => {player.setHandle('x'), bot.setHandle('o')};
  obtn.onclick = () => {player.setHandle('o'), bot.setHandle('x')};
  
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

  function botChoose(){
    const avil = new Array;
    for (let i of container.childNodes){
      if (i.dataset.available === 'inactive'){
        avil.push(i.dataset.id);
      }
    }
    botClick(avil);
  }

  function botClick(avil){
    const limit = avil.length;
    const randomNumber = Math.floor(Math.random() * limit);
    const id = avil[randomNumber];
    for (let i of container.childNodes){
      if(i.dataset.id === id){
        i.setAttribute('data-available', 'active');
        const handle = bot.getHandle();
        console.log(handle);
        i.innerHTML = handle;
      }
    }
  }

  function click(e){
    let check = e.target.getAttribute('data-available');
    if (check === 'inactive'){
      e.target.setAttribute('data-available', 'active')
      const handle = player.getHandle();
      e.target.innerHTML = handle;
      botChoose(e);
      winCheck();
    } else {
      return;
    }
  }

  function winPattern(arr, handle){
    const pattern = [
      ["0 0", "0 1", "0 2"],
      ["1 0", "1 1", "1 2"],
      ["2 0", "2 1", "2 2"],
      ["0 0", "1 0", "2 0"],
      ["0 1", "1 1", "2 1"],
      ["0 2", "1 2", "2 2"],
      ["0 0", "1 1", "2 2"],
      ["0 2", "1 1", "2 0"]
    ]
    for (let i=0; i < pattern.length; i++){
      if(arr.includes(pattern[i][0]) && arr.includes(pattern[i][1]) && arr.includes(pattern[i][2])){
        console.log(arr);
        alert(`${handle} is the winner`);
        console.log(window);
      }
    }
  }

  function winCheck(){
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
    winPattern(xArr, 'x');
    winPattern(oArr, 'o');
  }

  function cleanBoard(){
    container.innerHTML = '';
    setUpBoard();
  }

  return {
    setUpBoard,
  };
})();

window.onload = () => {
  gameBoard.setUpBoard();
};