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
    'weight':1,
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
    'weight':10,
  },
}
