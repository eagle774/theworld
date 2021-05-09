let buildingsData = {
  "fire": {
    "type":"building",
    "cost": {
      "wood": 2,
      "flintAndSteel": 0.01
    },
    "effects": [
      {"funcName":"setCheck","args":['fireMade',true]}
    ],
		"tooltip":"Don't touch it.",
    'category':'Utility'
  },
  "steamEngine": {
    "type":"building",
    "cost": {
      "iron": 10,
      "copper": 5
    },
		"tooltip":"No need for small electric poles",
    'category':'Energy',
    'effects':[
      {"funcName":"incrementResourceSpecial","args":['energy','storage',50]},
    ]
  },
  "bucket": {
    "type":"building",
    "cost": {
      "wood": 5
    },
		"tooltip":"Full of holes.",
    'category':'Utility'
  },
  "barn": {
    "type":"building",
    "cost": {
      "wood":30
    },
    "effects": [
      {"funcName":"incrementResourceSpecial","args":['wood','storage',50]},
      {"funcName":"incrementResourceSpecial","args":['iron','storage',20]},
      {"funcName":"incrementResourceSpecial","args":['gold','storage',0.1]},
      {"funcName":"incrementResourceSpecial","args":['tungsten','storage',1]},
      {"funcName":"incrementResourceSpecial","args":['ice','storage',1000]},
      {"funcName":"incrementResourceSpecial","args":['titanium','storage',5]},
      {"funcName":"incrementResourceSpecial","args":['compressedIron','storage',1]},
      {"funcName":"incrementResourceSpecial","args":['copper','storage',20]},
      {"funcName":"incrementResourceSpecial","args":['stone','storage',100]},
      {"funcName":"incrementResourceSpecial","args":['steel','storage',5]},
      {"funcName":"incrementResourceSpecial","args":['coal','storage',200]},
      {"funcName":"incrementResourceSpecial","args":['germanium','storage',1]},
      {"funcName":"incrementResourceSpecial","args":['ironOre','storage',100]},
      {"funcName":"incrementResourceSpecial","args":['goldOre','storage',1]},
      {"funcName":"incrementResourceSpecial","args":['tungstenOre','storage',5]},
      {"funcName":"incrementResourceSpecial","args":['titaniumOre','storage',25]},
      {"funcName":"incrementResourceSpecial","args":['copperOre','storage',100]},
    ],
    "tooltip":"Big enough to store resources",
    'category':'Storage'
  },
  "robot": {
    "type":"building",
    "cost": {
      "iron": 20,
      "copper": 20
    },
    "effects":[
      {'funcName':'addTab','args':['Robot','robot',true]},
      {'funcName':'addTab','args':['Scripts','scripts',true]},
      {'funcName':'addTab','args':['Mining','mining',true]}
    ],
		"tooltip":"Dormant",
    'category':'Technical'
  },
  "bucketOfWater": {
    "type":"building",
    "cost": {
      "bucket": 1
    },
    "effects": [
      {"funcName":"setCheck","args":['bucketWaterMade',true]}
    ],
		"tooltip":"Why doesn't this leak?",
    'category':'Utility'
  },
  "planetGrinder": {
    "type":"building",
    "cost": {
      "frostiumCore": 5,
      "frostium":1000,
      "steel":1000000,
      "tungsten":500000,
      "frostiumBattery":2,
    },
		"tooltip":"The one remaining reminder of the war",
    'category':'Advanced Metal Working',
    "effects": [
      {"funcName":"setMessageIfCheck","args":['Broken planets. Dying races. Chaos.','notPlanetGrinderMade']},
      {"funcName":"setCheck","args":['notPlanetGrinderMade',false]},
      {'funcName':'addBuilding','args':['frostiumFurnace']},
    ],
  },
  "shadowCollector": {
    "type":"building",
    "cost": {
      "frostiumCore": 10,
      "frostiumBattery":10,
    },
		"tooltip":"It sucks in the light. (Requires frostium energy)",
    'category':'Shadows',
    'effects':[
      {'funcName':'addBuilding','args':['wirelessEnergyTransferer']}
    ]
  },
  "spit": {
    "type":"building",
    "cost": {
      "bucket": 1,
      "wood": 2
    },
    "effects": [
      {"funcName":"setCheck","args":['spitMade',true]}
    ],
		"tooltip":"What's the bucket for?",
    'category':'Special'
  },
  "hangbucket": {
    "type":"process",
    "cost": {
      "bucketOfWater": 1
    },
    "results": {
      "bucket": 1,
      "boilingWater": 200
    },
    'buildName':'Hang a bucket on the spit'
  },
  "computer": {
    "type":"building",
    "cost": {
      "iron": 20
    },
    "effects":[
      {'funcName':'addTab','args':['Computer','computer',true]},
      {'funcName':'configureResource','args':['robot','locked',false]},
      {'funcName':'configureResource','args':['combustionEngine','locked',false]}
    ],
		"tooltip":"This takes a suprisingly small amount of resources",
    'category':'Special'
  },
  "stoneMiner": {
    "type":"building",
    "cost": {
      "stone": 10,
      'iron':2,
      'copper':2
    },
		"tooltip":"Mine stone to make a stone miner to mine stone",
    'category':'Technical'
  },
  "fireStarter": {
    "type":"building",
    "cost": {
      "wood": 20,
      'iron':50,
      'copper':50,
      "coal":5
    },
		"tooltip":"What could possibly go wrong?",
    'category':'Technical'
  },
  "stoneFurnace": {
    "type":"building",
    "cost": {
      "stone": 20
    },
		"tooltip":"Watch out for that inserter",
    'category':'Metal Machine'
  },
  "adaptationChamber": {
    "type":"building",
    "cost": {
      "stone": 100,
      "iron":100,
      "copper":100
    },
    "effects":[
      {'funcName':'addTab','args':['Adaptations','adaptation',true]}
    ],
    'category':'Special'
  },
  "compressor": {
    "type":"building",
    "cost": {
      "stone": 200,
      "iron":200,
      "copper":250
    },
    'tooltip':'Compressed unhelpfulness',
    'category':'Metal Machine'
  },
  "assembler": {
    "type":"building",
    "cost": {
      "iron":10000,
      "copper":10000,
      "compressedIron":1000,
      "frostium":10,
    },
    'tooltip':'The only good way to make science packs.',
    'category':'Metal Machine'
  },
  "pressurizer": {
    "type":"building",
    "cost": {
      "stone": 500,
      "compressedIron":100,
      "copper":200,
      "titanium":2000,
    },
    'category':'Metal Machine'
  },
  "spacePressurizer": {
    "type":"building",
    "cost": {
      "compressedIron":1000,
      "copper":2000,
      "titanium":20000,
    },
    'category':'Metal Machine'
  },
  "rocketLauncher": {
    "type":"building",
    "cost": {
      "stone":10000000000,
      "iron":1500000000,
      "copper":1500000000,
      "steel":80000000,
      "tungsten":150000000,
      "duranium":1000000,
      "frostiumCore":50000
    },
    "effects":[
      {'funcName':'addTab','args':['Rocket Launching','rocketSilo',true]},
      {"funcName":"setMessageIfCheck","args":['The commanders, leading their rocket ships into a massacre.','notRocketLauncherMade']},
      {"funcName":"setCheck","args":['notRocketLauncherMade',false]},
    ],
    'category':'Special',
    'tooltip':'Shoot big explosive things. What could be better than that?'
  },
  "incendinaryPile": {
    "type":"building",
    "cost": {
      "wood": 50
    },
    'category':'Utility',
    'tooltip':'Perform pagan rituals to get them on fire'
  },
  "coalIncendinaryPile": {
    "type":"building",
    "cost": {
      "coal": 100
    },
    'category':'Utility',
    'tooltip':'Now to wait for a lightning strike.'
  },
  "alloyer": {
    "type":"building",
    "cost": {
      "iron":20000,
      "copper":20000,
      "titanium":5000,
      "tungsten":5000,
      "steel":5000
    },
    "effects":[
      {'funcName':'onlyRunOutOfSpace','args':[[
        {'funcName':'incrementResourceSpecial','args':['fluidStorage','storage',10000]},
      ]]},
      {'funcName':'onlyRunInSpace','args':[[
        {'funcName':'addTab','args':['Space Fluids','fluidSpace',true]},
        {'funcName':'incResSpace','args':['fluidStorage',10000]},
      ]]},
      {'funcName':'updateFluids','args':[false]},
      {'funcName':'addBuilding','args':['fluidStorageTank']},
    ],
    'category':'Fluid Handling',
  },
  "cooler": {
    "type":"building",
    "cost": {
      "iron":20000,
      "copper":20000,
      "titanium":5000,
      "tungsten":5000,
      "steel":5000
    },
    "effects":[
      {'funcName':'onlyRunOutOfSpace','args':[[
        {'funcName':'incrementResourceSpecial','args':['fluidStorage','storage',10000]},
      ]]},
      {'funcName':'onlyRunInSpace','args':[[
        {'funcName':'addTab','args':['Space Fluids','fluidSpace',true]},
        {'funcName':'incResSpace','args':['fluidStorage',10000]},
      ]]},
      {'funcName':'updateFluids','args':[false]},
      {'funcName':'addBuilding','args':['fluidStorageTank']},
    ],
    'category':'Fluid Handling',
  },
  "melter": {
    "type":"building",
    "cost": {
      "iron":20000,
      "copper":20000,
      "titanium":5000,
      "tungsten":5000,
      "steel":5000
    },
    "effects":[
      {'funcName':'addTab','args':['Fluids','fluid',true]},
      {'funcName':'onlyRunOutOfSpace','args':[[
        {'funcName':'incrementResourceSpecial','args':['fluidStorage','storage',10000]},
      ]]},
      {'funcName':'configureResource','args':['alloyer','locked',false]},
      {'funcName':'configureResource','args':['cooler','locked',false]},
      {'funcName':'addBuilding','args':['alloyer']},
      {'funcName':'addBuilding','args':['cooler']},
      {'funcName':'onlyRunInSpace','args':[[
        {'funcName':'addTab','args':['Space Fluids','fluidSpace',true]},
        {'funcName':'incResSpace','args':['fluidStorage',10000]},
      ]]},
      {'funcName':'updateFluids','args':[false]},
    ],
    'category':'Fluid Handling',
  },
  "fluidStorageTank": {
    "type":"building",
    "cost": {
      "compressedIron":10000,
    },
    "effects":[
      {'funcName':'onlyRunOutOfSpace','args':[[
        {'funcName':'incrementResourceSpecial','args':['fluidStorage','storage',40000]},
      ]]},
      {'funcName':'onlyRunInSpace','args':[[
        {'funcName':'incResSpace','args':['fluidStorage',40000]},
      ]]},
      {'funcName':'updateFluids','args':[false]},
    ],
    'category':'Fluid Handling',
  },
  "solarPanel": {
    "type":"building",
    "cost": {
      "iron":40,
      "copper":40
    },
    'tooltip':'To prevent chinese hoaxes',
    'category':'Energy',
    'effects':[
      {"funcName":"incrementResourceSpecial","args":['energy','storage',20]},
    ]
  },
  "pump": {
    "type":"building",
    "cost": {
      "tungsten":5000,
      "duranium":100
    },
    'tooltip':'Watertight? Why does that matter?',
    'category':'Fluid Handling'
  },
  "frostiumCore":{
    "type":"building",
    "cost": {
      "frostium":1000
    },
    'tooltip':'It glows with an ethereal light',
    'category':'Advanced Metal Working',
    "effects": [
      {"funcName":"setMessageIfCheck","args":['So small to have caused such destruction','notFrostiumCoreMade']},
      {"funcName":"setMessageCSSIfCheck","args":[{'color':'lightblue','text-shadow':'0px 0px 2px blue'},'notFrostiumCoreMade']},
      {"funcName":"setCheck","args":['notFrostiumCoreMade',false]},
      {"funcName":"addBuilding","args":['planetGrinder']},
    ],
  },
  "burningCore":{
    "type":"building",
    "cost": {
      "temperedPyrome":1000,
      "shadows":2000,
      "stardust":100000,
    },
    'tooltip':'A mix of pyrome and shadows that disintegrates over time.',
    'category':'Advanced Metal Working',
    "effects": [
      {"funcName":"addSpaceBuilding","args":['pyromeMaterializer']},
    ],
  },
  "wirelessEnergyTransferer":{
    "type":"building",
    "cost": {
      "shadows":1,
      "frostium":100
    },
    'tooltip':'The pinnacle of energy transfer technology',
    'category':'Energy',
    'effects':[
      {'funcName':'addSpaceBuilding','args':['matterTransporter']}
    ]
  },
  "matterTransporter":{
    "type":"building",
    "cost": {
      "shadows":10,
      "steel":1000
    },
    'tooltip':'The pinnacle of matter transfer technology',
    'category':'Shadows',
    'effects':[
      {'funcName':'addTab','args':['Space M.T.','spaceMT',true]}
    ]
  },
  "asteroidMiner":{
    "type":"building",
    "cost": {
      "steel":10000,
      "tungsten":10000,
      "frostiumBattery":10,
      "wirelessEnergyTransferer":1,
      "matterTransporter":1
    },
    'tooltip':'Send friendly robots out into space to gather resources.',
    'category':'Shadows',
    'effects':[
      {'funcName':'addTab','args':['Space Resources','spaceResources',true]},
      {"funcName":"setMessageIfCheck","args":['Maybe if I had some fluid storage I could store more of what this brings back.','notAsteroidMinerMade']},
      {"funcName":"setCheck","args":['notAsteroidMinerMade',false]},
    ]
  },
  "pyromeMaterializer":{
    "type":"building",
    "cost": {
      "burningCore":5
    },
    'tooltip':'100% guaranteed to work or your money back.',
    'category':'Advanced Metal Working',
    "effects": [
      {"funcName":"addSpaceBuilding","args":['pyromeInfuser']},
    ],
  },
  "pyromeInfuser":{
    "type":"building",
    "cost": {
      "temperedPyrome":1000,
      "aeromineGlass":1000,
    },
    'tooltip':'Infuse depleted pyrome with way too much energy',
    'category':'Advanced Metal Working',
  },
  "carbonFactory":{
    "type":"building",
    "cost": {
      "steel":1000000,
      "assembler":10000,
    },
    'tooltip':'A way to make carbon nanotubes.',
    'category':'Advanced Metal Working'
  },
  "nanobotFactory":{
    "type":"building",
    "cost": {
      "steel":1000000,
      "assembler":1000,
      "carbonNanotubes":500000,
    },
    'tooltip':'Nanobots can build big things.',
    'category':'Advanced Metal Working'
  },
  "asteroidMinerFactory":{
    "type":"building",
    "cost": {
      "steel":10000000,
      "temperedPyrome":67890,
      "assembler":10000,
      "nanobots":5000000,
    },
    'tooltip':'Nanobots can build big things.',
    'category':'Advanced Metal Working'
  },
  "diomineManufacturer":{
    "type":"building",
    "cost": {
      "steel":1000000,
      "frostium":1000000,
    },
    'tooltip':'Batteries not included',
    'category':'Advanced Metal Working'
  },
  "solarPanelSatellite":{
    "type":"building",
    "cost": {
      "wirelessEnergyTransferer":1,
      "solarPanel":20,
      "frostium":1000
    },
    'tooltip':'A satellite to collect energy',
    'category':'Energy',
    'effects':[
      {'funcName':'addSpaceBuilding','args':['solarPanelSatelliteCluster']}
    ]
  },
  "solarPanelSatelliteCluster":{
    "type":"building",
    "cost": {
      "solarPanelSatellite":1000,
    },
    'tooltip':'A satellite cluster is more efficient',
    'category':'Energy',
    'effects':[
      {'funcName':'addSpaceBuilding','args':['solarPanelSatelliteGroup']}
    ]
  },
  "solarPanelSatelliteGroup":{
    "type":"building",
    "cost": {
      "solarPanelSatelliteCluster":10000,
    },
    'tooltip':'Wholly covering vast areas the sun.',
    'category':'Energy',
    'effects':[
      {'funcName':'addSpaceBuilding','args':['dysonSwarm']}
    ]
  },
  "dysonSwarm":{
    "type":"building",
    "cost": {
      "solarPanelSatelliteGroup":100000,
    },
    'tooltip':'Surrounding the sun.',
    'category':'Energy',
  },
  "dysonSphere":{
    "type":"building",
    "cost": {
      "dysonSwarm":100000,
      "iron":1000000000000000,
      "copper":1000000000000000,
      "frostium":1000000000000,
      "aeromineGlass":1000000000,
      "emerald":1000000000,
    },
    'tooltip':'Encompassing the sun.',
    'category':'Energy',
  },
  "hypersonicShuttle":{
    "type":"spaceRocket",
    "cost": {
      "matterTransporter":1,
      "frostium":200000,
      'steel':1000,
      "basicRadar":1,
      "basicEngine":1
    },
    'tooltip':'Travels faster than sound in a vacuum',
    'category':'Space Rocket Base',
  },
  "basicTankShip":{
    "type":"spaceRocket",
    "cost": {
      "basicRadar":1,
      "basicEngine":1,
      "basicCannon":1,
    },
    'tooltip':'I\'m just building these to get the dyson sphere plans.',
    'category':'Space Rocket Base',
  },
  "sturdyTankShip":{
    "type":"spaceRocket",
    "cost": {
      "advancedRadar":1,
      "advancedThruster":1,
      "advancedCannon":1,
    },
    'tooltip':'Good for absorbing destructor fire -  and sadly war seems imminent.',
    'category':'Space Rocket Base',
  },
  "forcefieldTankShip":{
    "type":"spaceRocket",
    "cost": {
      "advancedRadar":1,
      "advancedThruster":1,
      "blazingCannon":1,
      "forcefieldGenerator":1,
    },
    'tooltip':'Can take quite a beating from enemy ships.',
    'category':'Space Rocket Base',
  },
  "basicSniperShip":{
    "type":"spaceRocket",
    "cost": {
      "basicRadar":1,
      "advancedThruster":1,
      "basicHull":1,
      "basicLaser":1,
    },
    'tooltip':'I only need these to protect myself.',
    'category':'Space Rocket Base',
  },
  "advancedSupportShip":{
    "type":"spaceRocket",
    "cost": {
      "advancedRadar":1,
      "basicHull":1,
      "advancedThruster":1,
      "advancedRepairSuits":1,
    },
    'tooltip':'It\'s for the good of everyone to start the war.',
    'category':'Space Rocket Base',
  },
  "teleporterSupportShip":{
    "type":"spaceRocket",
    "cost": {
      "detailedRadar":1,
      "strongHull":1,
      "teleporterStation":1,
    },
    'tooltip':'Dodging out of the way.',
    'category':'Space Rocket Base',
  },
  "advancedSniperShip":{
    "type":"spaceRocket",
    "cost": {
      "advancedRadar":1,
      "advancedThruster":1,
      "focusedLaser":1,
      "basicHull":1,
    },
    'tooltip':'If the galactic council doesn\'t start the war, I will, to stop their tyranny.',
    'category':'Space Rocket Base',
  },
  "directSniperShip":{
    "type":"spaceRocket",
    "cost": {
      "detailedRadar":1,
      "hyperdrive":1,
      "phasingTurret":1,
      "basicHull":1,
    },
    'tooltip':'It can\'t hit your own ships.',
    'category':'Space Rocket Base',
  },
  "basicSupportShip":{
    "type":"spaceRocket",
    "cost": {
      "basicRadar":1,
      "basicEngine":1,
      "basicHull":1,
      "basicRepairSuits":1,
      "basicHull":1,
    },
    'tooltip':'It\'s not my fault if I have to use these.',
    'category':'Space Rocket Base',
  },
  "sunMiner":{
    "type":"spaceRocket",
    "cost": {
      "matterTransporter":1,
      "basicEngine":1,
      "heatResistantHull":1,
      "basicRadar":1,
      "wirelessEnergyTransferer":1,
    },
    'tooltip':'An important step to freedom',
    'category':'Space Rocket Base',
  },
  "shadowTrawler": {
    "type":"spaceRocket",
    "cost": {
      "matterTransporter":1,
      "advancedThruster":1,
      "strongHull":1,
      "detailedRadar":1,
      "wirelessEnergyTransferer":1,
    },
		"tooltip":"It sucks in the light. (Requires frostium energy)",
    'category':'Shadows',
    'effects':[
      {'funcName':'addBuilding','args':['wirelessEnergyTransferer']}
    ]
  },
  "basicHull":{
    "type":"rocketPart",
    "cost": {
      'steel':100000,
      "iron":1000000,
    },
    'tooltip':'Mediocre',
    'category':'Space Rocket Part',
  },
  "heatResistantHull":{
    "type":"rocketPart",
    "cost": {
      'steel':200000,
      'aeromineGlass':10000,
    },
    'tooltip':'A complete heat barrier',
    'category':'Space Rocket Part',
  },
  "basicEngine":{
    "type":"rocketPart",
    "cost": {
      'steel':100000,
      "iron":10000,
      "diomine":1000,
    },
    'tooltip':'Mediocre',
    'category':'Space Rocket Part',
  },
  "advancedThruster":{
    "type":"rocketPart",
    "cost": {
      'steel':100000,
      "temperedPyrome":666,
      "diomine":10000,
    },
    'tooltip':'Faster than average',
    'category':'Space Rocket Part',
  },
  "hyperdrive":{
    "type":"rocketPart",
    "cost": {
      'frostium':100000,
      "temperedPyrome":6666,
      "shadows":500000,
    },
    'tooltip':'Faster than average',
    'category':'Space Rocket Part',
  },
  "teleporterStation":{
    "type":"rocketPart",
    "cost": {
      "matterTransporter":1,
      "wirelessEnergyTransferer":1,
      "temperedPyrome":6666,
      "shadows":100000,
    },
    'tooltip':'Not used by the galactic council because of their dogmatic hatred of frostium.',
    'category':'Space Rocket Part',
  },
  "basicRepairSuits":{
    "type":"rocketPart",
    "cost": {
      'duranium':10000,
      "steel":10000,
      "iron":1000000,
    },
    'tooltip':'Mediocre',
    'category':'Space Rocket Part',
  },
  "automaticRepairRobots":{
    "type":"rocketPart",
    "cost": {
      'duranium':100000,
      "steel":100000,
      "iron":10000000,
    },
    'tooltip':'Mediocre',
    'category':'Space Rocket Part',
  },
  "advancedRepairSuits":{
    "type":"rocketPart",
    "cost": {
      'duranium':100000,
      "diomine":10000,
    },
    'tooltip':'Mediocre',
    'category':'Space Rocket Part',
  },
  "basicCannon":{
    "type":"rocketPart",
    "cost": {
      'duranium':10000,
      "steel":100000,
      "iron":1000000,
    },
    'tooltip':'Mediocre',
    'category':'Space Rocket Part',
  },
  "advancedCannon":{
    "type":"rocketPart",
    "cost": {
      'duranium':100000,
      "steel":1000000,
      "iron":10000000,
    },
    'tooltip':'Pretty Good',
    'category':'Space Rocket Part',
  },
  "blazingCannon":{
    "type":"rocketPart",
    "cost": {
      'temperedPyrome':666666,
      "diomine":10000000,
      "frostium":10000000,
    },
    'tooltip':'The galactic council won\'t stand a chance.',
    'category':'Space Rocket Part',
  },
  "basicLaser":{
    "type":"rocketPart",
    "cost": {
      'duranium':10000,
      "steel":100000,
      "iron":10000,
      "rubyLaserLens":1,
    },
    'tooltip':'Powerful and deadly',
    'category':'Space Rocket Part',
  },
  "focusedLaser":{
    "type":"rocketPart",
    "cost": {
      'duranium':10000,
      "steel":100000,
      "iron":100000,
      "rubyLaserLens":10,
      "emeraldLaserLens":10,
    },
    'tooltip':'Powerfuler and deadlyer',
    'category':'Space Rocket Part',
  },
  "phasingTurret":{
    "type":"rocketPart",
    "cost": {
      'frostium':10000,
      "shadows":500000,
      "temperedPyrome":6666,
    },
    'tooltip':'Shoots bullets that can go incorporeal',
    'category':'Space Rocket Part',
  },
  "basicRadar":{
    "type":"rocketPart",
    "cost": {
      'copper':1000,
      "iron":1000,
    },
    'tooltip':'Mediocre',
    'category':'Space Rocket Part',
  },
  "advancedRadar":{
    "type":"rocketPart",
    "cost": {
      'aeromineGlass':1000,
      "steel":1000,
    },
    'tooltip':'Seeing father and faster',
    'category':'Space Rocket Part',
  },
  "detailedRadar":{
    "type":"rocketPart",
    "cost": {
      'frostium':1000000,
      "pyrome":666,
    },
    'tooltip':'Muh more information.',
    'category':'Space Rocket Part',
  },
  "strongHull":{
    "type":"rocketPart",
    "cost": {
      'steel':500000,
      "iron":10000000,
      "copper":10000000,
      "temperedPyrome":6666
    },
    'tooltip':'Strong and sturdy',
    'category':'Space Rocket Part',
  },
  "forcefieldGenerator":{
    "type":"rocketPart",
    "cost": {
      'shadows':500000,
      'frostium':5000000,
    },
    'tooltip':'Shadows are truly magical in their abilities',
    'category':'Space Rocket Part',
  },
  "frostiumBattery":{
    "type":"building",
    "cost": {
      "frostiumCore":1,
      'steel':100
    },
    'tooltip':'Focusing frostium energy',
    'category':'Advanced Metal Working',
    "effects": [
      {"funcName":"setMessageIfCheck","args":['This brings back such memories','notFrostiumBatteryMade']},
      {"funcName":"setCheck","args":['notFrostiumBatteryMade',false]},
      {"funcName":"incrementResourceSpecial","args":["frostiumEnergy","storage",100]}
    ],
  },
  "frostiumFurnace":{
    "type":"building",
    "cost": {
      "frostiumCore":10,
      "frostiumBattery":2,
      "tungsten":1000000,
      "frostium":1000,
    },
    'tooltip':'The chill radiating from it doesn\'t seem to affect the inside.',
    'category':'Advanced Metal Working',
    "effects": [
      {"funcName":"setMessageIfCheck","args":['The manufacturies, glowing with blue light,\n until they were blown up.','notFrostiumFurnaceMade']},
      {"funcName":"setCheck","args":['notFrostiumFurnaceMade',false]},
      {"funcName":"addBuilding","args":['rocketLauncher']},
    ],
  },
  "industrialWarehouse": {
    "type":"building",
    "cost": {
      "duranium":100
    },
    'tooltip':'Stores more valuable materials',
    'category':'Storage',
    "effects": [
      {"funcName":"incrementResourceSpecial","args":['tungsten','storage',100]},
      {"funcName":"incrementResourceSpecial","args":['titanium','storage',500]},
      {"funcName":"incrementResourceSpecial","args":['compressedIron','storage',100]},
      {"funcName":"incrementResourceSpecial","args":['steel','storage',500]},
      {"funcName":"incrementResourceSpecial","args":['duranium','storage',10]},
      {"funcName":"incrementResourceSpecial","args":['frostium','storage',5]},
      {"funcName":"incrementResourceSpecial","args":['germanium','storage',100]},
      {"funcName":"incrementResourceSpecial","args":['stardust','storage',1]},
    ],
  },
  "shadowStorageFacility": {
    "type":"building",
    "cost": {
      "frostium":1000000
    },
    'tooltip':'Contains the ethereal shadows',
    'category':'Storage',
    "effects": [
      {"funcName":"incrementResourceSpecial","args":['shadows','storage',10]},
    ],
  },
  "rocketConstructionFacility": {
    "type":"building",
    "cost": {
      "iron":1000000,
      "steel":1000000,
      "duranium":1000000,
    },
    'tooltip':'A masterpiece of metalworking',
    'category':'Storage',
    "effects": [
      {'funcName':'addTab','args':['Rocket Part Builder','spaceRocketPartBuilder',true]},
      {'funcName':'addTab','args':['Rocket Builder','spaceRocketBuilder',true]},
    ],
  },
  "pocketStorageDimension": {
    "type":"building",
    "cost": {
      "shadows":500,
      "frostium":10000000
    },
    'tooltip':'A whole extra dimension for storage',
    'category':'Storage',
    "effects": [
      {"funcName":"incrementResourceSpecial","args":['tungsten','storage',100000000]},
      {"funcName":"incrementResourceSpecial","args":['titanium','storage',500000000]},
      {"funcName":"incrementResourceSpecial","args":['compressedIron','storage',100000000]},
      {"funcName":"incrementResourceSpecial","args":['steel','storage',500000000]},
      {"funcName":"incrementResourceSpecial","args":['duranium','storage',100000000]},
      {"funcName":"incrementResourceSpecial","args":['frostium','storage',500000000]},
      {"funcName":"incrementResourceSpecial","args":['aeromineGlass','storage',5000]},
      {"funcName":"incrementResourceSpecial","args":['rubyLaserLens','storage',5000]},
      {"funcName":"incrementResourceSpecial","args":['emeraldLaserLens','storage',5000]},
      {"funcName":"incrementResourceSpecial","args":['wood','storage',500000000]},
      {"funcName":"incrementResourceSpecial","args":['iron','storage',200000000]},
      {"funcName":"incrementResourceSpecial","args":['ice','storage',10000000000]},
      {"funcName":"incrementResourceSpecial","args":['copper','storage',200000000]},
      {"funcName":"incrementResourceSpecial","args":['stone','storage',1000000000]},
      {"funcName":"incrementResourceSpecial","args":['coal','storage',2000000000]},
      {"funcName":"incrementResourceSpecial","args":['ironOre','storage',1000000000]},
      {"funcName":"incrementResourceSpecial","args":['tungstenOre','storage',500000000]},
      {"funcName":"incrementResourceSpecial","args":['titaniumOre','storage',2500000000]},
      {"funcName":"incrementResourceSpecial","args":['copperOre','storage',1000000000]},
      {"funcName":"incrementResourceSpecial","args":['germanium','storage',100000000]},
      {"funcName":"incrementResourceSpecial","args":['stardust','storage',1000]},
    ],
  },
  "industrialSmelter": {
    "type":"building",
    "cost": {
      "steel":10000,
      "iron":100000,
      "copper":100000,
    },
    'tooltip':'Smelts rare substances',
    'category':'Advanced Metal Working',
  },
  "woodenRocket": {
    "type":"rocket",
    "cost": {
      "wood":1
    },
    'category':'Hey, how are you seeing this?'
  },
  "coalRocket": {
    "type":"rocket",
    "cost": {
      "coal":10
    },
    'category':'Hey, how are you seeing this?'
  },
  "stoneRocket": {
    "type":"rocket",
    "cost": {
      "stone":100
    },
    'category':'Hey, how are you seeing this?'
  },
  "metallicRocket": {
    "type":"rocket",
    "cost": {
      "copper":1000,
      "iron":1000,
    },
    'category':'Hey, how are you seeing this?'
  },
  "rareMetallicRocket": {
    "type":"rocket",
    "cost": {
      "tungsten":10000,
      "titanium":10000,
    },
    'category':'Hey, how are you seeing this?'
  },
  "steelRocket": {
    "type":"rocket",
    "cost": {
      "steel":100000
    },
    'category':'Hey, how are you seeing this?'
  },
  "duraniumRocket": {
    "type":"rocket",
    "cost": {
      "duranium":1000000
    },
    'category':'Hey, how are you seeing this?'
  },
  "frostiumRocket": {
    "type":"rocket",
    "cost": {
      "frostium":1000000
    },
    'category':'Hey, how are you seeing this?'
  },
  "leoIII": {
    "type":"rocket",
    'cost':{
      'frostium':1000000,
      'steel':1000000,
      'duranium':1000000,
      'tungsten':1000000,
    },
    'effects':[
      {'funcName':'addTab','args':['Cargo Bay','cargoBay',true]}
    ],
    'category':'Hey, how are you seeing this?'
  },
  'cargoRocket':{
    'cost':{
      'frostium':1500000,
      'steel':1500000,
      'duranium':1500000,
      'tungsten':1500000,
    },
    'category':'Hey, how are you seeing this?',
    'type':'rocket'
  },
  "satellite": {
    "type":"building",
    "cost": {
      "iron":1000,
      "copper":1000
    },
    'category':'Space',
    "tooltip":"There is literally no point in having more than one of these."
  },
  'nuclearReactor': {
    "type":"building",
    "cost": {
      "germanium":500000,
      "carbonNanotubes":10000000,
      "steel":10000000,
      "iron":1000000000,
      "copper":1000000000,
    },
    'category':'Energy',
    "tooltip":"Build a nuclear reactor to consume residual burning core."
  },
}
