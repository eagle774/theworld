class Robot extends Saveable{
  constructor(grid){
    super(grid)
    if(this.isNotFake()){
      let data = grid.getData('robot')
      this.data = new ReadOnly(()=>{
        return data
      })
      this.acted = false
      this.x = this.data.data.x
      this.y = this.data.data.y
      this.grid = grid
    }
  }
  moveRight(grid){
    if(!this.acted){
      let tested = grid.moveEntity(this.x,this.y,0,1,this)
      if(tested[0]){
        this.acted = true
      }
      return tested[1]?tested[1]:tested[0]
    }
  }
  moveUp(grid){
    if(!this.acted){
      let tested = grid.moveEntity(this.x,this.y,-1,0,this)
      if(tested[0]){
        this.acted = true
      }
      return tested[1]?tested[1]:tested[0]
    }
  }
  moveLeft(grid){
    if(!this.acted){
      let tested = grid.moveEntity(this.x,this.y,0,-1,this)
      if(tested[0]){
        this.acted = true
      }
      return tested[1]?tested[1]:tested[0]
    }
  }
  moveDown(grid){
    if(!this.acted){
      let tested = grid.moveEntity(this.x,this.y,1,0,this)
      if(tested[0]){
        this.acted = true
      }
      return tested[1]?tested[1]:tested[0]
    }
  }
  moveRandom(grid){
    let move = Math.floor(Math.random()*4)
    switch(move){
      case 0:
        return this.moveDown(grid)
      case 1:
        return this.moveUp(grid)
      case 2:
        return this.moveLeft(grid)
      case 3:
        return this.moveRight(grid)
    }
  }
  chopTree(x,y,grid,number){
    if(!this.acted){
      if(x<grid.size&&x>=0&&y<grid.size&&y>=0&&((x==this.x-1||x==this.x+1)&&y==this.y)||(x==this.x&&(y==this.y-1||y==this.y+1))){
        if(grid.entityGrid[x][y]!=null){
          if(grid.entityGrid[x][y].type=='tree'){
            grid.entityGrid[this.x][this.y].data.resources.wood+=number*grid.entityGrid[x][y].data.resources.wood
            grid.destroyEntity(x,y)
            this.acted = true
            return true
          }
        }
      }
      return false
    }
  }
  chopAdjacentSquares(grid,number){
    return this.chopTree(this.x,this.y+1,grid,number) ||
    this.chopTree(this.x,this.y-1,grid,number)||
    this.chopTree(this.x-1,this.y,grid,number)||
    this.chopTree(this.x+1,this.y,grid,number)
  }
}


registerClass('robot',Robot)
