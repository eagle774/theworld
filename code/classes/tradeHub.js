class TradeHub extends Saveable{
  constructor(app){
    super(app)
    if(this.isNotFake()){
      this.factions = []
      this.trades = []
      let factionList = shuffle(Object.keys(factionData))
      for(let i=0;i<factionList.length;i++){
        this.factions.push(new Faction(factionList[i],alignmentList[i],i))
      }
    }
    this.tradeExpertise = 1
  }
  tick(app){
    for(let i = 0;i<this.factions.length;i++){
      this.factions[i].tick(this,app)
    }
  }
  acceptTrade(app,tradePos){
    //galactic credits fix
    let trade = this.trades[tradePos]
    if(app.spaceResCounts[trade.buying].amount>=trade.amountBuy){
      app.incResSpace(trade.buying,-trade.amountBuy)
      app.incResSpace(trade.selling,trade.amountSell)
      app.addSpaceResource(trade.selling,true)
      this.trades.splice(tradePos,1)
      app.pastTradeStatuses.push("Successfully accepted trade with "+factionData[trade.name].screenName+
      ". You gained "+bigNumberHandler(trade.amountSell,true)+" "+app.resTable[trade.selling].screenName+" and lost "
      +bigNumberHandler(trade.amountBuy,true)+" "+app.resTable[trade.buying].screenName+".")
      this.tradeExpertise+=0.01
      let alignment = this.factions[trade.pos].alignment
      let sign = alignment>=0?'+':'-'
      for(let i=0;i<this.factions.length;i++){
        let other = this.factions[i]
        if(Math.abs(alignment)<=10){
          if(Math.abs(other.alignment)<=10){
            //1.25 each
            other.thoughts += Math.abs(other.alignment)*-1.5/10+2
          }else{
            //linear relation where 45 gives -0.625
            other.thoughts -= 3/280*(Math.abs(other.alignment)-10)+0.25
          }
        }else{
          if(Math.abs(other.alignment)<=10){
            //0.625 each
            other.thoughts -= Math.abs(other.alignment)*-1.5/20+1
          }else if((sign=='-' && other.alignment<-10) || (sign=='+' && other.alignment>10)){
            //linear relation where 45 gives 1.25
            other.thoughts += (1/35*(Math.abs(other.alignment)-10)+0.25)
            //correct sign
          }else if((sign=='+' && other.alignment<-10) || (sign=='-' && other.alignment>10)){
            //linear relation where 45 gives -0.625
            other.thoughts -= (3/280*(Math.abs(other.alignment)-10)+0.25)
            //correct sign
          }
        }
      }
    }else{
      app.pastTradeStatuses.push("You do not have enough resources to complete that trade.")
      //because why not - go crazy
      this.tradeExpertise+=0.00001
    }
    while(app.pastTradeStatuses.length>10){
      app.pastTradeStatuses.splice(0,1)
    }
  }
  registerInnerClasses(){
    this.registerInnerClass(this.factions,'array','faction')
  }
}

registerClass('tradeHub',TradeHub)
