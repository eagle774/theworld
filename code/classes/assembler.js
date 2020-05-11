class Assembler{
  constructor(resTable){
    this.resTable=new ReadOnly(()=>{return JSON.parse(JSON.stringify(resTable))})
  }
  buildBuilding(app,name,amount,numberOfAssemblers){
    if(amount<=numberOfAssemblers){
      numberOfAssemblers-=amount;
      return app.buyBuilding(name,amount,false)
    }
  }
  isBuildingBuyable(app,name,amount){
    return app.howManyPlease(name,false)>=amount
  }
}
