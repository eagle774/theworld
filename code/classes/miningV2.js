class MineV2 extends Saveable{
  constructor(resources,visible){
    super(resources)
    if(this.isNotFake()){
      this.resources = {}
      this.visible = visible
      this.progress = 0
      for(let key of resources){
        this.resources[key]={
          total:this.getVal(key,'total')
        }
      }
    }
  }
  getVal(resource,value){
    return miningStatsV2[resource][value]
  }
  incProgress(amount){
    this.progress+=amount
    if(this.progress>1e10){
      this.explore(Math.floor(this.progress/1e10))
      this.progress%=1e10
    }
  }
  explore(size){
    let totalWeights = []
    let resources = []
    let results = []
    for(const [key,value] of Object.entries(this.resources)){
      if(this.resources[key].total>0){
        resources.push(key)
      }
    }
    for(let i=0;i<resources.length;i++){
      let result = Math.min(this.resources[resources[i]].total,(this.getVal(resources[i],'average'))*randomDistribution()*size)
      this.resources[resources[i]].total-=Math.floor(result)
      results.push([result,resources[i]])
      this.visible[resources[i]]+=result
    }
    return results
  }
}

registerClass('minev2',MineV2)
universe = new MineV2(['stone','iron','copper','titanium','tungsten','gold'],{
  'stone':10000000000000,
  'iron':100000000000,
  'copper':100000000000,
  'titanium':100000000000,
  'gold':0,
  'tungsten':100000000,
})
