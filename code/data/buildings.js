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
    'category':'Energy'
  },
  "combustion-engine": {
    "type":"building",
    "cost": {
      "iron": 20,
      "copper": 20
    },
		"tooltip":"Burn fire in a fire burning machine",
    'category':'Energy'
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
      {"funcName":"incrementResourceSpecial","args":['copper','storage',20]},
      {"funcName":"incrementResourceSpecial","args":['fakestone','storage',100]},
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
      {'funcName':'addTab','args':['Robot','robot',true]}
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
  "stokefire": {
    "type":"process",
    "cost": {
      "fire": 0.1,
      "wood":4
    },
    "results": {
      "fire": 1.1
    },
    "buildName":"Stoke the fire"
  },
  "computer": {
    "type":"building",
    "cost": {
      "iron": 20
    },
    "effects":[
      {'funcName':'addTab','args':['Computer','computer',true]}
    ],
		"tooltip":"This takes a suprisingly small amount of resources",
    'category':'Technical'
  },
  "droid": {
    "type":"building",
    "cost": {
      "robot": 1
    },
    "effects":[
      {'funcName':'addTab','args':['Mining','mining',true]},
      {'funcName':'addTab','args':['Scripts','scripts',true]}
    ],
    'category':'Technical',
		"tooltip":"Definetely a different thing",
  },
  "stone-miner": {
    "type":"building",
    "cost": {
      "fakestone": 10,
      'iron':2,
      'copper':2
    },
		"tooltip":"Mine stone to make a stone miner to mine stone",
    'category':'Technical'
  },
  "furnace": {
    "type":"building",
    "cost": {
      "fakestone": 20
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
      "fakestone": 1000,
      "iron":200,
      "copper":200,
      "computer":10
    },
    "effects":[
      {'funcName':'addTab','args':['Adaptations','adaptation',true]}
    ],
    'category':'Special'
  },
  "pressurizer": {
    "type":"building",
    "cost": {
      "fakestone": 1000,
      "iron":1000,
      "copper":200,
      "computer":10
    },
    'category':'Metal Machine'
  },
  "rocket-launcher": {
    "type":"building",
    "cost": {
      "fakestone": 1000,
      "iron":200,
      "copper":200,
      "computer":10
    },
    "effects":[
      {'funcName':'addTab','args':['Adaptations','adaptation',true]}
    ],
    'category':'Special'
  },
  "alloyer": {
    "type":"building",
    "cost": {
      "fakestone": 1000,
      "iron":200,
      "copper":200,
      "computer":10
    },
    'category':'Metal Machine'
  },
  "cooler": {
    "type":"building",
    "cost": {
      "fakestone": 1000,
      "iron":200,
      "copper":200,
      "computer":10
    },
    'category':'Metal Machine'
  },
  "melter": {
    "type":"building",
    "cost": {
      "fakestone": 1000,
      "iron":200,
      "copper":200,
      "computer":10
    },
    "effects":[
      {'funcName':'addTab','args':['Adaptations','adaptation',true]}
    ],
    'category':'Metal Machine'
  },
  "gemstone-slicer": {
    "type":"building",
    "cost": {
      "fakestone": 1000,
      "iron":200,
      "copper":200,
      "computer":10
    },
    'category':'Gem Machine'
  },
}
