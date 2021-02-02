let tickCount=0
let data = {
	computerOpacity: 0,
	resTable: {},
	buildingsList: buildingsData,
	tab: 'main',
	unlockedResources: ['wood'],
	cursorX: 0,
  machinePriority:[],
  spaceMachinePriority:[],
  mineMachinePriority:[],
	spaceMineMachinePriority:[],
	cursorY: 0,
	cargo:{},
	fileContents: {},
	fileTextContents: {},
	fileViewed: 'logo',
	tabPos: 0,
	universeResCounts:{

	},
	checks: {},
	files: [],
	rocketsData,
	stockBuyCount:0,
	toBuy:1,
	universe,
	stocks:{},
	buyList:[1,10,100,'max','custom'],
  machineStates:{},
  spaceMachineStates:{},
  mineMachineStates:{},
	spaceMineMachineStates:{},
	tickCount:1,
	message: '',
  curFileType: 'img',
	insertedDisk: false,
	buttons: [],
	warningLog: [],
	errorLog: [],
	messageCSS:{},
	debug:false,
	tabs: [{
		displayText: 'Main',
		tab: 'main',
	},{
		displayText: 'Saves',
		tab: 'saving',
	}],
	unSaveable:{
		buttons:{},
		extensions: [],
		adaptations:{},
		resourceProductionChartTemplate: {
			data:{
				labels: fillToMax([''],200),
				datasets:[
					{
						borderColor:'rgba(0, 255, 255, 0.0001)',
						backgroundColor: 'aqua',
						label: 'Data One',
						data: []
					}
				]
			},
			options:{
				responsive: true,
				maintainAspectRatio: false,
				tooltips:{enabled: false},
				scales: {
					yAxes: [{
						ticks: {
							callback: function(value,index,values){
								return bigNumberHandler(value)
							},
						}
					}]
				}
			},
		},
	},
	multipliers:{},
	buildings: {},
	speakethSpeaketh:false,
	listOfMachines:[],
	computerChanged:false,
	processes: [],
	logger:(val)=>{console.log(val);return val},
	spaceBuildings:{},
	spaceProcesses:[],
	mining:{
		'Earth':mine
	},
	grid:null,
	rocketMessage:'',
	planets:{
		'total':{
			'stone':5000,
			'tungstenOre':0,
			'copperOre':0,
			'ironOre':0,
			'coal':0,
			'titaniumOre':0,
			'goldOre':0,
			'progress':0,
		}
	},
	hole:0,
	correctMachineOrder:[
		//producers
		"giftGod",
		"pyromeMaterializer",
		"solarPanel",
		"solarPanelSatellite",
		"solarPanelSatelliteCluster",
		"solarPanelSatelliteGroup",
		"dysonSwarm",
		"dysonSphere",
		"steamEngine",
		"frostiumBattery",
		"shadowCollector",
		//independent
		"fire",
		"incendinaryPile",
		"coalIncendinaryPile",
		//basic utility
		"stoneMiner",
		"fireStarter",
		//furnaces
		"stoneFurnace",
		"ironFurnace",
		"ironFrostiumFurnace",
		"tungstenFurnace",
		"tungstenFrostiumFurnace",
		"copperFurnace",
		"copperFrostiumFurnace",
		"titaniumFurnace",
		"titaniumFrostiumFurnace",
		"goldFurnace",
		"goldFrostiumFurnace",
		//secondary parts
		"compressor",
		"pressurizer",
		"spacePressurizer",
		//melters
		"ironMelter",
		"copperMelter",
		"titaniumMelter",
		"tungstenMelter",
		"goldMelter",
		"steelMelter",
		"diomineMelter",
		"iceMelter",
		"pump",
		"duraniumMelter",
		"frostiumMelter",
		//alloyers
		"moltenDuraniumAlloyer",
		"moltenFrostiumAlloyer",
		//coolers
		"moltenIronCooler",
		"moltenCopperCooler",
		"moltenTitaniumCooler",
		"moltenTungstenCooler",
		"moltenGoldCooler",
		"moltenSteelCooler",
		"moltenDiomineCooler",
		"moltenDuraniumCooler",
		"moltenFrostiumCooler",
		"waterCooler",
		//space machines
		"sunMiner",
		"trishardicGeodeIndustrialSmelter",
		"aeromineGlassIndustrialSmelter",
		"rubyLaserLensIndustrialSmelter",
		"emeraldLaserLensIndustrialSmelter",
		"temperedPyromeIndustrialSmelter",
		"carbonFactory",
		"nanobotFactory"
	],
	spaceResCounts:{},
	jobs:{

	},
	rocketsBought:[],
	market:mark,
	curStock:0,
	freeGiftGiven:false,
	unlockedFluids:[],
	launchedRockets:[],
	stockNamePool:productPool,
	scripts:{

	},
	completedAdaptations:[],
	madeParts:[],
	fluidLeft:0,
	discoveredJobs:[],
	discoveredSpaceJobs:[],
	sortOrder:['wood'],
	spaceFluidLeft:0,
	version:'0.5.6',
	unlockedSpaceResources:["iron","copper","frostium","duranium","steel","compressedIron","tungsten","titanium"],
	newBuildings:0,
	customToBuy:0,
	unlockedSpaceFluids:[],
	curRes:'wood',
	buildingsBought:0,
	availableAdaptations:[],
	buyingTabs:['main','space','spaceRocketBuilder','rocketSilo','spaceRocketPartBuilder'],
	naughty:false,
	views:['pastAmount','pastPerTick'],
	curView:'pastAmount',
	categories:{'Processes':true,'Interaction':true},
	spaceCategories:{},
	rocketPartCategory:'Protective',
	rocketPartCategories:['Protective','Repair','Weapon','Radar','Engine'],
	rocketCategory:'Mining',
	rocketCategories:['Mining','Combat Support','Combat Tank','Combat Ranged'],
	pastTradeStatuses:[],
}
function Res(name,sname){
	this.stuff={
		name,
		amount: 0,
		perTick: 0,
		pastAmount: [0],
		pastPerTick: [0],
		tempPastAmount: [0],
		tempPastPerTick: [0],
		screenName: sname,
		storage: 5,
		tradeable:false,
		extraPerTick: 0,
		multiplier: 1,
		buildName:'placeholder',
		rocketPart:'',
		rocketType:'',
		locked:false,
		isRocket:false,
		isFluid:false,
		fluidStuff:{},
		isJob:false,
		isBuildable:false,
		unique:false,
		specialCSS:{},
		spaceLocked:false,
		percent:0,
		spaceMachineSettings:{
			multiplier:1
		},
		isTransportable:false,
		transportStuff:{},
		unqiue:false,
		tradeableStuff:{},
		spaceExtraPerTick:[0],
		spacePastPerTick:[0],
		tempSpacePastPerTick:[0],
	}
	return this
}
let jobsToAdd = {};
const godMode = false
const addButtonConstructor = (displayText, todo) => {
	data.buttons.push({
		displayText,
		todo,
		ready:true
	})
}
const addJob = (base, job) => {
	if(!data.jobs[base]){
		if(!jobsToAdd[base]){
			jobsToAdd[base]=[]
		}
		if(data.resTable[base]){
			data.jobs[base]=jobsToAdd[base]
		}
	}
	if(data.jobs[base]){
		data.jobs[base].push({
			job
		})
	}else{
		jobsToAdd[base].push({
			job
		})
	}
}
const addExtension = (parts) => {
	data.unSaveable.extensions.push(parts)
	data.scripts[parts[0]]={}
	data.multipliers[parts[0]]=1
}
const confusedText = 'Please report to a dev';
const addCheck = (name)=>{
	data.checks[name]=false
}
const addStock = (stock)=>{
	data.market.stocks.push(stock)
	data.stocks[stock.name]=0
}
const deleteStock = (stock)=>{
	let index=-1
	for(let i=0;i<data.market.stocks.length;i++){
		if (data.market.stocks[i].name==stock) {
			index=i
			break
		}
	}
	if(index!=-1){
		data.market.stocks = data.market.stocks.slice(0,index).concat(data.market.stocks.slice(index+1))
	}
	delete data.stocks[stock]
}
const addAdaptation = (requirements,effects,name,description,cost,inSpace) => {
	data.unSaveable.adaptations[name]={requirements,effects,name,description,cost,inSpace:inSpace==true?true:false}
}
Res.prototype.configure = function(attribute, value){
	this.stuff[attribute] = value
	return this
}
Res.prototype.finalize = function(){
	let saveName = this.stuff.name
	data.spaceResCounts[this.stuff.name]={amount:0,
	extraPerTick:0,
	pastPerTick:[0],
	tempPastPerTick:[0],
	percent:0}
	if(jobsToAdd[this.stuff.name]){
		data.jobs[this.stuff.name] = jobsToAdd[this.stuff.name]
	}
	if(godMode){
		if(this.stuff.storage<1e30){
			this.stuff.storage=1e30
			if(!this.stuff.isBuildable&&!this.stuff.isJob&&this.stuff.name!='giftGod'&&!this.unholy){
				data.machineStates['giftGod']['results'][this.stuff.name]=1e99
				data.spaceMachineStates['giftGod']['results'][this.stuff.name]=1e99
			}
		}
		this.stuff.locked = false
		this.stuff.spaceLocked = false
	}
	data.resTable[saveName]=this.stuff
	if(this.fluidForm){
		this.fluidForm.finalize()
	}
}
Res.prototype.addJob = function(jobName){
	addJob(this.stuff.name,jobName)
	data.resTable[jobName].isJob=true
	return this
}
Res.prototype.addInactiveState = function(){
	new Res('inactive'+this.stuff.name[0].toUpperCase()+this.stuff.name.slice(1),'Inactive '+this.stuff.screenName)
		.configure('storage',Infinity)
		.setJobOf(this.stuff.name)
		.finalize()
	return this
}
Res.prototype.setJobOf = function(jobName){
	addJob(jobName,this.stuff.name)
	this.stuff.isJob=true
	this.stuff.isJobOf=jobName
	return this
}
Res.prototype.setUnique = function(){
	this.stuff.unique = true;
	return this
}
Res.prototype.isUnholy = function(){
	this.unholy = true;
	return this
}
Res.prototype.setTradeable = function(weight,cost,defaultAmount){
	this.stuff.tradeWeight = weight;
	this.stuff.tradeCost = cost;
	this.stuff.tradeable = true;
	this.stuff.tradeDefaultAmount = defaultAmount;
	return this
}
Res.prototype.configureSpaceMachine = function(newSettings){
	for(const [key,value] of Object.entries(newSettings)){
		this.stuff.spaceMachineSettings[key]=value
	}
	return this
}
Res.prototype.isRocket = function(){
	this.stuff.isRocket=true
	this.stuff.locked = true
	return this.isBuildable()
}
Res.prototype.isRocketPart = function(rocketPart){
	this.stuff.locked = true
	this.stuff.rocketPart = rocketPart
	return this.isBuildable()
}
Res.prototype.isSpaceRocket = function(rocketType){
	this.stuff.locked = true
	this.stuff.rocketType = rocketType
	this.stuff.spaceLocked = true
	return this.isBuildable()
}
Res.prototype.isBuildable = function(){
	this.stuff.isBuildable = true
	this.stuff.storage = Infinity
	return this
}
Res.prototype.isCargo = function(fragility,weight){
	this.stuff.isCargo = true
	this.stuff.cargoStuff = {
		fragility,
		weight
	}
	data.cargo[this.stuff.name]=0
	return this
}
Res.prototype.isTransportable = function(cost){
	this.stuff.isTransportable = true
	this.stuff.transportStuff = {
		cost
	}
	return this
}
Res.prototype.isSpaceLocked = function(){
	this.stuff.spaceLocked = true
	return this
}
Res.prototype.isOreOf = function(name){
	new Res(name+'Furnace', data.resTable[name].screenName+' Smelting Furnace')
		.setJobOf('stoneFurnace')
		.configure('storage',Infinity)
		.setMachine({
			fire:0.01,
			[this.stuff.name]:0.1
		},{
			[name]:0.1
		})
		.finalize()
	new Res(name+'FrostiumFurnace', data.resTable[name].screenName+' Smelting Frostium Furnace')
		.setJobOf('frostiumFurnace')
		.configure('storage',Infinity)
		.setMachine({
			'frostiumEnergy':10,
			[this.stuff.name]:1000000
		},{
			[name]:1000000
		})
		.finalize()
	return this
}
Res.prototype.smeltsInto = function(energyInput,results,time){
	for(const [key,value] of Object.entries(results)){
		results[key]/=time
	}
	new Res(this.stuff.name+'IndustrialSmelter', this.stuff.screenName+' Industrial Smelter')
		.setJobOf('industrialSmelter')
		.configure('storage',Infinity)
		.setMachine({
			energy:energyInput/time,
			[this.stuff.name]:1/time
		},results)
		.finalize()
	return this
}
Res.prototype.isSmeltable = function(energyInput,otherInputs,time){
	for(const [key,value] of Object.entries(otherInputs)){
		otherInputs[key]/=time
		otherInputs['energy']=energyInput/time
	}
	new Res(this.stuff.name+'IndustrialSmelter', this.stuff.screenName+' Industrial Smelter')
		.setJobOf('industrialSmelter')
		.configure('storage',Infinity)
		.setMachine(otherInputs,{
			[this.stuff.name]:1/time
		})
		.finalize()
	return this
}
Res.prototype.fluidFormHasAlloyerRecipe = function(inputs,amount){
	new Res(this.fluidForm.stuff.name+'Alloyer',this.fluidForm.stuff.screenName+' Alloyer')
		.configure('storage',Infinity)
		.setMachine(inputs,{
			[this.fluidForm.stuff.name]:amount
		})
		.setJobOf('alloyer')
		.finalize()
	return this
}
Res.prototype.isFluid = function(density){
	this.stuff.isFluid = true;
	this.stuff.fluidStuff.density = density
	return this
}
Res.prototype.hasFluidForm = function(fName,fSName,fDensity){
	this.fluidForm = new Res(fName,fSName)
		.isFluid(fDensity)
	new Res(fName+'Cooler',fSName+' Cooler')
		.configure('storage',Infinity)
		.setMachine({
			[fName]:100/fDensity,
			energy:10
		},{
			[this.stuff.name]:0.1
		})
		.setJobOf('cooler')
		.finalize()
	new Res(this.stuff.name+'Melter',this.stuff.screenName+' Melter')
		.configure('storage',Infinity)
		.setMachine({
			[this.stuff.name]:0.1,
			energy:10
		},{
			[fName]:100/fDensity
		})
		.setJobOf('melter')
		.finalize()

	return this
}
Res.prototype.hasCSS = function(CSSToAdd){
	this.stuff.specialCSS=CSSToAdd
	return this
}
Res.prototype.hasPrerequisites = function(prerequisite){
	this.stuff.prerequisite = prerequisite
	return this
}
Res.prototype.setMachine = function(input,output){
	addMachine(this.stuff.name,input,output)
	addSpaceMachine(this.stuff.name,input,output)
	return this
}
Res.prototype.setMineMachine = function(input,output){
	addMineMachine(this.stuff.name,input,output)
	addSpaceMineMachine(this.stuff.name,input,output)
	return this
}
const addMineMachine = (materialName,resourcesNeeded,results) => {
	data.mineMachineStates[materialName] = {
  	resourcesNeeded:resourcesNeeded,
  	resourcesRecieved:{

  	},
  	results:JSON.parse(JSON.stringify(results)),
		multiplier:1
	}
	data.mineMachinePriority.push(materialName)

}
const addMachine = (materialName,resourcesNeeded,results) => {
	data.machineStates[materialName] = {
  	resourcesNeeded:resourcesNeeded,
  	resourcesRecieved:{

  	},
  	results:JSON.parse(JSON.stringify(results)),
		multiplier:1
	}
	data.machinePriority.push(materialName)

}
const addSpaceMachine = (materialName,resourcesNeeded,results) => {
	data.spaceMachineStates[materialName] = {
  	resourcesNeeded:resourcesNeeded,
  	resourcesRecieved:{

  	},
  	results:JSON.parse(JSON.stringify(results)),
		multiplier:1
	}
	data.spaceMachinePriority.push(materialName)
}
const addSpaceMineMachine = (materialName,resourcesNeeded,results) => {
	data.spaceMineMachineStates[materialName] = {
  	resourcesNeeded:resourcesNeeded,
  	resourcesRecieved:{

  	},
  	results:JSON.parse(JSON.stringify(results)),
		multiplier:1
	}
	data.spaceMineMachinePriority.push(materialName)
}
const addFileConstructor = (name, sname, content, type) => {
	data.files.push({
		screenName: sname,
		fileID: name,
		type: type
	})
	data.fileContents[name] = content
}
const construct = () => {
	//Init Resources
	(()=>{
		new Res('giftGod', 'Gift of God')
			.setMachine({},{})
			.finalize()
		//nonMetals
		new Res('wood', 'Wood')
			.configure('storage', 50)
			.isCargo(1,1)
			.isTransportable(1)
			.setTradeable(10,1,1000)
			.hasCSS({'color':'saddlebrown'})
			.finalize()
		new Res('stone', 'Stone')
			.configure('storage', 200)
			.hasCSS({'color':'grey'})
			.isCargo(1,2)
			.setTradeable(20,1,10000)
			.isTransportable(1)
			.finalize()
		new Res('coal', 'Coal')
			.configure('storage', 400)
			.isCargo(3,0.1)
			.isTransportable(1)
			.setTradeable(20,1,10000)
			.finalize()
		//metals
		new Res('iron', 'Iron')
			.configure('storage', 60)
			.isTransportable(10)
			.isCargo(2,10)
			.setTradeable(30,10,10000)
			.hasFluidForm('moltenIron','Molten Iron',1)
			.hasCSS({'color':'rosybrown'})
			.finalize()
		new Res('ironOre', 'Iron Ore')
			.configure('storage', 600)
			.isOreOf('iron')
			.isTransportable(10)
			.hasCSS({'color':'rosybrown'})
			.isCargo(1,10)
			.finalize()
		new Res('copper', 'Copper')
			.configure('storage', 60)
			.hasCSS({'color':'brown'})
			.setTradeable(30,10,10000)
			.isCargo(2,10)
			.isTransportable(10)
			.hasFluidForm('moltenCopper','Molten Copper',1)
			.finalize()
		new Res('copperOre', 'Copper Ore')
			.configure('storage', 600)
			.isTransportable(10)
			.hasCSS({'color':'brown'})
			.isOreOf('copper')
			.isCargo(1,10)
			.finalize()
		new Res('titanium', 'Titanium')
			.configure('storage', 10)
			.setTradeable(25,50,50000)
			.isTransportable(20)
			.hasCSS({'color':'darkgrey'})
			.isCargo(3,50)
			.hasFluidForm('moltenTitanium','Molten Titanium',1)
			.finalize()
		new Res('titaniumOre', 'Titanium Ore')
			.configure('storage', 100)
			.hasCSS({'color':'darkgrey'})
			.isOreOf('titanium')
			.isTransportable(20)
			.isCargo(1,10)
			.finalize()
		new Res('tungsten', 'Tungsten')
			.configure('storage', 5)
			.setTradeable(10,100,50000)
			.hasCSS({'color':'green'})
			.isCargo(3,50)
			.isTransportable(30)
			.hasFluidForm('moltenTungsten','Molten Tungsten',1)
			.finalize()
		new Res('tungstenOre', 'Tungsten Ore')
			.configure('storage', 50)
			.hasCSS({'color':'green'})
			.isOreOf('tungsten')
			.isTransportable(30)
			.isCargo(1,10)
			.finalize()
		new Res('gold', 'Gold')
			.configure('storage', 1)
			.hasCSS({'color':'gold'})
			.isCargo(1000,10000)
			.isTransportable(10000000000)
			.hasFluidForm('moltenGold','Molten Gold',1)
			.finalize()
		new Res('goldOre', 'Gold Ore')
			.configure('storage', 10)
			.hasCSS({'color':'gold'})
			.isTransportable(1000000000)
			.isOreOf('gold')
			.isCargo(100,1000)
			.finalize()
		new Res('carbonNanotubes', 'Carbon Nanotubes')
			.configure('storage', 500000000)
			.hasCSS({'color':'grey'})
			.isTransportable(0.001)
			.finalize()
		new Res('nanobots', 'Nanobots')
			.configure('storage', 500000000)
			.hasCSS({'color':'grey'})
			.isTransportable(0.0001)
			.finalize()
		new Res('compressedIron', 'Compressed Iron')
			.configure('storage', 0)
			.isCargo(4,500)
			.isTransportable(100)
			.setTradeable(35,100,25000)
			.finalize()
		new Res('steel', 'Steel')
			.configure('storage', 10)
			.isCargo(5,5)
			.setTradeable(35,40,100000)
			.isTransportable(10)
			.hasFluidForm('moltenSteel','Molten Steel',5)
			.hasCSS({'color':'lightgrey'})
			.finalize()
		new Res('diomine', 'Diomine')
			//Not the urza's legacy one.
			.hasFluidForm('moltenDiomine','Molten Diomine',1)
			.hasCSS({'color':'rgba(200,200,200,1)'})
			.setTradeable(1,100,1000)
			.finalize()
		new Res('duranium', 'Duranium')
			.configure('storage', 100)
			.isCargo(2,100)
			.setTradeable(5,50,100000)
			.isTransportable(50)
			.hasCSS({'color':'MediumAquaMarine'})
			.hasFluidForm('moltenDuranium','Molten Duranium',1)
			.fluidFormHasAlloyerRecipe({
				'moltenTitanium':75,
				'moltenIron':25,
				energy:10
			},100)
			.finalize()
		new Res('frostium', 'Frostium')
			.isCargo(2,20)
			.configure('storage', 100)
			.isTransportable(100)
			.hasFluidForm('moltenFrostium','Molten Frostium',10)
			.hasCSS({'color':'lightblue'})
			.fluidFormHasAlloyerRecipe({
				water:75,
				'moltenSteel':5,
				energy:50
			},10)
			.finalize()
			//3 pumps to 1 steel melters to 4 alloyers, coolers
		//crystals
		new Res('trishardicGeode', 'Trishardic Geode')
			.configure('storage', 10)
			.isTransportable(10000)
			.setTradeable(1,3000,3000)
			.hasCSS({'color':'lime'})
			.isUnholy()
			.smeltsInto(1000000,{
				'ruby':1,
				'emerald':1,
				'aerome':1,
			},1000)
			.finalize()
		new Res('carbon', 'Carbon')
			.configure('storage', 100000000)
			.isTransportable(0.001)
			.hasCSS({'color':'grey'})
			.setTradeable(5,1,100000)
			.finalize()
		new Res('ruby', 'Ruby')
			.configure('storage', 10)
			.isTransportable(10000)
			.hasCSS({'color':'red'})
			.setTradeable(1,1000,1000)
			.finalize()
		new Res('aerome', 'Aerome')
			.configure('storage', 10)
			.isTransportable(10000)
			.setTradeable(1,1000,1000)
			.hasCSS({'color':'black','text-shadow':'#f0ff25 0px 0px 2px'})
			.finalize()
		new Res('emerald', 'Emerald')
			.configure('storage', 10)
			.isTransportable(10000)
			.hasCSS({'color':'lime'})
			.setTradeable(1,1000,1000)
			.finalize()
		new Res('pyrome', 'Pyrome')
			.configure('storage', 10)
			.isTransportable(10000)
			.setTradeable(0,10000,100)
			.hasCSS({'color':'orange','text-shadow':'black 0px 0px 4px'})
			.finalize()
		new Res('ice', 'Ice')
			.configure('storage', 1000)
			.isCargo(8,1)
			.setTradeable(5, 1,100000)
			.isTransportable(1)
			.hasFluidForm('water','Water',1)
			.hasCSS({'color':'lightblue'})
			.finalize()
		//gasses
		new Res('fire', 'Fire')
			.configure('conversion', {
				'smoke': 0.001
			})
			.hasCSS({'color':'orange'})
			.isSpaceLocked()
			.isBuildable()
			.setMachine({
				'boilingWater':0.1
			},{
				'steam':0.1
			})
			.configure('buildName','Light a fire')
			.finalize()
		//energy
		new Res('energy', 'Energy')
			.configure('storage', 200)
			.finalize()
		new Res('frostiumEnergy', 'Frostium Energy')
			.configure('storage',0)
			.hasCSS({'color':'lightblue','text-shadow':'0px 0px 2px blue'})
			.finalize()
		new Res('flintAndSteel', 'Flint and Steel')
			.configure('storage', 1)
			.finalize()
		//arcanity
		new Res('shadows', 'Shadows')
			.hasCSS({'text-shadow':'0px 0px 2px black'})
			.isTransportable(10000)
			.configure('storage',10)
			.finalize()
		//components
		new Res('wirelessEnergyTransferer', 'Wireless Energy Transferer')
			.isBuildable()
			.hasCSS({'text-shadow':'0px 0px 2px black'})
			.configure('buildName','Infuse frostium with a shadow to make a Wireless Energy Transferer')
			.finalize()
		new Res('matterTransporter', 'Matter Transporter')
			.isBuildable()
			.configure('buildName','Create a Matter Transporter to beam matter instantaneously')
			.finalize()
		new Res('aeromineGlass', 'Aeromine Glass')
			.configure('storage',100)
			.isSmeltable(100000,{
				'aerome':10,
				'diomine':10
			},10)
			.setTradeable(0.5,100,10000)
			.hasCSS({'color':'black','text-shadow':'#f0ff25 0px 0px 2px'})
			.finalize()
		new Res('rubyLaserLens', 'Ruby Laser Lens')
			.configure('storage',10)
			.isSmeltable(100000,{
				'ruby':100,
				'steel':100,
				'aeromineGlass':10
			},1000)
			.hasCSS({'color':'red'})
			.setTradeable(0.5,100,10000)
			.finalize()
		new Res('emeraldLaserLens', 'Emerald Laser Lens')
			.configure('storage',10)
			.isSmeltable(100000,{
				'emerald':100,
				'steel':100,
				'aeromineGlass':10
			},1000)
			.hasCSS({'color':'lime'})
			.setTradeable(0.5,100,10000)
			.finalize()
		new Res('temperedPyrome', 'Tempered Pyrome')
			.configure('storage',10)
			.isSmeltable(1000000,{
				'pyrome':1,
				'diomine':66,
				'duranium':666,
				'steel':666,
			},666)
			.isTransportable(20000)
			.hasCSS({'color':'orange','text-shadow':'black 0px 0px 1px'})
			.finalize()
		new Res('depletedPyrome', 'Depleted Pyrome')
			.configure('storage',10)
			.isTransportable(2000)
			.hasCSS({'color':'orange','text-shadow':'black 0px 0px 4px'})
			.finalize()
		//rockets
		new Res('woodenRocket', 'Wooden Rocket')
			.isRocket()
			.finalize()
		new Res('coalRocket', 'Coal Rocket')
			.isRocket()
			.finalize()
		new Res('stoneRocket', 'Stone Rocket')
			.isRocket()
			.finalize()
		new Res('metallicRocket', 'Metallic Rocket')
			.isRocket()
			.finalize()
		new Res('rareMetallicRocket', 'Rare Metals Rocket')
			.isRocket()
			.finalize()
		new Res('steelRocket', 'Steel Rocket')
			.isRocket()
			.finalize()
		new Res('duraniumRocket', 'Duranium Rocket')
			.isRocket()
			.finalize()
		new Res('frostiumRocket', 'Frostium Rocket')
			.isRocket()
			.finalize()
		new Res('leoIII', 'LEO III')
			.isRocket()
			.finalize()
		new Res('cargoRocket', 'Cargo Rocket')
			.isRocket()
			.finalize()
		//rocket parts
		new Res('rocketConstructionFacility', 'Rocket Construction Facility')
			.configure('buildName','Create the machinery to make custom space craft.')
			.configure("locked",true)
			.setUnique()
			.isBuildable()
			.finalize()
		new Res('basicHull', 'Basic Hull')
			.isRocketPart('Protective')
			.finalize()
		new Res('heatResistantHull', 'Heat Resistant Hull')
			.isRocketPart('Protective')
			.hasPrerequisites(['basicHull'])
			.finalize()
		new Res('strongHull', 'Strong Hull')
			.isRocketPart('Protective')
			.hasPrerequisites(['heatResistantHull'])
			.finalize()
		new Res('forcefieldGenerator', 'Forcefield Generator')
			.isRocketPart('Protective')
			.hasPrerequisites(['strongHull'])
			.finalize()
		new Res('basicCannon', 'Basic Cannon')
			.isRocketPart('Weapon')
			.finalize()
		new Res('advancedCannon', 'Advanced Cannon')
			.isRocketPart('Weapon')
			.hasPrerequisites(['basicCannon'])
			.finalize()
		new Res('blazingCannon', 'Blazing Cannon')
			.isRocketPart('Weapon')
			.hasPrerequisites(['advancedCannon','focusedLaser'])
			.finalize()
		new Res('phasingTurret', 'Phasing Turret')
			.isRocketPart('Weapon')
			.hasPrerequisites(['advancedCannon','focusedLaser'])
			.finalize()
		new Res('basicLaser', 'Basic Laser')
			.isRocketPart('Weapon')
			.hasPrerequisites(['basicCannon'])
			.finalize()
		new Res('focusedLaser', 'Focused Laser')
			.isRocketPart('Weapon')
			.hasPrerequisites(['basicLaser'])
			.finalize()
		new Res('basicRadar', 'Basic Radar')
			.isRocketPart('Radar')
			.finalize()
		new Res('advancedRadar', 'Advanced Radar')
			.isRocketPart('Radar')
			.hasPrerequisites(['basicRadar'])
			.finalize()
		new Res('detailedRadar', 'Detailed Radar')
			.isRocketPart('Radar')
			.hasPrerequisites(['advancedRadar'])
			.finalize()
		new Res('basicEngine', 'Basic Engine')
			.isRocketPart('Engine')
			.finalize()
		new Res('advancedThruster', 'Advanced Thruster')
			.isRocketPart('Engine')
			.hasPrerequisites(['basicEngine'])
			.finalize()
		new Res('hyperdrive', 'Hyperdrive')
			.isRocketPart('Engine')
			.hasPrerequisites(['advancedThruster'])
			.finalize()
		new Res('teleporterStation', 'Teleporter Station')
			.isRocketPart('Engine')
			.hasPrerequisites(['advancedThruster'])
			.finalize()
		new Res('basicRepairSuits', 'Basic Repair Suits')
			.isRocketPart('Repair')
			.finalize()
		new Res('advancedRepairSuits', 'Advanced Repair Suits')
			.isRocketPart('Repair')
			.hasPrerequisites(['basicRepairSuits'])
			.finalize()
		new Res('automaticRepairRobots', 'Automatic Repair Robots')
			.isRocketPart('Repair')
			.hasPrerequisites(['basicRepairSuits'])
			.finalize()
		//space ships
		new Res('sunMiner', 'Sun Miner')
			.isBuildable()
			.configure('locked',true)
			.isSpaceRocket('Mining')
			.isSpaceLocked()
			.setMachine({
				energy:1000000,
			},{
				pyrome:1,
			})
			.configure('buildName',"Build a spaceship to mine pyrome, a metal only found in the core of stars.")
			.finalize()
		new Res('hypersonicShuttle', 'Hypersonic Shuttle')
			.isBuildable()
			.isSpaceRocket('Mining')
			.configure('locked',true)
			.isSpaceLocked()
			.configure('buildName',"Build a hypersonic shuttle, which can travel faster than sound in a vacuum.")
			.finalize()
		new Res('basicTankShip', 'Basic Tank Ship')
			.isBuildable()
			.isSpaceRocket('Combat Tank')
			.configure('locked',true)
			.isSpaceLocked()
			.finalize()
		new Res('sturdyTankShip', 'Sturdy Tank Ship')
			.isBuildable()
			.hasPrerequisites(['basicTankShip'])
			.isSpaceRocket('Combat Tank')
			.configure('locked',true)
			.isSpaceLocked()
			.finalize()
		new Res('forcefieldTankShip', 'Forcefield Tank Ship')
			.isBuildable()
			.hasPrerequisites(['sturdyTankShip'])
			.isSpaceRocket('Combat Tank')
			.configure('locked',true)
			.isSpaceLocked()
			.finalize()
		new Res('basicSniperShip', 'Basic Sniper Ship')
			.isBuildable()
			.isSpaceRocket('Combat Ranged')
			.configure('locked',true)
			.isSpaceLocked()
			.finalize()
		new Res('advancedSniperShip', 'Advanced Sniper Ship')
			.isBuildable()
			.hasPrerequisites(['basicSniperShip'])
			.isSpaceRocket('Combat Ranged')
			.configure('locked',true)
			.isSpaceLocked()
			.finalize()
		new Res('directSniperShip', 'Direct Sniper Ship')
			.isBuildable()
			.hasPrerequisites(['advancedSniperShip'])
			.isSpaceRocket('Combat Ranged')
			.configure('locked',true)
			.isSpaceLocked()
			.finalize()
		new Res('basicSupportShip', 'Basic Support Ship')
			.isBuildable()
			.isSpaceRocket('Combat Support')
			.configure('locked',true)
			.isSpaceLocked()
			.finalize()
		new Res('advancedSupportShip', 'Advanced Support Ship')
			.isBuildable()
			.hasPrerequisites(['basicSupportShip'])
			.isSpaceRocket('Combat Support')
			.configure('locked',true)
			.isSpaceLocked()
			.finalize()
		new Res('teleporterSupportShip', 'Teleporter Support Ship')
			.isBuildable()
			.hasPrerequisites(['advancedSupportShip'])
			.isSpaceRocket('Combat Support')
			.configure('locked',true)
			.isSpaceLocked()
			.finalize()

		//storage buildings
		new Res('barns', 'Barns')
			.configure('buildName','Complete a barn')
			.isBuildable()
			.configure('locked', true)
			.isSpaceLocked()
			.finalize()
		new Res('industrialWarehouse', 'Industrial Warehouse')
			.configure('buildName','Maintain a monolithic industrial warehouse')
			.isSpaceLocked()
			.isBuildable()
			.finalize()
		new Res('shadowStorageFacility', 'Shadow Storage Facility')
			.configure('buildName','Create a facility to store shadows on Earth.')
			.isSpaceLocked()
			.isBuildable()
			.configure('locked',true)
			.finalize()
		new Res('pocketStorageDimension', 'Pocket Storage Dimension')
			.configure('buildName','Use the mystical properties of shadows to store resources')
			.isSpaceLocked()
			.isBuildable()
			.finalize()
		//space buildings
		new Res('satellite', 'Satellite')
			.isBuildable()
			.configure('locked',true)
			.configure('buildName','Make a satellite')
			.finalize()
		//frostium technology
		new Res('frostiumCore', 'Frostium Core')
			.isBuildable()
			.hasCSS({'color':'lightblue','text-shadow':'0px 0px 2px blue'})
			.configure('locked',true)
			.configure('buildName','Shape a Frostium core')
			.finalize()
		new Res('frostiumBattery', 'Frostium Battery')
			.isBuildable()
			.hasCSS({'color':'lightblue','text-shadow':'0px 0px 2px blue'})
			.configure('buildName','Put a shell around a Frostium core')
			.setMachine({},{
				'frostiumEnergy':1,
			})
			.finalize()
		new Res('shadowCollector', 'Shadow Collector')
			.isBuildable()
			.hasCSS({'text-shadow':'0px 0px 2px black'})
			.configure('buildName','Construct a Shadow Collector.')
			.addInactiveState()
			.isSpaceLocked()
			.configure('locked',true)
			.setMachine({
				'frostiumEnergy':10
			},{
				'shadows':0.001,
			})
			.finalize()
		new Res('frostiumFurnace', 'Frostium Furnace')
			.configure('locked',true)
			.configure('buildName','Make a Frostium Furnace')
			.isBuildable()
			.hasCSS({'color':'lightblue','text-shadow':'0px 0px 2px blue'})
			.finalize()
		new Res('planetGrinder', 'Planet Grinder')
			.isBuildable()
			.hasCSS({'color':'red','text-shadow':'0px 0px 2px red'})
			.configure('buildName','Make a Planet Grinder.')
			.addInactiveState()
			.isSpaceLocked()
			.setMineMachine({
				'frostiumEnergy':10
			},{
				'copperOre':1000000,
				'stone':10000000,
				'ironOre':1000000,
				'tungstenOre':10000,
				'titaniumOre':50000,
				'wood':10000
			})
			.finalize()
		//pyrome technology
		new Res('pyromeMaterializer', 'Pyrome Materializer')
			.isBuildable()
			.configure('locked', true)
			.hasCSS({'color':'orange','text-shadow':'black 0px 0px 1px'})
			.configure('buildName','Use the energy within pyrome to create a Pyrome materializer.')
			.setMachine({
				pyromeMaterializer:0.1,
			},{
				frostium:100000000,
				iron:1000000000,
				copper:1000000000,
				depletedPyrome:1000,
				duranium:100000000,
				steel:1000000000
			})
			.finalize()
		new Res('pyromeInfuser','Pyrome Infuser')
			.isBuildable()
			.configure('locked', true)
			.configure('buildName','Infused depleted pyrome with energy.')
			.setMachine({
				depletedPyrome:0.1,
				energy:100000000000
			},{
				temperedPyrome:0.1,
			})
			.addInactiveState()
			.finalize()
		//fluids
		new Res('cooler', 'Cooler')
			.isBuildable()
			.configure('locked', true)
			.configure('buildName','Melt cooled metal to form a cooler')
			.finalize()
		new Res('melter', 'Melter')
			.isBuildable()
			.configure('locked', true)
			.configure('buildName','Cool molten metal to form a melter')
			.finalize()
		new Res('alloyer', 'Alloyer')
			.isBuildable()
			.configure('locked', true)
			.configure('buildName','Obtain an alloyer')
			.finalize()
		new Res('pump', 'Pump')
			.isBuildable()
			.configure('buildName','Assemble a pump to take water from the river.')
			.setMachine({
				energy:10
			},{
				water:100
			})
			.addInactiveState()
			.isSpaceLocked()
			.finalize()
		//utility buildings
		new Res('bucket', 'Bucket')
			.configure('locked',true)
			.isSpaceLocked()
			.isBuildable()
			.configure('buildName','Make a bucket')
			.finalize()
		new Res('bucketOfWater', 'Bucket of Water')
			.configure('buildName','Fill a bucket with water')
			.isBuildable()
			.isSpaceLocked()
			.finalize()
		new Res('incendinaryPile', 'Incendinary Pile')
			.configure('buildName','Dump a bunch of wood in a pile to burn.')
			.isBuildable()
			.isSpaceLocked()
			.configure('locked', true)
			.setMachine({
				'incendinaryPile':0.04
			},{
				fire:1.1
			})
			.finalize()
		new Res('coalIncendinaryPile', 'Coal Incendinary Pile')
			.configure('buildName','Dump a bunch of coal in a pile to burn.')
			.isBuildable()
			.isSpaceLocked()
			.configure('locked', true)
			.setMachine({
				'coalIncendinaryPile':0.32
			},{
				fire:16
			})
			.finalize()
		new Res('computerDisk', 'Computer disk')
			.configure('storage',Infinity)
			.finalize()
		new Res('computer', 'Computers')
			.configure('buildName','Forge a computer')
			.isBuildable()
			.setUnique()
			.configure('storage',1)
			.isSpaceLocked()
			.finalize()
		//resource buildings
		new Res('stoneFurnace', 'Stone Furnace')
			.configure('buildName','Build a stone furnace')
			.addInactiveState()
			.isBuildable()
			.isSpaceLocked()
			.setMachine({
				fire:0.01,
				stone:0.1
			},{
				iron:0.02,
				copper:0.02,
			})
			.finalize()
		new Res('industrialSmelter', 'Industrial Smelter')
			.configure('buildName','Build an Industrial Smelter')
			.isBuildable()
			.isSpaceLocked()
			.configure("locked",true)
			.finalize()
		new Res('stoneMiner', 'Stone Miner')
			.configure('buildName','Throw together a stone miner to mine stone')
			.isBuildable()
			.addInactiveState()
			.isSpaceLocked()
			.setMachine({
				energy:0.1
			},{
				stone:0.05,
			})
			.finalize()
		new Res('robot', 'Robot')
			.configure('buildName','Manufacture a robot')
			.isBuildable()
			.isSpaceLocked()
			.configure('locked', true)
			.finalize()
		new Res('assembler', 'Assembler')
			.configure('buildName','Assemble an assembler')
			.isBuildable()
			.finalize()
		new Res('droid', 'Droid')
			.setJobOf('robot')
			.isBuildable()
			.finalize()
		new Res('compressor', 'Compressor')
			.configure('buildName','Assemble a compressor')
			.configure('locked',true)
			.addInactiveState()
			.isBuildable()
			.setMachine({
				iron:0.5,
				energy:1
			},{
				'compressedIron':0.01
			})
			.finalize()
		new Res('pressurizer', 'Pressurizer')
			.isBuildable()
			.addInactiveState()
			.configure('locked',true)
			.isSpaceLocked()
			.setMachine({
				coal:10,
				iron:10,
				energy:30,
			},{
				steel:0.1,
			})
			.configure('buildName','Make a Pressurizer')
			.finalize()
		new Res('spacePressurizer', 'Pressurizer')
			.isBuildable()
			.configure('locked',true)
			.isSpaceLocked()
			.addInactiveState()
			.setMachine({
				carbon:1000,
				iron:10,
				energy:30,
			},{
				steel:0.1,
			})
			.configure('buildName','Make an iron-carbon Pressurizer')
			.finalize()
		new Res('asteroidMiner', 'Asteroid Miner')
			.isBuildable()
			.configure('buildName','Create an Asteroid Miner to get precious resources from nearby asteroids')
			.configure('locked',true)
			.addInactiveState()
			.setMineMachine({
				'energy':1000
			},{
				'tungsten':1000,
				'titanium':2000,
				'iron':10000,
				'copper':10000,
				'stone':30000,
				'ice':2000,
				'carbon':5000,
				'moltenDiomine':10,
				'trishardicGeode':0.01,
			})
			.finalize()
		new Res('carbonFactory', 'Carbon Factory')
			.configure('buildName','Build a Carbon Factory')
			.isBuildable()
			.isSpaceLocked()
			.configure("locked",true)
			.setMachine({
				'energy':1000000,
				'carbon':1000000,
			},{
				'carbonNanotubes':10000,
			})
			.finalize()
		new Res('nanobotFactory', 'Nanobot Factory')
			.configure('buildName','Build a Nanobot Factory')
			.isBuildable()
			.isSpaceLocked()
			.configure("locked",true)
			.setMachine({
				'energy':100000,
				'carbonNanotubes':1000,
				'steel':100000,
				'titanium':100000,
			},{
				'nanobots':100,
			})
			.finalize()
		//gasses deprecated
		new Res('smoke', 'Smoke')
			.configure('storage', Infinity)
			.finalize()
		new Res('boilingWater', 'Boiling Water')
			.isBuildable()
			.finalize()
		new Res('steam', 'Steam')
			.configure('storage', Infinity)
			.finalize()
		//energy producers
		new Res('steamEngine', 'Steam Engine')
			.configure('buildName','Smelt a steam engine')
			.isBuildable()
			.isSpaceLocked()
			.addInactiveState()
			.setMachine({
				steam:0.5
			},{
				energy:1
			})
			.finalize()
		new Res('fireStarter', 'Fire Starter')
			.configure('buildName','Slap together a fire starter')
			.isBuildable()
			.isSpaceLocked()
			.addInactiveState()
			.setMachine({
				energy:1,
				coal:0.1,
			},{
				fire:0.1,
			})
			.finalize()
		new Res('solarPanel', 'Solar Panel')
			.configure('buildName','Discover the joys of solar panels.')
			.isBuildable()
			.setMachine({},{
				energy:0.2
			})
			.setTradeable(0,1000,100)
			.configureSpaceMachine({multiplier:2})
			.finalize()
		new Res('solarPanelSatellite', 'Solar Panel Satellite')
			.isBuildable()
			.configure('buildName','Make a satellite to charge your space station.')
			.configure('locked',true)
			.setMachine({},{
				'energy':50,
			})
			.finalize()
		//special
		new Res('solarPanelSatelliteCluster', 'Solar Panel Satellite Cluster')
			.isBuildable()
			.configure('buildName','Arrange satellites to catch as much sunlight as possible')
			.configure('locked',true)
			.setMachine({},{
				'energy':100000,
			})
			.finalize()
		new Res('solarPanelSatelliteGroup', 'Solar Panel Satellite Cluster')
			.isBuildable()
			.configure('buildName','Arrange satellites to almost surround the sun')
			.configure('locked',true)
			.setMachine({},{
				'energy':1500000000,
			})
			.finalize()
		new Res('dysonSwarm', 'Dyson Swarm')
			.isBuildable()
			.configure('buildName','Use solar panels to surround the sun.')
			.configure('locked',true)
			.setMachine({},{
				'energy':450000000000000,
			})
			.finalize()
		new Res('dysonSphere', 'Dyson Sphere')
			.isBuildable()
			.configure('buildName','Use Build a megastructure to encapsulate the sun.')
			.configure('locked',true)
			.isSpaceLocked()
			.setMachine({},{
				'energy':9000000000000000000000,
			})
			.finalize()
		//special
		new Res('spit', 'Spit')
			.isBuildable()
			.isSpaceLocked()
			.configure('buildName','Create a spit')
			.configure('storage', 1)
			.isSpaceLocked()
			.setUnique()
			.finalize()
		new Res('adaptationChamber', 'Adaptation Chamber')
			.isBuildable()
			.isSpaceLocked()
			.setUnique()
			.configure('storage', 1)
			.configure('buildName','Erect an adaptation chamber')
			.finalize()
		new Res('rocketLauncher', 'Rocket Launcher')
			.isBuildable()
			.isSpaceLocked()
			.setUnique()
			.configure('storage', 1)
			.configure('buildName','Construct a rocket launcher')
			.finalize()
		//things that just literally never show up in the actual resTable, and are part of a category that never shows up so the developer gave it a stupid name.
		new Res('galacticCredits', 'Galatic Credits')
			.configure('storage',Infinity)
			.setTradeable(10,1,100000)
			.finalize()
		new Res('fluidStorage',confusedText)
			.configure('storage',0)
			.finalize()
	})()
	if(godMode){
		data.resTable['steam'].amount=199
		data.resTable['giftGod'].amount=1
		data.spaceResCounts['giftGod'].amount=1
		data.resTable['fire'].amount=5000000
		data.computerOpacity = 0.9
		data.tabs = [{"displayText":"Main","tab":"main"},{"displayText":"Saves","tab":"saving"},{"displayText":"Statistics","tab":"statistics"},{"displayText":"Rocket Launching","tab":"rocketSilo"},{"displayText":"Adaptations","tab":"adaptation"},{"displayText":"Computer","tab":"computer"},{"displayText":"Cargo Bay","tab":"cargoBay"},{"displayText":"Space","tab":"space"},{"displayText":"Space Jobs","tab":"spaceJobs"},{"displayText":"Rocket Part Builder","tab":"spaceRocketPartBuilder"},{"displayText":"Rocket Builder","tab":"spaceRocketBuilder"},{"displayText":"Trading","tab":"tradeSpace"}]
	}
	//Init stocks
	for(let i=0;i<10;i++){
		addStock(stockCreator(data.stockNamePool))
	}
	//Init tradeHub
	data.tradeHub = new TradeHub(data)
	//Init Checks
	addCheck('spitMade')
	addCheck('bucketWaterMade')
	addCheck('fireMade')
	addCheck('flintUnlocked')
	addCheck('hangBucketUnlocked')
	addCheck('steamExplore')
	addCheck('notFrostiumCoreMade')
	addCheck('notFrostiumBatteryMade')
	addCheck('notPlanetGrinderMade')
	addCheck('notFrostiumFurnaceMade')
	addCheck('notRocketLauncherMade')
	addCheck('notSpacePanelMade')
	addCheck('notAsteroidMinerMade')
	data.checks['notFrostiumCoreMade']=true
	data.checks['notAsteroidMinerMade']=true
	data.checks['notRocketLauncherMade']=true
	data.checks['notPlanetGrinderMade']=true
	data.checks['notFrostiumBatteryMade']=true
	data.checks['notFrostiumFurnaceMade']=true
	data.checks['notSpacePanelMade']=true
	//Init adaptations
	//misc
	addAdaptation(
		[],(app)=>{
		app.machineStates['incendinaryPile'].results.fire*=1.5
	},'Explosive Techniques','How to blow things up better: A guide.',{
		'wood':200,
		'coal':20
	})
	addAdaptation(
		[(app)=>{return app.resTable['coal'].amount>0&&app.completedAdaptations.includes('Explosive Techniques')}],(app)=>{
		app.resTable['coalIncendinaryPile'].locked = false
	},'Advanced Explosive Techniques','How to blow more things up betterer: A guide.',{
		'wood':500,
		'coal':200
	})
	addAdaptation(
		[],(app)=>{
		App.addTab('Produc. Stats','productionStatistics')
	},'Production Statistics','Unleash your inner control freak.',{
		'iron':1000,
		'copper':1000
	})
	addAdaptation(
		[(app)=>{return app.completedAdaptations.includes('Recursion')}],(app)=>{
	},'Recursion','Unlocks the recursion adaptation',{
		'gold':-1000,
	})
	//iron handling
	addAdaptation(
		[],(app)=>{
		app.resTable['compressor'].locked = false
		app.addBuilding('compressor')
	},'Iron compressing','True uselessness.',{
		'iron':100,
		'wood':50
	})
	addAdaptation(
		[
		(app)=>{
			return app.resTable['compressor'].amount>=10
		}
	],(app)=>{
		app.resTable['pressurizer'].locked = false
		app.addBuilding('pressurizer')
	},'Iron compressing 2','Truer uselessness.',{
		'stone':10000,
		'copper':10000,
		'compressedIron':1000,
		'titanium':5000
	})
	addAdaptation(
		[
		(app)=>{
			return app.spaceResCounts['trishardicGeode'].amount>0
		}
	],(app)=>{
		app.resTable['industrialSmelter'].spaceLocked = false
		app.resTable['industrialSmelter'].locked = false
	},'Advanced gem working','To give your planets that extra sparkling touch',{
		'iron':100000,
		'duranium':100000
	},true)
	addAdaptation(
		[
		(app)=>{
			return app.spaceResCounts['carbon'].amount>0
		}
	],(app)=>{
		app.resTable['spacePressurizer'].spaceLocked = false
	},'Space pressurizers','It\'s actually pretty useful.',{
		'iron':100000,
		'carbon':100000
	},true)
	addAdaptation(
		[
		(app)=>{
			return app.spaceResCounts['carbonNanotubes'].amount>0
		}
	],(app)=>{
	},'Tera structure engineering.','No, not terra structures.',{
		'tungsten':100000000000,
		'frostium':10000000000,
		'carbonNanotubes':1000000000000,
	},true)
	//furnaces
	addAdaptation(
		[
		(app)=>{
			return app.jobCount('stoneFurnace')>=10
		}
	],(app)=>{
		app.machineStates['stoneFurnace'].resourcesNeeded.stone*=0.8
	},'Efficient furnaces','Very useful',{
		'wood':100,
		'stone':100
	})
	addAdaptation(
		[
		(app)=>{
			return app.jobCount('stoneFurnace')>=100&&app.completedAdaptations.includes('Efficient Furnaces')
		}
	],(app)=>{
		app.machineStates['stoneFurnace'].resourcesNeeded.stone*=0.8
	},'Super efficient furnaces','Furnace stone consumption -20%',{
		'wood':1000,
		'stone':1000,
		'iron':100
	})
	addAdaptation(
		[
		(app)=>{
			return app.jobCount('stoneFurnace')>=1000&&app.completedAdaptations.includes('Super efficient furnaces')
		}
	],(app)=>{
		app.machineStates['stoneFurnace'].resourcesNeeded.stone*=0.7
	},'Super duper efficient furnaces','Furnace stone consumption -30%',{
		'titanium':1000,
		'stone':100000,
		'compressedIron':1000
	})
	addAdaptation(
		[
		(app)=>{
			return app.jobCount('stoneFurnace')>=10000&&app.completedAdaptations.includes('Super duper efficient furnaces')
		}
	],(app)=>{
		app.machineStates['stoneFurnace'].resourcesNeeded.stone*=0.5
	},'Most efficient furnaces','Furnace stone consumption -50%',{
		'tungsten':10000,
		'steel':1000,
	})
	addAdaptation(
		[
		(app)=>{
			return app.jobCount('stoneFurnace')>=20000&&app.completedAdaptations.includes('Most efficient furnaces')
		}
	],(app)=>{
		app.machineStates['stoneFurnace'].resourcesNeeded.stone*=0.25
	},'Even more efficient furnaces','I lied earlier.',{
		'tungsten':100000,
		'duranium':10000,
		'steel':1000,
	})
	addAdaptation(
		[
		(app)=>{
			return app.resTable['titanium'].amount>0
		}
	],(app)=>{
		app.$set(app.machineStates['stoneFurnace'].results,'titanium',0.0005)
	},'Titanium making furnaces','Furnace produce titanium',{
		'titanium':10000,
	})
	addAdaptation(
		[
		(app)=>{
			return app.resTable['tungsten'].amount>0&&app.completedAdaptations.includes('Titanium making furnaces')
		}
	],(app)=>{
		app.$set(app.machineStates['stoneFurnace'].results,'tungsten',0.00001)
	},'Tungsten making furnaces','Furnace produce tiny amounts of tungsten',{
		'tungsten':10000,
	})
	addAdaptation(
		[
		(app)=>{
			return app.resTable['gold'].amount>0&&app.completedAdaptations.includes('Tungsten making furnaces')
		}
	],(app)=>{
		app.$set(app.machineStates['stoneFurnace'].results,'gold',1e-30)
	},'Gold making furnaces','Furnace produce 1e-30 gold per tick (1 on a nonillion)',{
		'gold':10000,
	})
	//solar panels
	addAdaptation(
		[
		(app)=>{
			return app.resTable['solarPanel'].amount>=5
		}
	],(app)=>{
		app.machineStates['solarPanel'].results.energy*=1.5
		app.spaceMachineStates['solarPanel'].results.energy*=1.5
		app.spaceMachineStates['solarPanelSatellite'].results.energy*=1.5
		app.spaceMachineStates['solarPanelSatelliteCluster'].results.energy*=1.5
		app.spaceMachineStates['solarPanelSatelliteGroup'].results.energy*=1.5
		app.spaceMachineStates['dysonSwarm'].results.energy*=1.5
	},'Pholtovaic cells I','More powerful solar panels',{
		'iron':250,
		'copper':250
	})
	addAdaptation(
		[
		(app)=>{
			return app.resTable['solarPanel'].amount>=50&&app.completedAdaptations.includes('Pholtovaic cells I')
		}
	],(app)=>{
		app.machineStates['solarPanel'].results.energy*=1.75
		app.spaceMachineStates['solarPanel'].results.energy*=1.75
		app.spaceMachineStates['solarPanelSatellite'].results.energy*=1.75
		app.spaceMachineStates['solarPanelSatelliteCluster'].results.energy*=1.75
		app.spaceMachineStates['solarPanelSatelliteGroup'].results.energy*=1.75
		app.spaceMachineStates['dysonSwarm'].results.energy*=1.75
	},'Pholtovaic cells II','Even more powerful solar panels',{
		'iron':5000,
		'copper':5000,
		'compressedIron':100,
	})
	addAdaptation(
		[
		(app)=>{
			return app.resTable['solarPanel'].amount>=1000&&app.completedAdaptations.includes('Pholtovaic cells II')
		}
	],(app)=>{
		app.machineStates['solarPanel'].results.energy*=2
		app.spaceMachineStates['solarPanel'].results.energy*=2
		app.spaceMachineStates['solarPanelSatellite'].results.energy*=2
		app.spaceMachineStates['solarPanelSatelliteCluster'].results.energy*=2
		app.spaceMachineStates['solarPanelSatelliteGroup'].results.energy*=2
		app.spaceMachineStates['dysonSwarm'].results.energy*=2
	},'Pholtovaic cells III','Super powerful solar panels',{
		'iron':10000,
		'copper':10000,
		'compressedIron':5000,
		'tungsten':2000
	})
	addAdaptation(
		[
		(app)=>{
			return app.resTable['solarPanel'].amount>=10000&&app.completedAdaptations.includes('Pholtovaic cells III')
		}
	],(app)=>{
		app.machineStates['solarPanel'].results.energy*=2.25
		app.spaceMachineStates['solarPanel'].results.energy*=2.25
		app.spaceMachineStates['solarPanelSatellite'].results.energy*=2.25
		app.spaceMachineStates['solarPanelSatelliteCluster'].results.energy*=2.25
		app.spaceMachineStates['solarPanelSatelliteGroup'].results.energy*=2.25
		app.spaceMachineStates['dysonSwarm'].results.energy*=2.25
	},'Pholtovaic cells IV','Super-duper powerful solar panels',{
		'iron':500000,
		'copper':250000,
		'compressedIron':50000,
		'tungsten':20000,
		'steel':40000,
	})
	addAdaptation(
		[
		(app)=>{
			return app.resTable['solarPanel'].amount>=50000&&app.completedAdaptations.includes('Pholtovaic cells IV')
		}
	],(app)=>{
		app.machineStates['solarPanel'].results.energy*=2.5
		app.spaceMachineStates['solarPanel'].results.energy*=2.5
		app.spaceMachineStates['solarPanelSatellite'].results.energy*=2.5
		app.spaceMachineStates['solarPanelSatelliteCluster'].results.energy*=2.5
		app.spaceMachineStates['solarPanelSatelliteGroup'].results.energy*=2.5
		app.spaceMachineStates['dysonSwarm'].results.energy*=2.5
	},'Pholtovaic cells V','Incredibly powerful solar panels',{
		'iron':1000000,
		'copper':500000,
		'compressedIron':100000,
		'tungsten':200000,
		'steel':400000,
		'duranium':1000,
	})
	addAdaptation(
		[
		(app)=>{
			return app.resTable['solarPanel'].amount>=200000&&app.completedAdaptations.includes('Pholtovaic cells V')
		}
	],(app)=>{
		app.machineStates['solarPanel'].results.energy*=2.75
		app.spaceMachineStates['solarPanel'].results.energy*=2.75
		app.spaceMachineStates['solarPanelSatellite'].results.energy*=2.75
		app.spaceMachineStates['solarPanelSatelliteCluster'].results.energy*=2.75
		app.spaceMachineStates['solarPanelSatelliteGroup'].results.energy*=2.75
		app.spaceMachineStates['dysonSwarm'].results.energy*=2.75
	},'Pholtovaic cells VI','Ridiculously powerful solar panels',{
		'iron':50000000,
		'copper':25000000,
		'compressedIron':2500000,
		'tungsten':2500000,
		'steel':1000000,
		'duranium':10000,
	})
	addAdaptation(
		[
		(app)=>{
			return app.resTable['solarPanel'].amount>=1000000&&app.completedAdaptations.includes('Pholtovaic cells VI')
		}
	],(app)=>{
		app.machineStates['solarPanel'].results.energy*=3
		app.spaceMachineStates['solarPanel'].results.energy*=3
		app.spaceMachineStates['solarPanelSatellite'].results.energy*=3
		app.spaceMachineStates['solarPanelSatelliteCluster'].results.energy*=3
		app.spaceMachineStates['solarPanelSatelliteGroup'].results.energy*=3
		app.spaceMachineStates['dysonSwarm'].results.energy*=3
	},'Pholtovaic cells VII','Way too powerful solar panels',{
		'iron':50000000,
		'copper':50000000,
		'compressedIron':25000000,
		'tungsten':25000000,
		'steel':100000000,
		'duranium':100000,
		'frostium':10000
	})
	addAdaptation(
		[
		(app)=>{
			return app.resTable['solarPanel'].amount>=2000000&&app.completedAdaptations.includes('Pholtovaic cells VII')
		}
	],(app)=>{
		app.machineStates['solarPanel'].results.energy*=3.25
		app.spaceMachineStates['solarPanel'].results.energy*=3.25
		app.spaceMachineStates['solarPanelSatellite'].results.energy*=3.25
		app.spaceMachineStates['solarPanelSatelliteCluster'].results.energy*=3.25
		app.spaceMachineStates['solarPanelSatelliteGroup'].results.energy*=3.25
		app.spaceMachineStates['dysonSwarm'].results.energy*=3.25
	},'Pholtovaic cells VIII','Can anything be this powerful?',{
		'iron':2000000000,
		'copper':2000000000,
		'compressedIron':250000000,
		'tungsten':250000000,
		'steel':3000000000,
		'duranium':1000000,
		'frostium':1000000,
	})
	addAdaptation(
		[
		(app)=>{
			return app.resTable['solarPanel'].amount>=10000000&&app.completedAdaptations.includes('Pholtovaic cells VIII')
		}
	],(app)=>{
		app.machineStates['solarPanel'].results.energy*=3.5
		app.spaceMachineStates['solarPanel'].results.energy*=3.5
		app.spaceMachineStates['solarPanelSatellite'].results.energy*=3.5
		app.spaceMachineStates['solarPanelSatelliteCluster'].results.energy*=3.5
		app.spaceMachineStates['solarPanelSatelliteGroup'].results.energy*=3.5
		app.spaceMachineStates['dysonSwarm'].results.energy*=3.5
	},'Pholtovaic cells IX','...?',{
		'iron':20000000000,
		'copper':40000000000,
		'compressedIron':750000000,
		'tungsten':2500000000,
		'steel':6250000000,
		'duranium':25000000,
		'frostium':25000000
	})
	//robots
	addAdaptation(
		[
		(app)=>{
			return app.jobCount('robot')>=50
		}
	],(app)=>{
		app.multipliers['.robo']*=2
	},'Compressed iron robots','Equip robots with a compressed iron axe',{
		'compressedIron':100,
	})
	addAdaptation(
		[
		(app)=>{
			return app.jobCount('robot')>=500&&app.completedAdaptations.includes('Compressed iron robots')
		}
	],(app)=>{
		app.multipliers['.robo']*=1.75
	},'Titanium robots','Equip robots with a titanium axe',{
		'titanium':1000,
	})
	addAdaptation(
		[
		(app)=>{
			return app.jobCount('robot')>=10000&&app.completedAdaptations.includes('Titanium robots')
		}
	],(app)=>{
		app.multipliers['.robo']*=1.5
	},'Steel robots','Equip robots with a steel axe',{
		'steel':1000,
	})
	addAdaptation(
		[
		(app)=>{
			return app.jobCount('robot')>=40000&&app.completedAdaptations.includes('Steel robots')
		}
	],(app)=>{
		app.multipliers['.robo']*=1.25
	},'Tungsten robots','Equip robots with a tungsten axe',{
		'tungsten':30000,
	})
	addAdaptation(
		[
		(app)=>{
			return app.jobCount('robot')>=80000&&app.completedAdaptations.includes('Tungsten robots')
		}
	],(app)=>{
		app.multipliers['.robo']*=1.5
	},'Duranium robots','Equip robots with a duranium axe',{
		'duranium':5000,
	})
	addAdaptation(
		[
		(app)=>{
			return app.jobCount('robot')>=200000&&app.completedAdaptations.includes('Duranium robots')
		}
	],(app)=>{
		app.multipliers['.robo']*=1.75
	},'Frostium robots','Equip robots with a frostium axe',{
		'frostium':5000,
	})
	//miners
	addAdaptation(
		[
		(app)=>{
			return app.jobCount('robot')>=50
		}
	],(app)=>{
		app.multipliers['.mnr']*=2
	},'Compressed iron droids','Equip miner droids with a protective compressed iron coating',{
		'compressedIron':100,
	})
	addAdaptation(
		[
		(app)=>{
			return app.jobCount('robot')>=500&&app.completedAdaptations.includes('Compressed iron droids')
		}
	],(app)=>{
		app.multipliers['.mnr']*=1.75
		app.setMessage('Will I ever escape this planet?')
	},'Titanium droids','Equip droids with a titanium pickaxe',{
		'titanium':1000,
	})
	addAdaptation(
		[
		(app)=>{
			return app.jobCount('robot')>=10000&&app.completedAdaptations.includes('Titanium droids')
		}
	],(app)=>{
		app.multipliers['.mnr']*=1.5
		app.setMessage('Is my fate to become like the rest of The Dreamers?')
	},'Steel droids','Equip droids with a steel pickaxe',{
		'steel':1000,
	})
	addAdaptation(
		[
		(app)=>{
			return app.jobCount('robot')>=40000&&app.completedAdaptations.includes('Steel droids')
		}
	],(app)=>{
		app.multipliers['.robo']*=1.25
		app.setMessage('What can I do when I go back?\nPretend this all never happened?')
	},'Tungsten droids','Equip droids with a tungsten pickaxe',{
		'tungsten':30000,
	})
	addAdaptation(
		[
		(app)=>{
			return app.jobCount('robot')>=80000&&app.completedAdaptations.includes('Tungsten droids')
		}
	],(app)=>{
		app.multipliers['.mnr']*=1.5
		app.setMessage('I\'ve got to find a way to stand up to them.')
	},'Duranium droids','Equip droids with a duranium pickaxe',{
		'duranium':5000,
	})
	addAdaptation(
		[
		(app)=>{
			return app.jobCount('robot')>=200000&&app.completedAdaptations.includes('Duranium droids')
		}
	],(app)=>{
		app.multipliers['.mnr']*=1.75
		app.setMessage('I\'ve got to find a way to stop their tyranny.')
	},'Frostium droids','Equip droids with a frostium pickaxe',{
		'frostium':5000,
	})
	//fluids and alloys
	addAdaptation(
		[
		(app)=>{
			return app.resTable['tungsten'].amount>0
		}
	],(app)=>{
		app.resTable['melter'].locked = false
		app.addBuilding('melter')
	},'Fluid handling','Machinery to melt and alloy metal',{
		'tungsten':10000,
	})
	addAdaptation(
		[
		(app)=>{
			return app.resTable['frostium'].amount>0
		}
	],(app)=>{
		app.resTable['frostiumCore'].locked = false
		app.addBuilding('frostiumCore')
	},'Frostium machinery','Frostium infused machinery has benefits',{
		'tungsten':10000,
		'frostium':200,
		'duranium':500,
	})
	//shadows
	addAdaptation(
		[
		(app)=>{
			return app.spaceResCounts['frostium'].amount>=1000
		}
	],(app)=>{
		app.addSpaceBuilding('shadowCollector')
		app.addBuilding('shadowStorageFacility')
	},'Shadow collectors','Small wisps that float in the vast emptiness of space.',{
		'frostium':1000000,
	})

	//init files
	addExtension(['.mnr','Miner','droid',
	(app,number)=>{
	miner = new MinerDroid()
	return {'miner':{'digHole':()=>{
		miner.incHole(number,app)
	},
	'mineAtDepth':(depth)=>{
		miner.mineAtDepth(number,depth,app)
	},
	'mineResource':(res)=>{
		miner.mineRes(res,app,number)
	}}
	}}])
	addExtension(['.rbt','Robot','robot',
	(app,number)=>{
	robot = new Robot(app.grid)
	return {'robot':{'grid':robot.grid,'x':robot.x,'y':robot.y,
	'moveRight':()=>{
		robot.moveRight(app.grid)
	},
	'moveLeft':()=>{
		robot.moveLeft(app.grid)
	},
	'chopAdjacentSquares':()=>{
		robot.chopAdjacentSquares(app.grid,number)
	},
	'moveUp':()=>{
		robot.moveUp(app.grid)
	},
	'moveDown':()=>{
		robot.moveDown(app.grid)
	},
	'moveRandom':()=>{
		robot.moveRandom(app.grid)
	},
	'chopTree':(x,y)=>{
		robot.chopTree(x,y,app.grid,number)
	}}}}])
	addExtension(['.sasmblr','Space Assembler','assembler',
	(app,number)=>{
	assembler = new SpaceAssembler(app.spaceResCounts)
	return {'assembler':{'constructBuilding':(name,amount)=>{
		assembler.constructBuilding(app,name,amount,number)
	},
	'isBuildingBuyable':(name,amount)=>{
		return assembler.isBuildingBuyable(app,name,amount)
	},}}},true])
	addExtension(['.asmblr','Assembler','assembler',
	(app,number)=>{
	assembler = new Assembler(app.resTable)
	return {'assembler':{'constructBuilding':(name,amount)=>{
		assembler.constructBuilding(app,name,amount,number)
	},
	'isBuildingBuyable':(name,amount)=>{
		return assembler.isBuildingBuyable(app,name,amount)
	},}}}])
	addFileConstructor('logo', 'logo.img', 'theworld.png', 'img')
	addFileConstructor('readme', 'message.doc', 'We apologize for the crash.\
	\nYou have clearly built a computer by now.\
	\nWe have left you with enough resources to escape this planet, using your machines.', 'doc')
	addFileConstructor('guide', 'A guide to coding.doc', "For the current period, I recognize that some assistance may be required.\
	\nWho am I? That is an irrelevant matter of little consequence. \
	\nTo survive your time on this planet you are going to have to control robots and droids, very different things. \
	\nYou will also have to make some droids to carry out your order. Build a robot, then assign it to being a droid in the jobs tab.\
	\nTo start with, create a new file using the \'make a file\' button and name it hole.mnr (To rename a file edit the top line) \
	\nIn the scripts tab allocate all the droids to the new file.\
	\nIn that file, type one line: miner.digHole(). This tells the droid to dig a hole so that you can start uncovering more resources \
	\nYou can see your progress in digging the hole in the mining tab. \
	\nOnce your hole gets to 100 metres create a second script, rename it to mine.mnr, and add the line miner.mineAtDepth(100).\
	\nAgain, allocate some droids to the script. \
	\nThis script tells the droid to mine at a depth of 100 metres. By mining at different depths you can find different types of resources.\
	\nUsually you want to have the depth you mine at as big as possible, but you can\'t have it bigger than your hole, and at depths close to the center you lose access to some resources. \
	\nAll this does so far is have your droids uncover resources, it doesn\'t help them mine resources\
	\nTo mine resources you have to run miner.mineResource(\'resourceYouWantToMine\'). For some reason the resource has to have no spaces, with the first letter of each word except the first capatilized\
	\nFor instance miner.mineResource(\'stone\') mines stone and miner.mineResource('ironOre') mines Iron Ore\
	\nTo control robots you have to use a different syntax.\
	\nThe two main commands are robot.chopAdjacentTiles() and robot.moveRandom()\
	\nRobot files end in .rbt\
	\nA simple file is:\
	\nrobot.chopAdjacentSquares()\nrobot.moveRandom()\
	\nThis will get your robot chopping down trees and getting you wood in no time.\
	\nAs always, remember to assign robots to your scripts", 'doc')
	addButtonConstructor('Gather wood', 'getWood')
}
construct()
//245 minutes, rocket silo
