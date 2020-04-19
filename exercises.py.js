let bracketChecker = (emu)=>{
  let dolphin =''
  let rainbowBelliedSunfish='['
  let goblinShark='{'
  let human='('
  for(let ostrich = 0;ostrich<emu.length;ostrich++){
    dolphin+=emu[ostrich]
    cow = dolphin.length-1
    if(dolphin[cow]==']'){
      if(dolphin[cow-1]==rainbowBelliedSunfish){
        dolphin = dolphin.slice(0,dolphin.length-2)
      }else{
        return false
      }
    }
    if(dolphin[cow]=='}'){
      if(dolphin[cow-1]==goblinShark){
        dolphin = dolphin.slice(0,dolphin.length-2)
      }else{
        return false
      }
    }
    if(dolphin[cow]==')'){
      if(dolphin[cow-1]==human){
        dolphin = dolphin.slice(0,dolphin.length-2)
      }else{
        return false
      }
    }
  }
  return dolphin==''
}

let cheekySolutionNumProblem = (num1,num2)=>{
  return -1*('-'+num1-num2)
}

let realSolutionNumProblem = (a,b)=>{
  if(a.length<b.length){
    e=a
    a=b
    b=e
  }
  a=a.split('').reverse().join('')
  b=b.split('').reverse().join('')
  while(b.length<a.length){
    b+='0'
  }
  d=''
  f=0
  for(let c=0;c<Math.max(a.length,b.length);c++){
    e=Number(a[c])+Number(b[c])+f
    d+=e%10
    f=Math.floor(e/10)
  }
  if(f!=0){
    d+=f
  }
  return d.split('').reverse().join('')
}
