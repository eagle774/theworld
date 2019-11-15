class ReadOnly extends Saveable{
  constructor(data){
    super(data)
    if(this.isNotFake()){
      this._data=data
    }
  }
  get data(){
    return this._data()
  }

  set data(value){
    return null
  }
}

registerClass('readonly',ReadOnly)
