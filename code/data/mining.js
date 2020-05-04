let miningStats={}
const addOre = function(name,depthMin,depthMax,total,sizeMin,sizeMax,weight,likelihood){
  miningStats[name]={
    depthMin,
    depthMax,
    total,
    sizeMin,
    sizeMax,
    weight,
    likelihood
  }
}
addOre('iron-ore',1e2,5e5,1e14,30,1000,30,0.8)
addOre('stone',0,1e9,1e99,0,1000,500,1)
addOre('copper-ore',1e2,5e5,1e14,30,1000,30,0.8)
addOre('coal',1e1,1e7,1e12,50,2000,200,0.9)
addOre('tungsten-ore',1e6,1e9,1e13,10,200,0.5,0.6)
addOre('titanium-ore',1e5,1e8,7e13,30,400,2,0.2)
addOre('gold-ore',9e8,1e9,1e3,0,10,0.001,0.1)
