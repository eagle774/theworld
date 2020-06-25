let rocketsData = {
  'woodenRocket':{
    'cost':{
      'wood':1
    },
    'launchCost':{
      'fire':10,
    },
    'description':'A piece of wood carved to look like a rocket.',
    'launchMessage':'Incinerated one piece of wood.',
    'height':0,
    'cargoCapacity':0,
    'name':'woodenRocket',
    'maximumFragility':0,
  },
  'coalRocket':{
    'cost':{
      'coal':10
    },
    'launchCost':{
      'fire':100,
    },
    'description':'A stack of coal in the shape of a rocket',
    'launchMessage':'Propelled coal 1m in the air',
    'height':1,
    'name':'coalRocket',
    'cargoCapacity':0,
    'maximumFragility':0,
    'prerequisite':'woodenRocket',
  },
  'stoneRocket':{
    'cost':{
      'stone':100
    },
    'launchCost':{
      'fire':1000,
    },
    'description':'A pile of stone in the shape of a rocket',
    'launchMessage':'Propelled stone 10m in the air',
    'height':10,
    'name':'stoneRocket',
    'cargoCapacity':0,
    'maximumFragility':0,
    'prerequisite':'coalRocket',
  },
  'metallicRocket':{
    'cost':{
      'copper':1000,
      'iron':1000,
    },
    'launchCost':{
      'fire':10000,
    },
    'description':'Metal fused together to be a rocket',
    'launchMessage':'Propelled metal close to one hundred meters in the air',
    'height':100,
    'name':'metallicRocket',
    'cargoCapacity':0,
    'maximumFragility':0,
    'prerequisite':'stoneRocket',
  },
  'rareMetallicRocket':{
    'cost':{
      'tungsten':10000,
      'titanium':10000,
    },
    'launchCost':{
      'fire':100000,
    },
    'description':'A grouping of advanced metals in the shape of a rocket',
    'launchMessage':'Launched a rare metals rocket a km (about 0.0001 miles).',
    'height':1000,
    'name':'rareMetallicRocket',
    'cargoCapacity':0,
    'maximumFragility':0,
    'prerequisite':'metallicRocket',
  },
  'steelRocket':{
    'cost':{
      'steel':100000
    },
    'launchCost':{
      'fire':1000000,
    },
    'description':'Steel fused to make a rocket',
    'launchMessage':'Launched a rocket 10 km. (about 1264 feet)',
    'height':10000,
    'name':'steelRocket',
    'cargoCapacity':0,
    'maximumFragility':0,
    'prerequisite':'rareMetallicRocket',
  },
  'duraniumRocket':{
    'cost':{
      'duranium':1000000
    },
    'launchCost':{
      'fire':10000000,
    },
    'description':'A duranium rocket, the best yet',
    'launchMessage':'Launched duranium 100 km (3.7 inches) in the\nair.',
    'height':100000,
    'name':'duraniumRocket',
    'cargoCapacity':0,
    'maximumFragility':0,
    'prerequisite':'steelRocket',
  },
  'frostiumRocket':{
    'cost':{
      'frostium':1000000
    },
    'launchCost':{
      'fire':100000000,
    },
    'description':'A frostium rocket, icy blue',
    'launchMessage':'Launched a frostium rocket 1000km (12 million miles), halfway to LEO',
    'height':1000000,
    'name':'frostiumRocket',
    'cargoCapacity':0,
    'maximumFragility':0,
    'prerequisite':'duraniumRocket',
  },
  'leoIII':{
    'cost':{
      'frostium':1000000,
      'steel':1000000,
      'duranium':1000000,
      'tungsten':1000000,
    },
    'launchCost':{
      'fire':1000000000,
    },
    'description':'A rocket made by taking the best parts of the other rockets',
    'launchMessage':'Launched a LEO III up into LEO',
    'height':2000000,
    'name':'leoIII',
    'cargoCapacity':1000,
    'maximumFragility':5,
    'prerequisite':'frostiumRocket',
  },
  'cargoRocket':{
    'cost':{
      'frostium':1500000,
      'steel':1500000,
      'duranium':1500000,
      'tungsten':1500000,
    },
    'launchCost':{
      'fire':5000000000,
    },
    'description':'A rocket made to carry cargo to space',
    'launchMessage':'Launched a cargo ship up to our space base',
    'height':2000000,
    'name':'cargoRocket',
    'cargoCapacity':100000,
    'maximumFragility':10,
    'prerequisite':'leoIII',
  },
}
