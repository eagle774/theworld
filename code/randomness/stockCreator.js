let stockCreator = (namePool)=>{
  let stockControllers=[]
  stockControllers.push(new RandomStockController((Math.random()-0.5)*10+10))
  stockControllers.push(new PolynomialStockController([(Math.random()-0.5)*0.2]))
  stockControllers.push(new MarketBoomStockController(Math.random()*10))
  if(Math.random()<0.5){
    stockControllers.push(new SuddenDropStockController())
  }
  return new Stock(Math.random()*100+100,stockControllers,namePool.generateName()+' Maker')
}
