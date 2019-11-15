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
    return ['stone',0]
  }
  mineRes(res,app,amount){
    if(!this.acted && app.planets['total'][res]){
      let reVal = app.incrementResource(res,Math.min(amount,app.planets['total'][res]))
      app.planets['total'][res]-=reVal
      if(reVal){
        app.addVisibleResource(res,true)
      }
      this.acted = true
    }
  }
  incHole(num,app){
    app.hole+=num/10
  }
  reset(){
    this.acted=false
  }
}

registerClass('minerdroid',MinerDroid)
