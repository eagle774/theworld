addKeyBinding((event) => {
  if (event.key === 's' && event.ctrlKey){
    event.preventDefault();
    return App.saveGame()
  }
})
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
  if (event.key === 'ArrowUp'){
    if(App.moveCursor(0, -1)){
      event.preventDefault()
      return true
    }
  }
  if (event.key === 'ArrowDown') {
    if(App.moveCursor(0, 1)){
      event.preventDefault()
      return true
    }
  }
  if (event.key === 'ArrowLeft'){
    if(App.moveCursor(-1, 0)){
      event.preventDefault()
      return true
    }
  }
  if (event.key === 'ArrowRight'){
    if(App.moveCursor(1, 0)){
      event.preventDefault()
      return true
    }
  }
  return false;
})
addKeyBinding((event) => {
  if (event.key === 'Enter') {
    if(App.tab=='computer'){
      event.preventDefault()
      return App.newLine()
    }
    if(Math.random()<0.00002){
      alert('I\'m temmie')
    }
  }
  return false
})
addKeyBinding((event) => {
  if (event.key === 'Delete') return App.deletion(0,event)
  if (event.key === 'Backspace') return App.deletion(-1,event)
})
addKeyBinding((event) => {
  if (event.key === 'ArrowRight' && App.tabPos<Math.ceil(App.tabs.length/6)-1&&!App.typing){
    App.tabPos+=1
    return true
  }
})
addKeyBinding((event) => {
  if (event.key === 'ArrowLeft' && App.tabPos>=1&&!App.typing){
    App.tabPos-=1
    return true
  }
})
addKeyBinding((event)=>{
  if(Number(event.key)&&event.key!=='0'&&!App.typing){
    console.log(App.typing)
    if(App.tabs[App.tabPos*6-1+Number(event.key)]){
      return App.setTab(App.tabs[App.tabPos*6-1+Number(event.key)].tab)
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
