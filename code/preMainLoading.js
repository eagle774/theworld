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
		buttons:{}
	},
	buildings: [],
	computerChanged:false,
	processes: [],
	mining:{
		'Earth':mine
	},
	grid:null,
	planets:{
		'Earth':{
			'fakestone':50,
			'iron-ore':0,
			'progress':0,
		}
	},
	jobs:{

	}
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
		locked:false
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
	if(!data.resTable[job]){
		new Res(job, job)
		data.warningLog.push('Job '+job+' was added to resTable as it was not originally in resTable. Was this intentional?')
	}
	if(data.resTable[base]){
		if(!data.jobs[base]){
			data.jobs[base]=[]
		}
		data.jobs[base].push({
			job
		})
	}
	if(!data.resTable[base]){
		data.errorLog.push('Cannot add job '+job+' as base '+base+' is not in resTable')
	}
}
Res.prototype.configure = function(attribute, value){
	this.stuff[attribute] = value
	return this
}
Res.prototype.finalize = function(){
	let saveName = this.stuff.name
	this.stuff.name = undefined
	data.resTable[saveName]=this.stuff
	this.stuff = undefined
}
const addMachine = (materialName,resourcesNeeded,results) => {
	if(!data.resTable[materialName]){
		new Res(materialName,materialName)
		data.warningLog.push('Machine '+materialName+' was added to resTable as it was not previously in there. If that was intentional, ignore this message.')
	}
	data.machineStates[materialName] = {
  	resourcesNeeded:resourcesNeeded,
  	resourcesRecieved:{

  	},
  	results:results
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
	new Res("wood", "Wood")
		.configure("storage", 50)
		.finalize()
	new Res("fs", "Flint and Steel")
		.configure("storage", 1)
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
		.configure("storage", Infinity)
		.configure("buildName","Light a fire")
		.finalize()
	new Res("copper", "Copper")
		.configure("storage", 60)
		.finalize()
	new Res('explorer-miner-droid','Explorer Droid')
		.configure("storage",Infinity)
		.finalize()
	new Res('iron-miner-droid','Iron Miner')
		.configure("storage",Infinity)
		.finalize()
	new Res("gift-god", "Gift of God")
		.finalize()
	new Res("iron", "Iron")
		.configure("storage", 60)
		.finalize()
	new Res("furnace", "Furnace")
		.configure("buildName","Build a furnace")
		.configure("storage", Infinity)
		.finalize()
	new Res("iron-furnace", "Iron Furnace")
		.configure("storage", Infinity)
		.finalize()
	new Res("inactive-furnace", "Inactive Furnace")
		.configure("storage", Infinity)
		.finalize()
	new Res("coal", "Coal")
		.configure("storage", 400)
		.finalize()
	new Res("fakestone", "Stone")
		.configure("storage", 200)
		.finalize()
	new Res("miner-droid", "Miner Droid")
		.configure("buildName","Tell a robot to actually be useful")
		.configure("storage",Infinity)
		.finalize()
	new Res("iron-ore", "Iron Ore")
		.finalize()
	new Res("spit", "Spit")
		.configure("buildName","Create a spit")
		.configure("storage", 1)
		.finalize()
	new Res("adaptation-chamber", "Adaptation Chamber")
		.configure("storage", Infinity)
		.configure("buildName","Erect an adaptation chamber")
		.finalize()
	new Res("rocket-launcher", "Rocket Launcher")
		.configure("storage", Infinity)
		.configure("buildName","Create a rocket launcher")
		.finalize()
	new Res("alloyer", "Alloyer")
		.configure("storage", Infinity)
		.configure("buildName","Obtain an alloyer")
		.finalize()
	new Res("cooler", "Cooler")
		.configure("storage", Infinity)
		.configure("buildName","Melt cooled metal to form a cooler")
		.finalize()
	new Res("gemstone-slicer", "Gemstone Slicer")
		.configure("storage", Infinity)
		.configure("buildName","Cut metal to shape a gemstone slicer")
		.finalize()
	new Res("melter", "Melter")
		.configure("storage", Infinity)
		.configure("buildName","Cool molten metal to form a melter")
		.finalize()
	new Res("pressurizer", "Pressurizer")
		.configure("storage", Infinity)
		.configure("buildName","Make a Pressurizer")
		.finalize()
	new Res("steam-engine", "Steam Engine")
		.configure("storage", 1)
		.finalize()
	new Res("water-boiling", "Boiling Water")
		.configure("conversion", {
			"steam": 1
		})
		.configure("storage", Infinity)
		.finalize()
	new Res("bucket", "Bucket")
		.configure("locked",true)
		.configure("storage", Infinity)
		.finalize()
	new Res("robot", "Robot")
		.configure("buildName","Manufacture a robot")
		.configure("storage", Infinity)
		.finalize()
	new Res("computer", "Computers")
		.configure("buildName","Construct a computer")
		.configure("storage", Infinity)
		.finalize()
	new Res("barn", "Barns")
		.configure("buildName","Complete a barn")
		.configure("storage", Infinity)
		.finalize()
	new Res("computer-disk", "Computer disk")
		.configure("storage", Infinity)
		.finalize()
	new Res("bucket-water", "Bucket of Water")
		.configure("buildName","Fill a bucket with water")
		.finalize()
	/*
	data.resTable["steam"].amount=199
	data.resTable["gift-god"].amount=1
	data.resTable["fire"].amount=5000000
	data.unlockedResources.push('gift-god')
	data.computerOpacity = 0.9
	//*/
	addMachine("steam-engine",{
		steam:0.5
	},{
		energy:1
	})
	addMachine("gift-god",{},{
		copper:1e99,
		fakestone:1e99,
		iron:1e99,
		coal:1e99,
		energy:1e99,
		wood:1e99
	})
	addMachine("computer",{
		energy:0.3
	},{})
	addMachine("furnace",{
		fire:0.01,
		fakestone:0.1
	},{
		iron:0.01,
		copper:0.01,
	})
	addMachine("iron-furnace",{
		fire:0.01,
		'iron-ore':0.1
	},{
		iron:0.1,
	})
	addMachine("robot",{
		fakestone:1
	},{
		robot:0.01
	})
	addJob('miner-droid','explorer-miner-droid')
	addJob('miner-droid','iron-miner-droid')
	addJob('furnace','inactive-furnace')
	addJob('furnace','iron-furnace')
	addFileConstructor("logo", "logo.img", "theworld.png", "img")
	addFileConstructor("readme", "message.doc", "We apologize for the crash.\n \
	You have clearly built a computer by now.\n \
	We have left you with enough resources to escape this planet, using your machines.\n", "doc")
	addFileConstructor("guide", "A guide to coding.doc", "We apologize for the crash.\n \
	You have clearly built a computer by now.\n \
	We have left you with enough resources to escape this planet, using your machines.\n", "doc")
	addButtonConstructor("Gather wood", "getWood")
}
construct()
