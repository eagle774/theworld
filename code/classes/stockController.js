class StockController extends Saveable{
  constructor(){
    super(true)
  }
  run(prev){}
}

registerClass('stockController',StockController)

class RandomStockController extends StockController{
  constructor(variability){
    super()
    this.variability=variability
    this.name='rsc'
  }
  run(prev){
    return prev+this.variability*(Math.random()-0.5)
  }
}

registerClass('rsc',RandomStockController)
class PolynomialStockController extends StockController{
  constructor(changeList){
    super()
    this.changeList=changeList
    this.name='psc'
  }
  run(prev){
    for(let i = 0;i<this.changeList.length;i++){
      if(i!=this.changeList.length-1){
        this.changeList[i+1]+=this.changeList[i]
      }else{
        return prev+this.changeList[i]
      }
    }
  }
}

registerClass('psc',PolynomialStockController)

class MarketBoomStockController extends StockController{
  constructor(degree){
    super()
    this.name='msc'
    this.degree=degree
  }
  run(prev,market){
    return prev+((sigmoid(market.marketBoomFactor)-0.5)*this.degree)
  }
}

registerClass('msc',MarketBoomStockController)

class SuddenDropStockController extends StockController{
  constructor(){
    super()
    this.name='sdsc'
  }
  run(prev,market,stock){
    if(Math.random()<0.001){
      for(let i=0;i<stock.controllers.length;i++){
        if(stock.controllers[i].name=='psc'){
          stock.controllers[i].changeList=[-1]
          return prev*0.5
        }
      }
    }
    return prev
  }
}

registerClass('sdsc',SuddenDropStockController)
