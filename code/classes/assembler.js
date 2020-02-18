class Assembler extends Saveable{
  constructor(resTable){
    super(resTable)
    this.acted = false
    this.resTable=new ReadOnly(()=>{return JSON.parse(JSON.stringify(resTable))})
  }
  buildBuilding(app,name,amount,numberOfAssemblers){
    if(!this.acted&&amount<=numberOfAssemblers){
      this.acted=true
      return app.buyBuilding(name,amount,false)
    }
  }
  isBuildingBuyable(app,name,amount){
    return app.howManyPlease(name,false)>=amount
  }
}

registerClass('assembler',Assembler)
