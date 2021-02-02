let classes=[]
class Saveable {
  constructor(first){
    this.innerClassList = [];
    if(first==undefined){
      this.isFake=true
    }else{
      this.isFake=false
    }
  }
  setData(data){
    for(const [key,value] of Object.entries(data)){
      this[key]=value
    }
    this.innerClassList=[]
    this.registerInnerClasses()
    this.saveInnerClasses()
    return this
  }
  registerInnerClasses(){}
  isNotFake(){
    return !this.isFake
  }
  saveInnerClasses(){
    for(let classy of this.innerClassList){
      if(classy.type=='2darray'){
        for(let i=0;i<classy.pointer.length;i++){
          for(let j=0;j<classy.pointer[i].length;j++){
            if(classy.pointer[i][j]!=null){
              let otherSave=classy.pointer[i][j]
              let newClass=new classes[classy.classType]()
              newClass.setData(otherSave)
              classy.pointer[i][j]=newClass
            }
          }
        }
      }
      if(classy.type=='single'){
        let otherSave=classy.pointer[classy.nextStep]
        let newClass=new classes[classy.classType]()
        newClass.setData(otherSave)
        classy.pointer[classy.nextStep]=newClass
      }
      if(classy.type=='array'){
        for(let i=0;i<classy.pointer.length;i++){
          if(classy.pointer[i]!=null){
            let otherSave=classy.pointer[i]
            let newClass=new classes[classy.classType]()
            newClass.setData(otherSave)
            classy.pointer[i]=newClass
          }
        }
      }
    }
  }
  registerInnerClass(toSave,type,classType,nextStep=undefined){
    let acceptable=['2darray','array','single']
    if(acceptable.includes(type)){
      this.innerClassList.push({pointer:toSave,type,classType,nextStep})
    }
  }
}

const registerClass = function(representer,actual){
  classes[representer]=actual
}
