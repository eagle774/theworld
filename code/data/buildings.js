let buildingsData = {
  "fire": {
    "type":"building",
    "cost": {
      "wood": 2,
      "fs": 0.01
    },
    "effects": [
      {"funcName":"configureResource","args":['fire','gettable','true']}
    ]
  },
  "bucket": {
    "type":"building",
    "cost": {
      "wood": 5
    }
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
    ]
  },
  "robot": {
    "type":"building",
    "cost": {
      "iron": 20,
      "copper": 20
    },
    "effects":[
      {'funcName':'addTab','args':['Robot','robot',true]}
    ]
  },
  "bucket-water": {
    "type":"building",
    "cost": {
      "bucket": 1
    },
    "effects": [
      {"funcName":"configureResource","args":['bucket-water','gettable','true']}
    ]
  },
  "spit": {
    "type":"building",
    "cost": {
      "bucket": 1,
      "wood": 2
    },
    "effects": [
      {"funcName":"configureResource","args":['spit','gettable','true']}
    ]
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
    ]
  },
  "miner-droid": {
    "type":"building",
    "cost": {
      "robot": 1
    },
    "effects":[
      {'funcName':'addTab','args':['Mining','mining',true]}
    ]
  },
  "furnace": {
    "type":"building",
    "cost": {
      "fakestone": 20
    },
    "effects":[
      {'funcName':'addTab','args':['Jobs','jobs',true]}
    ]
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
    ]
  },
  "pressurizer": {
    "type":"building",
    "cost": {
      "fakestone": 1000,
      "iron":1000,
      "copper":200,
      "computer":10
    }
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
    ]
  },
  "alloyer": {
    "type":"building",
    "cost": {
      "fakestone": 1000,
      "iron":200,
      "copper":200,
      "computer":10
    }
  },
  "cooler": {
    "type":"building",
    "cost": {
      "fakestone": 1000,
      "iron":200,
      "copper":200,
      "computer":10
    }
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
    ]
  },
  "gemstone-slicer": {
    "type":"building",
    "cost": {
      "fakestone": 1000,
      "iron":200,
      "copper":200,
      "computer":10
    }
  },
}
