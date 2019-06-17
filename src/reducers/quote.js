const initialState = {
    symbols: null,
    error: "",
    symbol: "",
    quote: {},
    timeSeries: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "FetchSymbols":
            return {...state, symbols: action.symbols};
        case "ERROR":
            return {...state, error: action.error};
        case "SELECT_SYMBOL":
            return {...state, symbol: action.symbol};
        case "FetchQuote":
            return {...state, quote: action.data};
        case "FetchTimeSeries":
            return {...state, timeSeries: action.data};
        default:
            return state;
    }
}

export default reducer;