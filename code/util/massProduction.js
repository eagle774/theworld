let encompassingDistribution=(func,holder,args,times,precision=100,method='copyOver')=>{
  let results=[]
  if(times<precision){
    for(let i=0;i<times;i++){
      results.append(func.apply(holder,args))
    }
    return results
  }
  for(let i=0;i<precision;i++){
    results.append(func.apply(holder,args))
  }
  if(method=='copyOver'){
    for(let i=precision;i<times;i++){
      results.append(results[i-precision])
      return results
    }
  }
}
