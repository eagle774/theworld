class Tile extends Saveable{
  constructor(type,x,y){
    super(type)
    if(this.isNotFake()){
      this.data=tileData[type]
      this.type=type
      this.x=x
      this.y=y
    }
  }
  getDisplay(){
    return this.data.display
  }
}


registerClass('tile',Tile)
