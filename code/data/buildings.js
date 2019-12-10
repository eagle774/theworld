let buildingsData = {
  "fire": {
    "type":"building",
    "cost": {
      "wood": 2,
      "fs": 0.01
    },
    "effects": [
      {"funcName":"setCheck","args":['fireMade',true]}
    ],
		"tooltip":"Don't touch it.",
    'category':'Utility'
  },
  "steam-engine": {
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
  "combustion-engine": {
    "type":"building",
    "cost": {
      "iron": 20,
      "copper": 20
    },
		"tooltip":"Burn fire in a fire burning machine",
    'category':'Energy',
    'effects':[
      {"funcName":"incrementResourceSpecial","args":['energy','storage',100]},
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
      {"funcName":"incrementResourceSpecial","args":['titanium','storage',5]},
      {"funcName":"incrementResourceSpecial","args":['compressed-iron','storage',1]},
      {"funcName":"incrementResourceSpecial","args":['copper','storage',20]},
      {"funcName":"incrementResourceSpecial","args":['stone','storage',100]},
      {"funcName":"incrementResourceSpecial","args":['steel','storage',5]},
      {"funcName":"incrementResourceSpecial","args":['coal','storage',200]},
      {"funcName":"incrementResourceSpecial","args":['iron-ore','storage',100]},
      {"funcName":"incrementResourceSpecial","args":['gold-ore','storage',1]},
      {"funcName":"incrementResourceSpecial","args":['tungsten-ore','storage',5]},
      {"funcName":"incrementResourceSpecial","args":['titanium-ore','storage',25]},
      {"funcName":"incrementResourceSpecial","args":['copper-ore','storage',100]},
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
  "bucket-water": {
    "type":"building",
    "cost": {
      "bucket": 1
    },
    "effects": [
      {"funcName":"setCheck","args":['bucket-waterMade',true]}
    ],
		"tooltip":"Why doesn't this leak?",
    'category':'Utility'
  },
  "planet-grinder": {
    "type":"building",
    "cost": {
      "frostium-core": 5,
      "frostium":1000,
      "steel":1000000,
      "tungsten":1000000,
      "frostium-battery":2,
    },
		"tooltip":"The one remaining reminder of the war",
    'category':'Advanced Metal Working',
    "effects": [
      {"funcName":"setMessageIfCheck","args":['Broken planets. Dying races. Chaos.','notPlanetGrinderMade']},
      {"funcName":"setCheck","args":['notPlanetGrinderMade',false]},
      {'funcName':'configureResource','args':['frostium-furnace','locked',false]},
    ],
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
    'category':'Utility'
  },
  "hangbucket": {
    "type":"process",
    "cost": {
      "bucket-water": 1
    },
    "results": {
      "bucket": 1,
      "water-boiling": 200
    }
  },
  "computer": {
    "type":"building",
    "cost": {
      "iron": 20
    },
    "effects":[
      {'funcName':'addTab','args':['Computer','computer',true]},
      {'funcName':'configureResource','args':['robot','locked',false]},
      {'funcName':'configureResource','args':['combustion-engine','locked',false]}
    ],
		"tooltip":"This takes a suprisingly small amount of resources",
    'category':'Technical'
  },
  "stone-miner": {
    "type":"building",
    "cost": {
      "stone": 10,
      'iron':2,
      'copper':2
    },
		"tooltip":"Mine stone to make a stone miner to mine stone",
    'category':'Technical'
  },
  "fire-starter": {
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
  "furnace": {
    "type":"building",
    "cost": {
      "stone": 20
    },
    "effects":[
      {'funcName':'addTab','args':['Jobs','jobs',true]}
    ],
		"tooltip":"Watch out for that inserter",
    'category':'Metal Machine'
  },
  "adaptation-chamber": {
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
  "pressurizer": {
    "type":"building",
    "cost": {
      "stone": 500,
      "compressed-iron":100,
      "copper":200,
      "titanium":2000,
    },
    'category':'Metal Machine'
  },
  "rocket-launcher": {
    "type":"building",
    "cost": {
      "stone": 100000000,
      "iron":500000000,
      "copper":500000000,
      "steel":10000000,
      "tungsten":5000000,
      "duranium":100000,
      "frostium-core":100
    },
    "effects":[
      {'funcName':'addTab','args':['Rocket Launching','rocket-silo',true]},
      {"funcName":"setMessageIfCheck","args":['The commanders, leading their rocket ships into a masascre.','notRocketLauncherMade']},
      {"funcName":"setCheck","args":['notRocketLauncherMade',false]},
    ],
    'category':'Special',
    'tooltip':'Shoot big explosive things. What could be better than that?'
  },
  "incendinary-pile": {
    "type":"building",
    "cost": {
      "wood": 50
    },
    'category':'Utility',
    'tooltip':'Perform pagan rituals to get them on fire'
  },
  "coal-incendinary-pile": {
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
      "stone": 1000,
      "iron":20000,
      "copper":20000,
      "titanium":5000,
      "tungsten":5000,
      "steel":5000
    },
    "effects":[
      {'funcName':'incrementResourceSpecial','args':['fluid-storage','storage',10000]},
      {'funcName':'updateFluids','args':[]},
    ],
    'category':'Fluid Handling',
  },
  "cooler": {
    "type":"building",
    "cost": {
      "stone": 1000,
      "iron":20000,
      "copper":20000,
      "titanium":5000,
      "tungsten":5000,
      "steel":5000
    },
    "effects":[
      {'funcName':'incrementResourceSpecial','args':['fluid-storage','storage',10000]},
      {'funcName':'updateFluids','args':[]},
    ],
    'category':'Fluid Handling',
  },
  "melter": {
    "type":"building",
    "cost": {
      "stone": 1000,
      "iron":20000,
      "copper":20000,
      "titanium":5000,
      "tungsten":5000,
      "steel":5000
    },
    "effects":[
      {'funcName':'addTab','args':['Fluids','fluid',true]},
      {'funcName':'incrementResourceSpecial','args':['fluid-storage','storage',10000]},
      {'funcName':'configureResource','args':['alloyer','locked',false]},
      {'funcName':'configureResource','args':['cooler','locked',false]},
      {'funcName':'updateFluids','args':[]},
    ],
    'category':'Fluid Handling',
  },
  "solar-panel": {
    "type":"building",
    "cost": {
      "iron":40,
      "copper":40
    },
    'tooltip':'Hopefully I can find a use for them.',
    'category':'Energy',
    'effects':[
      {"funcName":"incrementResourceSpecial","args":['energy','storage',20]},
    ]
  },
  "pump": {
    "type":"building",
    "cost": {
      "tungsten":10000,
      "duranium":400
    },
    'tooltip':'Watertight? Why does that matter?',
    'category':'Fluid Handling'
  },
  "frostium-core":{
    "type":"building",
    "cost": {
      "frostium":1000
    },
    'tooltip':'It glows with an ethereal light',
    'category':'Advanced Metal Working',
    "effects": [
      {"funcName":"setMessageIfCheck","args":['So small to have caused such destruction','notFrostiumCoreMade']},
      {"funcName":"setCheck","args":['notFrostiumCoreMade',false]},
    ],
  },
  "frostium-battery":{
    "type":"building",
    "cost": {
      "frostium-core":1,
      'steel':100
    },
    'tooltip':'Focusing frostium energy',
    'category':'Advanced Metal Working',
    "effects": [
      {"funcName":"setMessageIfCheck","args":['This brings back such memories','notFrostiumBatteryMade']},
      {"funcName":"setCheck","args":['notFrostiumBatteryMade',false]},
      {"funcName":"incrementResourceSpecial","args":["frostium-energy","storage",100]}
    ],
  },
  "frostium-furnace":{
    "type":"building",
    "cost": {
      "frostium-core":10,
      "frostium-battery":2,
      "tungsten":1000000,
      "frostium":1000,
    },
    'tooltip':'The chill radiating from it doesn\'t seem to affect the inside.',
    'category':'Advanced Metal Working',
    "effects": [
      {"funcName":"setMessageIfCheck","args":['The manufacturies, glowing with blue light,\n until they were blown up.','notFrostiumFurnaceMade']},
      {"funcName":"setCheck","args":['notFrostiumFurnaceMade',false]},
    ],
  },
  "industrial-warehouse": {
    "type":"building",
    "cost": {
      "duranium":100
    },
    'tooltip':'Stores more valuable materials',
    'category':'Storage',
    "effects": [
      {"funcName":"incrementResourceSpecial","args":['tungsten','storage',10]},
      {"funcName":"incrementResourceSpecial","args":['titanium','storage',50]},
      {"funcName":"incrementResourceSpecial","args":['compressed-iron','storage',10]},
      {"funcName":"incrementResourceSpecial","args":['steel','storage',50]},
      {"funcName":"incrementResourceSpecial","args":['duranium','storage',4]},
      {"funcName":"incrementResourceSpecial","args":['frostium','storage',1]},
    ],
  },
  "wooden-rocket": {
    "type":"rocket",
    "cost": {
      "wood":1
    },
    'category':'Hey, how are you seeing this?'
  },
  "coal-rocket": {
    "type":"rocket",
    "cost": {
      "coal":10
    },
    'category':'Hey, how are you seeing this?'
  },
}
