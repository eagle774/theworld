class SpaceAssembler{
  constructor(resTable){
    this.resTable=new ReadOnly(()=>{return JSON.parse(JSON.stringify(resTable))})
  }
  constructBuilding(app,name,amount,numberOfAssemblers){
    if(amount<=numberOfAssemblers){
      numberOfAssemblers-=amount;
      return app.buyBuilding(name,amount,true)
    }
  }
  isBuildingBuyable(app,name,amount){
    return app.howManyPlease(name,true)>=amount
  }
}
