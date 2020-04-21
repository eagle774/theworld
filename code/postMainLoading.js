addKeyBinding((event) => {
  if (event.key.length === 1) {
    if(event.key === '\''){
      event.preventDefault()
    }
    return App.addStringToFileAtCursor(event.key)
  }
  return false;
})
addKeyBinding((event) => {
  if (event.key === 'ArrowUp') return App.moveCursor(0, -1);
  if (event.key === 'ArrowDown') return App.moveCursor(0, 1);
  if (event.key === 'ArrowLeft') return App.moveCursor(-1, 0);
  if (event.key === 'ArrowRight') return App.moveCursor(1, 0);
  return false;
})
addKeyBinding((event) => {
  if (event.key === 'Enter') {
    //event.preventDefault()
    return App.newLine()
  }
  return false
})
addKeyBinding((event) => {
  if (event.key === 'Delete') return App.deletion(0,event)
  if (event.key === 'Backspace') return App.deletion(-1,event)
})
addKeyBinding((event) => {
  if (event.key === 's' && event.ctrlKey){
    event.preventDefault();
    return App.saveGame()
  }
})
addKeyBinding((event) => {
  if (event.key === 'ArrowRight' && App.tabPos<Math.floor(App.tabs.length/6)){
    App.tabPos+=1
    return true
  }
})
addKeyBinding((event) => {
  if (event.key === 'ArrowLeft' && App.tabPos>=1){
    App.tabPos-=1
    return true
  }
})
addKeyBinding((event)=>{
  if(Number(event.key)&&event.key!=='0'){
    if(App.tabs[App.tabPos*6-1+Number(event.key)]){
      return App.setTab(App.tabs[App.tabPos*6-1+Number(event.key)].tab)
    }
  }else if(event.key==='0'){
    if(App.tabs[App.tabPos*6+9]){
      return App.setTab(App.tabs[App.tabPos*6+5].tab)
    }
  }
})
App.unSaveable.buttons.explore=App.explore
App.unSaveable.buttons.getWood=()=>{App.incrementResourceByHand('wood',1)}
App.unSaveable.buttons.mineStone=()=>{App.incrementResourceByHand('stone',1)}
tickFunc=window.setInterval(App.tick, 100);
App.newGrid()
App.loadGame(false)
App.buildingsList=buildingsData
App.rocketsData=rocketsData
