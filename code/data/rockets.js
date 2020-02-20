let rocketsData = {
  'wooden-rocket':{
    'cost':{
      'wood':1
    },
    'launch-cost':{
      'fire':10,
    },
    'description':'A piece of wood carved to look like a rocket.',
    'launch-message':'Incinerated one piece of wood.',
    'height':0,
    'cargo-capacity':0,
    'name':'wooden-rocket',
    'maximum-fragility':0,
  },
  'coal-rocket':{
    'cost':{
      'coal':10
    },
    'launch-cost':{
      'fire':100,
    },
    'description':'A stack of coal in the shape of a rocket',
    'launch-message':'Propelled coal 1m in the air',
    'height':1,
    'name':'coal-rocket',
    'cargo-capacity':0,
    'maximum-fragility':0,
    'prerequisite':'wooden-rocket',
  },
  'stone-rocket':{
    'cost':{
      'stone':100
    },
    'launch-cost':{
      'fire':1000,
    },
    'description':'A pile of stone in the shape of a rocket',
    'launch-message':'Propelled stone 10m in the air',
    'height':10,
    'name':'stone-rocket',
    'cargo-capacity':0,
    'maximum-fragility':0,
    'prerequisite':'coal-rocket',
  },
  'metallic-rocket':{
    'cost':{
      'copper':1000,
      'iron':1000,
    },
    'launch-cost':{
      'fire':10000,
    },
    'description':'Metal fused together to be a rocket',
    'launch-message':'Propelled metal close to one hundred meters in the air',
    'height':100,
    'name':'metallic-rocket',
    'cargo-capacity':0,
    'maximum-fragility':0,
    'prerequisite':'stone-rocket',
  },
  'rare-metallic-rocket':{
    'cost':{
      'tungsten':10000,
      'titanium':10000,
    },
    'launch-cost':{
      'fire':100000,
    },
    'description':'A grouping of advanced metals in the shape of a rocket',
    'launch-message':'Launched a rare metals rocket a km (about 0.0001 miles).',
    'height':1000,
    'name':'rare-metallic-rocket',
    'cargo-capacity':0,
    'maximum-fragility':0,
    'prerequisite':'metallic-rocket',
  },
  'steel-rocket':{
    'cost':{
      'steel':100000
    },
    'launch-cost':{
      'fire':1000000,
    },
    'description':'Steel fused to make a rocket',
    'launch-message':'Launched a rocket 10 km. (about 1264 feet)',
    'height':10000,
    'name':'steel-rocket',
    'cargo-capacity':0,
    'maximum-fragility':0,
    'prerequisite':'rare-metallic-rocket',
  },
  'duranium-rocket':{
    'cost':{
      'duranium':1000000
    },
    'launch-cost':{
      'fire':10000000,
    },
    'description':'A duranium rocket, the best yet',
    'launch-message':'Launched duranium 100 km (3.7 inches) in the\nair.',
    'height':100000,
    'name':'duranium-rocket',
    'cargo-capacity':0,
    'maximum-fragility':0,
    'prerequisite':'steel-rocket',
  },
  'frostium-rocket':{
    'cost':{
      'frostium':1000000
    },
    'launch-cost':{
      'fire':100000000,
    },
    'description':'A frostium rocket, icy blue',
    'launch-message':'Launched a frostium rocket 1000km (12 million miles), halfway to LEO',
    'height':1000000,
    'name':'frostium-rocket',
    'cargo-capacity':0,
    'maximum-fragility':0,
    'prerequisite':'duranium-rocket',
  },
  'leo-iii':{
    'cost':{
      'frostium':1000000,
      'steel':1000000,
      'duranium':1000000,
      'tungsten':1000000,
    },
    'launch-cost':{
      'fire':1000000000,
    },
    'description':'A rocket made by taking the best parts of the other rockets',
    'launch-message':'Launched a LEO III up into LEO',
    'height':2000000,
    'name':'leo-iii',
    'cargo-capacity':1000,
    'maximum-fragility':5,
    'prerequisite':'frostium-rocket',
  },
  'cargo-rocket':{
    'cost':{
      'frostium':1500000,
      'steel':1500000,
      'duranium':1500000,
      'tungsten':1500000,
    },
    'launch-cost':{
      'fire':5000000000,
    },
    'description':'A rocket made to carry cargo to space',
    'launch-message':'Launched a cargo ship up to our space base',
    'height':2000000,
    'name':'cargo-rocket',
    'cargo-capacity':100000,
    'maximum-fragility':10,
    'prerequisite':'leo-iii',
  },
}
