export const increment = () => {
    return {
        type: "INCREMENT",
    };
};

export const fetchData = () => {
    return (dispatch) => {
        console.log('ss');
        return fetch(`https://cloud.iexapis.com/stable/stock/aapl/quote?token=${process.env.REACT_APP_MY_TOKEN}`)
            .then(response => response.json())
            .then(json => dispatch(
                {
                    type: "FetchData",
                    data: json,
                }
            )).catch(error => dispatch(
                {
                    type: "ERROR",
                    error: "Unable to fetch data",
                }
            ));
    };
};