function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
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
    return (Math.round(number*100)/100+'').length>
    number.toFixed(2).length?
    negative+number.toFixed(2):
    negative+(Math.round(number*100)/100+'')
  }
  if(number.toFixed('2')<10){
    return negative+number.toFixed('2')+prefixes[pos]
  }else if(number.toFixed('1')<100){
    return negative+number.toFixed('1')+prefixes[pos]
  }
  return negative+Math.round(number)+prefixes[pos]
}
const summed = (array)=>{
  summedUp = 0
  for(const number in array){
    summedUp+=array[number]
  }
  return summedUp==summedUp?summedUp:0
}
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
}
const reconstructDict = (keyValuePairs) => {
  newDict = {}
  for(const [key,value] of keyValuePairs){
    newDict[key]=value
  }
  return newDict
}
function sigmoid(number) {
  return (1/(1+(Math.E**(-number))))
}
