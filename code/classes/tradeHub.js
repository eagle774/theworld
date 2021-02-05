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
      this.trades.splice(tradePos,1)
      app.pastTradeStatuses.push("Sucessfully accepted trade with "+factionData[trade.name].screenName+
      ". You gained "+bigNumberHandler(trade.amountSell)+" "+app.resTable[trade.selling].screenName+" and lost "
      +bigNumberHandler(trade.amountBuy)+" "+app.resTable[trade.buying].screenName+".")
      this.tradeExpertise+=0.01
      this.factions[trade.pos].thoughts+=1
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
