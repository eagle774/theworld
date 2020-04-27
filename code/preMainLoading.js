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
	buyList:[1,10,100,'max'],
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
	computerChanged:false,
	processes: [],
	logger:console.log,
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
	sortOrder:['wood'],
	spaceFluidLeft:0,
	version:'0.1.3',
	unlockedSpaceResources:[],
	newBuildings:0,
	unlockedSpaceFluids:[],
	curRes:'wood',
	buildingsBought:0,
	availableAdaptations:[],
	naughty:false,
	views:['pastAmount','pastPerTick'],
	curView:'pastAmount',
	categories:{'Processes':true,'Interaction':true},
	spaceCategories:{},
	rocketPartCategory:'Hull',
	rocketPartCategories:['Hull','Repair','Cannon','Radar','Engine'],
	rocketCategory:'Mining',
	rocketCategories:['Mining'],
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
const godMode = true
const addButtonConstructor = (displayText, todo) => {
	data.buttons.push({
		displayText,
		todo,
		ready:true
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
	if(godMode){
		if(this.stuff.storage<1e30){
			this.stuff.storage=1e30
			if(!this.stuff.isBuildable&&!this.stuff.isJob&&this.stuff.name!='gift-god'&&!this.unholy){
				data.machineStates['gift-god']['results'][this.stuff.name]=1e99
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
	new Res('inactive-'+this.stuff.name,'Inactive '+this.stuff.screenName)
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
Res.prototype.setUnique = function(jobName){
	this.stuff.unique = true;
	return this
}
Res.prototype.isUnholy = function(){
	this.unholy = true;
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
Res.prototype.isTradeable = function(buyPrice,sellPrice){
	this.stuff.isTradeable = true
	this.stuff.tradeableStuff.buyPrice = buyPrice
	this.stuff.tradeableStuff.sellPrice = sellPrice
	return this
}
Res.prototype.isOreOf = function(name){
	new Res(name+'-furnace', data.resTable[name].screenName+' Smelting Furnace')
		.setJobOf('stone-furnace')
		.configure('storage',Infinity)
		.setMachine({
			fire:0.01,
			[this.stuff.name]:0.1
		},{
			[name]:0.1
		})
		.finalize()
	new Res(name+'-frostium-furnace', data.resTable[name].screenName+' Smelting Frostium Furnace')
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
Res.prototype.smeltsInto = function(energyInput,results,time){
	for(const [key,value] of Object.entries(results)){
		results[key]/=time
	}
	new Res(this.stuff.name+'-industrial-smelter', this.stuff.screenName+' Industrial Smelter')
		.setJobOf('industrial-smelter')
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
	new Res(this.stuff.name+'-industrial-smelter', this.stuff.screenName+' Industrial Smelter')
		.setJobOf('industrial-smelter')
		.configure('storage',Infinity)
		.setMachine(otherInputs,{
			[this.stuff.name]:1/time
		})
		.finalize()
	return this
}
Res.prototype.fluidFormHasAlloyerRecipe = function(inputs,amount){
	new Res(this.fluidForm.stuff.name+'-alloyer',this.fluidForm.stuff.screenName+' Alloyer')
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
	new Res(fName+'-cooler',fSName+' Cooler')
		.configure('storage',Infinity)
		.setMachine({
			[fName]:100/fDensity,
			energy:10
		},{
			[this.stuff.name]:0.1
		})
		.setJobOf('cooler')
		.finalize()
	new Res(this.stuff.name+'-melter',this.stuff.screenName+' Melter')
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
Res.prototype.hasPrerequisite = function(prerequisite){
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
  	results:results,
		multiplier:1
	}
	data.mineMachinePriority.push(materialName)

}
const addMachine = (materialName,resourcesNeeded,results) => {
	data.machineStates[materialName] = {
  	resourcesNeeded:resourcesNeeded,
  	resourcesRecieved:{

  	},
  	results:results,
		multiplier:1
	}
	data.machinePriority.push(materialName)

}
const addSpaceMachine = (materialName,resourcesNeeded,results) => {
	data.spaceMachineStates[materialName] = {
  	resourcesNeeded:resourcesNeeded,
  	resourcesRecieved:{

  	},
  	results:results,
		multiplier:1
	}
	data.spaceMachinePriority.push(materialName)
}
const addSpaceMineMachine = (materialName,resourcesNeeded,results) => {
	data.spaceMineMachineStates[materialName] = {
  	resourcesNeeded:resourcesNeeded,
  	resourcesRecieved:{

  	},
  	results:results,
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
		new Res('gift-god', 'Gift of God')
			.setMachine({},{})
			.finalize()
		//non-metals
		new Res('wood', 'Wood')
			.configure('storage', 50)
			.isCargo(1,1)
			.isTransportable(1)
			.isTradeable(5,3)
			.hasCSS({'color':'saddlebrown'})
			.finalize()
		new Res('stone', 'Stone')
			.configure('storage', 200)
			.hasCSS({'color':'grey'})
			.isCargo(1,2)
			.isTradeable(5,1)
			.isTransportable(1)
			.finalize()
		new Res('flint-and-steel', 'Flint and Steel')
			.configure('storage', 1)
			.finalize()
		new Res('coal', 'Coal')
			.configure('storage', 400)
			.isCargo(3,0.1)
			.isTransportable(1)
			.isTradeable(5,1)
			.finalize()
		//metals
		new Res('iron', 'Iron')
			.configure('storage', 60)
			.isTransportable(10)
			.isCargo(2,10)
			.isTradeable(50,30)
			.hasFluidForm('molten-iron','Molten Iron',1)
			.hasCSS({'color':'rosybrown'})
			.finalize()
		new Res('iron-ore', 'Iron Ore')
			.configure('storage', 600)
			.isOreOf('iron')
			.isTransportable(10)
			.hasCSS({'color':'rosybrown'})
			.isCargo(1,10)
			.finalize()
		new Res('copper', 'Copper')
			.configure('storage', 60)
			.hasCSS({'color':'brown'})
			.isTradeable(50,30)
			.isCargo(2,10)
			.isTransportable(10)
			.hasFluidForm('molten-copper','Molten Copper',1)
			.finalize()
		new Res('copper-ore', 'Copper Ore')
			.configure('storage', 600)
			.isTransportable(10)
			.hasCSS({'color':'brown'})
			.isOreOf('copper')
			.isCargo(1,10)
			.finalize()
		new Res('titanium', 'Titanium')
			.configure('storage', 10)
			.isTradeable(100,50)
			.isTransportable(20)
			.hasCSS({'color':'darkgrey'})
			.isCargo(3,50)
			.hasFluidForm('molten-titanium','Molten Titanium',1)
			.finalize()
		new Res('titanium-ore', 'Titanium Ore')
			.configure('storage', 100)
			.hasCSS({'color':'darkgrey'})
			.isOreOf('titanium')
			.isTransportable(20)
			.isCargo(1,10)
			.finalize()
		new Res('tungsten', 'Tungsten')
			.configure('storage', 5)
			.isTradeable(200,80)
			.hasCSS({'color':'green'})
			.isCargo(3,50)
			.isTransportable(30)
			.hasFluidForm('molten-tungsten','Molten Tungsten',1)
			.finalize()
		new Res('tungsten-ore', 'Tungsten Ore')
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
			.isTradeable(1e30,0)
			.hasFluidForm('molten-gold','Molten Gold',1)
			.finalize()
		new Res('gold-ore', 'Gold Ore')
			.configure('storage', 10)
			.hasCSS({'color':'gold'})
			.isTransportable(1000000000)
			.isOreOf('gold')
			.isCargo(100,1000)
			.finalize()
		new Res('compressed-iron', 'Compressed Iron')
			.configure('storage', 0)
			.isCargo(4,500)
			.isTransportable(100)
			.isTradeable(1000,250)
			.finalize()
		new Res('steel', 'Steel')
			.configure('storage', 10)
			.isCargo(5,5)
			.isTradeable(2000,1000)
			.isTransportable(10)
			.hasFluidForm('molten-steel','Molten Steel',5)
			.hasCSS({'color':'lightgrey'})
			.finalize()
		new Res('diomine', 'Diomine')
			//Not the urza's legacy one.
			.hasFluidForm('molten-diomine','Molten Diomine',1)
			.hasCSS({'color':'rgba(200,200,200,1)'})
			.finalize()
		new Res('duranium', 'Duranium')
			.configure('storage', 100)
			.isCargo(2,100)
			.isTradeable(500,200)
			.isTransportable(50)
			.hasCSS({'color':'MediumAquaMarine'})
			.hasFluidForm('molten-duranium','Molten Duranium',1)
			.fluidFormHasAlloyerRecipe({
				'molten-titanium':75,
				'molten-iron':25,
				energy:10
			},100)
			.finalize()
		new Res('frostium', 'Frostium')
			.isCargo(2,20)
			.configure('storage', 100)
			.isTransportable(100)
			.hasFluidForm('molten-frostium','Molten Frostium',10)
			.hasCSS({'color':'lightblue'})
			.fluidFormHasAlloyerRecipe({
				water:75,
				'molten-steel':5,
				energy:50
			},10)
			//3 pumps to 1 steel melters to 4 alloyers, coolers
			.finalize()
		//crystals
		new Res('trishardic-geode', 'Trishardic Geode')
			.configure('storage', 10)
			.isTransportable(10000)
			.hasCSS({'color':'lime'})
			.isUnholy()
			.smeltsInto(1000000,{
				'ruby':1,
				'emerald':1,
				'aerome':1,
			},1000)
			.finalize()
		new Res('ruby', 'Ruby')
			.configure('storage', 10)
			.isTransportable(10000)
			.isUnholy()
			.hasCSS({'color':'red'})
			.isTradeable(10000000,4000000)
			.finalize()
		new Res('aerome', 'Aerome')
			.configure('storage', 10)
			.isTransportable(10000)
			.isUnholy()
			.hasCSS({'color':'black','text-shadow':'#f0ff25 0px 0px 2px'})
			.isTradeable(5000000,2000000)
			.finalize()
		new Res('emerald', 'Emerald')
			.configure('storage', 10)
			.isTransportable(10000)
			.isUnholy()
			.hasCSS({'color':'lime'})
			.isTradeable(5000000,2000000)
			.finalize()
		new Res('pyrome', 'Pyrome')
			.configure('storage', 10)
			.isTransportable(10000)
			.hasCSS({'color':'orange','text-shadow':'black 0px 0px 4px'})
			.isTradeable(50000000,20000000)
			.finalize()
		new Res('ice', 'Ice')
			.configure('storage', 1000)
			.isCargo(8,1)
			.isTradeable(10,1)
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
				'boiling-water':0.1
			},{
				'steam':0.1
			})
			.configure('buildName','Light a fire')
			.finalize()
		//energy
		new Res('energy', 'Energy')
			.configure('storage', 200)
			.finalize()
		new Res('frostium-energy', 'Frostium Energy')
			.configure('storage',0)
			.hasCSS({'color':'lightblue','text-shadow':'0px 0px 2px blue'})
			.finalize()
		//arcanity
		new Res('shadows', 'Shadows')
			.hasCSS({'text-shadow':'0px 0px 2px black'})
			.isTransportable(10000)
			.configure('storage',10)
			.finalize()
		//components
		new Res('wireless-energy-transferer', 'Wireless Energy Transferer')
			.isBuildable()
			.hasCSS({'text-shadow':'0px 0px 2px black'})
			.configure('buildName','Infuse frostium with a shadow to make a Wireless Energy Transferer')
			.finalize()
		new Res('matter-transporter', 'Matter Transporter')
			.isBuildable()
			.configure('buildName','Create a Matter Transporter to beam matter instantaneously')
			.finalize()
		new Res('aeromine-glass', 'Aeromine Glass')
			.configure('storage',100)
			.isSmeltable(100000,{
				'aerome':10,
				'diomine':10
			},10)
			.hasCSS({'color':'black','text-shadow':'#f0ff25 0px 0px 2px'})
			.finalize()
		new Res('ruby-laser-lens', 'Ruby Laser Lens')
			.configure('storage',10)
			.isSmeltable(100000,{
				'ruby':100,
				'steel':100,
			},1000)
			.hasCSS({'color':'red'})
			.finalize()
		new Res('emerald-laser-lens', 'Emerald Laser Lens')
			.configure('storage',10)
			.isSmeltable(100000,{
				'emerald':100,
				'steel':100,
			},1000)
			.hasCSS({'color':'lime'})
			.finalize()
		new Res('tempered-pyrome', 'Tempered Pyrome')
			.configure('storage',10)
			.isSmeltable(1000000,{
				'pyrome':1,
				'diomine':100,
				'duranium':777,
				'steel':7777,
			},100)
			.isTransportable(20000)
			.hasCSS({'color':'orange','text-shadow':'black 0px 0px 1px'})
			.finalize()
		//rockets
		new Res('wooden-rocket', 'Wooden Rocket')
			.isRocket()
			.finalize()
		new Res('coal-rocket', 'Coal Rocket')
			.isRocket()
			.finalize()
		new Res('stone-rocket', 'Stone Rocket')
			.isRocket()
			.finalize()
		new Res('metallic-rocket', 'Metallic Rocket')
			.isRocket()
			.finalize()
		new Res('rare-metallic-rocket', 'Rare Metals Rocket')
			.isRocket()
			.finalize()
		new Res('steel-rocket', 'Steel Rocket')
			.isRocket()
			.finalize()
		new Res('duranium-rocket', 'Duranium Rocket')
			.isRocket()
			.finalize()
		new Res('frostium-rocket', 'Frostium Rocket')
			.isRocket()
			.finalize()
		new Res('leo-iii', 'LEO III')
			.isRocket()
			.finalize()
		new Res('cargo-rocket', 'Cargo Rocket')
			.isRocket()
			.finalize()
		//rocket parts
		new Res('rocket-construction-facility', 'Rocket Construction Facility')
			.configure('buildName','Create the machinery to make custom space craft.')
			.configure("locked",true)
			.setUnique(1)
			.isBuildable()
			.finalize()
		new Res('basic-hull', 'Basic Hull')
			.isRocketPart('Hull')
			.finalize()
		new Res('heat-resistant-hull', 'Heat Resistant Hull')
			.isRocketPart('Hull')
			.hasPrerequisite('basic-hull')
			.finalize()
		new Res('strong-hull', 'Strong Hull')
			.isRocketPart('Hull')
			.hasPrerequisite('heat-resistant-hull')
			.finalize()
		new Res('basic-cannon', 'Basic Cannon')
			.isRocketPart('Cannon')
			.finalize()
		new Res('basic-laser', 'Basic Laser')
			.isRocketPart('Cannon')
			.hasPrerequisite('basic-cannon')
			.finalize()
		new Res('basic-radar', 'Basic Radar')
			.isRocketPart('Radar')
			.finalize()
		new Res('advanced-radar', 'Advanced Radar')
			.isRocketPart('Radar')
			.hasPrerequisite('basic-radar')
			.finalize()
		new Res('basic-engine', 'Basic Engine')
			.isRocketPart('Engine')
			.finalize()
		new Res('advanced-thruster', 'Advanced Thruster')
			.isRocketPart('Engine')
			.hasPrerequisite('basic-engine')
			.finalize()
		new Res('basic-repair-suits', 'Basic Repair Suits')
			.isRocketPart('Repair')
			.finalize()
		new Res('automatic-repair-robots', 'Automatic Repair Robots')
			.isRocketPart('Repair')
			.hasPrerequisite('basic-repair-suits')
			.finalize()
		//space ships
		new Res('sun-miner', 'Sun Miner')
			.isBuildable()
			.configure('locked',true)
			.isSpaceRocket('Mining')
			.setMachine({
				energy:1000000,
			},{
				pyrome:0.01,
			})
			.configure('buildName',"Build a spaceship to mine pyrome, a metal only found in the core of stars.")
			.finalize()
		new Res('hypersonic-shuttle', 'Hypersonic Shuttle')
			.isBuildable()
			.configure('locked',true)
			.configure('buildName',"Build a hypersonic shuttle, which can travel faster than sound in a vacuum.")
			.finalize()

		//storage buildings
		new Res('barns', 'Barns')
			.configure('buildName','Complete a barn')
			.isBuildable()
			.configure('locked', true)
			.isSpaceLocked()
			.finalize()
		new Res('industrial-warehouse', 'Industrial Warehouses')
			.configure('buildName','Maintain a monolithic industrial warehouse')
			.isSpaceLocked()
			.isBuildable()
			.finalize()
		new Res('shadow-storage-facility', 'Shadow Storage Facility')
			.configure('buildName','Create a facility to store shadows on Earth.')
			.isSpaceLocked()
			.isBuildable()
			.finalize()
		new Res('pocket-storage-dimension', 'Pocket Storage Dimension')
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
		new Res('frostium-core', 'Frostium Core')
			.isBuildable()
			.hasCSS({'color':'lightblue','text-shadow':'0px 0px 2px blue'})
			.configure('locked',true)
			.configure('buildName','Shape a Frostium core')
			.finalize()
		new Res('frostium-battery', 'Frostium Battery')
			.isBuildable()
			.hasCSS({'color':'lightblue','text-shadow':'0px 0px 2px blue'})
			.configure('buildName','Put a shell around a Frostium core')
			.setMachine({},{
				'frostium-energy':1,
			})
			.finalize()
		new Res('shadow-collector', 'Shadow Collector')
			.isBuildable()
			.hasCSS({'text-shadow':'0px 0px 2px black'})
			.configure('buildName','Construct a Shadow Collector.')
			.addInactiveState()
			.isSpaceLocked()
			.configure('locked',true)
			.setMachine({
				'frostium-energy':10
			},{
				'shadows':0.0001,
			})
			.finalize()
		new Res('frostium-furnace', 'Frostium Furnace')
			.configure('locked',true)
			.configure('buildName','Make a Frostium Furnace')
			.isBuildable()
			.hasCSS({'color':'lightblue','text-shadow':'0px 0px 2px blue'})
			.finalize()
		new Res('planet-grinder', 'Planet Grinder')
			.isBuildable()
			.hasCSS({'color':'red','text-shadow':'0px 0px 2px red'})
			.configure('buildName','Make a Planet Grinder.')
			.addInactiveState()
			.isSpaceLocked()
			.setMineMachine({
				'frostium-energy':10
			},{
				'copper-ore':1000000,
				'iron-ore':1000000,
				'tungsten-ore':10000,
				'titanium-ore':50000,
				'wood':10000
			})
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
		new Res('bucket-of-water', 'Bucket of Water')
			.configure('buildName','Fill a bucket with water')
			.isBuildable()
			.isSpaceLocked()
			.finalize()
		new Res('incendinary-pile', 'Incendinary Pile')
			.configure('buildName','Dump a bunch of wood in a pile to burn.')
			.isBuildable()
			.isSpaceLocked()
			.configure('locked', true)
			.setMachine({
				'incendinary-pile':0.04
			},{
				fire:1.1
			})
			.finalize()
		new Res('coal-incendinary-pile', 'Coal Incendinary Pile')
			.configure('buildName','Dump a bunch of coal in a pile to burn.')
			.isBuildable()
			.isSpaceLocked()
			.configure('locked', true)
			.setMachine({
				'coal-incendinary-pile':0.32
			},{
				fire:16
			})
			.finalize()
		new Res('computer-disk', 'Computer disk')
			.configure('storage',Infinity)
			.finalize()
		new Res('computer', 'Computers')
			.configure('buildName','Forge a computer')
			.isBuildable()
			.finalize()
		//resource buildings
		new Res('stone-furnace', 'Stone Furnace')
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
		new Res('industrial-smelter', 'Industrial Smelter')
			.configure('buildName','Build an Industrial Smelter')
			.isBuildable()
			.isSpaceLocked()
			.configure("locked",true)
			.finalize()
		new Res('stone-miner', 'Stone Miner')
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
				'compressed-iron':0.01
			})
			.finalize()
		new Res('pressurizer', 'Pressurizer')
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
			.configure('buildName','Make a Pressurizer')
			.finalize()
		new Res('asteroid-miner', 'Asteroid Miner')
			.isBuildable()
			.configure('buildName','Create an Asteroid Miner to get precious resources from nearby asteroids')
			.configure('locked',true)
			.addInactiveState()
			.setMineMachine({
				'energy':10
			},{
				'tungsten':1000,
				'titanium':2000,
				'iron':10000,
				'copper':10000,
				'stone':30000,
				'molten-diomine':1,
				'trishardic-geode':0.001,
			})
			.finalize()
		//gasses deprecated
		new Res('smoke', 'Smoke')
			.configure('storage', Infinity)
			.finalize()
		new Res('boiling-water', 'Boiling Water')
			.isBuildable()
			.finalize()
		new Res('steam', 'Steam')
			.configure('storage', Infinity)
			.finalize()
		//energy producers
		new Res('steam-engine', 'Steam Engine')
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
		new Res('combustion-engine', 'Combustion Engine')
			.configure('buildName','Craft a combustion engine')
			.isBuildable()
			.isSpaceLocked()
			.addInactiveState()
			.configure('locked', true)
			.setMachine({
				fire:0.1
			},{
				energy:1
			})
			.finalize()
		new Res('fire-starter', 'Fire Starter')
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
		new Res('solar-panel', 'Solar Panel')
			.configure('buildName','Discover the joys of solar panels.')
			.isBuildable()
			.setMachine({},{
				energy:0.2
			})
			.configureSpaceMachine({multiplier:2})
			.finalize()
		new Res('solar-panel-satellite', 'Solar Panel Satellite')
			.isBuildable()
			.configure('buildName','Make a satellite to charge your space station.')
			.configure('locked',true)
			.setMachine({},{
				'energy':20,
			})
			.finalize()
		//special
		new Res('solar-panel-satellite-cluster', 'Solar Panel Satellite Cluster')
			.isBuildable()
			.configure('buildName','Arrange satellites to catch as much sunlight as possible')
			.configure('locked',true)
			.setMachine({},{
				'energy':50000,
			})
			.finalize()
		//special
		new Res('spit', 'Spit')
			.isBuildable()
			.isSpaceLocked()
			.configure('buildName','Create a spit')
			.configure('storage', 1)
			.isSpaceLocked()
			.finalize()
		new Res('adaptation-chamber', 'Adaptation Chamber')
			.isBuildable()
			.isSpaceLocked()
			.configure('storage', 1)
			.configure('buildName','Erect an adaptation chamber')
			.finalize()
		new Res('rocket-launcher', 'Rocket Launcher')
			.isBuildable()
			.isSpaceLocked()
			.configure('storage', 1)
			.configure('buildName','Construct a rocket launcher')
			.finalize()
		//things that just literally never show up in the actual resTable, and are part of a category that never shows up so the developer gave it a stupid name.
		new Res('galactic-credits', 'Galatic Credits')
			.configure('storage',Infinity)
			.finalize()
		new Res('fluid-storage',confusedText)
			.configure('storage',0)
			.finalize()
		new Res('water','Water')
			.isFluid(1)
			.finalize()
	})()
	if(godMode){
		data.resTable['steam'].amount=199
		data.resTable['gift-god'].amount=1
		data.spaceResCounts['gift-god'].amount=1
		data.resTable['fire'].amount=5000000
		data.computerOpacity = 0.9
	}
	//Init stocks
	for(let i=0;i<10;i++){
		addStock(stockCreator(data.stockNamePool))
	}
	//Init Checks
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
		app.machineStates['incendinary-pile'].results.fire*=1.5
	},'Explosive Techniques','How to blow things up better: A guide.',{
		'wood':200,
		'coal':20
	})
	addAdaptation(
		[(app)=>{return app.resTable['coal'].amount>0&&app.completedAdaptations.includes('Explosive Techniques')}],(app)=>{
		app.resTable['coal-incendinary-pile'].locked = false
	},'Advanced Explosive Techniques','How to blow more things up betterer: A guide.',{
		'wood':500,
		'coal':200
	})
	addAdaptation(
		[],(app)=>{
		App.addTab('Produc. Stats','production-statistics')
	},'Production Statistics','Unleash your inner control freak.',{
		'iron':1000,
		'copper':1000
	})
	//iron handling
	addAdaptation(
		[],(app)=>{
		app.resTable['compressor'].locked = false
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
	},'Iron compressing 2','Truer uselessness.',{
		'stone':10000,
		'copper':10000,
		'compressed-iron':1000,
		'titanium':5000
	})
	addAdaptation(
		[
		(app)=>{
			return app.spaceResCounts['trishardic-geode'].amount>0
		}
	],(app)=>{
		app.resTable['industrial-smelter'].spaceLocked = false
		app.resTable['industrial-smelter'].locked = false
	},'Advanced gem working','To give your planets that extra sparkling touch',{
		'iron':100000,
		'duranium':100000
	},true)
	//furnaces
	addAdaptation(
		[
		(app)=>{
			return app.jobCount('stone-furnace')>=10
		}
	],(app)=>{
		app.machineStates['stone-furnace'].resourcesNeeded.stone*=0.8
	},'Efficient furnaces','Very useful',{
		'wood':100,
		'stone':100
	})
	addAdaptation(
		[
		(app)=>{
			return app.jobCount('stone-furnace')>=100&&app.completedAdaptations.includes('Efficient Furnaces')
		}
	],(app)=>{
		app.machineStates['stone-furnace'].resourcesNeeded.stone*=0.8
	},'Super efficient furnaces','Furnace stone consumption -20%',{
		'wood':1000,
		'stone':1000,
		'iron':100
	})
	addAdaptation(
		[
		(app)=>{
			return app.jobCount('stone-furnace')>=1000&&app.completedAdaptations.includes('Super efficient furnaces')
		}
	],(app)=>{
		app.machineStates['stone-furnace'].resourcesNeeded.stone*=0.7
	},'Super duper efficient furnaces','Furnace stone consumption -30%',{
		'titanium':1000,
		'stone':100000,
		'compressed-iron':1000
	})
	addAdaptation(
		[
		(app)=>{
			return app.jobCount('stone-furnace')>=10000&&app.completedAdaptations.includes('Super duper efficient furnaces')
		}
	],(app)=>{
		app.machineStates['stone-furnace'].resourcesNeeded.stone*=0.5
	},'Most efficient furnaces','Furnace stone consumption -50%',{
		'tungsten':10000,
		'steel':1000,
	})
	addAdaptation(
		[
		(app)=>{
			return app.jobCount('stone-furnace')>=20000&&app.completedAdaptations.includes('Most efficient furnaces')
		}
	],(app)=>{
		app.machineStates['stone-furnace'].resourcesNeeded.stone*=0.25
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
		app.$set(app.machineStates['stone-furnace'].results,'titanium',0.0005)
	},'Titanium making furnaces','Furnace produce titanium',{
		'titanium':10000,
	})
	addAdaptation(
		[
		(app)=>{
			return app.resTable['tungsten'].amount>0&&app.completedAdaptations.includes('Titanium making furnaces')
		}
	],(app)=>{
		app.$set(app.machineStates['stone-furnace'].results,'tungsten',0.00001)
	},'Tungsten making furnaces','Furnace produce tiny amounts of tungsten',{
		'tungsten':10000,
	})
	addAdaptation(
		[
		(app)=>{
			return app.resTable['gold'].amount>0&&app.completedAdaptations.includes('Tungsten making furnaces')
		}
	],(app)=>{
		app.$set(app.machineStates['stone-furnace'].results,'gold',1e-30)
	},'Gold making furnaces','Furnace produce 1e-30 gold per tick (1 on a nonillion)',{
		'gold':10000,
	})
	//solar panels
	addAdaptation(
		[
		(app)=>{
			return app.resTable['solar-panel'].amount>=5
		}
	],(app)=>{
		app.machineStates['solar-panel'].results.energy*=1.5
		app.spaceMachineStates['solar-panel'].results.energy*=1.5
		app.spaceMachineStates['solar-panel-satellite'].results.energy*=1.5
		app.spaceMachineStates['solar-panel-satellite-cluster'].results.energy*=1.5
	},'Pholtovaic cells I','More powerful solar panels',{
		'iron':250,
		'copper':250
	})
	addAdaptation(
		[
		(app)=>{
			return app.resTable['solar-panel'].amount>=50&&app.completedAdaptations.includes('Pholtovaic cells I')
		}
	],(app)=>{
		app.machineStates['solar-panel'].results.energy*=1.75
		app.spaceMachineStates['solar-panel'].results.energy*=1.75
		app.spaceMachineStates['solar-panel-satellite'].results.energy*=1.75
		app.spaceMachineStates['solar-panel-satellite-cluster'].results.energy*=1.75
	},'Pholtovaic cells II','Even more powerful solar panels',{
		'iron':5000,
		'copper':5000,
		'compressed-iron':100,
	})
	addAdaptation(
		[
		(app)=>{
			return app.resTable['solar-panel'].amount>=1000&&app.completedAdaptations.includes('Pholtovaic cells II')
		}
	],(app)=>{
		app.machineStates['solar-panel'].results.energy*=2
		app.spaceMachineStates['solar-panel'].results.energy*=2
		app.spaceMachineStates['solar-panel-satellite'].results.energy*=2
		app.spaceMachineStates['solar-panel-satellite-cluster'].results.energy*=2
	},'Pholtovaic cells III','Super powerful solar panels',{
		'iron':10000,
		'copper':10000,
		'compressed-iron':10000,
		'tungsten':1000
	})
	addAdaptation(
		[
		(app)=>{
			return app.resTable['solar-panel'].amount>=10000&&app.completedAdaptations.includes('Pholtovaic cells III')
		}
	],(app)=>{
		app.machineStates['solar-panel'].results.energy*=2.25
		app.spaceMachineStates['solar-panel'].results.energy*=2.25
		app.spaceMachineStates['solar-panel-satellite'].results.energy*=2.25
		app.spaceMachineStates['solar-panel-satellite-cluster'].results.energy*=2.25
	},'Pholtovaic cells IV','Super-duper powerful solar panels',{
		'iron':500000,
		'copper':250000,
		'compressed-iron':10000,
		'tungsten':20000,
		'steel':10000,
	})
	addAdaptation(
		[
		(app)=>{
			return app.resTable['solar-panel'].amount>=50000&&app.completedAdaptations.includes('Pholtovaic cells IV')
		}
	],(app)=>{
		app.machineStates['solar-panel'].results.energy*=2.5
		app.spaceMachineStates['solar-panel'].results.energy*=2.5
		app.spaceMachineStates['solar-panel-satellite'].results.energy*=2.5
		app.spaceMachineStates['solar-panel-satellite-cluster'].results.energy*=2.5
	},'Pholtovaic cells V','Incredibly powerful solar panels',{
		'iron':1000000,
		'copper':500000,
		'compressed-iron':50000,
		'tungsten':50000,
		'steel':20000,
		'duranium':10000,
	})
	addAdaptation(
		[
		(app)=>{
			return app.resTable['solar-panel'].amount>=200000&&app.completedAdaptations.includes('Pholtovaic cells V')
		}
	],(app)=>{
		app.machineStates['solar-panel'].results.energy*=2.75
		app.spaceMachineStates['solar-panel'].results.energy*=2.75
		app.spaceMachineStates['solar-panel-satellite'].results.energy*=2.75
		app.spaceMachineStates['solar-panel-satellite-cluster'].results.energy*=2.75
	},'Pholtovaic cells VI','Ridiculously powerful solar panels',{
		'iron':5000000,
		'copper':2500000,
		'compressed-iron':250000,
		'tungsten':250000,
		'steel':100000,
		'duranium':100000,
	})
	addAdaptation(
		[
		(app)=>{
			return app.resTable['solar-panel'].amount>=1000000&&app.completedAdaptations.includes('Pholtovaic cells VI')
		}
	],(app)=>{
		app.machineStates['solar-panel'].results.energy*=3
		app.spaceMachineStates['solar-panel'].results.energy*=3
		app.spaceMachineStates['solar-panel-satellite'].results.energy*=3
		app.spaceMachineStates['solar-panel-satellite-cluster'].results.energy*=3
	},'Pholtovaic cells VII','Way too powerful solar panels',{
		'iron':20000000,
		'copper':400000,
		'compressed-iron':2500000,
		'tungsten':2500000,
		'steel':10000000,
		'duranium':1000000,
		'frostium':1000
	})
	addAdaptation(
		[
		(app)=>{
			return app.resTable['solar-panel'].amount>=2000000&&app.completedAdaptations.includes('Pholtovaic cells VII')
		}
	],(app)=>{
		app.machineStates['solar-panel'].results.energy*=3.25
		app.spaceMachineStates['solar-panel'].results.energy*=3.25
		app.spaceMachineStates['solar-panel-satellite'].results.energy*=3.25
		app.spaceMachineStates['solar-panel-satellite-cluster'].results.energy*=3.25
	},'Pholtovaic cells VIII','Can anything be this powerful',{
		'iron':20000000,
		'copper':400000,
		'compressed-iron':2500000,
		'tungsten':2500000,
		'steel':10000000,
		'duranium':1000000,
		'frostium':1000
	})
	addAdaptation(
		[
		(app)=>{
			return app.resTable['solar-panel'].amount>=10000000&&app.completedAdaptations.includes('Pholtovaic cells VIII')
		}
	],(app)=>{
		app.machineStates['solar-panel'].results.energy*=3.5
		app.spaceMachineStates['solar-panel'].results.energy*=3.5
		app.spaceMachineStates['solar-panel-satellite'].results.energy*=3.5
		app.spaceMachineStates['solar-panel-satellite-cluster'].results.energy*=3.5
	},'Pholtovaic cells IX','Please stop.',{
		'iron':200000000,
		'copper':4000000,
		'compressed-iron':7500000,
		'tungsten':25000000,
		'steel':62500000,
		'duranium':2500000,
		'frostium':2500000
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
		'compressed-iron':100,
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
		'compressed-iron':100,
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
		app.setMessage('I\'ve got to find a way to stop their tyranny.')
			return app.jobCount('robot')>=200000&&app.completedAdaptations.includes('Duranium droids')
		}
	],(app)=>{
		app.multipliers['.mnr']*=1.75
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
		app.resTable['frostium-core'].locked = false
		app.addBuilding('frostium-core')
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
		app.addSpaceBuilding('shadow-collector')
		app.addBuilding('shadow-storage-facility')
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
	addExtension(['.asmblr','Assembler','assembler',
	(app,number)=>{
	assembler = new Assembler(app.resTable)
	return {'assembler':{'resources':assembler.resTable.data,
	'constructBuilding':(name,amount)=>{
		assembler.buildBuilding(app,name,amount,number)
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
	\nTo mine resources you have to run miner.mineResource(\'resource-you-want-to-mine\'). For some reason the resource has to be all lowercase, and with hyphens instead of spaces\
	\nFor instance miner.mineResource(\'stone\') mines stone and miner.mineResource('iron-ore') mines Iron Ore\
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
