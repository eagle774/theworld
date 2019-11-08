const bigNumberHandler = (number)=>{
  prefixes=['','K','M','B','T','Qa','Qi','Sx','Sp','O','N','De']
  pos=0
  if(number == Infinity){
    return number
  }
  while(number>=1000){
    number = number/1000
    pos+=1
  }if(pos==0){
    return (Math.round(number*100000)/100000+'').length>number.toFixed(2).length?number.toFixed(2):(Math.round(number*100000)/100000+'')
  }
  if(Math.round(number)<10){
    return number.toFixed('2')+prefixes[pos]
  }else if(Math.round(number)<100){
    return number.toFixed('1')+prefixes[pos]
  }
  return Math.round(number)+prefixes[pos]
}
