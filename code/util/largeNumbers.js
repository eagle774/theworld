const bigNumberHandler = (number,isBuilding)=>{
  let prefixes=['','K','M','B','T','Qa','Qi','Sx','Sp','O','N','De','UnDe','DuDe','TrDe','QaDe','QiDe','SxDe','SpDe','OcDe','NDe','Vg','UnVg','DuVg','TrVg','QaVg','QiVg','SxVg','SpVg','OcVg','NVg','Tg','UnTg','DuTg']
  let pos=0
  let negative = ''
  if(number<0){
    number*=-1
    negative = '-'
  }
  if(number<0.005&&negative=='-'){
    negative=''
  }
  if(number == Infinity){
    return number
  }
  while(number>=1000){
    number /= 1000
    pos+=1
  }
  if(Math.round(number,1)>=1000){
    number /= 1000
    pos += 1
  }
  if(!isBuilding&&pos==0){
    return negative+number.toFixed(2)+prefixes[pos]
  }
  if(pos==0){
    return (Math.round(number*100000)/100000+'').length>
    number.toFixed(2).length?
    negative+number.toFixed(2):
    negative+(Math.round(number*100000)/100000+'')
  }
  if(number.toFixed('2')<10){
    return negative+number.toFixed('2')+prefixes[pos]
  }else if(number.toFixed('1')<100){
    return negative+number.toFixed('1')+prefixes[pos]
  }
  return negative+Math.round(number)+prefixes[pos]
}
