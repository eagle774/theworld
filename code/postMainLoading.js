addKeyBinding((event) => {
  if (event.key.length === 1) {
    return App.addStringToFileAtCursor(event.key)
  }
  return false;
},"addToFile")
addKeyBinding((event) => {
  if (event.key === "ArrowUp") return App.moveCursor(0, -1);
  if (event.key === "ArrowDown") return App.moveCursor(0, 1);
  if (event.key === "ArrowLeft") return App.moveCursor(-1, 0);
  if (event.key === "ArrowRight") return App.moveCursor(1, 0);
  return false;
},"moveCursor")
addKeyBinding((event) => {
  if (event.key === "Enter") {
  //  event.preventDefault()
    return App.newLine()
  }
  return false
},"newLine")
addKeyBinding((event) => {
  if (event.key === "Delete") return App.deletion(0)
  if (event.key === "Backspace") return App.deletion(-1)
},"deletion")
addKeyBinding((event) => {
  if (event.key === "Control") return control = true
},"ctrl")
App.unSaveable.buttons.explore=App.explore
App.unSaveable.buttons.getWood=()=>{App.incrementResourceByHand('wood',1)}
App.unSaveable.buttons.mineStone=()=>{App.incrementResourceByHand('stone',1)}
window.setInterval(App.tick, 100);
App.loadGame(false)
App.buildingsList=buildingsData
