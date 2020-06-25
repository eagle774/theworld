//battle cats rarity guesser, give average + level and amount discovered.
let rarityGuesser = (averagePlusLevel,numberUnlocked)=>{
  let totalRolls = (averagePlusLevel+1)*numberUnlocked;
  let tableOfResults=[];
  let waysToArrange=numberUnlocked**totalRolls-((numberUnlocked-1)**totalRolls)
  for(let i=0;i<100;i++){
    if(numberUnlocked>i){
      tableOfResults.push(0);
    }else{
      tableOfResults.push(waysToArrange/i**totalRolls)
    }
  }
  return tableOfResults
};
let fillToMax = (array,amount)=>{
  let toAdd =array[array.length-1]
  copiedArray = array.concat([])
  while(copiedArray.length<amount){
    copiedArray.push(toAdd)
  }
  return copiedArray
};
const allocateItemsRatio = (amount,ratioArray)=>{
  percents = []
  results = []
  totPercent = sum = 0
  bestNums = [[Infinity,0]]
  for(let i=0;i<ratioArray.length;i++){
    results.push(0)
    index=0
    while(ratioArray[i]>bestNums[index][0]){
      index++
    }
    bestNums.splice(index,0,[ratioArray[i],i])
  }
  for(let i=0;i<ratioArray.length;i++){
    totPercent += ratioArray[i]
  }
  for(let i=0;i<ratioArray.length;i++){
    results[i] = Math.floor(amount*(ratioArray[i]/summed(ratioArray)))
    sum+=Math.floor(amount*(ratioArray[i]/summed(ratioArray)))
  }
  left = Math.floor((amount*totPercent/summed(ratioArray)-sum))
  index=bestNums.length-2
  while(left >= 1){
    results[bestNums[index][1]]++
    left--
    index--
  }
  return results
};
let factorial = (num)=>{
  let result=1;
  for(let i=2;i<num+1;i++){
    result*=i;
  }
  return result;
};
let getPascalTriangle = (i,j)=>{
  if(j>i){
    return "!!!!!!!!!!!"
  }
  return (factorial(i)/(factorial(j)*(factorial(i-j))))
};
let summed = (array)=>{
  summedUp = 0
  for(const number in array){
    summedUp+=array[number]
  }
  return summedUp==summedUp?summedUp:0
};
let latticeSolver = (dimension,constraints)=>{
  if(dimension==2){
    return getPascalTriangle(constraints[0]+constraints[1],constraints[0])
  }else if (dimension==3){
    return latticeSolver(2,[constraints[0],constraints[1]])*latticeSolver(2,[constraints[2],constraints[2]+constraints[1]])
  }else{
    arraypart1=[]
    for(let i=0;i<constraints.length-1;i++){
      arraypart1.push(constraints[i])
    }
    arraypart2=[constraints[constraints.length-1],0]
    for(let i=0;i<constraints.length-1;i++){
      arraypart2[1]+=constraints[i]
    }
    return latticeSolver(dimension-1,arraypart1)*latticeSolver(2,arraypart2)
  }
};
