class MinerDroid extends Saveable{
  constructor(){
    super(2)
    this.acted = false
  }
  mineAtDepth(number,depth,app){
    if(app.hole>=depth && !this.acted){
      this.acted=true
      return app.mine(number,depth)
    }
    return ['fakestone',0]
  }
  mineResource(res,app,amount){
    if(app.planets['total'].amount>=amount && !this.acted){
      app.planets['total'].amount-=amount
      app.resTable[resource].amount+=amount
      this.acted = true
    }
  }
  incHole(num,app){
    app.hole+=num
  }
  reset(){
    this.acted=false
  }
}

registerClass('minerdroid',MinerDroid)
