let buildingsData = {
  "fire": {
    "type":"building",
    "cost": {
      "wood": 2,
      "flint-and-steel": 0.01
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
  "barns": {
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
  "bucket-of-water": {
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
      "tungsten":500000,
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
  "shadow-collector": {
    "type":"building",
    "cost": {
      "frostium-core": 10,
      "frostium-battery":10,
    },
		"tooltip":"It sucks in the light",
    'category':'Shadows',
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
      "bucket-of-water": 1
    },
    "results": {
      "bucket": 1,
      "boiling-water": 200
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
  "stone-furnace": {
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
  "assembler": {
    "type":"building",
    "cost": {
      "iron":10000,
      "copper":10000,
      "compressed-iron":1000,
      "frostium":10,
    },
    'tooltip':'The only good way to make science packs.',
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
      "stone":100000000,
      "iron":500000000,
      "copper":500000000,
      "steel":80000000,
      "tungsten":50000000,
      "duranium":1000000,
      "frostium-core":1000
    },
    "effects":[
      {'funcName':'addTab','args':['Rocket Launching','rocket-silo',true]},
      {"funcName":"setMessageIfCheck","args":['The commanders, leading their rocket ships into a massacre.','notRocketLauncherMade']},
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
      {'funcName':'onlyRunOutOfSpace','args':[[
        {'funcName':'incrementResourceSpecial','args':['fluid-storage','storage',10000]},
      ]]},
      {'funcName':'onlyRunInSpace','args':[[
        {'funcName':'addTab','args':['Space Fluids','fluid-space',true]},
        {'funcName':'incResSpace','args':['fluid-storage',10000]},
      ]]},
      {'funcName':'updateFluids','args':[false]},
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
      {'funcName':'onlyRunOutOfSpace','args':[[
        {'funcName':'incrementResourceSpecial','args':['fluid-storage','storage',10000]},
      ]]},
      {'funcName':'onlyRunInSpace','args':[[
        {'funcName':'addTab','args':['Space Fluids','fluid-space',true]},
        {'funcName':'incResSpace','args':['fluid-storage',10000]},
      ]]},
      {'funcName':'updateFluids','args':[false]},
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
      {'funcName':'onlyRunOutOfSpace','args':[[
        {'funcName':'incrementResourceSpecial','args':['fluid-storage','storage',10000]},
      ]]},
      {'funcName':'configureResource','args':['alloyer','locked',false]},
      {'funcName':'configureResource','args':['cooler','locked',false]},
      {'funcName':'onlyRunInSpace','args':[[
        {'funcName':'addTab','args':['Space Fluids','fluid-space',true]},
        {'funcName':'incResSpace','args':['fluid-storage',10000]},
      ]]},
      {'funcName':'updateFluids','args':[false]},
    ],
    'category':'Fluid Handling',
  },
  "solar-panel": {
    "type":"building",
    "cost": {
      "iron":40,
      "copper":40
    },
    'tooltip':'To prevent china hoaxes',
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
  "wireless-energy-transferer":{
    "type":"building",
    "cost": {
      "shadows":1,
      "frostium":100
    },
    'tooltip':'The pinnacle of energy transfer technology',
    'category':'Energy',
  },
  "matter-transporter":{
    "type":"building",
    "cost": {
      "shadows":10,
      "steel":1000
    },
    'tooltip':'The pinnacle of matter transfer technology',
    'category':'Shadows',
    'effects':[
      {'funcName':'addTab','args':['Space M.T.','space-mt',true]}
    ]
  },
  "asteroid-miner":{
    "type":"building",
    "cost": {
      "steel":10000,
      "tungsten":10000,
      "frostium-battery":10,
      "wireless-energy-transferer":1,
      "matter-transporter":1
    },
    'tooltip':'The pinnacle of matter transfer technology',
    'category':'Shadows',
    'effects':[
      {'funcName':'addTab','args':['Space M.T.','space-mt',true]}
    ]
  },
  "solar-panel-satellite":{
    "type":"building",
    "cost": {
      "wireless-energy-transferer":1,
      "solar-panel":20,
      "frostium":1000
    },
    'tooltip':'A satellite to collect energy',
    'category':'Energy',
  },
  "hypersonic-shuttle":{
    "type":"building",
    "cost": {
      "matter-transporter":1,
      "frostium":200000,
      'steel':1000,
  //    "radar":1,
  //    "rocket-engine":1
    },
    'tooltip':'Most things can',
    'category':'Space Rocket Base',
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
      {"funcName":"incrementResourceSpecial","args":['tungsten','storage',100]},
      {"funcName":"incrementResourceSpecial","args":['titanium','storage',500]},
      {"funcName":"incrementResourceSpecial","args":['compressed-iron','storage',100]},
      {"funcName":"incrementResourceSpecial","args":['steel','storage',500]},
      {"funcName":"incrementResourceSpecial","args":['duranium','storage',10]},
      {"funcName":"incrementResourceSpecial","args":['frostium','storage',5]},
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
  "stone-rocket": {
    "type":"rocket",
    "cost": {
      "stone":100
    },
    'category':'Hey, how are you seeing this?'
  },
  "metallic-rocket": {
    "type":"rocket",
    "cost": {
      "copper":1000,
      "iron":1000,
    },
    'category':'Hey, how are you seeing this?'
  },
  "rare-metallic-rocket": {
    "type":"rocket",
    "cost": {
      "tungsten":10000,
      "titanium":10000,
    },
    'category':'Hey, how are you seeing this?'
  },
  "steel-rocket": {
    "type":"rocket",
    "cost": {
      "steel":100000
    },
    'category':'Hey, how are you seeing this?'
  },
  "duranium-rocket": {
    "type":"rocket",
    "cost": {
      "duranium":1000000
    },
    'category':'Hey, how are you seeing this?'
  },
  "frostium-rocket": {
    "type":"rocket",
    "cost": {
      "frostium":1000000
    },
    'category':'Hey, how are you seeing this?'
  },
  "leo-iii": {
    "type":"rocket",
    'cost':{
      'frostium':1000000,
      'steel':1000000,
      'duranium':1000000,
      'tungsten':1000000,
    },
    'effects':[
      {'funcName':'addTab','args':['Cargo Bay','cargo-bay',true]}
    ],
    'category':'Hey, how are you seeing this?'
  },
  'cargo-rocket':{
    'cost':{
      'frostium':2000000,
      'steel':5000000,
      'duranium':5000000,
      'tungsten':5000000,
    },
    'category':'Hey, how are you seeing this?',
    'type':'rocket'
  },
  "satellite": {
    "type":"building",
    "cost": {
      "stone":1
    },
    'category':'Space'
  },
}
