let App = new Vue({
	el: '#app',
	data: data,
	methods: {
		//addstuff
		addButton: function(displayText, todo) {
			this.buttons.push({
				displayText,
				todo,
				ready:true
			})
		},
		addCustomFile: function(name,sname,content,type) {
			this.files.push({
				screenName: sname,
				fileID: name,
				type: type
			})
			this.fileContents[name] = content
		},
		addSpaceBuilding: function(buildingName) {
			let spaceBuildings = this.spaceBuildings
			let exists=false
			for(const [key,value] of Object.entries(spaceBuildings)){
				for(let i=0;i<value.length;i++){
					if(value[i].buildingName==buildingName){
						exists=true
					}
				}
			}
			if(!exists){
				if(!spaceBuildings[this.buildingsList[buildingName].category]){
					this.$set(this.spaceBuildings,this.buildingsList[buildingName].category,[])
				}
				spaceBuildings[this.buildingsList[buildingName].category].push({
					displayText:this.resTable[buildingName].buildName,
					buildingName
				})
				if(!Object.keys(this.spaceCategories).includes(this.buildingsList[buildingName].category)){
					this.$set(this.spaceCategories,this.buildingsList[buildingName].category,true)
				}
			}
			this.spaceBuildings=spaceBuildings
		},
		addTab: function(displayText, tab, common=false) {
			for (let i = 0; i < this.tabs.length; i++) {
				if (this.tabs[i].tab === tab) {
					if(!common){
						this.errorLog.push('Could not add tab '+tab+' as it already exists.')
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
				this.newBuildings+=1
				buildings.push({
					displayText,
					buildingName
				})
			}
			this.processes=buildings
		},
		addSpaceProcess: function(displayText, buildingName) {
			let exists=false
			for(let i=0;i<this.spaceProcesses.length;i++){
				if(this.spaceProcesses[i].displayText==displayText){
					exists=true
				}
			}
			if(!exists){
				this.spaceProcesses.push({
					displayText,
					buildingName
				})
			}
		},
		addSpaceResource: function(resource,everyTick=false) {
			if (!this.unlockedSpaceResources.includes(resource)&&!this.unlockedSpaceFluids.includes(resource)) {
				if(this.resTable[resource]){
					if(!this.resTable[resource].isJob){
						if(!this.resTable[resource].isFluid){
							this.unlockedSpaceResources.push(resource)
						}else{
							this.unlockedSpaceFluids.push(resource)
						}
					}
				}else{
					this.errorLog.push('Could not add resource '+resource+' as it not in resTable')
				}
			}else if(!everyTick){
				this.errorLog.push('Could not add resource '+resource+' as it is already displayed.')
			}
		},
		addVisibleResource: function(resource,everyTick=false,inSpace) {
			if(inSpace){
				return this.addSpaceResource(resource,everyTick)
			}
			if (!this.unlockedResources.includes(resource)&&!this.unlockedFluids.includes(resource)) {
				if(this.resTable[resource]){
					if(!this.resTable[resource].isJob){
						if(!this.resTable[resource].isFluid){
							this.unlockedResources.push(resource)
						}else{
							this.unlockedFluids.push(resource)
						}
					}
				}else{
					this.errorLog.push('Could not add resource '+resource+' as it not in resTable')
				}
			}else if(!everyTick){
				this.errorLog.push('Could not add resource '+resource+' as it is already displayed.')
			}
		},
		//files
		addFile: function(id, sname) {
			let files = this.files
			let fileTextContents = this.fileTextContents
			files.push({
				screenName: sname,
				fileID: id
			})
			fileTextContents[id] = [sname]
			this.files=files
			this.fileTextContents =	fileTextContents
			this.curFileType=undefined
			this.fileViewed=id
			this.cursorX=0
			this.cursorY=0
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
			if (x === 0 && y === 0 && mx < 0) return true;
			if (y === 0 && my < 0) return true;
			if (x === saveLine.length - 1 && y === file.length - 1 && mx > 0) return true;
			if (y === file.length && my > 0) return true;
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
		addBuilding: function(buildingName) {
			let buildings = this.buildings
			let exists=false
			for(const [key,value] of Object.entries(buildings)){
				for(let i=0;i<value.length;i++){
					if(value[i].buildingName==buildingName){
						exists=true
					}
				}
			}
			if(!exists){
				this.newBuildings+=1
				if(!buildings[this.buildingsList[buildingName].category]){
					this.$set(this.buildings,this.buildingsList[buildingName].category,[])
				}
				buildings[this.buildingsList[buildingName].category].push({
					displayText:this.resTable[buildingName].buildName,
					buildingName
				})
				if(!Object.keys(this.categories).includes(this.buildingsList[buildingName].category)){
					this.$set(this.categories,this.buildingsList[buildingName].category,true)
				}
			}
			this.buildings=buildings
		},
		newLine: function() {
			if (this.fileTextContents[this.fileViewed] === undefined || this.tab!='computer') return false;
			let filecs = this.fileTextContents
			let file = filecs[this.fileViewed]
			let x = this.cursorX
			let y = this.cursorY
			file.splice(y + 1, 0, ' ')
			filecs[this.fileViewed] = file
			this.fileTextContents=filecs
			this.cursorX=0
			this.cursorY=y + 1
			this.computerChanged=2
			return true
		},
    deletion: function(pos,event) {
        if (this.fileTextContents[this.fileViewed] === undefined || this.tab!='computer') return false;
				event.preventDefault()
        let filecs = this.fileTextContents
        let file = filecs[this.fileViewed]
        let x = this.cursorX
        let y = this.cursorY
        let saveLine = file[y]
				if(x+pos>saveLine.length-2)return false
        if (saveLine === ' ' && y!=0) {
          this.moveCursor(pos,0)
          let start=file.slice(0,y)
          let end=file.slice(y+1,file.length)
          filecs[this.fileViewed]=start.concat(end)
          fileTextContents=filecs

		          if(x==file[y].length-1&&pos==0){
		            this.moveCursor(-1,0)
		            x-=1
		          }
							this.computerChanged=2
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
					if(y==0){
						this.updateScripts()
					}
					this.computerChanged=2
          return true;
        }else{
          return false
        }
    },
		parseCode:parseCode,
		filesIncludesID: function(ID){
			for(file of this.files){
				if(file.fileID==ID){
					return true
				}
			}
			return false
		},
		//scripts
		getScripts: function(extension){
			files=[]
			if(extension[0]!='.'){
				return 'Invalid extension'
			}
			for(let i=0;i<this.files.length;i++){
				file = this.files[i]
				if(file.screenName.slice(file.screenName.length-extension.length-1,file.screenName.length-1)==extension&&file.screenName!=''){
					files.push(this.files[i])
				}
			}
			return files
		},
		updateScripts: function(){
			for(extension of this.unSaveable.extensions){
				let scripts = this.getScripts(extension[0])
				for(const [key,script] of Object.entries(this.scripts[extension[0]])){
					if(key!=script.fileID){
						delete this.scripts[extension[0]][key]
					}
				}
				let added=[]
				for(file of scripts){
					if(!this.scripts[extension[0]]){
						this.$set(this.scripts,extension[0],{})
					}
					added.push(file.fileID)
					let savePercent = this.scripts[extension[0]][file.fileID]
					this.scripts[extension[0]][file.fileID]=JSON.parse(JSON.stringify(file))
					let part = this.scripts[extension[0]][file.fileID]
					if(!savePercent){
						part.percent=0
					}else{
						part.percent = savePercent.percent
					}
				}
				for(const [key,value] of Object.entries(this.scripts[extension[0]])){
					if(!added.includes(Number(key))){
						delete this.scripts[extension[0]][Number(key)]
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
			return true
		},
		loadGame: function(playerMade){
			if(localStorage['gameSave']){
				newVersion = this.version ||'0.0.1'
				save=JSON.parse(localStorage['gameSave'])
				for(const [key,value] of Object.entries(save.resTable)){
					if(value.storage==-1){
						value.storage=Infinity
					}
					if(value.isJobOf==undefined && this.resTable[key]){
						value.isJobOf=this.resTable[key].isJobOf
					}
				}
				for(const [key,value] of Object.entries(save.resTable)){
					this.resTable[key]=value
				}
				save.resTable=this.resTable
				for(const [key,value] of Object.entries(save.spaceResCounts)){
					this.spaceResCounts[key]=value
				}
				save.spaceResCounts = this.spaceResCounts
				if(save.machineStates){
					for(const [key,value] of Object.entries(save.machineStates)){
						this.machineStates[key]=value
					}
					save.machineStates = this.machineStates
				}
				save.machinePriority = this.machinePriority
				if(save.spaceMachineStates){
					for(const [key,value] of Object.entries(save.spaceMachineStates)){
					this.spaceMachineStates[key]=value
				}
					save.spaceMachineStates = this.spaceMachineStates
				}
				save.spaceMachinePriority = this.spaceMachinePriority
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

				mark = new Market()
				mark.setData(save.market)
				save.market = mark
				console.log(save.tradeHub)
				tradeHub = new TradeHub()
				tradeHub.setData(save.tradeHub)
				save.tradeHub = tradeHub
				universe = new MineV2()
				universe.setData(save.universe)
				save.universe = universe
				pool = new NamePool()
				pool.setData(save.stockNamePool)
				save.stockNamePool = pool

				save.machinePriority = this.correctMachineOrder
				save.spaceMachinePriority = this.correctMachineOrder
				save.listOfMachines = save.machinePriority
				for(const [key,value] of Object.entries(save)){
					this.$set(this,key,value)
				}
				if(newVersion!=save.version){
					alert('Who are you, using an outdated client?')
					if(newVersion=='0.1.0'){
						for(const [key,value] of Object.entries(save.resTable)){
							this.$set(this.resTable[key],'percent',0)
						}
					}
					for(const [key,value] of this.resTableFilterBy((res)=>{return res.isCargo})){
						if(!this.cargo[key]){
							this.cargo[key]=0
						}
					}
					for(const [key,value] of Object.entries(this.resTable)){
						if(!value.pastPerTick){
							this.resTable[key].pastPerTick=[0]
							this.resTable[key].pastAmount=[0]
							this.resTable[key].tempPastAmount=[0]
							this.resTable[key].tempPastPerTick=[0]
							this.spaceResCounts[key].extraPerTick=[0]
							this.spaceResCounts[key].pastPerTick=[0]
							this.spaceResCounts[key].tempPastPerTick=[0]
							this.spaceResCounts[key].percent=0
						}
					}
				}
				this.version = newVersion
				this.$set(this,'buildingsList',buildingsData)
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
		speaketherSpeakether: function(){
			this.speakethSpeaketh=true
		},
		configureButton: function(index, thing, value) {
			this.buttons[index][thing] = value
		},
		getPointsUpToString: function(start, end, array) {
			let returnVal = ''
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
		onlyRunInSpace: function(effects,number,inSpace){
			if(effects && inSpace){
				for(let i=0;i<effects.length;i++){
					this[effects[i].funcName].apply(this,effects[i].args.concat(number,true))
				}
			}
		},
		onlyRunOutOfSpace: function(effects,number,inSpace){
			if(effects && !inSpace){
				for(let i=0;i<effects.length;i++){
					this[effects[i].funcName].apply(this,effects[i].args.concat(number,false))
				}
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
		detach: function(input){
			return JSON.parse(JSON.stringify(input))
		},
		sigmoid: function(num){
			return (num*Math.random()/Math.random())
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
			let percents = []
			let results = []
			let totPercent = sum = 0
			let best = 0
			let bestNum = -1
			let bestNums = [[Infinity,0]]
			for(const [key,value] of Object.entries(percentDict)){
				percents.push(value.percent)
				results.push(0)
				let index=0
				while(value.percent>bestNums[index][0]){
					index++
				}
				bestNums.splice(index,0,[value.percent,results.length-1])
			}
			for(let i=0;i<percents.length;i++){
				totPercent += percents[i]
			}
			for(let i=0;i<percents.length;i++){
				results[i] = Math.floor(amount*(percents[i]/100))
				sum+=Math.floor(amount*(percents[i]/100))
			}
			let left = Math.floor((amount*totPercent/100-sum))
			index=bestNums.length-1-left
			while(left >= 1){
				results[bestNums[index][1]]++
				left--
				index++
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
		allPrerequisitesMet: function(prerequisites,inSpace){
			for(prerequisite of prerequisites){
				if(inSpace){
					if(!this.unlockedSpaceResources.includes(prerequisite)){
						return false
					}
				}else{
					if(!this.unlockedResources.includes(prerequisite)){
						return false
					}
				}
			}
			return true
		},
		fillToMax: function(array,amount){
			let toAdd =array[array.length-1]
			copiedArray = array.concat([])
			while(copiedArray.length<amount){
				copiedArray.push(toAdd)
			}
			return copiedArray
		},
		//setters
		setMessage: function(newMessage){
			this.message=newMessage
		},
		setTab: function(tab){
			if(this.getTab(tab)){
				this.tab = tab
			}
			if(tab=='adaptation'){
				this.editTab('adaptation','Adaptations')
			}
			if(tab=='computer'){
				this.editTab('computer','Computer')
			}
			if(tab=='main'){
				this.editTab('main','Main')
			}
			if(tab=='jobs'){
				this.editTab('jobs','Jobs')
			}
			if(tab=='spaceJobs'){
				this.editTab('spaceJobs','Space Jobs')
			}
		},
		setCheck: function(check,value){
			this.checks[check]=value
		},
		setMessageIfCheck: function(newMessage,check){
			if(this.checks[check]){
				this.message=newMessage
			}
		},
		setMessageCSSIfCheck: function(newMessageCSS,check){
			if(this.checks[check]){
				this.messageCSS = newMessageCSS
			}
		},
		//fluids
		updateFluids: function(inSpace){
			if(!inSpace){
				let fluidStore = this.resTable['fluidStorage'].storage
				let fluids = this.resTableFilterBy((res)=>{return res.isFluid})
				for(const [key,value] of fluids){
					fluidStore-=value.amount*value.fluidStuff.density
				}
				for(const [key,value] of fluids){
					this.resTable[key].storage = fluidStore/value.fluidStuff.density+value.amount
				}
				this.fluidLeft=fluidStore
			}else{
				let fluidStore = this.spaceResCounts['fluidStorage'].amount
				let fluids = this.resTableFilterBy((res)=>{return res.isFluid})
				for(const [key,value] of fluids){
					fluidStore-=this.spaceResCounts[key].amount*value.fluidStuff.density
				}
				this.spaceFluidLeft=fluidStore
			}
		},
		//player interaction
		explore: function() {
			if (!this.unlockedResources.includes('flintAndSteel')) {
				this.addVisibleResource('flintAndSteel')
				this.incrementResource('flintAndSteel', 1)
				this.message='While searching for a place to store your wood you stumble across some flint and steel.'
				this.addBuilding('fire')
				this.configureButton(1, 'displayText', 'Explore (Locked)')
				this.configureButton(1, 'ready', false)
			} else if (!this.unlockedResources.includes('bucket') && this.checks['fireMade']) {
				this.addBuilding('bucket')
				this.addVisibleResource('bucket')
				this.configureButton(1, 'displayText', 'Explore (Locked)')
				this.message='While looking around you stumble across a river.'
				this.configureButton(1, 'ready', false)
			} else if (!this.unlockedResources.includes('steamEngine') && this.checks['steamExplore']) {
				this.addVisibleResource('steamEngine')
				this.incrementResource('steamEngine', 1)
				this.addVisibleResource('computerDisk')
				this.addVisibleResource('computer')
				this.incrementResource('computerDisk', 1)
				this.configureResource('barns', 'locked', false)
				this.configureResource('incendinaryPile', 'locked', false)
				this.configureButton(1, 'displayText', 'Explore (Locked)')
				this.configureButton(1, 'ready', false)
				this.addBuilding('computer')
				this.addTab('Jobs','jobs')
				this.message='In the cave you find a rusted steam engine,\nblueprints for a computer and a computer disk.'
				this.addButton('Mine stone', 'mineStone')
			}
		},
		incrementResourceByHand: function(res, amount,inSpace) {
			let table = inSpace?this.spaceResCounts:this.resTable;
			if (res === 'wood' && !this.checks['flintUnlocked'] && table[res].amount >= 9) {
				this.setCheck('flintUnlocked',true)
				this.addButton('Explore for a place to store your wood.','explore')
			}
			this.addVisibleResource(res,true)
			if(!inSpace){
				if (table[res].storage < amount + table[res].amount) {
					const toReturn = table[res].storage - table[res].amount
					this.configureResource(res, 'amount', table[res].storage)
				} else if (0 > amount + table[res].amount) {
					const toReturn = -1*table[res].amount
					this.configureResource(res, 'amount', 0)
					return toReturn
				} else {
					this.configureResource(res, 'amount', table[res].amount + amount)
					return amount
				}
			}else{
				table[res].amount+=amount
				return amount
			}
		},
		insertDisk: function() {
			this.insertedDisk=true
			this.computerOpaque=true
			this.incrementResource('computerDisk', -1)
		},
		handleBuyBuilding: function(buildingName,inSpace){
			if(this.toBuy=='max'){
				this.buyBuilding(buildingName,Infinity,inSpace)
			}else if(this.toBuy=='custom'){
				this.buyBuilding(buildingName,this.customToBuy,inSpace)
			}else{
				this.buyBuilding(buildingName,this.toBuy,inSpace)
			}
		},
		howManyPlease: function(buildingName,inSpace){
			let number = Infinity
			let building = this.buildingsList[buildingName]
			if(!building){
				return !this.errorLog.push('Building '+buildingName+' doesn\'t exist.')
			}
			let buyable = true
			let table = !inSpace?this.resTable:this.spaceResCounts
			for (const [key, value] of Object.entries(building.cost)) {
				number = Math.floor(Math.min(number, table[key].amount / value))
			}
			return number<this.resTable[buildingName].storage?number:this.resTable[buildingName].storage
		},
		isBuildingBuyable: function(buildingName,inSpace){
			let building = this.buildingsList[buildingName]
			if(!building){
				return this.errorLog.push('Building '+buildingName+' doesn\'t exist.')
			}
			let buyable = true
			let table = !inSpace?this.resTable:this.spaceResCounts
			for (const [key, value] of Object.entries(building.cost)) {
				if (table[key].amount < value) {
					buyable = false
				}
			}
			return buyable
		},
		buyBuilding: function(buildingName,number,inSpace) {
			if(number<=0) return;
			if(this.buildingsList[buildingName].results == undefined&&this.resTable[buildingName].unique){
				number = 1
			}
			let building = this.buildingsList[buildingName]
			let buyable = true
			let table = !inSpace?this.resTable:this.spaceResCounts
			if(this.resTable[buildingName] && this.resTable[buildingName].unique && table[buildingName].amount>0){
				return false;
			}
			for (const [key, value] of Object.entries(building.cost)) {
				if (table[key].amount < value) {
					buyable = false
				}else{
					number = Math.floor(Math.min(number, table[key].amount / value))
				}
			}
			if (buyable) {
				if (building.results === undefined) {
					if(inSpace&&buildingName==='solarPanel'&&this.checks['notSpacePanelMade']){
						this.setCheck('notSpacePanelMade')
						this.setMessage('Solar panels are twice as effective in space.')
					}
					if(!inSpace&&buildingName==='matterTransporter'){
						this.addTab('Earth M.T.','MT')
					}
					if (number!=0) {
						if(building.type=='rocket'&&!this.rocketsBought.includes(buildingName)){
							this.rocketsBought.push(buildingName)
						}
						for (const [key, value] of Object.entries(building.cost)) {
							if(inSpace){
								this.incResSpace(key,-1*number * value * this.resTable[buildingName]['multiplier'])
							}else{
								this.incrementResource(key,-1*number * value * this.resTable[buildingName]['multiplier'])
							}
						}
						if(inSpace){
							this.incResSpace(buildingName,number)
						}else{
							this.incrementResource(buildingName,number)
						}
						if (buildingName === 'fire') {
							if (!this.checks['fireMade']) {
								this.message='Have to keep the fire warm. It offers hope'
								this.configureButton(1, 'ready',true)
								this.setCheck('fireMade',true)
								this.configureButton(1, 'displayText', 'Explore for something to cook on the fire')
							}
						}
						effects=this.buildingsList[buildingName].effects
						if(effects){
							for(let i=0;i<effects.length;i++){
								this[effects[i].funcName].apply(this,effects[i].args.concat(number,inSpace))
							}
						}
						if (buildingName === 'spit' || buildingName==='bucketOfWater') {
							if (this.checks['spitMade'] && this.checks['bucketWaterMade'] && !this.checks['hangBucketUnlocked']) {
								this.addProcess('Hang a bucket on the spit', 'hangbucket')
								this.setCheck('hangBucketUnlocked', true)
							}
						}
						this.buildingsBought+=number
						this.addVisibleResource(buildingName,true,inSpace)
					}
				} else {
					for (const [key, value] of Object.entries(building['cost'])) {
						this.incrementResource(key,-1*number * value)
					}
					for (const [key, value] of Object.entries(building['results'])) {
						this.incrementResource(key,number * value)
						this.addVisibleResource(key,true,inSpace)
					}
				}
			}
		},
		buyAdaptation: function(adaptation){
			let buyable = true
			let table = adaptation.inSpace?this.spaceResCounts:this.resTable
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
		shutDown: function(){
			this.naughty=true
		},
		//resources
		incrementResource: function(res, amount, multiplier = 1) {
			amount = amount * multiplier
			let table = this.resTable;
			if (table[res].storage < amount + table[res].amount) {
				this.incrementResourceSpecial(res, 'extraPerTick', (table[res].storage - table[res].amount))
				let toReturn = table[res].storage - table[res].amount
				this.configureResource(res, 'amount', table[res].storage)
				if(this.resTable[res].isFluid){
					this.updateFluids()
				}
				return toReturn
			} else if (0 > amount + table[res].amount) {
        this.incrementResourceSpecial(res, 'extraPerTick', -1*table[res].amount)
				let toReturn = -1*table[res].amount
				this.configureResource(res, 'amount', 0)
				if(this.resTable[res].isFluid){
					this.updateFluids()
				}
				return toReturn
			} else {
				this.incrementResourceSpecial(res, 'extraPerTick', amount)
				this.configureResource(res, 'amount', table[res].amount + amount)
				if(this.resTable[res].isFluid){
					this.updateFluids()
				}
				return amount
			}
		},
		incrementResourceSpecial: function(res, thing, amount, multiplier = 1) {
			if(!this.resTable[res]){
				console.log("Missing resouce: "+res)
			}else{
				this.configureResource(res, thing,this.resTable[res][thing] + amount*multiplier)
			}
		},
		incrementResourceSpecialSpace: function(res, thing, amount, multiplier = 1) {
			this.configureResourceSpace(res, thing,this.spaceResCounts[res][thing] + amount*multiplier)
		},
		configureResource: function(resource, attribute, value) {
			if(this.resTable[resource]){
				this.resTable[resource][attribute] = value
			}else{
				this.errorLog.push('Cannot configure resource '+resource+' as it is not in resTable')
			}
		},
		configureResourceSpace: function(resource, attribute, value) {
			if(this.spaceResCounts[resource]){
				this.spaceResCounts[resource][attribute] = value
			}else{
				this.errorLog.push('Cannot configure resource '+resource+' as it is not in resTable')
			}
		},
		incResSpace:function(res,amount){
			if(this.spaceResCounts[res].amount+amount<0){
				let toReturn = this.spaceResCounts[res].amount
				this.spaceResCounts[res].amount=0
				this.incrementResourceSpecialSpace(res,'extraPerTick',toReturn)
				return toReturn
			}
			if(this.resTable[res].isFluid){
				if(amount>this.spaceFluidLeft/this.resTable[res].fluidStuff.density){
					amount = this.spaceFluidLeft/this.resTable[res].fluidStuff.density
				}
				let toReturn = Math.min(amount,this.spaceFluidLeft/this.resTable[res].fluidStuff.density)
				this.spaceResCounts[res].amount+=Math.min(amount,this.spaceFluidLeft/this.resTable[res].fluidStuff.density)
				this.updateFluids(true)
				return toReturn
			}else{
				this.spaceResCounts[res].amount+=amount
				this.incrementResourceSpecialSpace(res,'extraPerTick',amount)
				return amount
			}
		},
		//grid
		newGrid: function(){
			this.grid = new WorldGrid(10)
		},
		//gametick
		generalTickUtil: function(){
			if(this.debug){
				console.time('wholeTick')
				console.time('grid, saving, computer')
			}
			if(this.computerChanged){
				this.computerChanged-=1
			}
			this.tickCount+=1
			tickCount=this.tickCount
			if(this.tickCount%1800==0){
				console.time('savingGame');
				App.saveGame()
				console.timeEnd('savingGame')
			}
			if(this.grid && this.tickCount%1==0){
				this.grid.tick(this)
			}
			if(this.debug){
				console.timeEnd('grid, saving, computer')
				console.time('market')
			}
			if(this.tickCount%1==0){
				let toRemove=[]
				this.market.tick()
				for(let i=0;i<this.market.stocks.length;i++){
					if(this.market.stocks[i].current<=0){
						toRemove.push([i,this.market.stocks[i].name])
					}
				}
				for(let i=0;i<toRemove.length;i++){
					deleteStock(toRemove[i][1])
					if(toRemove[i][0]==this.curStock){
						this.curStock="0"
					}else if(this.curstock!="marketTotal"  && toRemove[i][0]<this.curStock){
						this.curStock-=1
						this.curStock+=""
					}
					this.stockNamePool.removeName(toRemove[i][1].slice(0,toRemove[i][1].length-6))
					addStock(stockCreator(this.stockNamePool))
				}
			}
			if(this.debug){
				console.timeEnd('market')
				console.time("conversions, checks and opacity")
			}
			this.universe.incProgress(this.spaceResCounts['hypersonicShuttle'].amount)
			if (this.insertedDisk && this.computerOpacity < 1) {
				this.computerOpacity += 1 / 600
			}
			for (const [key, value] of Object.entries(this.resTable)) {
				if (value['conversion'] !== undefined) {
					if (this.resTable[key].amount !== 0) {
						for (const [key2, value2] of Object.entries(this.resTable[key]['conversion'])) {
							if (typeof(value['conversion'][key2])=='number') {
								if (this.resTable[key].amount - value2 < 0) {
									this.incrementResource(key2, value.amount)
									this.incrementResourceSpecial(key, 'extraPerTick', -1 * value.amount)
									this.configureResource(key, 'amount', 0)
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
			if (this.resTable['steam'].amount >= 200 && !this.checks['steamExplore']) {
				this.setCheck('steamExplore',true)
				this.configureButton(1, 'displayText', 'Explore a nearby cave for something to consume this steam.')
				this.configureButton(1, 'ready',true)
			}
			if(this.debug){
				console.timeEnd("conversions, checks and opacity")
			}
			this.tradeHub.tick(this)
		},
		machinesEverywhere: function(){
			if(this.debug){
				console.time('machines')
			}
			for(let i=0;i<this.machinePriority.length;i++){
				let machine=this.machineStates[this.machinePriority[i]]
				machine.multiplier = 1
				for(const [key,value] of Object.entries(machine['resourcesNeeded'])){
					machine.multiplier = Math.min(machine.multiplier,this.resTable[key].amount/
						value/(this.resTable[this.machinePriority[i]].amount==0?
							Infinity:
								this.resTable[this.machinePriority[i]].amount))
				}
				let listed = []
				for(const [key,value] of Object.entries(machine['results'])){
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
					for(const [key,value] of Object.entries(machine['results'])){
						this.incrementResource(key,value*this.resTable[this.machinePriority[i]].amount*machine.multiplier)
						this.addVisibleResource(key,true)
					}
					for(const [key,value] of Object.entries(machine['resourcesNeeded'])){
						this.incrementResource(key,-value*this.resTable[this.machinePriority[i]].amount*machine.multiplier)
					}
				}
				this.machineStates[this.machinePriority[i]]=machine
			}
			if(this.debug){
				console.timeEnd('machines')
				console.time('machines in space')
			}
			for(let i=0;i<this.spaceMachinePriority.length;i++){
				let machine=this.spaceMachineStates[this.spaceMachinePriority[i]]
				machine.multiplier = 1
				for(const [key,value] of Object.entries(machine['resourcesNeeded'])){
					machine.multiplier = Math.min(machine.multiplier,this.spaceResCounts[key].amount/
						value/(this.spaceResCounts[this.spaceMachinePriority[i]].amount==0?
							Infinity:
								this.spaceResCounts[this.spaceMachinePriority[i]].amount))
				}
				if(this.spaceResCounts[this.spaceMachinePriority[i]].amount>0&&machine.multiplier>0){
					for(const [key,value] of Object.entries(machine['results'])){
						this.incResSpace(key,value*this.resTable[this.spaceMachinePriority[i]].spaceMachineSettings.multiplier*this.spaceResCounts[this.spaceMachinePriority[i]].amount*machine.multiplier)
						this.addSpaceResource(key,true)
					}
					for(const [key,value] of Object.entries(machine['resourcesNeeded'])){
						this.incResSpace(key,-value*this.spaceResCounts[this.spaceMachinePriority[i]].amount*machine.multiplier)
					}
				}
				this.spaceMachineStates[this.spaceMachinePriority[i]]=machine
			}
			if(this.debug){
				console.timeEnd('machines in space')
				console.time('mineMachinePriority')
			}
			for(let i=0;i<this.mineMachinePriority.length;i++){
				let machine=this.mineMachineStates[this.mineMachinePriority[i]]
				machine.multiplier = 1
				for(const [key,value] of Object.entries(machine['resourcesNeeded'])){
					machine.multiplier = Math.min(machine.multiplier,this.resTable[key].amount/
						value/(this.resTable[this.mineMachinePriority[i]].amount==0?
							Infinity:
								this.resTable[this.mineMachinePriority[i]].amount))
				}
				let listed = []
				for(const [key,value] of Object.entries(machine['results'])){
					if(this.resTable[key]){
						listed.push((this.resTable[key].storage-
							this.resTable[key].amount)
							/value/(this.resTable[this.mineMachinePriority[i]].amount)
							/
							machine.multiplier)
					}else{
						console.log("Missing resource",key)
					}
				}
				if(listed.length==0){
					listed.push(1)
				}
				let maxim = Math.max.apply(null,listed)
				machine.multiplier = Math.min(maxim==maxim?maxim:Infinity,machine.multiplier)
				if(this.resTable[this.mineMachinePriority[i]].amount>0&&machine.multiplier>0){
					for(const [key,value] of Object.entries(machine['results'])){
						if(this.mining['Earth']['resources'][key]){
							this.mining['Earth']['resources'][key].total-=
							this.incrementResource(
								key,Math.min
								(value*this.resTable[this.mineMachinePriority[i]].amount*machine.multiplier,
									this.mining['Earth']['resources'][key].total))
						}else{
							this.incrementResource(key,value*this.resTable[this.mineMachinePriority[i]].amount*machine.multiplier)
						}
						this.addVisibleResource(key,true)
					}
					for(const [key,value] of Object.entries(machine['resourcesNeeded'])){
						this.incrementResource(key,-value*this.resTable[this.mineMachinePriority[i]].amount*machine.multiplier)
					}
				}
				this.mineMachineStates[this.mineMachinePriority[i]]=machine
			}
			if(this.debug){
				console.timeEnd('mineMachinePriority')
				console.time('spaceMineMachinePriority')
			}
			for(let i=0;i<this.spaceMineMachinePriority.length;i++){
				let machine=this.spaceMineMachineStates[this.spaceMineMachinePriority[i]]
				machine.multiplier = 1
				for(const [key,value] of Object.entries(machine['resourcesNeeded'])){
					machine.multiplier = Math.min(machine.multiplier,this.spaceResCounts[key].amount/
						value/(this.spaceResCounts[this.spaceMineMachinePriority[i]].amount==0?
							Infinity:
								this.spaceResCounts[this.spaceMineMachinePriority[i]].amount))
				}
				if(this.spaceResCounts[this.spaceMineMachinePriority[i]].amount>0&&machine.multiplier>0){
					for(const [key,value] of Object.entries(machine['results'])){
						if(this.universe.visible[key]||this.universe.visible[key]==0){
							this.universe.visible[key]-=
							this.incResSpace(
								key,Math.min
								(value*this.spaceResCounts[this.spaceMineMachinePriority[i]].amount*machine.multiplier,
									this.universe.visible[key]))
						}else{
							this.incResSpace(key,value*this.spaceResCounts[this.spaceMineMachinePriority[i]].amount*machine.multiplier)
						}
						this.addSpaceResource(key,true)
					}
					for(const [key,value] of Object.entries(machine['resourcesNeeded'])){
						this.incResSpace(key,-value*this.resTable[this.spaceMineMachinePriority[i]].amount*machine.multiplier)
					}
				}
				this.spaceMineMachineStates[this.spaceMineMachinePriority[i]]=machine
			}
			if(this.debug){
				console.timeEnd('spaceMineMachinePriority')
				console.time('machineChecking')
			}
			for(const machine of this.listOfMachines){
				if(!this.machinePriority.includes(machine)){
					console.log('Machine '+machine+" has not been added to the machine priority list.")
				}
			}
			if(this.debug){
				console.timeEnd('machineChecking')
			}
		},
		buildingsAndScripts: function(){
			if(this.debug){
				console.time('addingBuildings')
			}
			this.newBuildings=0
			for (const [key, building] of Object.entries(this.buildingsList)) {
				let available=true
				for (const [key2, value2] of Object.entries(building['cost'])) {
					if(!this.resTable[key2]){
						console.log('Missing res: '+key2)
					}else{
						if(this.resTable[key2].amount<value2/2){
							available=false
						}
					}
				}
				if(!this.resTable[key]&&this.buildingsList[key].type!='process'){
					console.log('Missing res: '+key)
				}else{
					if(available&&this.buildingsList[key].type=='building'&&!this.resTable[key].locked){
						this.addBuilding(key)
					}
					if(available&&this.buildingsList[key].type=='process'&&key!='hangbucket'){
						this.addProcess(this.buildingsList[key].buildName,key)
					}
					let spaceAvailable=true
					for (const [key2, value2] of Object.entries(building['cost'])) {
						if(this.spaceResCounts[key2].amount<value2/2){
							spaceAvailable=false
						}
					}
					if(spaceAvailable&&this.buildingsList[key].type=='building'&&!this.resTable[key].spaceLocked){
						this.addSpaceBuilding(key)
					}
					if(spaceAvailable&&this.buildingsList[key].type=='process'){
						this.addSpaceProcess(this.buildingsList[key].buildName,key)
					}
				}
			}
			if(this.debug){
				console.timeEnd('addingBuildings')
			}
			if(this.errorLog.length>0){
				this.errorLog=[]
			}
			if(this.debug){
				console.time('runningScripts')
			}
			for(const extension of this.unSaveable.extensions){
				if(this.resTable[extension[2]].amount>0){
					if(!this.scripts[extension[0]]){
						this.scripts[extension[0]]={}
					}
					scripts = this.scripts[extension[0]]
					if(!this.multipliers[extension[0]]){
						this.multipliers[extension[0]]=1
					}
					allocated = this.allocateItemsPercent((!extension[4]?this.resTable[extension[2]].amount:this.spaceResCounts[extension[2]].amount)*this.multipliers[extension[0]],scripts)
					entries = Object.entries(scripts)
					if(this.debug){
						console.time(extension[0])
					}
					for(let i=0;i<entries.length;i++){
						if(this.debug){
							console.time('loading: '+extension[0])
						}
						funcs = extension[3](this,allocated[i])
						if(this.debug){
							console.timeEnd('loading: '+extension[0])
						}
						if(allocated[i]>0){
							try{
								parseCode(this.fileTextContents[entries[i][1].fileID].slice(1),{},funcs)
							}
							catch(err){

							}
						}
					}
					if(this.debug){
						console.timeEnd(extension[0])
					}
				}
			}
			if(this.debug){
				console.timeEnd('runningScripts')
				console.time('findingNewJobs')
			}
		},
		jobsAndStuff: function(){
			let newJobsFound=0
			let newSpaceJobsFound=0
			for (const [key, value] of Object.entries(this.jobs)) {
				if(this.unlockedResources.includes(key)){
					for(newJob of value){
						if((!this.machineStates[newJob.job] ||
							this.allDictKeysAreInArray(this.machineStates[newJob.job].resourcesNeeded,
							this.unlockedResources.concat(this.unlockedFluids)))&&!this.discoveredJobs.includes(newJob.job)){
							this.discoveredJobs.push(newJob.job)
							newJobsFound+=1
						}
					}
				}
			}
			for (const [key, value] of Object.entries(this.jobs)) {
				if(this.unlockedSpaceResources.includes(key)){
					for(newJob of value){
						if((!this.machineStates[newJob.job] ||
							this.allDictKeysAreInArray(this.spaceMachineStates[newJob.job].resourcesNeeded,
							this.unlockedSpaceResources.concat(this.unlockedSpaceFluids)))&&!this.discoveredSpaceJobs.includes(newJob.job)){
							this.discoveredSpaceJobs.push(newJob.job)
							newSpaceJobsFound+=1
						}
					}
				}
			}
			if(this.debug){
				console.timeEnd('findingNewJobs')
				console.time('jobAssignment')
			}
			for(const [name,jobsList] of Object.entries(this.jobs)){
				let jobsFound=this.resTableFilterBy((res)=>{return res.isJobOf==name})
				let relevantJobsFound={}
				for(let i=0;i<jobsFound.length;i++){
					relevantJobsFound[i]=jobsFound[i][1]
				}
				let total = this.jobCount(name)
				let allocated = this.allocateItemsPercent(this.jobCount(name),relevantJobsFound)
				for(let i=0;i<jobsFound.length;i++){
					this.resTable[jobsFound[i][0]].amount=allocated[i]
					total-=allocated[i]
				}
				this.resTable[name].amount=total
			}
			for(const [name,jobsList] of Object.entries(this.jobs)){
				let jobsFound=this.resTableFilterBy((res)=>{return res.isJobOf==name})
				let relevantJobsFound={}
				for(let i=0;i<jobsFound.length;i++){
					relevantJobsFound[i]=this.spaceResCounts[jobsFound[i][0]]
				}
				let total = this.spaceJobCount(name)
				let allocated = this.allocateItemsPercent(total,relevantJobsFound)
				for(let i=0;i<jobsFound.length;i++){
					this.spaceResCounts[jobsFound[i][0]].amount=allocated[i]
					total-=allocated[i]
				}
				this.spaceResCounts[name].amount=total
			}
			if(this.debug){
				console.timeEnd('jobAssignment')
				console.time('assortedBitsAndPieces')
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
			if(this.newBuildings!==0){
				tabToEdit = this.getTab('main')
				if(tabToEdit.displayText!='Main'){
					this.newBuildings -= '-'+tabToEdit.displayText.slice(6,tabToEdit.displayText.length-1)
				}
				this.editTab('main', 'Main ('+this.newBuildings+')')
			}
			if(newJobsFound!==0){
				tabToEdit = this.getTab('jobs')
				if(tabToEdit.displayText!='Jobs'){
					newJobsFound -= '-'+tabToEdit.displayText.slice(6,tabToEdit.displayText.length-1)
				}
				this.editTab('jobs', 'Jobs ('+newJobsFound+')')
			}
			if(newSpaceJobsFound!==0){
				tabToEdit = this.getTab('spaceJobs')
				if(tabToEdit.displayText!='Space Jobs'){
					newSpaceJobsFound -= '-'+tabToEdit.displayText.slice(12,tabToEdit.displayText.length-1)
				}
				this.editTab('spaceJobs', 'Space Jobs ('+newSpaceJobsFound+')')
			}
			if(this.debug){
				console.timeEnd('assortedBitsAndPieces')
			}
		},
		filesAndCharts: function(){
			if(this.debug){
				console.time('fileChecks')
			}
			if(this.hole>=100&&!this.filesIncludesID('minereadme')){
				this.editTab('computer','Computer (1)')
				this.addCustomFile('minereadme', 'mining.doc', 'Here is a helpful guide to the depths you find resources at certain depths.\
	\nThe Galactic Council has not told you this, because they don\'t want you to succeed.\
	\nNothing is found below 1,000,000,000m.\
	\nCoal is found at 10m-10,000,000m\
	\nStone is found at all depths.\
	\nCopper is found at 100m-500,000m\
	\nIron is found at 100m-500,000m\
	\nTitanium is found at 100,000m-100,000,000m\
	\nTungsten is found at 1,000,000m-1,000,000,000m\
	-Anonymous', 'doc')
			}
			if(!this.getTab('statistics')&&this.unlockedResources.includes('ironOre')){
				this.addTab('Statistics','statistics')
			}
			if(this.resTable['alloyer'].amount>0&&!this.filesIncludesID('alloyreadme')){
				this.editTab('computer','Computer (2)')
				this.addCustomFile('alloyreadme', 'alloyer.doc', 'What materials can you make in an alloyer?\
	\nI can\'t tell you all of them, but by melting as many resources as you can, you can find recipies.\
	\nA friendly reminder - You must stay away from Frostium technology.\
	\n-The Galactic Council', 'doc')
				this.addCustomFile('frostiumNecessary', 'urgent.doc', 'The Galactic Council believes you should stay away from Frostium\
	\nThis is foolishness and superstition, but even with my influence, they did not change their mind.\
	\nIf you wish to leave this planet, you will need frostium technology.\
	\nDO NOT LISTEN TO THEIR WARNING. THEY ONLY AIM TO GAIN FOR THEMSELVES.\
	\n-Anonymous', 'doc')
			}
			if(this.resTable['assembler'].amount>=1&&!this.filesIncludesID('assemblerreadme')){
				this.editTab('computer','Computer (1)')
				this.incrementResource('galacticCredits',1000)
				this.addCustomFile('assemblerreadme', 'assembler.doc', ' The assembler\'s file extension is .asmblr, and it has two main commands.\n \
	The first command is assembler.constructBuilding, which takes in the name of the building(all lowercase and hyphenated), and how many to build per tick.\n \
	The second is isBuildingBuyable, and takes in two arguments, name and how many per tick.\n \
	if(assembler.isBuildingBuyable(\'barn\',11)){\n \
	assembler.constructBuilding(\'barn\',1)\n \
	\n \
	} purchases one barn a tick, but always leaves you with at least three hundred wood.\n \
	To check multiple conditions, use && to mean and. For example:\n \
	if(assembler.isBuildingBuyable(\'barn\',11)&&assembler.isBuildingBuyable(\'stoneFurnace\',11)){\n \
	assembler.constructBuilding(\'barn\',1)\n \
	assembler.constructBuilding(\'stoneFurnace\',1)\n \
	\n \
	} \n \
	This example buys one barn and one furnace only if oyu can buy both simultaneously. \n \
	The script will require two assemblers to run, because two buildings are being built.\n \
	In general scripts require assemblers equal to the maximum amount of buildings being bought to run.', 'doc')
			}
			if(this.unlockedResources.includes('leoIII')&&!this.filesIncludesID('cargoreadme')){
				this.editTab('computer','Computer (1)')
				this.addCustomFile('cargoreadme', 'cargoBay.doc', 'What can you put on a rocketship?\
	\nYou can only have so much weight on your rocketship.\
	\nA LEO III can only hold one thousand klaxons(the galatic standard weight unit) at any time.\
	\nIn addition, a LEO III can only hold items with a fragility of 5 or less. Anything more fragile would break.\
	\nA cargo ship can hold one hundred thousand klaxons, and items with a fragility of up to ten.\
	\n-Anonymous', 'doc')
			}
			if(this.spaceResCounts['satellite'].amount>=1&&!this.filesIncludesID('marketreadme')){
				this.editTab('computer','Computer (1)')
				this.addTab('Market','market')
				this.incrementResource('galacticCredits',1000)
				this.addCustomFile('marketreadme', 'market.doc', 'We have recieved your satellite communication.\
	\nYour request to have access to our market has been accepted. We have given you a starting fund of one thousand galactic credits. \
	\nYou will not be given more. We hope that this represents a desire to rejoin our society peacefully.\
	\nYour race\'s fate hangs on your head, and if you do not conform, we will not hesitate to exterminate you.\
	\n-The Galactic Council', 'doc')
			}
			if(this.spaceResCounts['frostium']>=1&&!this.filesIncludesID('dysonspheremessage')){
				this.editTab('computer','Computer (1)')
				this.addCustomFile('dysonspheremessage', 'dysonsphere.doc', 'Now that you are in space, I can give you plans for the future.\
	\nI have the blue prints for a dyson sphere, but I fear giving them to you without you having a way to defend yourself.\
	\nI worry the galactic council will destroy you.\
	\nIf you get 10000 high level combat ships of each type, I will give you the plans.\
	\n-Anonymous', 'doc')
				this.addCustomFile('spaceassemblermessage', 'spaceassemblers.doc', 'In case you are wondering, assemblers still work in space.\
\nYou simply need to change the extension from .asmblr to .sasmblr\
\n-Anonymous', 'doc')
			}
			if(this.spaceResCounts['forcefieldTankShip']>=10000&&this.spaceResCounts['teleporterSupportShip']>=10000&&this.spaceResCounts['directSniperShip']>=10000&&!this.filesIncludesID('dysonspherereward')){
				this.editTab('computer','Computer (1)')
				this.addCustomFile('dysonspherereward', 'dysonsphere.doc', 'I just want to congratulate you on your progress.\
	\nEnclosed you will find the plans for a dyson sphere.\
	\nUsing it\'s power, you need to create a ship to travel to Dendram\
	\nThis is the only way to get the machines you need to combat the galactic council.\
	\n-Anonymous', 'doc')
				this.resTable.dysonSphere.spaceLocked = true;
			}
			if(this.debug){
				console.timeEnd('fileChecks')
				console.time('chart')
			}
			for(const [key,value] of Object.entries(this.resTable)){
				this.resTable[key].pastAmount.push(value.amount)
				if(this.resTable[key].pastAmount.length>200){
					this.resTable[key].pastAmount.shift()
				}
				this.resTable[key].pastPerTick.push(value.extraPerTick)
				if(this.resTable[key].pastPerTick.length>200){
					this.resTable[key].pastPerTick.shift()
				}
				this.configureResource(key, 'extraPerTick', 0)
				this.spaceResCounts[key].pastPerTick.push(this.spaceResCounts[key].extraPerTick)
				if(this.spaceResCounts[key].pastPerTick.length>200){
					this.spaceResCounts[key].pastPerTick.shift()
				}
				this.configureResourceSpace(key, 'extraPerTick', 0)
			}
			if(this.debug){
				console.timeEnd('chart')
				console.time('updateChart')
			}
			if(this.tickCount%2===0){
				this.unSaveable.resourceProductionChartTemplate['data']['datasets'][0]['data']=this.resTable[this.curRes][this.curView].concat([])
			}
			if(this.debug){
				console.timeEnd('updateChart')
				if(this.temporaryDebug){
					this.debug = false
					this.temporaryDebug = false
				}
				console.timeEnd('wholeTick')
			}
		},
		tick: function() {
			this.generalTickUtil()
			this.machinesEverywhere()
			this.buildingsAndScripts()
			this.jobsAndStuff()
			this.filesAndCharts()
		},
		//jobs
		jobCount: function(job){
			let totalCount = this.resTable[job].amount
			let jobList = this.jobs[job]||[]
			for(let i=0;i<jobList.length;i++){
				totalCount+=this.resTable[jobList[i].job].amount
			}
			return totalCount
		},
		spaceJobCount: function(job){
			let totalCount = this.spaceResCounts[job].amount
			let jobList = this.jobs[job]||[]
			for(let i=0;i<jobList.length;i++){
				totalCount+=this.spaceResCounts[jobList[i].job].amount
			}
			return totalCount
		},
		assignJob: function(jobToAssign,jobBase,amount,inSpace){
			percentLeft = 100
			table = inSpace?this.spaceResCounts:this.resTable
			for(const job of this.jobs[jobBase]){
				if(job.job!=jobToAssign){
					percentLeft -= table[job.job].percent
				}
			}
			if(amount>0){
				table[jobToAssign].percent=Math.min(percentLeft,amount+table[jobToAssign].percent)
			}else{
				table[jobToAssign].percent=Math.max(0,amount+table[jobToAssign].percent)
			}
		},
		//rocketry
		handleLaunchRocket: function(rocket){
			this.launchRocket(rocket,1)
		},
		launchRocket: function(rocket,number){
			let buyable = true
			let launchable = false
			let maxFragility=-1
			let totalWeight=0
			number = Math.min(number,this.resTable[rocket.name].amount)
			for (const [key, value] of Object.entries(rocket['launchCost'])) {
				if (this.resTable[key].amount < value) {
					buyable = false
					break
				}else{
					number = Math.floor(Math.min(number, this.resTable[key].amount / value))
				}
			}
			if(buyable&&number>=1){
				for(const[key,value] of Object.entries(this.cargo)){
					if(this.resTable[key].cargoStuff.fragility>rocket['maximumFragility']&&(value>0)){
						this.setMessage('You have a too fragile item ('+this.resTable[key].screenName+
						') on your rocket ship')
						return false;
					}
					totalWeight+=this.resTable[key].cargoStuff.weight*value
				}
			}else{
				return false
			}
			if(totalWeight>rocket['cargoCapacity']){
			  this.setMessage('You have too much weight on your rocket ship.')
				return false
			}
			this.resTable[rocket.name].amount-=number
			for (const [key, value] of Object.entries(rocket['launchCost'])) {
				this.incrementResource(key,-value*number)
			}
			this.message = rocket['launchMessage']
			if(!this.launchedRockets.includes(rocket.name)){
				this.launchedRockets.push(rocket.name)
			}
			for(const [key,value] of Object.entries(this.cargo)){
				this.cargo[key] -= value
				this.incResSpace(key,value)
				this.addToCargo(key,value)
				if(value>0){
					this.addSpaceResource(key,true)
				}
			}
			if(rocket.height>=2000000&&!this.getTab('space')){
				this.addTab('Space','space')
				this.addTab('Space Jobs','spaceJobs')
			}
			return true
		},
		launchAllRockets: function(){
			let buyable = true
			let toLaunch = this.resTableFilterBy((res)=>{return res.isRocket})
			let cost = {}
			let launched = 0
			for (const [key, value] of toLaunch) {
				for(const [resource,amount] of Object.entries(this.rocketsData[key]['launchCost'])){
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
		addToCargo:function(item,number){
			number = Math.round(number)
			number = Math.min(number,this.resTable[item].amount)
			if(this.incrementResourceByHand(item,-number)){
				this.cargo[item]+=number
			}
		},
		removeFromCargo:function(item,number){
			number = Math.round(number)
			number = Math.min(number,this.cargo[item])
			if(this.incrementResourceByHand(item,number)){
				this.cargo[item]-=number
			}
		},
		//space
		transport:function(res,number,inSpace){
			let divider = 1
			if(number==='max/2'){
				number=Infinity
				divider=2
			}
			let buyable = true
			let table = !inSpace?this.resTable:this.spaceResCounts
			let tableTo = inSpace?this.resTable:this.spaceResCounts
			let cost={[res]:1,'frostiumEnergy':this.resTable[res].transportStuff.cost}
			for (const [key, value] of Object.entries(cost)) {
				if (table[key].amount < value) {
					buyable = false
				}else{
					number = Math.min(number, table[key].amount / value)
				}
			}
			if (buyable) {
				if(inSpace){
					number = Math.min(number,this.resTable[res].storage-this.resTable[res].amount)
				}
				number/=divider
				if (number!=0) {
					for (const [key, value] of Object.entries(cost)) {
						table[key].amount -= number * value
					}
					tableTo[res].amount+=number
					if(inSpace){
						App.addVisibleResource(res)
					}else{
						App.addSpaceResource(res)
					}
				}
			}
		},
		doubleTrouble: function(){
			this.naughty = true
			this.speakethSpeaketh = true
			this.saveGame()
			alert('HOW DARE YOU!!!!!!!!!!!!!!!!!')
			this.saveGame()
			alert('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
			while(true){
				alert('GRRRRRRRRRRRRRRRRRRRRRRRRRRRR')
			}
		},
		//stocks
		buyStock:function(amount,type,price){
			if(amount*price<=this.resTable['galacticCredits'].amount&&amount===Math.round(amount)&&this.stocks[type]+amount>=0){
				this.resTable['galacticCredits'].amount-=amount*price
				this.stocks[type]+=amount
			}
		},
		getNetWorth:function(){
			let netWorth = this.resTable['galacticCredits'].amount
			for(let i=0;i<this.market.stocks.length;i++){
				netWorth+=this.market.stocks[i].current*this.stocks[this.market.stocks[i].name]
			}
			return netWorth
		},
		sellMaterials:function(material,amount,toMultiply=1){
			if(amount>this.spaceResCounts[material].amount){
				amount=this.spaceResCounts[material].amount
			}
			amount*=toMultiply
			let gain=this.resTable[material].tradeableStuff.sellPrice*amount
			this.incrementResource('galacticCredits',gain)
			this.incResSpace(material,-amount)
		},
		buyMaterials:function(material,amount,toMultiply=1){
			let cost=this.resTable[material].tradeableStuff.buyPrice*amount
			if(cost>this.resTable['galacticCredits'].amount){
				amount=Math.floor(this.resTable['galacticCredits'].amount/this.resTable[material].tradeableStuff.buyPrice)
			}
			amount*=toMultiply
			cost=this.resTable[material].tradeableStuff.buyPrice*amount
			this.incResSpace(material,amount)
			this.incrementResource('galacticCredits',-cost)
		},
		handleSellMaterials:function(material,amount){
			if(amount=='max/2'){
				this.sellMaterials(material,Infinity,0.5)
			}else{
				this.sellMaterials(material,amount)
			}
		},
		handleBuyMaterials:function(material,amount){
			if(amount=='max/2'){
				this.buyMaterials(material,Infinity,0.5)
			}else{
				this.buyMaterials(material,amount)
			}
		},
		tempDebug: function(){
			this.debug = true
			this.temporaryDebug = true
		},
		//testing
		runUnitTests: function(){

		},
		runTickTest: function(){
			console.time('oneHunderedTicks')
			for(let i=0;i<100;i++){
				this.tick()
			}
			console.timeEnd('oneHunderedTicks')
		},
		//trading
		acceptTrade: function(i){
			tradeHub.acceptTrade(App,i)
		}
	},
  computed: {
    resourceProductionChartTemplateDetached: function() {
			let tickCallback = this.unSaveable.resourceProductionChartTemplate['options']['scales']['yAxes'][0]['ticks']['callback']
			let colorCallback = this.unSaveable.resourceProductionChartTemplate['data']['datasets'][0]['backgroundColor']
			let detatched = this.detach(this.unSaveable.resourceProductionChartTemplate)
			detatched['options']['scales']['yAxes'][0]['ticks']['callback'] = tickCallback
			detatched['data']['datasets'][0]['backgroundColor'] = colorCallback
			return detatched
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
//5791 line anniversay - 12:51 24 Mar 2020 Coronavirus pandemic era
