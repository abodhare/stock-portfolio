const initialState = {
    symbols: [],
    error: "",
    symbol: "",
    quote: {},
    timeSeries: [],
    transactions: [],
    portfolio: {},
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
            let found = false;
            let transactions = state.transactions.map(x => {
                if (x.symbol === action.symbol) {
                    found = true;
                    return ({
                        symbol: action.symbol,
                        numShares: x.numShares + parseFloat(action.numShares),
                })} else {
                    return ({
                        symbol: x.symbol,
                        numShares: x.numShares,
                })};
            });
            if (found) return {...state, transactions: transactions};
            else return {...state, transactions: transactions.concat({
                symbol: action.symbol,
                numShares: parseFloat(action.numShares),
            })};
        case "UPDATE_PORTFOLIO":
            return {...state, portfolio: action.data};
        default:
            return state;
    }
}

export default reducer;