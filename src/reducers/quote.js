const initialState = {
    symbols: null,
    error: "",
    symbol: "",
    quote: {},
    timeSeries: [],
    transactions: [],
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
        case "ADD_TRANSACTION":
            return {...state,
                transactions: state.transactions.concat({
                    symbol: action.symbol,
                    numShares: action.numShares,
                }
            )};
        default:
            return state;
    }
}

export default reducer;