class WorldGrid extends Saveable{
  constructor(size){
    super(size)
    if(this.isNotFake()){
      this.terrainGrid=[]
      this.entityGrid=[]
      for(let i=0;i<size;i++){
        this.terrainGrid.push([])
        this.entityGrid.push([])
        for(let j=0;j<size;j++){
          this.entityGrid[i].push(null)
          if(i==size/2 &&j==size/2){
            this.terrainGrid[i].push(new Tile('home',i,j))
          }else{
            this.terrainGrid[i].push(new Tile('grass',i,j))
          }
        }
      }
      this.size=size
      this.spawnEntity('robot',0,0)
      for(let i=0;i<this.size;i++){
        for(let j=0;j<this.size;j++){
          this.handleCodeParser(this.terrainGrid[i][j].data.code.onLoad,this.terrainGrid[i][j])
        }
      }
    }
    if(false){

    }
  }
  registerInnerClasses(){
    this.registerInnerClass(this.entityGrid,'2darray','entity')
    this.registerInnerClass(this.terrainGrid,'2darray','tile')
  }
  handleCodeParser(itemCode,item){
    let prevSuceeded=false
    for(let code of itemCode){
      if((code.withChance=='withPrev'&&prevSuceeded)||(Math.random()<code.withChance)){
        prevSuceeded=true
        if(code.toDo=='spawnEntity'){
          this.spawnEntity(code.type,item.x,item.y)
          break
        }
      }else{
        prevSuceeded=false
      }
    }
  }
  spawnEntity(type,x,y){
    if(!this.entityGrid[x][y]){
      this.entityGrid[x][y]=new Entity(type,x,y)
    }
  }
  tick(){
    for(let i=0;i<this.size;i++){
      for(let j=0;j<this.size;j++){
        this.handleCodeParser(this.terrainGrid[i][j].data.code.onTick,this.terrainGrid[i][j])
      }
    }
    for(let i=0;i<this.size;i++){
      for(let j=0;j<this.size;j++){
        if(this.entityGrid[i][j]){
          this.handleCodeParser(this.entityGrid[i][j].data.code.onTick,this.entityGrid[i][j])
        }
      }
    }
  }
  displayGrid(){
    let string=''
    for(let i=0;i<this.size;i++){
      for(let j=0;j<this.size;j++){
        if(this.entityGrid[i][j]){
          string+=this.entityGrid[i][j].getDisplay()
        }else{
          string+=this.terrainGrid[i][j].getDisplay()
        }
        string+=' '
      }
      string+='\n'
    }
    return string
  }
}

registerClass('worldGrid',WorldGrid)
