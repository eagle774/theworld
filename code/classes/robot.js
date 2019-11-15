class Robot extends Saveable{
  constructor(grid){
    super(grid)
    if(this.isNotFake()){
      let data = grid.getData('robot')
      this.data = new ReadOnly(()=>{
        return data
      })
      this.x = this.data.data.x
      this.y = this.data.data.y
      this.grid = grid
    }
  }
  moveRight(){
    return this.grid.moveEntity(this.x,this.y,0,1,this)
  }
  moveUp(){
    return this.grid.moveEntity(this.x,this.y,-1,0,this)
  }
  moveLeft(){
    return this.grid.moveEntity(this.x,this.y,0,-1,this)
  }
  moveDown(){
    return this.grid.moveEntity(this.x,this.y,1,0,this)
  }
  moveRandom(){
    let move = Math.floor(Math.random()*4)
    switch(move){
      case 0:
        return this.moveDown()
      case 1:
        return this.moveUp()
      case 2:
        return this.moveLeft()
      case 3:
        return this.moveRight()
    }
  }
}


registerClass('robot',Robot)
