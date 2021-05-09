let miningStatsV2={}
const addMaterialToMineV2 = function(name,total,average){
  miningStatsV2[name]={
    total,
    average,
    name,
  }
}
addMaterialToMineV2('iron',1e40,1e12)
addMaterialToMineV2('stone',1e45,1e14)
addMaterialToMineV2('copper',1e40,1e12)
addMaterialToMineV2('tungsten',1e36,1e14)
addMaterialToMineV2('titanium',1e38,1e14)
addMaterialToMineV2('gold',1e10,1e4)
