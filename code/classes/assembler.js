class Assembler{
  constructor(resTable){
    this.resTable=new ReadOnly(()=>{return JSON.parse(JSON.stringify(resTable))})
  }
  buyBuilding(app,name,amount,numberOfAssemblers){
    if(amount<=numberOfAssemblers){
      numberOfAssemblers-=amount;
      if(app.debugMode){
        console.log("Built " + amount+" of "+name)
      }
      return app.buyBuilding(name,amount,false)
    }
  }
  isBuildingBuyable(app,name,amount){
    return app.howManyPlease(name,false)>=amount
  }
}
