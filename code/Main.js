let App = new Vue({
	el: '#app',
	data: data,
	methods: {
		//addstuff
		configureResource: function(resource, attribute, value) {
			if(this.resTable[resource]){
				this.resTable[resource][attribute] = value
			}else{
				this.errorLog.push('Cannot configure resource '+resource+' as it is not in resTable')
			}
		},
		addButton: function(displayText, todo) {
			this.buttons.push({
				displayText,
				todo
			})
		},
		addBuilding: function(displayText, buildingName) {
			let buildings = this.buildings
			let exists=false
			for(const [key,value] of Object.entries(buildings)){
				for(let i=0;i<value.length;i++){
					if(value[i].displayText==displayText){
						exists=true
					}
				}
			}
			if(!exists){
				if(!buildings[this.buildingsList[buildingName].category]){
					this.$set(this.buildings,this.buildingsList[buildingName].category,[])
				}
				buildings[this.buildingsList[buildingName].category].push({
					displayText,
					buildingName
				})
				if(!Object.keys(this.categories).includes(this.buildingsList[buildingName].category)){
					this.$set(this.categories,this.buildingsList[buildingName].category,true)
				}
			}
			this.buildings=buildings
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
			this.tabs = tabs
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
			this.processes=buildings
		},
		addVisibleResource: function(resource,everyTick=false) {
			if (!this.unlockedResources.includes(resource)&&!this.unlockedFluids.includes(resource)) {
				if(this.resTable[resource]){
					if(!this.resTable[resource].isFluid){
						this.unlockedResources.push(resource)
					}else{
						this.unlockedFluids.push(resource)
					}
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
			this.files=files
			this.fileTextContents =	fileTextContents
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
			this.fileTextContents=filecs
			this.moveCursor(1, 0)
      if(y==0){
        this.files[this.fileViewed].screenName=file[y]
				this.updateScripts()
      }
			this.computerChanged=2
			return true;
		},
		moveCursor: function(mx, my) {
			if (this.fileTextContents[this.fileViewed] === undefined || this.tab!='computer') return false;
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
				this.cursorX=newX
				this.cursorY=newY
			} else {
				this.cursorX=newX
			}

		  this.computerChanged=2
			return true
		},
		newLine: function() {
			if (this.fileTextContents[this.fileViewed] === undefined || this.tab!='computer') return false;
			let filecs = this.fileTextContents
			let file = filecs[this.fileViewed]
			let x = this.cursorX
			let y = this.cursorY
			file.splice(y + 1, 0, " ")
			filecs[this.fileViewed] = file
			this.fileTextContents=filecs
			this.cursorX=0
			this.cursorY=y + 1
			this.computerChanged=2
			return true
		},
    deletion: function(pos) {
        if (this.fileTextContents[this.fileViewed] === undefined || this.tab!='computer') return false;
        let filecs = this.fileTextContents
        let file = filecs[this.fileViewed]
        let x = this.cursorX
        let y = this.cursorY
        let saveLine = file[y]
				if(y==0){
					this.updateScripts()
				}
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
		//scripts
		getScripts: function(extension){
			files=[]
			if(extension[0]!='.'){
				return 'Invalid extension'
			}
			for(let i=0;i<this.files.length;i++){
				file = this.files[i]
				if(file.screenName.slice(file.screenName.length-extension.length-1,file.screenName.length-1)==extension){
					files.push(this.files[i])
				}
			}
			return files
		},
		updateScripts: function(){
			for(extension of this.unSaveable.extensions){
				scripts = this.getScripts(extension[0])
				for(const [key,script] of Object.entries(this.scripts[extension[0]])){
					if(key!=script.screenName){
						delete this.scripts[extension[0]][key]
					}
				}
				for(file of scripts){
					if(!this.scripts[extension[0]]){
						this.$set(this.scripts,extension[0],{})
					}
					this.scripts[extension[0]][file.screenName]=file
					part = this.scripts[extension[0]][file.screenName]
					if(!part.percent){
						part.percent=0
					}
				}
			}
		},
		mine: function(amount,depth) {
			if(amount/1000>100){
				for(const [key,value] of Object.entries(this.mining)){
					value['progress']+=amount/Object.keys(this.mining).length
					for(const [amount,resource] of value.massMine(depth,value['progress']/1000)){
						this.planets['total'][resource]+=amount
					}
					value['progress']=value['progress']%1000
				}
			}else{
				for(const [key,value] of Object.entries(this.mining)){
					value['progress']+=amount/Object.keys(this.mining).length
					while(value['progress']>1000){
						value['progress']-=1000
						resources=value.mineAtDepth(depth)
						this.planets['total'][resources[1]]+=resources[0]
					}
				}
			}
		},
		assignScript: function(type,scriptName,amount){
			percentLeft = 100
			for(const [key,script] of Object.entries(this.scripts[type])){
				percentLeft -= script.percent
			}
			if(amount>0){
				this.scripts[type][scriptName].percent+=Math.min(percentLeft,amount)
			}else{
				this.scripts[type][scriptName].percent=Math.max(0,this.scripts[type][scriptName].percent+amount)
			}
		},
		//saving
		saveGame: function(){
			let save={}
			for(const [key,value] of Object.entries(data)){
				if(key!=='unSaveable' && key!=='jobs'){
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
				newVersion = this.version ||'0.0.1'
				save=JSON.parse(localStorage['gameSave'])
				for(const [key,value] of Object.entries(save.resTable)){
					if(value.storage==-1){
						value.storage=Infinity
					}
				}

				for(const [key,value] of Object.entries(this.resTable)){
					if(!save.resTable[key]){
						save.resTable[key]=value
					}
				}
				save.machineStates = this.machineStates
				save.machinePriority = this.machinePriority
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
					this.$set(this,key,value)
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
			this.buttons[index][thing] = value
		},
		getPointsUpToString: function(start, end, array) {
			let returnVal = ""
			for (let i = start; i < end; i++) {
				returnVal += array[i]
			}
			return returnVal
		},
		bigNumberHandler: bigNumberHandler,
		editTab: function(tab,newText){
			tab = this.getTab(tab)
		  if(tab){
					tab.displayText = newText
					return true
			}
			return false
		},
		setTab: function(tab){
			this.tab = tab
			if(tab=='adaptation'){
				this.editTab('adaptation','Adaptations')
			}
		},
		resTableFilterBy:function(condition){
			let returnable = []
			for (const [key, value] of Object.entries(this.resTable)) {
				if(condition(value)){
					returnable.push([key,value])
				}
			}
			return returnable
		},
		getTab: function(tab){
			for(let i=0;i<this.tabs.length;i++){
				if(this.tabs[i].tab==tab){
					return this.tabs[i]
				}
			}
			return false
		},
		allDictKeysAreInArray: function(dict,array){
			for(key of Object.keys(dict)){
				if(!array.includes(key)){
					return false
				}
			}
			return true
		},
		allocateItemsPercent: function(amount,percentDict){
			percents = []
			results = []
			totPercent = sum = 0
			best = 0
			bestNum = -1
			bestNums = [[Infinity,0]]
			for(const [key,value] of Object.entries(percentDict)){
				percents.push(value.percent)
				results.push(0)
				index=0
				while(value>bestNums[index][0]){
					index++
				}
				bestNums.splice(index,0,[value,results.length-1])
			}
			for(let i=0;i<percents.length;i++){
				totPercent += percents[i]
			}
			for(let i=0;i<percents.length;i++){
				results[i] = Math.floor(amount*(percents[i]/100))
				sum+=Math.floor(amount*(percents[i]/100))
			}
			left = Math.floor((amount*totPercent/100-sum))
			index=bestNums.length-2
			while(left >= 1){
				results[bestNums[index][1]]++
				left--
				index--
			}
			return results
		},
		allTrue: function(array){
			for(condition of array){
				if(!condition(this)){
					return false
				}
			}
			return true
		},
		//fluids
		updateFluids: function(){
			let fluidStore = this.resTable['fluid-storage'].storage
			let fluids = this.resTableFilterBy((res)=>{return res.isFluid})
			for(const [key,value] of fluids){
				fluidStore-=value.amount*value.fluidStuff.density
			}
			for(const [key,value] of fluids){
				this.resTable[key].storage = fluidStore/value.fluidStuff.density+value.amount
			}
			this.fluidLeft=fluidStore
		},
		//player interaction
		explore: function() {
			if (!this.unlockedResources.includes("fs")) {
				this.addVisibleResource("fs")
				this.incrementResource("fs", 1)
				this.message="While searching for a place to store your wood you stumble across some flint and steel."
				this.addBuilding("Light a fire", "fire")
				this.configureButton(1, "displayText", "Explore (Locked)")
			} else if (!this.unlockedResources.includes("bucket") && this.resTable["fire"].gettable) {
				this.addBuilding("Make a bucket", "bucket")
				this.message="You find a river. You could catch fish there with the right equipment."
				this.addVisibleResource("bucket")
				this.configureButton(1, "displayText", "Explore (Locked)")
			} else if (!this.unlockedResources.includes("steam-engine") && this.resTable["steam-engine"].gettable) {
				this.addVisibleResource("steam-engine")
				this.incrementResource("steam-engine", 1)
				this.addVisibleResource("computer-disk")
				this.addVisibleResource("computer")
				this.incrementResource("computer-disk", 1)
				this.configureResource('barn', 'locked', false)
				this.configureResource('incendinary-pile', 'locked', false)
				this.configureButton(1, "displayText", "Explore (Locked)")
				this.message="In the cave you find an assortment of stone,\na rusted steam engine, blueprints for a computer\nand a computer disk."
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
			this.insertedDisk=true
			this.computerOpaque=true
			this.incrementResource("computer-disk", -1)
		},
		handleBuyBuilding: function(buildingName){
			if(this.toBuy=='max'){
				this.buyBuilding(buildingName,Infinity)
			}else{
				this.buyBuilding(buildingName,this.toBuy)
			}
		},
		buyBuilding: function(buildingName,number) {
			let building = this.buildingsList[buildingName]
			let buyable = true
			let table = this.resTable
			for (const [key, value] of Object.entries(building.cost)) {
				if (table[key].amount < value) {
					buyable = false
				}else{
					number = Math.floor(Math.min(number, table[key].amount / value))
				}
			}
			if (buyable) {
				if (building.results === undefined) {
					number = Math.min(number,this.resTable[buildingName].storage-this.resTable[buildingName].amount)
					if (table[buildingName].amount < table[buildingName].storage) {
						if(building.type=='rocket'&&!this.rocketsBought.includes(buildingName)){
							this.rocketsBought.push(buildingName)
						}
						for (const [key, value] of Object.entries(building.cost)) {
							table[key].amount -= number * value * this.resTable[buildingName]["multiplier"]
						}
						table[buildingName].amount += number
						if (buildingName === "fire") {
							if (table[buildingName].gettable === false) {
								this.message="Have to keep the fire warm. It offers hope"
								this.configureButton(1, "displayText", "Explore for something to cook on the fire")
							}
						}
						effects=this.buildingsList[buildingName].effects
						if(effects){
							for(let i=0;i<effects.length;i++){
								this[effects[i].funcName].apply(this,effects[i].args.concat(number))
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
						table[key].amount -= value * number
					}
					for (const [key, value] of Object.entries(building["results"])) {
						table[key].amount += value * number
						this.addVisibleResource(key,true)
					}
				}
			}
			this.resTable  = table
		},
		buyAdaptation: function(adaptation){
			let buyable = true
			let table = this.resTable
			for (const [key, value] of Object.entries(adaptation.cost)) {
				if (table[key].amount < value) {
					buyable = false
				}
			}
			if (buyable) {
				for (const [key, value] of Object.entries(adaptation.cost)) {
					table[key].amount -= value
				}
				adaptation.effects(this)
				this.completedAdaptations.push(adaptation.name)
			}
		},
		//resources
		incrementResource: function(res, amount, multiplier = 1) {
			amount = amount * multiplier
			let table = this.resTable;
			if (table[res].storage < amount + table[res].amount) {
				this.incrementResourceSpecial(res, "extraPerTick", (table[res].storage - table[res].amount))
				toReturn = table[res].storage - table[res].amount
				this.configureResource(res, "amount", table[res].storage)
				if(this.resTable[res].isFluid){
					this.updateFluids()
				}
				return toReturn
			} else if (0 > amount + table[res].amount) {
        this.incrementResourceSpecial(res, "extraPerTick", -1*table[res].amount)
				toReturn = -1*table[res].amount
				this.configureResource(res, "amount", 0)
				if(this.resTable[res].isFluid){
					this.updateFluids()
				}
				return toReturn
			} else {
				this.incrementResourceSpecial(res, "extraPerTick", amount)
				this.configureResource(res, "amount", table[res].amount + amount)
				if(this.resTable[res].isFluid){
					this.updateFluids()
				}
				return amount
			}
		},
		incrementResourceSpecial: function(res, thing, amount, multiplier = 1) {
			this.configureResource(res, thing,this.resTable[res][thing] + amount*multiplier)
		},
		//grid
		newGrid: function(){
			this.grid = new WorldGrid(10)
		},
		//gametick
		tick: function() {
			if(this.computerChanged){
				this.computerChanged-=1
			}
			this.tickCount+=1
			if(this.tickCount%1800==0){
				App.saveGame()
			}
			if(this.grid && this.tickCount%1==0){
				this.grid.tick(this)
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
									this.incrementResource(key2, value2)
									this.incrementResource(key, -1 * value2)
									if (!this.unlockedResources.includes(key2)) {
										this.addVisibleResource(key2,true)
									}
								}
							}
						}
					}
				}
			}
			if (this.resTable["steam"].amount >= 200 && !this.resTable["steam-engine"].gettable) {
				this.configureResource("steam-engine", "gettable", true)
				this.configureButton(1, "displayText", "Explore a nearby cave for something to consume this steam.")
			}
      for(let i=0;i<this.machinePriority.length;i++){
        let machine=this.machineStates[this.machinePriority[i]]
				machine.multiplier = 1
        for(const [key,value] of Object.entries(machine["resourcesNeeded"])){
					machine.multiplier = Math.min(machine.multiplier,this.resTable[key].amount/
						value/(this.resTable[this.machinePriority[i]].amount==0?
							Infinity:
								this.resTable[this.machinePriority[i]].amount))
        }
				let listed = []
        for(const [key,value] of Object.entries(machine["results"])){
					listed.push((this.resTable[key].storage-
						this.resTable[key].amount)
						/value/(this.resTable[this.machinePriority[i]].amount)
						/
						machine.multiplier)
        }
				if(listed.length==0){
					listed.push(1)
				}
				let maxim = Math.max.apply(null,listed)
				machine.multiplier = Math.min(maxim==maxim?maxim:Infinity,machine.multiplier)
        if(this.resTable[this.machinePriority[i]].amount>0&&machine.multiplier>0){
	        for(const [key,value] of Object.entries(machine["results"])){
						this.incrementResource(key,value*this.resTable[this.machinePriority[i]].amount*machine.multiplier)
            this.addVisibleResource(key,true)
					}
		      for(const [key,value] of Object.entries(machine["resourcesNeeded"])){
						this.incrementResource(key,-value*this.resTable[this.machinePriority[i]].amount*machine.multiplier)
					}
        }
        this.machineStates[this.machinePriority[i]]=machine
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
			if(this.errorLog.length>0){
				console.log(this.errorLog)
				this.errorLog=[]
			}
			for(const extension of this.unSaveable.extensions){
				if(this.resTable[extension[2]].amount>0){
					scripts = this.scripts[extension[0]]
					allocated = this.allocateItemsPercent(this.resTable[extension[2]].amount*this.multipliers[extension[0]],scripts)
					entries = Object.entries(scripts)
					for(let i=0;i<entries.length;i++){
						funcs = extension[3](this,allocated[i])
						if(allocated[i]>0){
							try{
								parseCode(this.fileTextContents[entries[i][1].fileID].slice(1),{},funcs)
							}
							catch(err){

							}
						}
					}
				}
			}
			let count = 0
			let adaptable = false
			for(let i=0;i<this.tabs.length;i++){
				if(this.tabs[i].tab=='adaptation'){
					adaptable = true
				}
			}
			if(adaptable){
				for(const [name,adaptation] of Object.entries(this.unSaveable.adaptations)){
					if(!this.completedAdaptations.includes(name)&&
					this.allTrue(adaptation.requirements)&&
					!this.availableAdaptations.includes(name)){
						this.availableAdaptations.push(name)
						count++
					}
				}
			}
			if(count!==0){
				tabToEdit = this.getTab('adaptation')
				if(tabToEdit.displayText!='Adaptations'){
					count -= '-'+tabToEdit.displayText.slice(13,tabToEdit.displayText.length-1)
				}
				this.editTab('adaptation', 'Adaptations ('+count+')')
			}
		},
		//jobs
		swapJobs: function(newJob,oldJob,number){
			number = Math.round(number)
			number = Math.min(number,this.resTable[oldJob].amount)
			if(this.incrementResource(newJob,number)){
				this.incrementResource(oldJob,-number)
				this.addVisibleResource(newJob,true)
			}
		},
		//rocketry
		handleLaunchRocket: function(rocket){
			if(control){
				this.launchRocket(rocket,10)
			}else{
				this.launchRocket(rocket,1)
			}
		},
		launchRocket: function(rocket,number){
			let buyable = true
			number = Math.min(number,this.resTable[rocket.name].amount)
			for (const [key, value] of Object.entries(rocket["launch-cost"])) {
				if (this.resTable[key].amount < value) {
					buyable = false
					break
				}else{
					number = Math.floor(Math.min(number, this.resTable[key].amount / value))
				}
			}
			if(buyable&&number>=1){
				this.resTable[rocket.name].amount-=number
				for (const [key, value] of Object.entries(rocket["launch-cost"])) {
					this.incrementResource(key,-value*number)
				}
				this.message = rocket['launch-message']
				if(!this.launchedRockets.includes(rocket.name)){
					this.launchedRockets.push(rocket.name)
				}
			}
		},
		launchAllRockets: function(){
			let buyable = true
			let toLaunch = this.resTableFilterBy((res)=>{return res.isRocket})
			let cost = {}
			let launched = 0
			for (const [key, value] of toLaunch) {
				for(const [resource,amount] of Object.entries(this.rocketsData[key]['launch-cost'])){
					if(!cost[resource]){
						cost[resource]=amount*value.amount
					}else{
						cost[resource]+=amount*value.amount
					}
				}
			}
			for (const [key, value] of Object.entries(cost)) {
				if (this.resTable[key].amount < value) {
					buyable = false
					break
				}
			}
			if(buyable){
				for (const [key, value] of Object.entries(cost)) {
					this.resTable[key].amount -= value
				}
				for (const [key, value] of toLaunch) {
					launched+=value.amount
					value.amount=0
					if(!this.launchedRockets.includes(key)){
						this.launchedRockets.push(key)
					}
				}
				switch(true){
					case launched==42:
						this.message = 'Launched an unanswerable quantity of rockets that\'s an answer.'
						break
					case launched<100:
						this.message = 'Launched less than a hundred rockets'
						break
					case launched<144:
						this.message = 'Launched less than a dozen dozen rockets'
						break
					case launched==1248:
						this.message = 'Launched exactly an exponent pattern\n concatenated with an equal number of digits\n as terms in the sequence, and at least 4.'
						break
					case launched<9009:
						this.message = 'Launched less than a four digit palindromic number divisible by 9\n containing no sets of digits with no zeros whose sum is equal to nine,\n not divisible by 1111 rockets.'
						break
					case launched%3210==1:
						this.message = 'Launched a number of rockets which when divided by a concatenation of a\nstrictly decreasing by 1 sequence divisible by 10 which\n when concatenated is bigger than 2101 the remainder is 1'
						break
					default:
						this.message= 'Launched less than Infinity rockets'
						break
				}
			}
		},
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
