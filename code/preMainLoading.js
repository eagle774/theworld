let data = {
	computerOpacity: 0,
	resTable: {},
	buildingsList: buildingsData,
	tab: "main",
	unlockedResources: ["wood"],
	cursorX: 0,
  machinePriority:[],
	cursorY: 0,
	fileContents: {},
	fileTextContents: {},
	fileViewed: "logo",
	files: [],
	rocketsData,
	toBuy:1,
	buyList:[1,10,100,'max'],
  machineStates:{},
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
		gettable: false,
		multiplier: 1,
		buildName:"placeholder",
		locked:false,
		isRocket:false,
		isFluid:false,
		fluidStuff:{},
		isBuildable:false,
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
const addAdaptation = (requirements,effects,name,description,cost) => {
	data.unSaveable.adaptations[name]={requirements,effects,name,description,cost}
}
Res.prototype.configure = function(attribute, value){
	this.stuff[attribute] = value
	return this
}
Res.prototype.finalize = function(){
	let saveName = this.stuff.name
	this.stuff.name = undefined
	data.resTable[saveName]=this.stuff
}
Res.prototype.addJob = function(jobName){
	addJob(this.stuff.name,jobName)
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
	return this
}
Res.prototype.isFluid = function(density){
	this.stuff.isFluid = true;
	this.stuff.fluidStuff.density = density
	return this
}
Res.prototype.hasFluidForm = function(fName,fSName,fDensity){
	new Res(fName,fSName)
		.isFluid(fDensity)
		.finalize()
	new Res(fName+"-cooler",fSName+" Cooler")
		.configure('storage',Infinity)
		.setMachine({
			[fName]:100
		},{
			[this.stuff.name]:0.1
		})
		.setJobOf('cooler')
		.finalize()
	new Res(this.stuff.name+"-melter",this.stuff.screenName+" Melter")
		.configure('storage',Infinity)
		.setMachine({
			[this.stuff.name]:0.1
		},{
			[fName]:100
		})
		.setJobOf('melter')
		.finalize()

	return this
}
Res.prototype.setMachine = function(input,output){
	addMachine(this.stuff.name,input,output)
	return this
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
		new Res("fire", "Fire")
			.configure("conversion", {
				"smoke": 0.001
			})
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
				'compressed-iron':1e99,
				steel:1e99,
				wood:1e99
			})
			.finalize()
		new Res("iron", "Iron")
			.configure("storage", 60)
			.hasFluidForm("molten-iron","Molten Iron",1)
			.finalize()
		new Res("tungsten", "Tungsten")
			.configure("storage", 5)
			.hasFluidForm("molten-tungsten","Molten Tungsten",1)
			.finalize()
		new Res("titanium", "Titanium")
			.configure("storage", 10)
			.hasFluidForm("molten-titanium","Molten Titanium",1)
			.finalize()
		new Res("duranium", "Duranium")
			.configure("storage", 10)
			.hasFluidForm("molten-titanium","Molten Titanium",1)
			.finalize()
		new Res("gold", "Gold")
			.configure("storage", 1)
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
			.finalize()
		new Res("steel", "Steel")
			.configure("storage", 10)
			.finalize()
		new Res("droid", "Droid")
			.setJobOf('robot')
			.isBuildable()
			.finalize()
		new Res("iron-ore", "Iron Ore")
			.configure("storage", 600)
			.isOreOf('iron')
			.finalize()
		new Res("tungsten-ore", "Tungsten Ore")
			.configure("storage", 50)
			.isOreOf('tungsten')
			.finalize()
		new Res("titanium-ore", "Titanium Ore")
			.configure("storage", 100)
			.isOreOf('titanium')
			.finalize()
		new Res("copper-ore", "Copper Ore")
			.configure("storage", 600)
			.isOreOf('copper')
			.finalize()
		new Res("gold-ore", "Gold Ore")
			.configure("storage", 10)
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
			.configure("buildName","Obtain an alloyer")
			.finalize()
		new Res("cooler", "Cooler")
			.isBuildable()
			.configure("buildName","Melt cooled metal to form a cooler")
			.finalize()
		new Res("melter", "Melter")
			.isBuildable()
			.configure("buildName","Cool molten metal to form a melter")
			.finalize()
		new Res("pressurizer", "Pressurizer")
			.isBuildable()
			.addInactiveState()
			.configure('locked',true)
			.setMachine({
				coal:10,
				iron:10,
				energy:3
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
				fire:0.01
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
		new Res("computer", "Computers")
			.configure("buildName","Forge a computer")
			.isBuildable()
			.setMachine({
				energy:0.3
			},{})
			.finalize()
		new Res("barn", "Barns")
			.configure("buildName","Complete a barn")
			.isBuildable()
			.configure("locked", true)
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
	//misc
	addAdaptation(
		[],(app)=>{
		app.machineStates['incendinary-pile'].results.fire*=1.5
	},'Explosive Techniques',"How to blow things up better: A guide.",{
		'wood':200,
		'coal':20
	})
	//iron handling
	addAdaptation(
		[
		(app)=>{
			return app.resTable['furnace'].amount>=20
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
			return app.resTable['compressor'].amount>=5
		},
		(app)=>{
			return app.unlockedResources.includes('titanium')
		}
	],(app)=>{
		app.resTable['pressurizer'].locked = false
	},'Iron compressing 2',"Truer uselessness.",{
		'stone':50,
		'copper':10,
		'compressed-iron':10
	})
	//furnaces
	addAdaptation(
		[
		(app)=>{
			return app.resTable['furnace'].amount>=10
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
			return app.resTable['furnace'].amount>=50
		}
	],(app)=>{
		app.machineStates['furnace'].resourcesNeeded.stone*=0.8
	},'Super efficient furnaces',"Furnace stone consumption -20%",{
		'wood':1000,
		'stone':1000,
		'iron':100
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
		'compressed-iron':100,
		'tungsten':100
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
		'compressed-iron':1000,
		'tungsten':1000,
		'steel':1000
	})
	//robots
	addAdaptation(
		[
		(app)=>{
			return app.resTable['compressed-iron'].amount>=100
		},
		(app)=>{
			return app.resTable['droid'].amount>=50
		}
	],(app)=>{
		app.multipliers['.mnr']*=2
	},'Compressed iron droids',"Equip miner droids with a protective compressed iron coating",{
		'compressed-iron':100,
	})
	//miners

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
	\nYou will also have to make some droids to carry out your order. Build a robot, then tell it to be a droid.\
	\nTo start with, create a new file and name it hole.mnr (To rename a file edit the top line) \
	\nIn the scripts tab allocate all the droids to the new file.\
	\nIn that file, type one line: miner.digHole(). This tells the droid to dig a hole so that you can start uncovering more resources \
	\nYou can see your hole progress in the mining tab. \
	\nOnce your hole getes to 100 metres create a second script, rename it to mine.mnr, and add the line miner.digAtDepth(100).\
	\nAgain, allocate some droids to the script. \
	\nThis script tells the droid to mine at a depth of 100 metres. By mining at different depths you can find different types of resources.\
	\nUsually you want to have the depth as big as possible, but you can\'t have it bigger than your hole, and at very low depths you lose access to some resources. \
	\n", "doc")
	addButtonConstructor("Gather wood", "getWood")
}
construct()
