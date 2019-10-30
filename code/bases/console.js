const getPointsUpToString=(start,end,arr)=>{
  let returnVal=""
  for(let i=start;i<end;i++){
    returnVal+=arr[i]
  }
  return returnVal
}
String.prototype.isAl = function () {
  string=this.string
  //65,90
  for(let i=0;i<string.length;i++){
    charcode=string[i].toUpper().charCodeAt(0)
    if(charcode>90||charcode<65){
      return false
    }
  }
  return true
};
var evalVariable = function(variable,functions,vars){
  console.log(variable)
  nVar = variable
  variable = variable.replace(/ /g,'')
  vars['true']=true
  vars['false']=false
  open=0
  close=0
  let special=['+','-','*','/','>','<','=','%','!','.']
  func=true
  for(let i=0;i<variable.length;i++){
    if(variable[i]==='('){
      open+=1
    }
    if(variable[i]===')'){
      close+=1
    }else if(open===close && (open!=0||variable[i] in special)){

      func=false
      break;
    }
  }
  if(func){
    for(const [key, value] of Object.entries(functions)){
      if(variable.indexOf(key)===0&&variable[variable.length-1]===')'){
        let start=variable.indexOf('(')
        let thing=getPointsUpToString(start+1,variable.length-1,variable)
        let args=[]
        cur=""
        match=0
        for(let i=0;i<thing.length;i++){
          if(thing[i]==="("){
            match+=1
          }
          if(thing[i]===")"){
            match-=1
          }
          if(thing[i]===','&&match===0){
            args.push(evalVariable(cur,functions,vars))
            cur=""
            continue
          }
          cur+=thing[i]
        }
          args.push(evalVariable(cur,functions,vars))
        return value.apply(null,args)
      }
    }
  }
  open=0
  close=0
  func=true
  for(let i=0;i<variable.length;i++){
    if(variable[i]==='{'){
      open+=1
    }
    if(variable[i]==='}'){
      close+=1
    }else if(open===close && (open!=0||variable[i] in special)){
      func=false
      break;
    }
  }
  if(func && variable.length!=1){
    if(variable.indexOf('{')!=-1&&variable[variable.length-1]==='}'){
      let args=variable.slice(1,variable.length-1)
      let dicter={}
      for(const i of (args.length>0?args.split(','):[])){
        let parts=i.split(':')
        if(parts[0][0]!="'" && parts[0][0]!='"'){
          parts[0]="'"+parts[0]+"'"
        }
        dicter[parts[0].slice(1,parts[0].length-1)]=evalVariable(parts.slice(1).join(':'),functions,vars)
      }
      return dicter
    }
  }
  for(let i=0;i<variable.length;i++){
    if(variable[i]==='['){
      open+=1
    }
    if(variable[i]===']'){
      close+=1
    }else if(open===close && (open!=0||variable[i] in special)){
      func=false
      break;
    }
  }
  if(func && variable.length!=1){
    if(variable.indexOf('[')!=-1&&variable[variable.length-1]===']'){
      if(variable.indexOf('[')!=0){
        let start
        let open=0
        let close=0
        for(let i=variable.length;i>-1;i--){
          if(variable[i]=='['){
            open+=1
          }
          if(variable[i]==']'){
            close+=1
          }
          if(variable[i]=='[' && open==close){
            start=i;
            break;
          }
        }
        let inside=getPointsUpToString(start+1,variable.length-1,variable)
        let args=[]
        let outside=getPointsUpToString(0,start,variable)
        return evalVariable(outside,functions,vars)[evalVariable(inside,functions,vars)]
      }else{
        let args=variable.slice(1,variable.length-1)
        let arrayer=[]
        for(const i of (args.length>0?args.split(','):[])){
          arrayer.push(evalVariable(i,functions,vars))
        }
        return arrayer
      }
    }
  }


  if(Number(variable)===Number(variable)&&variable!==""){
    return Number(variable)
  }
  if(vars[variable]!==undefined){
    return vars[variable]
  }
  let quote=0
  let stringquote=0
  for(let i=variable.length-1;i>-1;i--){
    if(variable[i]==='"'){
      quote^=1
    }
    if(variable[i]==="'"){
      stringquote^=1
    }
    if(variable[i]==="+"&&quote===0&&stringquote===0){
      return evalVariable(getPointsUpToString(0,i,variable),functions,vars)+evalVariable(getPointsUpToString(i+1,variable.length,variable),functions,vars)
    }
    if(variable[i]==="/"&&quote===0&&stringquote===0){
      return evalVariable(getPointsUpToString(0,i,variable),functions,vars)/evalVariable(getPointsUpToString(i+1,variable.length,variable),functions,vars)
    }
    if(variable[i]==="*"&&quote===0&&stringquote===0){
      return evalVariable(getPointsUpToString(0,i,variable),functions,vars)*evalVariable(getPointsUpToString(i+1,variable.length,variable),functions,vars)
    }
    if(variable[i]==="-"&&quote===0&&stringquote===0){
      return evalVariable(getPointsUpToString(0,i,variable),functions,vars)-evalVariable(getPointsUpToString(i+1,variable.length,variable),functions,vars)
    }
    if(variable[i]===">"&&quote===0&&stringquote===0){
      return evalVariable(getPointsUpToString(0,i,variable),functions,vars)>evalVariable(getPointsUpToString(i+1,variable.length,variable),functions,vars)
    }
    if(variable[i]==="<"&&quote===0&&stringquote===0){
      return evalVariable(getPointsUpToString(0,i,variable),functions,vars)<evalVariable(getPointsUpToString(i+1,variable.length,variable),functions,vars)
    }
    if(variable[i]==="%"&&quote===0&&stringquote===0){
      return evalVariable(getPointsUpToString(0,i,variable),functions,vars)%evalVariable(getPointsUpToString(i+1,variable.length,variable),functions,vars)
    }
    if(variable[i]==="."&&quote===0&&stringquote===0){
      return evalVariable(getPointsUpToString(0,i,variable),functions,vars)[getPointsUpToString(i+1,variable.length,variable)]
    }
    if(i!=variable.length-1){
      if(variable.slice(i,i+2)=="=="){
        return evalVariable(getPointsUpToString(0,i,variable),functions,vars)==evalVariable(getPointsUpToString(i+2,variable.length,variable),functions,vars)
      }
      if(variable.slice(i,i+2)=="!="){
        return evalVariable(getPointsUpToString(0,i,variable),functions,vars)!=evalVariable(getPointsUpToString(i+2,variable.length,variable),functions,vars)
      }
      if(variable.slice(i,i+2)=="<="){
        return evalVariable(getPointsUpToString(0,i,variable),functions,vars)<=evalVariable(getPointsUpToString(i+2,variable.length,variable),functions,vars)
      }
      if(variable.slice(i,i+2)==">="){
        return evalVariable(getPointsUpToString(0,i,variable),functions,vars)>=evalVariable(getPointsUpToString(i+2,variable.length,variable),functions,vars)
      }
    }
  }
  variable = nVar
  if((variable[0]==='\''&&variable[variable.length-1]==='\'')||(variable[0]==='"'&&variable[variable.length-1]==='"')){
    return getPointsUpToString(1,variable.length-1,variable)
  }
}
let parseCode=(code,vars={})=>{
  lastIf=false
  for(let i=0;i<code.length;i++){
    if(code[i].match(/if\(.*\){/g)){
      matches=code[i].match(/if\([^)]*\){/g)
      count=1
      found=[]
      for(let j=i;j<code.length;j++){
        for(let k=j==i?matches[0].length+1:0;k<code[j].length;k++){
          if(code[j][k]=='{'){
            count++
          }
          if(code[j][k]=='}'){
            count--
          }
          if(count==0){
            found=[j,k]
          }
        }
      }
      if(evalVariable(matches[0].slice(3,matches[0].length-2),{},vars)){
        if(found){
          lines=[]
          for(let j=i;j<found[0];j++){
            if(j==found[0]-1 && j==i){
              lines.push(code[j].slice(matches[0].length,found[1])+' ')
            }else if(j==found[0]-1){
              lines.push(code[j].slice(0,found[1])+' ')
            }else if(j==i){
              lines.push(code[j].slice(matches[0].length))
            }else{
              lines.push(code[j])
            }
          }
        }
        parseCode(lines,vars)
        lastIf=true
      }else{
        lastIf=false
      }
      i=found[0]-1
    }
    if(code[i].match(/for\(.*\){/g)){
      matches=code[i].match(/for\([^)]*\){/g)
      console.log(matches)
      count=1
      found=[]
      for(let j=i;j<code.length;j++){
        for(let k=j==i?matches[0].length+1:0;k<code[j].length;k++){
          if(code[j][k]=='{'){
            count++
          }
          if(code[j][k]=='}'){
            count--
          }
          if(count==0){
            found=[j,k]
          }
        }
      }
      let parts = matches[0].slice(4,matches[0].length-2).split(';')
      parseCode([parts[0]],vars)
      console.log(parts,vars)
      let lines=[]
      if(found){
        for(let j=i;j<found[0];j++){
          if(j==found[0]-1 && j==i){
            lines.push(code[j].slice(matches[0].length,found[1])+' ')
          }else if(j==found[0]-1){
            lines.push(code[j].slice(0,found[1])+' ')
          }else if(j==i){
            lines.push(code[j].slice(matches[0].length))
          }else{
            lines.push(code[j])
          }
        }
      }
      while(true){
        console.log(vars,evalVariable(parts[1],{},vars))
        if(!evalVariable(parts[1],{},vars)){
          break
        }
        parseCode(lines,vars)
        parseCode([parts[2]],vars)
      }
      i=found[0]-1
    }else if(code[i].split('=')[1]!=undefined){
      let varParts=code[i].split('=')
      varParts[0]=varParts[0].replace(/ /g,'')
      console.log(varParts)
      let pointerAHHHHHHHHHHHH=vars;
      let newVar=evalVariable(varParts[1],{},vars)
      let path=pointerPath(varParts[0])
      for(let i=0;i<path.length-1;i++){
        if(path[i][1]=='leave'){
          pointerAHHHHHHHHHHHH=pointerAHHHHHHHHHHHH[path[i][0]]
        }else{
          pointerAHHHHHHHHHHHH=pointerAHHHHHHHHHHHH[evalVariable(path[i][0],{},vars)]
        }
      }
      if(path[path.length-1][1]=='leave'){
        pointerAHHHHHHHHHHHH[path[path.length-1][0]]=newVar
      }else{
        pointerAHHHHHHHHHHHH[evalVariable(path[path.length-1][0],{},vars)]=newVar
      }
    }else{
      console.log(evalVariable(code[i].slice(0,code[i].length-1),{},vars))
    }
  }
}
let pointerPath=function(path,pathList=[]){
  if(path==''){
    return pathList
  }
  if(path.indexOf('.')==-1 && path.indexOf(']')==-1){
    pathList.push([path,"leave"])
    return pathList
  }
  if(path.indexOf('.')==0){
    return pointerPath(path.slice(1,path.length),pathList)
  }
  if(path[0]=='['){
    count=0
    for(let i=0;i<path.length;i++){
      if(path[i]=='['){
        count++
      }
      if(path[i]==']'){
        count--
      }
      if(!count){
        pathList.push([path.slice(1,i),'eval'])
        return pointerPath(path.slice(i+1,path.length),pathList)
      }
    }
  }
  if((path.indexOf('.')>path.indexOf('[')||path.indexOf('.')==-1)&&path.indexOf('[')!=-1){
    pathList.push([path.slice(0,path.indexOf('[')),'leave'])
    return pointerPath(path.slice(path.indexOf('['),path.length),pathList)
  }
  for(let i=0;i<path.length;i++){
    if(path[i]=='.'){
      pathList.push([path.slice(0,i),'leave'])
      return pointerPath(path.slice(i+1,path.length),pathList)
    }
  }
}
