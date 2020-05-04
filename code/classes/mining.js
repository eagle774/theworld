class Mine extends Saveable{
  constructor(planetRadius,resources,modifiers){
    super(planetRadius)
    if(this.isNotFake()){
      this.resources={}
      this.planetRadius=planetRadius
      this.progress = 0
      this.modifiers=modifiers
      for(let key of resources){
        this.resources[key]={
          total:this.getVal(key,'total')*(planetRadius**3)
        }
      }
    }
  }
  mineAtDepth(depth){
    let totalweight = 0
    for(const [key,value] of Object.entries(this.resources)){
      if(depth>=this.getVal(key,'depthMin')&&depth<=this.getVal(key,'depthMax')&&this.resources[key].total>0){
        totalweight+=this.getVal(key,'weight')
      }
    }
    let random=Math.random()*totalweight
    let prevWeight=0
    let chosenResource
    for(const [key,value] of Object.entries(this.resources)){
      if(depth>=this.getVal(key,'depthMin')&&depth<=this.getVal(key,'depthMax')&&this.resources[key].total>0){
        prevWeight+=this.getVal(key,'weight')
        if(prevWeight>random){
          chosenResource=key
          break
        }
      }
    }
    return this.generateResource(chosenResource)
  }
  generateResource(resource){
    let amount;
    if(this.resources[resource].total>this.getVal(resource,'sizeMax')){
      amount=Math.random()*(this.getVal(resource,'sizeMax')-this.getVal(resource,'sizeMin'))+this.getVal(resource,'sizeMin')
    }else{
      amount=Math.random()*(this.resources[resource].total)
    }
    this.resources[resource].total-=Math.floor(amount)
    return [Math.floor(amount),resource]
  }
  getVal(resource,value){
    return miningStats[resource][value]*this.getModifier(resource,value)
  }
  getModifier(resource,val){
    if(this.modifiers[resource][val]!==undefined){
      return this.modifiers[resource][val]
    }
    return 1
  }
  massMine(depth,times){
    let totalWeights = []
    let resources = []
    for(const [key,value] of Object.entries(this.resources)){
      if(depth>=this.getVal(key,'depthMin')&&depth<=this.getVal(key,'depthMax')&&this.resources[key].total>0){
        if(this.getVal(key,'weight')<10){
          totalWeights.push(this.getVal(key,'weight')*11*Math.random())
        }else{
          totalWeights.push(this.getVal(key,'weight'))
        }
        resources.push(key)
      }
    }
    let totalWeight = summed(totalWeights)
    let allocated = allocateItemsRatio(times,totalWeights)
    let results = []
    for(let i=0;i<allocated.length;i++){
      let result = Math.min(this.resources[resources[i]].total,(this.getVal(resources[i],'sizeMin')+this.getVal(resources[i],'sizeMax'))/2*randomDistribution()*allocated[i])
      this.resources[resources[i]].total-=result
      results.push([result,resources[i]])
    }
    return results
  }
}

registerClass('miner',Mine)
mine = new Mine(1, ['iron-ore','stone','coal','copper-ore','tungsten-ore','titanium-ore','gold-ore'], {'iron-ore':{},'copper-ore':{},'coal':{},'gold-ore':{},'titanium-ore':{},'tungsten-ore':{},'stone':{}})
