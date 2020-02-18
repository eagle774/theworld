class NamePool extends Saveable{
  constructor(starts,ends){
    super(starts)
    if(this.isNotFake()){
      this.taken={'':true}
      this.starts = starts
      this.ends = ends
    }
  }
  removeName(name){
    this.taken[name]=false
  }
  generateName(){
    let tries=0
    name=''
    while(this.taken[name] && tries<100){
      tries++
      name=this.starts[Math.round(Math.random()*this.starts.length-0.5)]+' '+
      this.ends[Math.round(Math.random()*this.ends.length-0.5)]
    }
    this.taken[name]=true
    if(tries<100){
      return name
    }else{
      return 'Out of names'
    }
  }
}

registerClass('namepool',NamePool)

productPool = new NamePool([
  'Pharmaceutical',
  'Molten Copper',
  'Placated Purple',
  '[REDACTED]',
  'Galactic',
  'Implicated',
  'Outdated',
  'Placebo',
  'Companion',
  'Smothering'
],[
  'Pills',
  'Cream Maker',
  'Toy Fuzzy Owl',
  '[REDACTED]',
  'Hyperdrive',
  'Evidence',
  'Steel Orbs',
  'Medical Treatments',
  'Cube',
  'Blankets'
])
