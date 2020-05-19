const getPointsUpToString=(start,end,arr)=>{
  let returnVal=''
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
var evalVariable = function(variable,functions,vars,specialFuncs){
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
    for(const [key, value] of Object.entries(specialFuncs)){
      if(variable.indexOf(key)===0&&variable[variable.length-1]===')'){
        let start=variable.indexOf('(')
        let arguments=getPointsUpToString(start+1,variable.length-1,variable)
        let args=[]
        cur=''
        match=0
        counter = 0
        let extraLines = []
        for(let i=0;i<arguments.length;i++){
          if(arguments[i]==='('){
            match+=1
          }
          if(arguments[i]===')'){
            match-=1
          }
          if(arguments[i]===','&&match===0){
            extraLines.push(value.variables[counter]+'='+cur)
            cur=''
            counter += 1
            continue
          }
          cur+=arguments[i]
        }
        if(value.variables[counter]){
          extraLines.push(value.variables[counter]+'='+cur)
        }
        return parseCode(extraLines.concat(value.code),vars,specialFuncs)
      }
    }
  }
  open=0
  close=0
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
        cur=''
        match=0
        for(let i=0;i<thing.length;i++){
          if(thing[i]==='('){
            match+=1
          }
          if(thing[i]===')'){
            match-=1
          }
          if(thing[i]===','&&match===0){
            args.push(evalVariable(cur,functions,vars,specialFuncs))
            cur=''
            continue
          }
          cur+=thing[i]
        }
        args.push(evalVariable(cur,functions,vars,specialFuncs))
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
        if(parts[0][0]!='"' && parts[0][0]!='"'){
          parts[0]='"'+parts[0]+'"'
        }
        dicter[parts[0].slice(1,parts[0].length-1)]=evalVariable(parts.slice(1).join(':'),functions,vars,specialFuncs)
      }
      return dicter
    }
  }
  open=0
  close=0
  func = true
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
        return evalVariable(outside,functions,vars,specialFuncs)[evalVariable(inside,functions,vars,specialFuncs)]
      }else{
        let args=variable.slice(1,variable.length-1)
        let arrayer=[]
        for(const i of (args.length>0?args.split(','):[])){
          arrayer.push(evalVariable(i,functions,vars,specialFuncs))
        }
        return arrayer
      }
    }
  }


  if(Number(variable)===Number(variable)&&variable!==''){
    return Number(variable)
  }
  if(vars[variable]!==undefined){
    return vars[variable]
  }
  let quote=0
  let stringquote=0
  let bracket=0
  for(let i=variable.length-1;i>-1;i--){
    if(variable[i]==='\''){
      quote^=1
    }
    if(variable[i]==='('){
      bracket++
    }
    if(variable[i]===')'){
      bracket--
    }
    if(variable[i]==='\"'){
      stringquote^=1
    }
    if(variable[i]==='+'&&quote===0&&bracket===0&&stringquote===0){
      return evalVariable(getPointsUpToString(0,i,variable),functions,vars,specialFuncs)+evalVariable(getPointsUpToString(i+1,variable.length,variable),functions,vars,specialFuncs)
    }
    if(variable[i]==='/'&&quote===0&&bracket===0&&stringquote===0){
      return evalVariable(getPointsUpToString(0,i,variable),functions,vars,specialFuncs)/evalVariable(getPointsUpToString(i+1,variable.length,variable),functions,vars,specialFuncs)
    }
    if(variable[i]==='*'&&quote===0&&bracket===0&&stringquote===0){
      return evalVariable(getPointsUpToString(0,i,variable),functions,vars,specialFuncs)*evalVariable(getPointsUpToString(i+1,variable.length,variable),functions,vars,specialFuncs)
    }
    if(variable[i]==='-'&&quote===0&&bracket===0&&stringquote===0){
      return evalVariable(getPointsUpToString(0,i,variable),functions,vars,specialFuncs)-evalVariable(getPointsUpToString(i+1,variable.length,variable),functions,vars,specialFuncs)
    }
    if(variable[i]==='>'&&quote===0&&bracket===0&&stringquote===0){
      return evalVariable(getPointsUpToString(0,i,variable),functions,vars,specialFuncs)>evalVariable(getPointsUpToString(i+1,variable.length,variable),functions,vars,specialFuncs)
    }
    if(variable[i]==='<'&&quote===0&&bracket===0&&stringquote===0){
      return evalVariable(getPointsUpToString(0,i,variable),functions,vars,specialFuncs)<evalVariable(getPointsUpToString(i+1,variable.length,variable),functions,vars,specialFuncs)
    }
    if(variable[i]==='%'&&quote===0&&bracket===0&&stringquote===0){
      return evalVariable(getPointsUpToString(0,i,variable),functions,vars,specialFuncs)%evalVariable(getPointsUpToString(i+1,variable.length,variable),functions,vars,specialFuncs)
    }
    if(i!=variable.length-1){
      if(variable.slice(i,i+2)=='=='&&quote===0&&bracket===0&&stringquote===0){
        return evalVariable(getPointsUpToString(0,i,variable),functions,vars,specialFuncs)==evalVariable(getPointsUpToString(i+2,variable.length,variable),functions,vars,specialFuncs)
      }
      if(variable.slice(i,i+2)=='!='&&quote===0&&bracket===0&&stringquote===0){
        return evalVariable(getPointsUpToString(0,i,variable),functions,vars,specialFuncs)!=evalVariable(getPointsUpToString(i+2,variable.length,variable),functions,vars,specialFuncs)
      }
      if(variable.slice(i,i+2)=='<='&&quote===0&&bracket===0&&stringquote===0){
        return evalVariable(getPointsUpToString(0,i,variable),functions,vars,specialFuncs)<=evalVariable(getPointsUpToString(i+2,variable.length,variable),functions,vars,specialFuncs)
      }
      if(variable.slice(i,i+2)=='&&'&&quote===0&&bracket===0&&stringquote===0){
        return evalVariable(getPointsUpToString(0,i,variable),functions,vars,specialFuncs)&&evalVariable(getPointsUpToString(i+2,variable.length,variable),functions,vars,specialFuncs)
      }
      if(variable.slice(i,i+2)=='||'&&quote===0&&bracket===0&&stringquote===0){
        return evalVariable(getPointsUpToString(0,i,variable),functions,vars,specialFuncs)||evalVariable(getPointsUpToString(i+2,variable.length,variable),functions,vars,specialFuncs)
      }
      if(variable.slice(i,i+2)=='>='&&quote===0&&bracket===0&&stringquote===0){
        return evalVariable(getPointsUpToString(0,i,variable),functions,vars,specialFuncs)>=evalVariable(getPointsUpToString(i+2,variable.length,variable),functions,vars,specialFuncs)
      }
    }
  }
  quote=0
  stringquote=0
  for(let i=variable.length-1;i>-1;i--){
    if(variable[i]==='\''){
      quote^=1
    }
    if(variable[i]==='\"'){
      stringquote^=1
    }
    if(variable[i]==='.'&&quote===0&&stringquote===0){
      if(variable.slice(variable.lastIndexOf('.')).indexOf('(')+variable.lastIndexOf('.')==variable.lastIndexOf('.')-1){
        return evalVariable(getPointsUpToString(0,i,variable),functions,vars,specialFuncs)[getPointsUpToString(i+1,variable.length)]
      }else{
        sector = variable.slice(variable.lastIndexOf('.')+1)
        value =  evalVariable(getPointsUpToString(0,i,variable),functions,vars,specialFuncs)[getPointsUpToString(i+1,sector.indexOf('(')+variable.lastIndexOf('.')+1,variable)]
        let start=sector.indexOf('(')
        let thing=getPointsUpToString(start+1,sector.length-1,sector)
        let args=[]
        cur=''
        match=0
        for(let i=0;i<thing.length;i++){
          if(thing[i]==='('){
            match+=1
          }
          if(thing[i]===')'){
            match-=1
          }
          if(thing[i]===','&&match===0){
            args.push(evalVariable(cur,functions,vars,specialFuncs))
            cur=''
            continue
          }
          cur+=thing[i]
        }
        if(cur!=''){
          args.push(evalVariable(cur,functions,vars,specialFuncs))
        }
        return value.apply(evalVariable(getPointsUpToString(0,i,variable),functions,vars,specialFuncs),args)
      }
    }
  }
  variable = nVar
  if((variable[0]==='\''&&variable[variable.length-1]==='\'')||(variable[0]==='\"'&&variable[variable.length-1]==='\"')){
    return getPointsUpToString(1,variable.length-1,variable)
  }
}
let parseCode=(code,passedInFuncs={},vars={},functions = {})=>{
  lastIf=false
  for(let i=0;i<code.length;i++){
    if(code[i].match(/return .*/g)){
      return evalVariable(code[i].match(/return .*/g)[0].slice(7),passedInFuncs,vars,functions)
    }
    if(code[i].match(/if\(.*\){/g)){
      matches=code[i].match(/if\(.*\){/g)
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
            break
          }
        }
        if(found.length>0){break}
      }
      if(evalVariable(matches[0].slice(3,matches[0].length-2),passedInFuncs,vars,functions)){
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
        parseCode(lines,passedInFuncs,vars,functions)
        lastIf=true
      }else{
        lastIf=false
      }
      i=found[0]-1
    }else if(code[i].match(/for\(.*\){/g)){
      let matches=code[i].match(/for\([^)]*\){/g)
      let count=1
      let found=[]
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
            break
          }
        }
        if(found.length>0){break}
      }
      let parts = matches[0].slice(4,matches[0].length-2).split(';')
      parseCode([parts[0]],passedInFuncs,vars,functions)
      let lines=[]
      if(found){
        for(let j=i;j<found[0]+1;j++){
          if(j==found[0] && j==i){
            lines.push(code[j].slice(matches[0].length,found[1])+' ')
          }else if(j==found[0]){
            lines.push(code[j].slice(0,found[1])+' ')
          }else if(j==i){
            lines.push(code[j].slice(matches[0].length))
          }else{
            lines.push(code[j])
          }
        }
      }
      while(true){
        if(!evalVariable(parts[1],passedInFuncs,vars,functions)){
          break
        }
        parseCode(lines,passedInFuncs,vars,functions)
        parseCode([parts[2]],passedInFuncs,vars,functions)
      }
      i=found[0]-1
    }else if(code[i].match(/function [^\( ]+\(.*\){/g)){
      match=code[i].match(/function +[^\( ]+\(.*\){/g)[0]
      count=1
      found=[]
      for(let j=i;j<code.length;j++){
        for(let k=j==i?match.length:0;k<code[j].length;k++){
          if(code[j][k]=='{'){
            count++
          }
          if(code[j][k]=='}'){
            count--
          }
          if(count==0){
            found=[j,k]
            break
          }
        }
        if(found.length>0){break}
      }
      lines = []
      if(found){
        for(let j=i;j<found[0]+1;j++){
          if(j==found[0] && j==i){
            lines.push(code[j].slice(match.length,found[1])+' ')
          }else if(j==found[0]){
            lines.push(code[j].slice(0,found[1])+' ')
          }else if(j==i){
            lines.push(code[j].slice(match.length))
          }else{
            lines.push(code[j])
          }
        }
        firstBracket = match.indexOf('(')
        lastSpace = match.slice(0,firstBracket).lastIndexOf(' ')
        name = match.slice(lastSpace+1,firstBracket)
        lastBracket = match.lastIndexOf(')')
        variables = match.slice(firstBracket+1,lastBracket).replace(/ /g,'').split(',')
        functions[name] = {'variables':variables,'code':lines}
        i=found[0]-1
      }
    }else if(code[i].split('=')[1]!=undefined){
      let varParts=code[i].split('=')
      varParts[0]=varParts[0].replace(/ /g,'')
      let pointerAHHHHHHHHHHHH=vars;
      let newVar=evalVariable(varParts[1],passedInFuncs,vars,functions)
      let path=pointerPath(varParts[0])
      for(let i=0;i<path.length-1;i++){
        if(path[i][1]=='leave'){
          pointerAHHHHHHHHHHHH=pointerAHHHHHHHHHHHH[path[i][0]]
        }else{
          pointerAHHHHHHHHHHHH=pointerAHHHHHHHHHHHH[evalVariable(path[i][0],passedInFuncs,vars,functions)]
        }
      }
      if(path[path.length-1][1]=='leave'){
        pointerAHHHHHHHHHHHH[path[path.length-1][0]]=newVar
      }else{
        pointerAHHHHHHHHHHHH[evalVariable(path[path.length-1][0],passedInFuncs,vars,specialFuncs)]=newVar
      }
    }else{
      evalVariable(code[i].slice(0,code[i].length-1),passedInFuncs,vars,functions)
    }
  }
}
let pointerPath=function(path,pathList=[]){
  if(path==''){
    return pathList
  }
  if(path.indexOf('.')==-1 && path.indexOf(']')==-1){
    pathList.push([path,'leave'])
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
