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
