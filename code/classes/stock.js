class Stock extends Saveable{
  constructor(start,controllers,name){
    super(start)
    if(this.isNotFake()){
      this.past = [start]
      this.name = name
      this.current = start
      this.controllers = controllers
    }
  }
  getDisplay(){
    return this.past
  }
  registerInnerClasses(){
    for(let i=0;i<this.controllers.length;i++){
      this.registerInnerClass(this.controllers,'single',this.controllers[i].name,i)
    }
  }
  addPast(newElement){
    this.past.push(newElement)
    if(this.past.length>400){
      this.past=this.past.slice(1,401)
    }
  }
  tick(market){
    for(let i=0;i<this.controllers.length;i++){
      this.current=this.controllers[i].run(this.current,market,this)
    }
    this.addPast(this.current)
  }
}

registerClass('stock',Stock)

randomStock = new Stock(100,[new RandomStockController(10)],'randomStock')
noisyStock = new Stock(200,[new PolynomialStockController([0.1]), new RandomStockController(20),new MarketBoomStockController(5)],'noisyStock')
