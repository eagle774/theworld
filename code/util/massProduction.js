let encompassingDistribution=(func,holder,args,times,precision=100,method='copyOver')=>{
  let results=[]
  if(times<precision){
    for(let i=0;i<times;i++){
      results.push(func.apply(holder,args))
    }
    return results
  }
  for(let i=0;i<precision;i++){
    results.push(func.apply(holder,args))
  }
  if(method=='copyOver'){
    for(let i=precision;i<times;i++){
      results.push(results[i-precision])
    }
    return results
  }
}
let summed = (array)=>{
  summedUp = 0
  for(const number in array){
    summedUp+=array[number]
  }
  return summedUp==summedUp?summedUp:0
}


const allocateItemsRatio = function(amount,ratioArray){
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
}
