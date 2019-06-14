let url = 'https://cloud.iexapis.com/stable';

export const increment = () => {
    return {
        type: "INCREMENT",
    };
};

export const fetchSymbols = () => {
    return (dispatch) => {
        console.log('ss');
        return fetch(`${url}/ref-data/iex/symbols?token=${process.env.REACT_APP_MY_TOKEN}`)
            .then(response => response.json())
            .then(json => dispatch(
                {
                    type: "FetchData",
                    data: json.map(x => x.symbol),
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