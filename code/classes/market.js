class Market extends Saveable{
  constructor(stocks){
    super(stocks)
    if(this.isNotFake()){
      this.stocks=stocks
      this.allPast=[]
      this.cur=0
      for(let i=0;i<this.stocks.length;i++){
        this.cur+=this.stocks[i].current
      }
      this.addPast(this.cur)
    }
  }
  addPast(newElement){
    this.allPast.push(newElement)
    if(this.allPast.length>400){
      this.allPast=this.allPast.slice(1,401)
    }
  }
  registerInnerClasses(){
    this.registerInnerClass(this.stocks,'array','stock')
  }
  tick(){
    this.cur=0
    for(let i=0;i<this.stocks.length;i++){
      this.stocks[i].tick(this)
      this.cur+=this.stocks[i].current
    }
    this.addPast(this.cur)
  }
  get marketBoomFactor(){
    if(this.allPast.length>100){
      return ((this.allPast[this.allPast.length-1]-this.allPast[this.allPast.length-2])/this.stocks.length)
    }else{
      return 0
    }
  }
}

registerClass('market',Market)

mark = new Market([])
