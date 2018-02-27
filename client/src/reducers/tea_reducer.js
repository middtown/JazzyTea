export default function(state = {}, action) {
  switch (action.type){
    case 'GET_TEAS':
      return { ... state, list: action.payload };
    case 'GET_TEA_BY_CREATOR':
      return { ... state,
        tea: action.payload.tea,
        creator: action.payload.creator,
      };
    case 'CLEAR_TEA_BY_CREATOR':
      return { ... state,
        tea: action.payload.tea,
        creator: action.payload.creator,
      };
    case 'CREATE_TEA':
      return { ... state,
        newTea: action.payload,
      };
    case 'CLEAR_NEW_TEA':
      return { ... state,
        newTea: action.payload,
      };
    default:
      return state;
  }
}
