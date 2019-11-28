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
          this.terrainGrid[i].push(new Tile('grass', i, j))
        }
      }
      this.size=size
      this.spawnEntity('robot', 0, 0)
      for(let i=0;i<this.size;i++){
        for(let j=0;j<this.size;j++){
          this.handleCodeParser(this.terrainGrid[i][j].data.code.onLoad, this.terrainGrid[i][j])
        }
      }
    }
  }
  registerInnerClasses(){
    this.registerInnerClass(this.entityGrid, '2darray', 'entity')
    this.registerInnerClass(this.terrainGrid, '2darray', 'tile')
  }
  destroyEntity(x,y){
    this.entityGrid[x][y]=null
  }
  handleCodeParser(itemCode, item){
    let prevSuceeded=false
    for(let code of itemCode){
      if((code.withChance=='withPrev'&&prevSuceeded)||(Math.random()<code.withChance)){
        prevSuceeded=true
        if(code.toDo=='spawnEntity'){
          this.spawnEntity(code.type, item.x, item.y)
          break
        }
      }else{
        prevSuceeded=false
      }
    }
  }
  spawnEntity(type, x, y){
    if(!this.entityGrid[x][y]){
      this.entityGrid[x][y]=new Entity(type, x, y)
    }
  }
  moveEntity(startX, startY, mx, my,caller = {'x':0,'y':0}){
    if(startX+mx>=this.size)return [false]
    if(startY+my>=this.size)return [false]
    if(startX+mx<0)return [false]
    if(startY+my<0)return [false]
    if(this.entityGrid[startX+mx][startY+my]){
      return [false,new ReadOnly(()=>{
        return [startX+mx,startY+my]
      })]
    }
    if(!this.entityGrid[startX][startY]){
      return [false]
    }
    this.entityGrid[startX][startY].x += mx
    this.entityGrid[startX][startY].y += my
    caller.x+=mx
    caller.y+=my
    this.entityGrid[startX+mx][startY+my] = this.entityGrid[startX][startY]
    this.entityGrid[startX][startY] = null
    return [true]
  }
  moveTile(startX, startY, mx, my){
    return 'Please stop'
  }
  tick(app){
    for(let i=0;i<this.size;i++){
      for(let j=0;j<this.size;j++){
        if(this.entityGrid[i][j]){
          this.handleCodeParser(this.entityGrid[i][j].data.code.onTick, this.entityGrid[i][j])
        }
        this.handleCodeParser(this.terrainGrid[i][j].data.code.onTick, this.terrainGrid[i][j])
        if(this.entityGrid[i][j]!==null&&this.entityGrid[i][j].type=='robot'){
          for(const [key, value] of Object.entries(this.entityGrid[i][j].data.resources)){
            this.entityGrid[i][j].data.resources[key]-=app.incrementResource(key, value)
          }
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
  getData(type){
    for(let i=0;i<this.size;i++){
      for(let j=0;j<this.size;j++){
        if(this.entityGrid[i][j]!=null&&this.entityGrid[i][j].type==type){
          return this.entityGrid[i][j]
        }
      }
    }
  }
}

registerClass('worldGrid',WorldGrid)
