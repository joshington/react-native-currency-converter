import {
  CHANGE_CURRENCY_AMOUNT,
  SWAP_CURRENCY,
  CHANGE_BASE_CURRENCY,
  CHANGE_QUOTE_CURRENCY,
  GET_INITIAL_CONVERSION,
  CONVERSION_RESULT,
  CONVERSION_ERROR,
} from '../actions/currencies';

// you can choose to use the global/default state as your initial state in your reducer
// or start with a predefined initial state
const initialState = {
  baseCurrency: 'USD',
  quoteCurrency: 'GBP',
  amount: 100,
  conversions: {},
  error: null,
};

const setConversions = (state, action) => {
  let conversion = {
    isFetching: true,
    date: '',
    rates: {},
  };

  if (state.conversions[action.currency]) {
    conversion = state.conversions[action.currency];
  }

  return {
    ...state.conversions,
    [action.currency]: conversion,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SWAP_CURRENCY:
      return {
        ...state,
        baseCurrency: state.quoteCurrency,
        quoteCurrency: state.baseCurrency,
        conversions: setConversions(state, action),
      };
    case CHANGE_CURRENCY_AMOUNT:
      return {
        ...state,
        amount: action.amount || 0,
        conversions: setConversions(state, action),
      };
    case CHANGE_QUOTE_CURRENCY:
      return {
        ...state,
        quoteCurrency: action.currency,
        conversions: setConversions(state, action),
      };
    case CHANGE_BASE_CURRENCY:
      return {
        ...state,
        baseCurrency: action.currency,
        conversions: setConversions(state, action),
      };
    case GET_INITIAL_CONVERSION:
      return {
        ...state,
        conversions: setConversions(state, { currency: state.baseCurrency }),
      };
    case CONVERSION_RESULT:
      return {
        ...state,
        baseCurrency: action.result.base,
        conversions: {
          ...state.conversions,
          [action.result.base]: {
            isFetching: false,
            ...action.result,
          },
        },
      };
    case CONVERSION_ERROR:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export default reducer;