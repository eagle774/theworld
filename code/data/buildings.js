let buildingsData = {
  "fire": {
    "type":"building",
    "cost": {
      "wood": 2,
      "fs": 0.01
    },
    "effects": [
      {"funcName":"configureResource","args":['fire','gettable','true']}
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
      {"funcName":"configureResource","args":['bucket-water','gettable','true']}
    ],
		"tooltip":"Why doesn't this leak?",
    'category':'Utility'
  },
  "spit": {
    "type":"building",
    "cost": {
      "bucket": 1,
      "wood": 2
    },
    "effects": [
      {"funcName":"configureResource","args":['spit','gettable','true']}
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
      "titanium":50,
    },
    'category':'Metal Machine'
  },
  "rocket-launcher": {
    "type":"building",
    "cost": {
      "stone": 1000,
      "iron":200,
      "copper":200,
      "computer":20,
      "steel":1000,
      "tungsten":1000,
    },
    "effects":[
      {'funcName':'addTab','args':['Rocket Launching','rocket-silo',true]}
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
  "alloyer": {
    "type":"building",
    "cost": {
      "stone": 1000,
      "iron":200,
      "copper":200,
      "tungsten":100
    },
    "effects":[
      {'funcName':'incrementResourceSpecial','args':['fluid-storage','storage',10000]},
      {'funcName':'updateFluids','args':[]},
    ],
    'category':'Metal Machine'
  },
  "cooler": {
    "type":"building",
    "cost": {
      "stone": 1000,
      "iron":200,
      "copper":200,
      "tungsten":1000
    },
    "effects":[
      {'funcName':'incrementResourceSpecial','args':['fluid-storage','storage',10000]},
      {'funcName':'updateFluids','args':[]},
    ],
    'category':'Metal Machine'
  },
  "melter": {
    "type":"building",
    "cost": {
      "stone": 1000,
      "iron":200,
      "copper":200,
      "titanium":5000,
      "tungsten":5000
    },
    "effects":[
      {'funcName':'addTab','args':['Fluids','fluid',true]},
      {'funcName':'incrementResourceSpecial','args':['fluid-storage','storage',10000]},
      {'funcName':'updateFluids','args':[]},
    ],
    'category':'Metal Machine'
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
