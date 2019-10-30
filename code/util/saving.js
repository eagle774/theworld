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
    }
  }
  registerInnerClass(toSave,type,classType){
    let acceptable=['2darray']
    if(acceptable.includes(type)){
      this.innerClassList.push({pointer:toSave,type,classType})
    }
  }
}

let registerClass=(name,classType)=>{
  classes[name]=classType
}
