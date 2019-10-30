let App = new Vue({
	el: '#app',
	data: data,
	methods: {
    //util-deprecated
		setState: function(newstate) {
			for (const [key, value] of Object.entries(newstate)) {
				this[key] = value
			}
		},
		//addstuff
		configureResource: function(resource, attribute, value) {
			if(this.resTable[resource]){
				this.resTable[resource][attribute] = value
			}else{
				this.errorLog.push('Cannot configure resource '+resource+' as it is not in resTable')
			}
		},
		addButton: function(displayText, todo) {
			let buttons = this.buttons
			buttons.push({
				displayText,
				todo
			})
			this.setState({
				buttons
			})
		},
		addBuilding: function(displayText, buildingName) {
			let buildings = this.buildings
			let exists=false
			for(let i=0;i<buildings.length;i++){
				if(buildings[i].displayText==displayText){
					exists=true
				}
			}
			if(!exists){
				buildings.push({
					displayText,
					buildingName
				})
			}
			this.setState({
				buildings
			})
		},
		addTab: function(displayText, tab,common=false) {
			for (let i = 0; i < this.tabs.length; i++) {
				if (this.tabs[i].tab === tab) {
					if(!common){
						this.errorLog.push('Could not add tab '+tab+'as it already exists.')
					}
					return false;
				}
			}
			let tabs = this.tabs
			tabs.push({
				displayText,
				tab
			})
			this.setState({
				tabs
			})
		},
		addProcess: function(displayText, buildingName) {
			let buildings = this.processes
			let exists=false
			for(let i=0;i<buildings.length;i++){
				if(buildings[i].displayText==displayText){
					exists=true
				}
			}
			if(!exists){
				buildings.push({
					displayText,
					buildingName
				})
			}
			this.setState({
				processes: buildings
			})
		},
		addVisibleResource: function(resource,everyTick=false) {
			if (!this.unlockedResources.includes(resource)) {
				if(this.resTable[resource]){
					this.unlockedResources.push(resource)
				}else{
					this.errorLog.push('Could not add resource '+resource+' as it not in resTable')
				}
			}else if(!everyTick){
				this.errorLog.push('Could not add resource '+resource+' as it is already displayed.')
			}
		},
		//files
		addFile: function(name, sname) {
			let files = this.files
			let fileTextContents = this.fileTextContents
			files.push({
				screenName: sname,
				fileID: name
			})
			fileTextContents[name] = [sname]
			this.setState({
				files,
				fileTextContents
			})
		},
		addStringToFileAtCursor: function(string) {
			if (this.fileTextContents[this.fileViewed] === undefined || this.tab!='computer') return false;
			let filecs = this.fileTextContents
			let file = filecs[this.fileViewed]
			let x = this.cursorX
			let y = this.cursorY
			let saveLine = file[y]
			// could change limit for file name
      if(y==0 && saveLine.length>40){
        alert('File name limit reached.')
        return false;
      }
			let start = this.getPointsUpToString(0, x, saveLine)
			let end = this.getPointsUpToString(x, saveLine.length, saveLine)
			filecs[this.fileViewed][y] = start + string + end
			this.setState({
				fileTextContents: filecs
			})
			this.moveCursor(1, 0)
      if(y==0){
        this.files[this.fileViewed].screenName=file[y]
      }
			this.computerChanged=2
			return true;
		},
		moveCursor: function(mx, my) {
			if (this.fileTextContents[this.fileViewed] === undefined) return false;
			let filecs = this.fileTextContents
			let file = filecs[this.fileViewed]
			let x = this.cursorX
			let y = this.cursorY
			let saveLine = file[y]
			let newX = x;
			let newY = y;
			if (x === 0 && y === 0 && mx < 0) return false;
			if (y === 0 && my < 0) return false;
			if (x === saveLine.length - 1 && y === file.length - 1 && mx > 0) return false;
			if (y === file.length && my > 0) return false;
			if (file.length > y + my && y + my >= 0 && my !== 0) {
				if (file[y + my].length-1 < x) {
					newX = file[y + my].length - 1
				}
				newY = y + my
			}
			if (saveLine.length <= x + mx && mx !== 0) {
				this.moveCursor(0, 1)
				newX = mx - 1;
			} else if (0 > x + mx && mx !== 0) {
				this.moveCursor(0, -1)
				newX = file[y - 1].length + mx
			} else if(mx!=0){
				newX = x + mx
			}
			if (my !== 0) {
				this.setState({
					cursorX: newX,
					cursorY: newY
				})
			} else {
				this.setState({
					cursorX: newX
				})
			}

		  this.computerChanged=2
			return true
		},
		newLine: function() {
			if (this.fileTextContents[this.fileViewed] === undefined) return false;
			let filecs = this.fileTextContents
			let file = filecs[this.fileViewed]
			let x = this.cursorX
			let y = this.cursorY
			file.splice(y + 1, 0, " ")
			filecs[this.fileViewed] = file
			this.setState({
				fileTextContents: filecs,
				cursorX: 0,
				cursorY: y + 1
			})
			this.computerChanged=2
			return true
		},
    deletion: function(pos) {
        if (this.fileTextContents[this.fileViewed] === undefined) return false;
        let filecs = this.fileTextContents
        let file = filecs[this.fileViewed]
        let x = this.cursorX
        let y = this.cursorY
        let saveLine = file[y]
				if(x+pos>saveLine.length-2)return false
        if (saveLine === " " && y!=0) {
          this.moveCursor(pos,0)
          let start=file.slice(0,y)
          let end=file.slice(y+1,file.length)
          filecs[this.fileViewed]=start.concat(end)
          fileTextContents=filecs

		          if(x==file[y].length-1&&pos==0){
		            this.moveCursor(-1,0)
		            x-=1
		          }
          return true
        }
        if(y!=0 || saveLine.length>1){

						if(x==file[y].length-1 && pos==0 ){
							this.moveCursor(-1,0)
							x-=1
						}
          let start = this.getPointsUpToString(0, x+pos, saveLine)
          let end = this.getPointsUpToString(x+1+pos, saveLine.length, saveLine)
          this.moveCursor(pos,0)
          filecs[this.fileViewed][y] = start +  end
          this.fileTextContents = filecs
          if(y==0){
            this.files[this.fileViewed].screenName=file[y]
          }
          return true;
        }else{
          return false
        }
				this.computerChanged=2
    },
		parseCode:parseCode,
		//saving
		saveGame: function(){
			let save={}
			for(const [key,value] of Object.entries(data)){
				if(key!=='unSaveable'){
					save[key]=value
				}
			}
			for(const [key,value] of Object.entries(save.resTable)){
				if(value.storage==Infinity){
					value.storage=-1
				}
			}
			localStorage['gameSave']=JSON.stringify(save)
			this.loadGame()
		},
		loadGame: function(playerMade){
			if(localStorage['gameSave']){
				save=JSON.parse(localStorage['gameSave'])
				for(const [key,value] of Object.entries(save.resTable)){
					if(value.storage==-1){
						value.storage=Infinity
					}
				}
				for(const [key,value] of Object.entries(save.mining)){
					mineSave = new Mine()
					mineSave.setData(value)
					save.mining[key]=mineSave
				}
				if(save.grid!==null){
					grid = new WorldGrid()
					grid.setData(save.grid)
					save.grid = grid
				}
				for(const [key,value] of Object.entries(save)){
					this[key]=value
				}
			}else if(playerMade){
				alert('No game to load.')
			}
		},
		clearGame: function(){
			if(window.confirm('Are you sure you want to clear your game storage?')){
				localStorage.clear();
				location.reload();
			}
		},
		//utility
		configureButton: function(index, thing, value) {
			let buttons = this.buttons
			buttons[index][thing] = value
			this.setState({
				buttons
			})
		},
		getPointsUpToString: function(start, end, array) {
			let returnVal = ""
			for (let i = start; i < end; i++) {
				returnVal += array[i]
			}
			return returnVal
		},
		getBuildingCostText: function(building) {
			let string = "Cost:"
			for (const [key, value] of Object.entries(buildings[building]["cost"])) {
				string = string.concat(this.resTable[key].screenName + ": " + value * this.resTable[building]["multiplier"]);
			}
			return string;
		},
		getProcessCostText: function(building) {
			let string = "Cost:"
			for (const [key, value] of Object.entries(buildings[building]["cost"])) {
				string = string.concat(this.resTable[key].screenName + ": " + value);
			}
			return string;
		},
		//player interaction
		explore: function() {
			if (!this.unlockedResources.includes("fs")) {
				this.addVisibleResource("fs")
				this.incrementResource("fs", 1)
				this.setState({
					message: "While searching for a place to store your wood you stumble across some flint and steel."
				})
				this.addBuilding("Light a fire", "fire")
				this.configureButton(1, "displayText", "Explore (Locked)")
			} else if (!this.unlockedResources.includes("bucket") && this.resTable["fire"].gettable) {
				this.addBuilding("Make a bucket", "bucket")
				this.setState({
					message: "You find a river. You could catch fish there with the right equipment."
				})
				this.addVisibleResource("bucket")
				this.configureButton(1, "displayText", "Explore (Locked)")
			} else if (!this.unlockedResources.includes("steam-engine") && this.resTable["steam-engine"].gettable) {
				this.addVisibleResource("steam-engine")
				this.incrementResource("steam-engine", 1)
				this.addVisibleResource("computer-disk")
				this.addVisibleResource("computer")
				this.incrementResource("computer-disk", 1)
				this.configureButton(1, "displayText", "Explore (Locked)")
				this.setState({
					message: "In the cave you find an assortment of stone,\na rusted steam engine, blueprints for a computer\nand a computer disk."
				})
				this.addButton("Mine stone", 'mineStone')
			}
		},
		incrementResourceByHand: function(res, amount) {
			let table = this.resTable;
			if (table[res].storage < amount + table[res].amount) {
				this.configureResource(res, "amount", table[res].storage)
			} else if (0 > amount + table[res].amount) {
				this.configureResource(res, "amount", 0)
			} else {
				this.configureResource(res, "amount", table[res].amount + amount)
			}
			if (res === "wood" && table[res].gettable === false && table[res].amount > 10) {
				this.configureResource("wood", "gettable", true)
				this.addButton("Explore for a place to store your wood.",'explore')
			}
			this.addVisibleResource(res,true)
		},
		insertDisk: function() {
			this.setState({
				insertedDisk: true,
				computerOpaque: true
			})
			this.incrementResource("computer-disk", -1)
		},
		buyBuilding: function(buildingName) {
			let building = this.buildingsList[buildingName]
			let buyable = true
			let table = this.resTable
			for (const [key, value] of Object.entries(building["cost"])) {
				if (building["results"] === undefined) {
					if (table[key].amount < value * table[buildingName]["multiplier"]) {
						buyable = false
					}
				} else {
					if (table[key].amount < value) {
						buyable = false
					}
				}
			}
			if (buyable) {
				if (building["results"] === undefined) {
					if (table[buildingName].amount !== table[buildingName].storage) {
						for (const [key, value] of Object.entries(building["cost"])) {
							table[key].amount -= value * this.resTable[buildingName]["multiplier"]
						}
						table[buildingName].amount += 1
						if (buildingName === "fire") {
							if (table[buildingName].gettable === false) {
								this.setState({
									message: "Have to keep the fire warm. It offers hope"
								})
								this.configureButton(1, "displayText", "Explore for food")
							}
						}
						effects=this.buildingsList[buildingName].effects
						if(effects){
							for(let i=0;i<effects.length;i++){
								this[effects[i].funcName].apply(this,effects[i].args)
							}
						}
						if (buildingName === "spit" || buildingName==='bucket-water') {
							if (table["spit"].gettable && table["bucket-water"].gettable && !table["water-boiling"].gettable) {
								this.addProcess("Hang a bucket on the spit", "hangbucket")
								this.configureResource("water-boiling", "gettable", true)
							}
						}
						this.addVisibleResource(buildingName,true)
					}
				} else {
					for (const [key, value] of Object.entries(building["cost"])) {
						table[key].amount -= value
					}
					for (const [key, value] of Object.entries(building["results"])) {
						table[key].amount += value
						this.addVisibleResource(key,true)
					}
				}
			}
			this.setState({
				resTable: table
			})
		},
		//gametick
		incrementResource: function(res, amount) {
			let table = this.resTable;
			if (table[res].storage < amount + table[res].amount) {
				this.incrementResourceSpecial(res, "extraPerTick", (table[res].storage - table[res].amount))
				this.configureResource(res, "amount", table[res].storage)
				return false
			} else if (0 > amount + table[res].amount) {
        this.incrementResourceSpecial(res, "extraPerTick", -1*table[res].amount)
				this.configureResource(res, "amount", 0)
				return false
			} else {
				this.incrementResourceSpecial(res, "extraPerTick", amount)
				this.configureResource(res, "amount", table[res].amount + amount)
				return true
			}
			this.resTable=table
		},
		newGrid: function(){
			this.grid = new WorldGrid(10)
		},
		incrementResourceSpecial: function(res, thing, amount) {
			this.configureResource(res, thing,this.resTable[res][thing] + amount)
		},
		tick: function() {
			if(this.computerChanged){
				this.computerChanged-=1
			}
			this.tickCount+=1
			if(this.tickCount%1800==0){
				App.saveGame()
			}
			if(this.grid && this.tickCount%1==0){
				this.grid.tick()
			}
			if (this.insertedDisk && this.computerOpacity < 1) {
				this.computerOpacity += 1 / 600
			}
			for (const [key, value] of Object.entries(this.resTable)) {
        this.configureResource(key, "extraPerTick", 0)
      }
			for (const [key, value] of Object.entries(this.resTable)) {
				if (value["conversion"] !== undefined) {
					if (this.resTable[key].amount !== 0) {
						for (const [key2, value2] of Object.entries(this.resTable[key]["conversion"])) {
							if (typeof(value["conversion"][key2])=='number') {
								if (this.resTable[key].amount - value2 < 0) {
									this.incrementResource(key2, value.amount)
									this.incrementResourceSpecial(key, "extraPerTick", -1 * value.amount)
									this.configureResource(key, "amount", 0)
								} else {
									if (this.resTable["fire"].amount > 0 || key !== "water-boiling") {
										this.incrementResource(key2, value2)
										this.incrementResource(key, -1 * value2)
										if (!this.unlockedResources.includes(key2)) {
											this.addVisibleResource(key2,true)
										}
									}
								}
							} else {
								if (this.resTable[key].amount - this.resTable[value2.res].amount * value2.multiplier < 0) {
									this.incrementResource(key2, value.amount)
									this.incrementResourceSpecial(key, "extraPerTick", -1 * value.amount)
									this.configureResource(key, "amount", 0)
								} else {
									this.incrementResource(key2, this.resTable[value2.res].amount * value2.multiplier)
									this.incrementResource(key, -1 * this.resTable[value2.res].amount * value2.multiplier)
									if (!this.unlockedResources.includes(key2)) {
										this.addVisibleResource(key2,true)
									}
								}
							}
						}
					}
				}
			}
			if (this.resTable["steam"].amount === 200 && !this.resTable["steam-engine"].gettable) {
				this.configureResource("steam-engine", "gettable", true)
				this.configureButton(1, "displayText", "Explore a nearby cave for something to consume this steam.")
			}
      for(let i=0;i<this.machinePriority.length;i++){
        let machine=this.machineStates[this.machinePriority[i]]
        machine.disabled=false
        for(const [key,value] of Object.entries(machine["resourcesNeeded"])){
          if(this.resTable[key].amount<=value*this.resTable[this.machinePriority[i]].amount){
            machine["resourcesRecieved"][key]=0
            machine.disabled=true
          }else{
            machine["resourcesRecieved"][key]=value*this.resTable[this.machinePriority[i]].amount
            this.incrementResource(key,-value*this.resTable[this.machinePriority[i]].amount)
          }
        }
        this.machineStates[this.machinePriority[i]]=machine
      }
      for(let i=0;i<this.machinePriority.length;i++){
        let machine=this.machineStates[this.machinePriority[i]]
        if(!machine.disabled &&this.resTable[this.machinePriority[i]].amount>0){
          for(const [key,value] of Object.entries(machine["results"])){
            this.incrementResource(key,value*this.resTable[this.machinePriority[i]].amount)
            this.addVisibleResource(key,true)
          }
        }
      }
			for (const [key, building] of Object.entries(this.buildingsList)) {
				let available=true
				for (const [key2, value2] of Object.entries(building['cost'])) {
	        if(this.resTable[key2].amount<value2/2){
						available=false
					}
	      }
				if(available&&this.buildingsList[key].type=="building"&&!this.resTable[key].locked){
					this.addBuilding(this.resTable[key].buildName,key)
				}
				if(available&&this.buildingsList[key].type=="process"&&key!='hangbucket'){
					this.addProcess(this.buildingsList[key].buildName,key)
				}
      }
			for(const [key,value] of Object.entries(this.planets)){
				value['progress']+=this.resTable['explorer-miner-droid'].amount/Object.keys(this.planets).length
				if(value['progress']>10000){
					value['progress']-=10000
					resources=this.mining[key].mineAtDepth(200)
					this.planets['Earth'][resources[1]]+=resources[0]
				}
			}
			if(this.errorLog.length>0){
				console.log(this.errorLog)
				this.errorLog=[]
			}
		},
		//jobs
		swapJobs: function(newJob,oldJob){
			if(this.resTable[oldJob].amount>=1&&this.resTable){
				if(this.incrementResource(newJob,1)){
					this.incrementResource(oldJob,-1)
					this.addVisibleResource(newJob,true)
				}
			}
		}
	},
	updated: function () {
		if(this.computerChanged){
			try{
				curLine.scrollIntoView()
			} catch(e){

			}
		}
	}
})
