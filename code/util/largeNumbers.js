const bigNumberHandler = (number)=>{
  prefixes=['','K','M','B','T','Qa','Qi','Sx','Sp','O','N','De']
  pos=0
  negative = ''
  if(number<0){
    number*=-1
    negative = '-'
  }
  if(number == Infinity){
    return number
  }
  while(number>=1000){
    number = number/1000
    pos+=1
  }if(pos==0){
    return negative+(Math.round(number*100000)/100000+'').length>number.toFixed(2).length?number.toFixed(2):(Math.round(number*100000)/100000+'')
  }
  if(number.toFixed('2')<10){
    return negative+number.toFixed('2')+prefixes[pos]
  }else if(number.toFixed('1')<100){
    return negative+number.toFixed('1')+prefixes[pos]
  }
  return negative+Math.round(number)+prefixes[pos]
}
