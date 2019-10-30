class Entity extends Saveable{
  constructor(type,x,y){
    super(type)
    if(this.isNotFake()){
      this.data=entityData[type]
      this.type=type
      this.x=x
      this.y=y
    }
  }
  getDisplay(){
    return this.data.display
  }
}

registerClass('entity',Entity)
