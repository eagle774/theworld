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
addOre('iron-ore',1e2,1e5,1e9,30,1000,30,0.8)
addOre('fakestone',0,1e99,1e99,0,1000,500,1)
addOre('copper',1e2,1e5,1e9,30,1000,30,0.8)
addOre('coal',1e1,1e9,1e12,50,2000,200,0.9)
addOre('tungsten',1e7,1e9,1e6,10,200,5,0.6)
addOre('titanium',1e6,1e8,5e6,30,400,20,0.7)
addOre('gold',9e8,1e9,1e3,0,10,1,0.1)
