let url = 'https://cloud.iexapis.com/stable';

export const fetchSymbols = () => {
    return (dispatch) => {
        console.log('ss');
        return fetch(`${url}/ref-data/iex/symbols?token=${process.env.REACT_APP_MY_TOKEN}`)
            .then(response => response.json())
            .then(json => dispatch(
                {
                    type: "FetchSymbols",
                    symbols: json.map(x => x.symbol),
                }
            )).catch(error => dispatch(
                {
                    type: "ERROR",
                    error: "Unable to fetch data",
                }
            ));
    };
};

export const selectSymbol = (symbol) => {
    return {
        type: "SELECT_SYMBOL",
        symbol
    };
};

export const fetchQuote = (symbol) => {
    return function(dispatch) {
        return fetch(`${url}/stock/${symbol.toLowerCase()}/quote?token=${process.env.REACT_APP_MY_TOKEN}`)
            .then(response => response.json())
            .then(json => dispatch(
                {
                    type: "FetchQuote",
                    data: json,
                }
            )).catch(error => dispatch(
                {
                    type: "ERROR",
                    error: "Unable to fetch quotes",
                }
            ));
    };
};

export const fetchTimeSeries = (symbol) => {
    return function(dispatch) {
        return fetch(`${url}/stock/${encodeURIComponent(symbol.toLowerCase())}/chart?token=${process.env.REACT_APP_MY_TOKEN}`)
            .then(response => response.json())
            .then(json => dispatch(
                {
                    type: "FetchTimeSeries",
                    data: json.map(point => ({
                        x: new Date(point.date),
                        y: point.close,
                    })),
                }
            )).catch(error => dispatch(
                {
                    type: "ERROR",
                    error: "Unable to fetch time series",
                }
            ));
    };
};

export const addTransaction = (symbol, numShares) => {
    return {
        type: "ADD_TRANSACTION",
        symbol,
        numShares,
    };
};

export const updatePortfolio = (transactions) => {
    return function(dispatch) {
        return fetch(`${url}/stock/market/batch?symbols=${transactions.slice(1).reduce((acc, curr) => 
            acc + "," + encodeURIComponent(curr.symbol), transactions[0].symbol)}&types=quote&token=${process.env.REACT_APP_MY_TOKEN}`)
            .then(response => response.json())
            .then(json => dispatch(
                {
                    type: "UPDATE_PORTFOLIO",
                    data: json,
                }
            )).catch(error => dispatch(
                {
                    type: "ERROR",
                    error: "Unable to update portfolio",
                }
            ));
    };
};