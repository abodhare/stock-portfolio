const initialState = {
    num: 0,
    data: null,
    error: "",
    symbol: "",
    quote: {},
    timeSeries: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "INCREMENT":
            return {...state, num: state.num + 1};
        case "FetchData":
            return {...state, data: action.data};
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