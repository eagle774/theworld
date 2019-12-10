let data = {
	computerOpacity: 0,
	resTable: {},
	buildingsList: buildingsData,
	tab: "main",
	unlockedResources: ["wood"],
	cursorX: 0,
  machinePriority:[],
  mineMachinePriority:[],
	cursorY: 0,
	fileContents: {},
	fileTextContents: {},
	fileViewed: "logo",
	checks: {},
	files: [],
	rocketsData,
	toBuy:1,
	buyList:[1,10,100,'max'],
  machineStates:{},
  mineMachineStates:{},
	tickCount:1,
	message: "",
  curFileType: "img",
	insertedDisk: false,
	buttons: [],
	warningLog: [],
	errorLog: [],
	tabs: [{
		displayText: "Main",
		tab: "main"
	},{
		displayText: "Saves",
		tab: "saving"
	}],
	unSaveable:{
		buttons:{},
		extensions: [],
		adaptations:{},
	},
	multipliers:{},
	buildings: {},
	computerChanged:false,
	processes: [],
	mining:{
		'Earth':mine
	},
	grid:null,
	planets:{
		'total':{
			'stone':5000,
			'tungsten-ore':0,
			'copper-ore':0,
			'iron-ore':0,
			'coal':0,
			'titanium-ore':0,
			'gold-ore':0,
			'progress':0,
		}
	},
	hole:0,
	jobs:{

	},
	rocketsBought:[],
	unlockedFluids:[],
	launchedRockets:[],
	scripts:{

	},
	completedAdaptations:[],
	fluidLeft:0,
	version:'0.0.1',
	availableAdaptations:[],
	categories:{'Processes':true,'Interaction':true}
}
function Res(name,sname){
	this.stuff={
		name,
		amount: 0,
		perTick: 0,
		screenName: sname,
		storage: 5,
		extraPerTick: 0,
		multiplier: 1,
		buildName:"placeholder",
		locked:false,
		isRocket:false,
		isFluid:false,
		fluidStuff:{},
		isJob:false,
		isBuildable:false,
		specialCSS:{}
	}
	return this
}
const addButtonConstructor = (displayText, todo) => {
	data.buttons.push({
		displayText,
		todo
	})
}
const addJob = (base, job) => {
	if(!data.jobs[base]){
		data.jobs[base]=[]
	}
	data.jobs[base].push({
		job
	})
}
const addExtension = (parts) => {
	data.unSaveable.extensions.push(parts)
	data.scripts[parts[0]]={}
	data.multipliers[parts[0]]=1
}
const confusedText = 'Please report to a dev.';
const addCheck = (name)=>{
	data.checks[name]=false
}
const addAdaptation = (requirements,effects,name,description,cost) => {
	data.unSaveable.adaptations[name]={requirements,effects,name,description,cost}
}
Res.prototype.configure = function(attribute, value){
	this.stuff[attribute] = value
	return this
}
Res.prototype.finalize = function(){
	let saveName = this.stuff.name
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
	new Res('inactive-'+this.stuff.name,'Inactive '+this.stuff.screenName)
		.configure('storage',Infinity)
		.setJobOf(this.stuff.name)
		.finalize()
	return this
}
Res.prototype.setJobOf = function(jobName){
	addJob(jobName,this.stuff.name)
	this.stuff.isJob=true
	return this
}
Res.prototype.isRocket = function(){
	this.stuff.isRocket=true
	this.stuff.locked = true
	return this.isBuildable()
}
Res.prototype.isBuildable = function(){
	this.stuff.isBuildable = true
	this.stuff.storage = Infinity
	return this
}
Res.prototype.isOreOf = function(name){
	new Res(name+"-furnace", data.resTable[name].screenName+" Smelting Furnace")
		.setJobOf('furnace')
		.configure('storage',Infinity)
		.setMachine({
			fire:0.01,
			[this.stuff.name]:0.1
		},{
			[name]:0.1
		})
		.finalize()
	new Res(name+"-frostium-furnace", data.resTable[name].screenName+" Smelting Frostium Furnace")
		.setJobOf('frostium-furnace')
		.configure('storage',Infinity)
		.setMachine({
			'frostium-energy':10,
			[this.stuff.name]:1000000
		},{
			[name]:1000000
		})
		.finalize()
	return this
}
Res.prototype.fluidFormHasAlloyerRecipe = function(inputs,amount){
	new Res(this.fluidForm.stuff.name+"-alloyer",this.fluidForm.stuff.screenName+" Alloyer")
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
	new Res(fName+"-cooler",fSName+" Cooler")
		.configure('storage',Infinity)
		.setMachine({
			[fName]:100/fDensity,
			energy:10
		},{
			[this.stuff.name]:0.1
		})
		.setJobOf('cooler')
		.finalize()
	new Res(this.stuff.name+"-melter",this.stuff.screenName+" Melter")
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
Res.prototype.setMachine = function(input,output){
	addMachine(this.stuff.name,input,output)
	return this
}
Res.prototype.setMineMachine = function(input,output){
	addMineMachine(this.stuff.name,input,output)
	return this
}
const addMineMachine = (materialName,resourcesNeeded,results) => {
	if(!data.resTable[materialName]){
		new Res(materialName,materialName).finalize()
		data.warningLog.push('Mine Machine '+materialName+' was added to resTable as it was not previously in there. If that was intentional, ignore this message.')
	}
	data.mineMachineStates[materialName] = {
  	resourcesNeeded:resourcesNeeded,
  	resourcesRecieved:{

  	},
  	results:results,
		multiplier:1
	}
	data.mineMachinePriority.push(materialName)

}
const addMachine = (materialName,resourcesNeeded,results) => {
	if(!data.resTable[materialName]){
		new Res(materialName,materialName).finalize()
		data.warningLog.push('Machine '+materialName+' was added to resTable as it was not previously in there. If that was intentional, ignore this message.')
	}
	data.machineStates[materialName] = {
  	resourcesNeeded:resourcesNeeded,
  	resourcesRecieved:{

  	},
  	results:results,
		multiplier:1
	}
	data.machinePriority.push(materialName)

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
		new Res("wood", "Wood")
			.configure("storage", 50)
			.hasCSS({'color':"saddlebrown"})
			.finalize()
		new Res('fluid-storage',confusedText)
			.configure('storage',0)
			.finalize()
		new Res("solar-panel", "Solar Panel")
			.configure("buildName","Discover the joys of solar panels.")
			.isBuildable()
			.setMachine({},{
				energy:0.2
			})
			.finalize()
		new Res("fs", "Flint and Steel")
			.configure("storage", 1)
			.finalize()
		new Res("wooden-rocket", "Wooden Rocket")
			.isRocket()
			.finalize()
		new Res("coal-rocket", "Coal Rocket")
			.isRocket()
			.finalize()
		new Res("smoke", "Smoke")
			.configure("storage", Infinity)
			.finalize()
		new Res("steam", "Steam")
			.configure("storage", Infinity)
			.finalize()
		new Res("energy", "Energy")
			.configure("storage", 200)
			.finalize()
		new Res("water","Water")
			.isFluid(1)
			.finalize()
		new Res("fire", "Fire")
			.configure("conversion", {
				"smoke": 0.001
			})
			.hasCSS({'color':"orange"})
			.isBuildable()
			.setMachine({
				'water-boiling':0.1
			},{
				'steam':0.1
			})
			.configure("buildName","Light a fire")
			.finalize()
		new Res("copper", "Copper")
			.configure("storage", 60)
			.hasCSS({'color':"brown"})
			.hasFluidForm("molten-copper","Molten Copper",1)
			.finalize()
		new Res("gift-god", "Gift of God")
			.setMachine({},{
				copper:1e99,
				stone:1e99,
				iron:1e99,
				coal:1e99,
				energy:1e99,
				titanium:1e99,
				gold:1e99,
				tungsten:1e99,
				frostium:1e99,
				'compressed-iron':1e99,
				steel:1e99,
				wood:1e99,
				duranium:1e99
			})
			.finalize()
		new Res("iron", "Iron")
			.configure("storage", 60)
			.hasFluidForm("molten-iron","Molten Iron",1)
			.hasCSS({"color":"rosybrown"})
			.finalize()
		new Res("tungsten", "Tungsten")
			.configure("storage", 5)
			.hasCSS({'color':"green"})
			.hasFluidForm("molten-tungsten","Molten Tungsten",1)
			.finalize()
		new Res("titanium", "Titanium")
			.configure("storage", 10)
			.hasCSS({"color":"darkgrey"})
			.hasFluidForm("molten-titanium","Molten Titanium",1)
			.finalize()
		new Res("duranium", "Duranium")
			.configure("storage", 100)
			.hasCSS({"color":"MediumAquaMarine"})
			.hasFluidForm("molten-duranium","Molten Duranium",1)
			.fluidFormHasAlloyerRecipe({
				'molten-titanium':75,
				'molten-iron':25,
				energy:10
			},100)
			.finalize()
		new Res("frostium", "Frostium")
			.configure("storage", 100)
			.hasFluidForm("molten-frostium","Molten Frostium",10)
			.hasCSS({'color':"lightblue"})
			.fluidFormHasAlloyerRecipe({
				water:75,
				'molten-steel':5,
				energy:50
			},10)
			.finalize()
		new Res("frostium-core", "Frostium Core")
			.isBuildable()
			.hasCSS({'color':"lightblue","text-shadow":"0px 0px 2px blue"})
			.configure("locked",true)
			.configure("buildName","Shape a Frostium core")
			.finalize()
		new Res("frostium-battery", "Frostium Battery")
			.isBuildable()
			.hasCSS({'color':"lightblue","text-shadow":"0px 0px 2px blue"})
			.configure("buildName","Put a shell around a Frostium core")
			.setMachine({},{
				'frostium-energy':1,
			})
			.finalize()
		new Res("frostium-energy", "Frostium Energy")
			.configure('storage',0)
			.hasCSS({'color':"lightblue","text-shadow":"0px 0px 2px blue"})
			.finalize()
		new Res("frostium-furnace", "Frostium Furnace")
			.configure('locked',true)
			.configure('buildName',"Make a Frostium Furnace")
			.isBuildable()
			.hasCSS({'color':"lightblue","text-shadow":"0px 0px 2px blue"})
			.finalize()
		new Res("planet-grinder", "Planet Grinder")
			.isBuildable()
			.hasCSS({'color':"red","text-shadow":"0px 0px 2px red"})
			.configure("buildName","Make a Planet Grinder.")
			.addInactiveState()
			.setMineMachine({
				'frostium-energy':10
			},{
				'copper-ore':1000000,
				'iron-ore':1000000,
				'tungsten-ore':10000,
				'titanium-ore':50000,
				"wood":10000
			})
			.finalize()
		new Res("gold", "Gold")
			.configure("storage", 1)
			.hasCSS({"color":"gold"})
			.hasFluidForm("molten-gold","Molten Gold",1)
			.finalize()
		new Res("compressed-iron", "Compressed Iron")
			.configure("storage", 0)
			.finalize()
		new Res("furnace", "Stone Furnace")
			.configure("buildName","Build a stone furnace")
			.addInactiveState()
			.isBuildable()
			.setMachine({
				fire:0.01,
			  stone:0.1
			},{
				iron:0.02,
				copper:0.02,
			})
			.finalize()
		new Res("compressor", "Compressor")
			.configure("buildName","Assemble a compressor")
			.configure('locked',true)
			.addInactiveState()
			.isBuildable()
			.setMachine({
				iron:0.5,
				energy:1
			},{
				'compressed-iron':0.01
			})
			.finalize()
		new Res("coal", "Coal")
			.configure("storage", 400)
			.finalize()
		new Res("stone", "Stone")
			.configure("storage", 200)
			.hasCSS({'color':"grey"})
			.finalize()
		new Res("steel", "Steel")
			.configure("storage", 10)
			.hasFluidForm('molten-steel','Molten Steel',5)
			.hasCSS({'color':"lightgrey"})
			.finalize()
		new Res("droid", "Droid")
			.setJobOf('robot')
			.isBuildable()
			.finalize()
		new Res("iron-ore", "Iron Ore")
			.configure("storage", 600)
			.isOreOf('iron')
			.hasCSS({"color":"rosybrown"})
			.finalize()
		new Res("tungsten-ore", "Tungsten Ore")
			.configure("storage", 50)
			.hasCSS({"color":"green"})
			.isOreOf('tungsten')
			.finalize()
		new Res("titanium-ore", "Titanium Ore")
			.configure("storage", 100)
			.hasCSS({"color":"darkgrey"})
			.isOreOf('titanium')
			.finalize()
		new Res("copper-ore", "Copper Ore")
			.configure("storage", 600)
			.hasCSS({"color":"brown"})
			.isOreOf('copper')
			.finalize()
		new Res("gold-ore", "Gold Ore")
			.configure("storage", 10)
			.hasCSS({"color":"gold"})
			.isOreOf('gold')
			.finalize()
		new Res("spit", "Spit")
			.isBuildable()
			.configure("buildName","Create a spit")
			.configure("storage", 1)
			.finalize()
		new Res("adaptation-chamber", "Adaptation Chamber")
			.isBuildable()
			.configure("storage", 1)
			.configure("buildName","Erect an adaptation chamber")
			.finalize()
		new Res("rocket-launcher", "Rocket Launcher")
			.isBuildable()
			.configure("storage", 1)
			.configure("buildName","Construct a rocket launcher")
			.finalize()
		new Res("alloyer", "Alloyer")
			.isBuildable()
			.configure("locked", true)
			.configure("buildName","Obtain an alloyer")
			.finalize()
		new Res("pump", "Pump")
			.isBuildable()
			.configure("buildName","Assemble a pump to take water from the river.")
			.setMachine({
				energy:10
			},{
				water:100
			})
			.addInactiveState()
			.finalize()
		new Res("cooler", "Cooler")
			.isBuildable()
			.configure("locked", true)
			.configure("buildName","Melt cooled metal to form a cooler")
			.finalize()
		new Res("melter", "Melter")
			.isBuildable()
			.configure("locked", true)
			.configure("buildName","Cool molten metal to form a melter")
			.finalize()
		new Res("pressurizer", "Pressurizer")
			.isBuildable()
			.addInactiveState()
			.configure('locked',true)
			.setMachine({
				coal:10,
				iron:10,
				energy:30,
			},{
				steel:0.1,
			})
			.configure("buildName","Make a Pressurizer")
			.finalize()
		new Res("steam-engine", "Steam Engine")
			.configure("buildName","Smelt a steam engine")
			.isBuildable()
			.addInactiveState()
			.setMachine({
				steam:0.5
			},{
				energy:1
			})
			.finalize()
		new Res("combustion-engine", "Combustion Engine")
			.configure("buildName","Craft a combustion engine")
			.isBuildable()
			.addInactiveState()
			.configure("locked", true)
			.setMachine({
				fire:0.1
			},{
				energy:1
			})
			.finalize()
		new Res("water-boiling", "Boiling Water")
			.isBuildable()
			.finalize()
		new Res("bucket", "Bucket")
			.configure("locked",true)
			.isBuildable()
			.finalize()
		new Res("robot", "Robot")
			.configure("buildName","Manufacture a robot")
			.isBuildable()
			.configure("locked", true)
			.finalize()
		new Res("stone-miner", "Stone Miner")
			.configure("buildName","Throw together a stone miner to mine stone.")
			.isBuildable()
			.setMachine({
				energy:0.1
			},{
				stone:0.05,
			})
			.finalize()
		new Res("fire-starter", "Fire Starter")
			.configure("buildName","Slap together a fire starter")
			.isBuildable()
			.addInactiveState()
			.setMachine({
				energy:1,
				coal:0.1,
			},{
				fire:0.1,
			})
			.finalize()
		new Res("computer", "Computers")
			.configure("buildName","Forge a computer")
			.isBuildable()
			.finalize()
		new Res("barn", "Barns")
			.configure("buildName","Complete a barn")
			.isBuildable()
			.configure("locked", true)
			.finalize()
		new Res("industrial-warehouse", "Industrial Warehouses")
			.configure("buildName","Maintain a monolithic warehouse")
			.isBuildable()
			.finalize()
		new Res("incendinary-pile", "Incendinary Pile")
			.configure("buildName","Dump a bunch of wood in a pile to burn.")
			.isBuildable()
			.configure("locked", true)
			.setMachine({
				'incendinary-pile':0.08
			},{
				fire:1
			})
			.finalize()
		new Res("coal-incendinary-pile", "Coal Incendinary Pile")
			.configure("buildName","Dump a bunch of coal in a pile to burn.")
			.isBuildable()
			.configure("locked", true)
			.setMachine({
				'coal-incendinary-pile':0.32
			},{
				fire:16
			})
			.finalize()
		new Res("computer-disk", "Computer disk")
			.isBuildable()
			.finalize()
		new Res("bucket-water", "Bucket of Water")
			.configure("buildName","Fill a bucket with water")
			.isBuildable()
			.finalize()
	})()
	/*
	data.resTable["steam"].amount=199
	data.resTable["gift-god"].amount=1
	data.resTable["fire"].amount=5000000
	data.unlockedResources.push('gift-god')
	data.computerOpacity = 0.9
	data.resTable["barn"].locked = false
	//*/
	addCheck('spitMade')
	addCheck('bucket-waterMade')
	addCheck('fireMade')
	addCheck('flintUnlocked')
	addCheck('hang-bucketUnlocked')
	addCheck('steamExplore')
	addCheck('notFrostiumCoreMade')
	addCheck('notFrostiumBatteryMade')
	addCheck('notPlanetGrinderMade')
	addCheck('notFrostiumFurnaceMade')
	addCheck('notRocketLauncherMade')
	data.checks['notFrostiumCoreMade']=true
	data.checks['notRocketLauncherMade']=true
	data.checks['notPlanetGrinderMade']=true
	data.checks['notFrostiumBatteryMade']=true
	data.checks['notFrostiumFurnaceMade']=true
	//misc
	addAdaptation(
		[],(app)=>{
		app.machineStates['incendinary-pile'].results.fire*=1.5
	},'Explosive Techniques',"How to blow things up better: A guide.",{
		'wood':200,
		'coal':20
	})
	addAdaptation(
		[(app)=>{return app.resTable['coal'].amount>0}],(app)=>{
		app.resTable['coal-incendinary-pile'].locked = false
	},'Advanced Explosive Techniques',"How to blow more things up betterer: A guide.",{
		'wood':500,
		'coal':200
	})
	//iron handling
	addAdaptation(
		[
		(app)=>{
			return app.jobCount('furnace')>=20
		}
	],(app)=>{
		app.resTable['compressor'].locked = false
	},'Iron compressing',"True uselessness.",{
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
	},'Iron compressing 2',"Truer uselessness.",{
		'stone':5000,
		'copper':1000,
		'compressed-iron':1000,
		'titanium':1000
	})
	//furnaces
	addAdaptation(
		[
		(app)=>{
			return app.jobCount('furnace')>=10
		}
	],(app)=>{
		app.machineStates['furnace'].resourcesNeeded.stone*=0.8
	},'Efficient furnaces',"Very useful",{
		'wood':100,
		'stone':100
	})
	addAdaptation(
		[
		(app)=>{
			return app.jobCount('furnace')>=100
		}
	],(app)=>{
		app.machineStates['furnace'].resourcesNeeded.stone*=0.8
	},'Super efficient furnaces',"Furnace stone consumption -20%",{
		'wood':1000,
		'stone':1000,
		'iron':100
	})
	addAdaptation(
		[
		(app)=>{
			return app.jobCount('furnace')>=1000
		}
	],(app)=>{
		app.machineStates['furnace'].resourcesNeeded.stone*=0.7
	},'Super duper efficient furnaces',"Furnace stone consumption -30%",{
		'titanium':1000,
		'stone':100000,
		'compressed-iron':1000
	})
	addAdaptation(
		[
		(app)=>{
			return app.jobCount('furnace')>=10000
		}
	],(app)=>{
		app.machineStates['furnace'].resourcesNeeded.stone*=0.5
	},'Most efficient furnaces',"Furnace stone consumption -50%",{
		'tungsten':10000,
		'steel':1000,
	})
	addAdaptation(
		[
		(app)=>{
			return app.resTable['titanium'].amount>0
		}
	],(app)=>{
		app.$set(app.machineStates['furnace'].results,'titanium',0.0005)
	},'Titanium making furnaces',"Furnace produce titanium",{
		'titanium':10000,
	})
	addAdaptation(
		[
		(app)=>{
			return app.resTable['tungsten'].amount>0
		}
	],(app)=>{
		app.$set(app.machineStates['furnace'].results,'tungsten',0.00001)
	},'Tungsten making furnaces',"Furnace produce tiny amounts of tungsten",{
		'tungsten':10000,
	})
	//solar panels
	addAdaptation(
		[
		(app)=>{
			return app.resTable['solar-panel'].amount>=5
		}
	],(app)=>{
		app.machineStates['solar-panel'].results.energy*=1.5
	},'Pholtovaic cells I',"More powerful solar panels",{
		'iron':500,
		'copper':500
	})
	addAdaptation(
		[
		(app)=>{
			return app.resTable['solar-panel'].amount>=50
		}
	],(app)=>{
		app.machineStates['solar-panel'].results.energy*=1.5
	},'Pholtovaic cells II',"Even more powerful solar panels",{
		'iron':5000,
		'copper':5000,
		'compressed-iron':100,
	})
	addAdaptation(
		[
		(app)=>{
			return app.resTable['solar-panel'].amount>=1000
		}
	],(app)=>{
		app.machineStates['solar-panel'].results.energy*=2
	},'Pholtovaic cells III',"Super powerful solar panels",{
		'iron':10000,
		'copper':10000,
		'compressed-iron':10000,
		'tungsten':1000
	})
	addAdaptation(
		[
		(app)=>{
			return app.resTable['solar-panel'].amount>=10000
		}
	],(app)=>{
		app.machineStates['solar-panel'].results.energy*=2.25
	},'Pholtovaic cells IV',"Super-duper powerful solar panels",{
		'iron':100000,
		'copper':50000,
		'compressed-iron':10000,
		'tungsten':20000,
		'steel':10000,
	})
	//robots
	addAdaptation(
		[
		(app)=>{
			return app.jobCount('robot')>=50
		}
	],(app)=>{
		app.multipliers['.robo']*=2
	},'Compressed iron robots',"Equip robots with a compressed iron axe",{
		'compressed-iron':100,
	})
	addAdaptation(
		[
		(app)=>{
			return app.jobCount('robot')>=500
		}
	],(app)=>{
		app.multipliers['.robo']*=1.75
	},'Titanium robots',"Equip robots with a titanium axe",{
		'titanium':1000,
	})
	addAdaptation(
		[
		(app)=>{
			return app.jobCount('robot')>=10000
		}
	],(app)=>{
		app.multipliers['.robo']*=1.5
	},'Steel iron robots',"Equip robots with a steel axe",{
		'steel':1000,
	})
	addAdaptation(
		[
		(app)=>{
			return app.jobCount('robot')>=40000
		}
	],(app)=>{
		app.multipliers['.robo']*=1.25
	},'Tungsten robots',"Equip robots with a tungsten axe",{
		'tungsten':50000,
	})
	//miners
	addAdaptation(
		[
		(app)=>{
			return app.jobCount('robot')>=50
		}
	],(app)=>{
		app.multipliers['.mnr']*=2
	},'Compressed iron droids',"Equip miner droids with a protective compressed iron coating",{
		'compressed-iron':100,
	})
	addAdaptation(
		[
		(app)=>{
			return app.jobCount('robot')>=500
			app.setMessage('Will I ever escape this planet?')
		}
	],(app)=>{
		app.multipliers['.mnr']*=1.75
	},'Titanium droids',"Equip droids with a titanium axe",{
		'titanium':1000,
	})
	addAdaptation(
		[
		(app)=>{
			return app.jobCount('robot')>=10000
		}
	],(app)=>{
		app.multipliers['.mnr']*=1.5
		app.setMessage('This is what progress is.')
	},'Steel iron droids',"Equip droids with a steel axe",{
		'steel':1000,
	})
	addAdaptation(
		[
		(app)=>{
			return app.jobCount('robot')>=40000
		}
	],(app)=>{
		app.multipliers['.robo']*=1.25
		app.setMessage('What can I do when I go back?\nPretend this all never happened?')
	},'Tungsten droids',"Equip droids with a tungsten axe",{
		'tungsten':50000,
	})
	//fluids and alloys
	addAdaptation(
		[
		(app)=>{
			return app.resTable['tungsten'].amount>=5000
		}
	],(app)=>{
		app.resTable['melter'].locked = false
	},'Fluid handling',"Machinery to melt and alloy metal",{
		'tungsten':10000,
	})
	addAdaptation(
		[
		(app)=>{
			return app.resTable['frostium'].amount>=600
		}
	],(app)=>{
		app.resTable['frostium-core'].locked = false
	},'Frostium machinery',"Frostium infused machinery has benefits",{
		'tungsten':10000,
		"frostium":100,
		"duranium":500,
	})

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
	addFileConstructor("logo", "logo.img", "theworld.png", "img")
	addFileConstructor("readme", "message.doc", "We apologize for the crash.\
	\nYou have clearly built a computer by now.\
	\nWe have left you with enough resources to escape this planet, using your machines.", "doc")
	addFileConstructor("guide", "A guide to coding.doc", "For the current period, I recognize that some assistance may be required.\
	\nWho am I? That is an irrelevant matter of little consequence. \
	\nTo survive your time on this planet you are going to have to control robots and droids, very different things. \
	\nYou will also have to make some droids to carry out your order. Build a robot, then assign it to being a droid in the jobs tab.\
	\nTo start with, create a new file and name it hole.mnr (To rename a file edit the top line) \
	\nIn the scripts tab allocate all the droids to the new file.\
	\nIn that file, type one line: miner.digHole(). This tells the droid to dig a hole so that you can start uncovering more resources \
	\nYou can see your hole progress in the mining tab. \
	\nOnce your hole getes to 100 metres create a second script, rename it to mine.mnr, and add the line miner.digAtDepth(100).\
	\nAgain, allocate some droids to the script. \
	\nThis script tells the droid to mine at a depth of 100 metres. By mining at different depths you can find different types of resources.\
	\nUsually you want to have the depth you mine at as big as possible, but you can\'t have it bigger than your hole, and at depths close to the center you lose access to some resources. \
	\nAll this does so far is have your droids uncover resources, it doesn\'t help them mine resources\
	\nTo mine resources you have to run miner.mineResource(\"resourceYouWantToMine\"). For some reason the resource has to be all lowercase, and with hyphens instead of spaces\
	\nFor instance miner.mineResource(\"stone\") mines stone and miner.mineResource('iron-ore') mines Iron Ore\
	\nTo control robots you have to use a different syntax.\
	\nThe two main commands are robot.chopAdjacentTiles() and robot.moveRandom()\
	\nRobot files end in .robo\
	\nA simple file is:\
	\nrobot.chopAdjacentTiles()\nrobot.moveRandom()\
	\nThis will get your robot chopping down trees and getting you wood in no time.\
	\nAs always, remember to assign robots to your scripts", "doc")
	addButtonConstructor("Gather wood", "getWood")
}
construct()
