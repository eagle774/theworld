let planetCreator = ()=>{
  planetResources=[]
  for(const [key,value] of Object.entries(miningStats)){
    if(value.likelihood>=Math.random()){
      console.log(value.likelihood,Math.random())
      planetResources.push(key)
    }
  }
  planetRadius = randomDistribution()**5
  mods={}
  for(let i=0;i<planetResources.length;i++){
    res = planetResources[i]
    mods[res]={}
    let modifiable = ['depthMin','depthMax','total','sizeMin','sizeMax','weight']
    for(let j=0;j<modifiable.length;j++){
      if(Math.random()<0.2){
        mods[res][modifiable[j]]=randomDistribution()
      }
    }
  }
  return new Mine(planetRadius,planetResources,mods)
}
