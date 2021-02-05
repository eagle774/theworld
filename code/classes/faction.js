class Faction extends Saveable{
  constructor(name,alignment,pos){
    super(name)
    if(this.isNotFake()){
      this.name = name
      this.alignment = alignment
      this.buys = factionData[name].buys
      this.sells = factionData[name].sells
      this.thoughts = 0
      this.timeToNext = Math.random()*100+150
      this.screenName = factionData[name].screenName
      this.pos = pos
    }
  }
  tick(tradeHub,app){
    let tradesToAdd = []
    let curTrades = 0
    for(let i=0;i<tradeHub.trades.length;i++){
      if(tradeHub.trades[i].name!=this.name){
        continue
      }
      curTrades+=1
      let curTrade = tradeHub.trades[i]
      curTrade.time+=1
      if(curTrade.time>=curTrade.timeToDisappear){
        tradeHub.trades.splice(i,1)
        i-=1
        tradesToAdd.push(this.newTrade(app))
      }
    }
    for(let i=0;i<tradesToAdd.length;i++){
      tradeHub.trades.push(tradesToAdd[i])
    }
    this.timeToNext-=1
    if(this.timeToNext<=0&&curTrades<4){
      this.timeToNext = Math.random()*100+150
      tradeHub.trades.push(this.newTrade(app))
    }
  }
  newTrade(app){
    let options = reconstructDict(app.resTableFilterBy((resource)=>{
      return resource.tradeable
    }))
    let chosenResourceBuy
    let chosenResourceSell
    if(this.name!="theGarageShack"){
      //calculate resource to buy
      let totalweight = 0
      for(const [key,value] of Object.entries(options)){
        if(!app.unlockedSpaceResources.includes(key)&&key!=="galacticCredits"){
          continue
        }
        if(!this.buys[key]){
          totalweight+=value.tradeWeight
        }else if(this.buys[key].thoughts == undefined || this.thoughts>this.buys[key].thoughts){
          totalweight+=this.buys[key].weight
        }
      }
      let random=Math.random()*totalweight
      let prevWeight=0
      for(const [key,value] of Object.entries(options)){
        if(!app.unlockedSpaceResources.includes(key)&&key!=="galacticCredits"){
          continue
        }
        if(!this.buys[key]){
          prevWeight+=value.tradeWeight
        }else if(this.buys[key].thoughts == undefined || this.thoughts>this.buys[key].thoughts){
          prevWeight+=this.buys[key].weight
        }
        if(prevWeight>random){
          chosenResourceBuy=key
          break
        }
      }
    }else{
      chosenResourceBuy = "galacticCredits"
    }
    //calculate resource to sell
    let totalweight = 0
    for(const [key,value] of Object.entries(options)){
      if(!app.unlockedSpaceResources.includes(key)&&key!=="galacticCredits"){
        continue
      }
      if(chosenResourceBuy==key){
        continue
      }
      if(!this.sells[key]){
        totalweight+=value.tradeWeight
      }else if(this.sells[key].thoughts == undefined || this.thoughts>this.sells[key].thoughts){
        totalweight+=this.sells[key].weight
      }
    }
    let random=Math.random()*totalweight
    let prevWeight=0
    for(const [key,value] of Object.entries(options)){
      if(!app.unlockedSpaceResources.includes(key)&&key!=="galacticCredits"){
        continue
      }
      if(chosenResourceBuy==key){
        continue
      }
      if(!this.sells[key]){
        prevWeight+=value.tradeWeight
      }else if(this.sells[key].thoughts == undefined || this.thoughts>this.sells[key].thoughts){
        prevWeight+=this.sells[key].weight
      }
      if(prevWeight>random){
        chosenResourceSell=key
        break
      }
    }
    //calculate amounts of each
    let amountBuy = options[chosenResourceBuy].tradeDefaultAmount*(Math.random()*0.2+0.9)*app.tradeHub.tradeExpertise
    let timeToDisappear = 1000
    let amountSell = amountBuy*options[chosenResourceBuy].tradeCost/options[chosenResourceSell].tradeCost*(Math.random()*0.2+0.9)*(1+this.thoughts/100)
    return {pos:this.pos,time:0,screenName:this.screenName,name:this.name,buying:chosenResourceBuy,selling:chosenResourceSell,timeToDisappear,amountBuy,amountSell}
  }
}

registerClass('faction',Faction)
