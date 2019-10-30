class MinerDroid extends Saveable{
  constructor(){
    super(2)
    if(this.isNotFake()){
      this.hole=0
      this.energy=20
    }
  }
  mineAtDepth(depth,mine){
    if(this.hole>=depth && this.energy>10){
      this.energy-=10
      return mine.mineAtDepth(depth)
    }
    return ['fakestone',0]
  }
  mineResource(res,App,mine){
    if(App.planets[mine].amount>=1){
      App.planets[mine].amount-=1
      App.resTable[resource].amount+=1
    }
  }
}

registerClass('minerdroid',MinerDroid)
mine = new Mine(1, ['iron-ore','fakestone'], {'iron-ore':{},'fakestone':{}})
