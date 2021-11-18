const yahooCredentials = false;
module.exports = {

    checkValue(value) {
        //Parese the value getting out the spaces and lowercase letters
        value = value.trim().toUpperCase();
        return value;
    },
    async execute(searchValue, request) {
        //make a request
        searchValue = this.checkValue(searchValue);
        var axios = require("axios").default;
        let url = "https://apidojo-yahoo-finance-v1.p.rapidapi.com/";
        let params
        switch (request) {
            case 1:
                url += "auto-complete";
                params = { q: searchValue };
                break;
            case 2:
                url += "stock/v2/get-statistics";
                params = { symbol: searchValue };

                break;
            case 3:
                url += "market/v2/get-quotes";
                params = { symbols: searchValue, region: 'US' };

                break;
            case 4:
                url += "stock/v2/get-summary";
                params = { symbol: searchValue };

                break;

            default:
                break;
        }
        var options = {
            method: 'GET',
            url: url,
            params: params,
            headers: {
                'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
                'x-rapidapi-key': '42805748cemsh3583b86e32eb907p19d6c5jsnae20e2561041'
            }
        };

        if (yahooCredentials) {
            options.headers = {
                'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
                'x-rapidapi-key': '54c99a3d55msh99603d2fe2e7208p1072cejsn8690a570e281'
            }
        }

        return await axios.request(options).then(function (response) {
            // console.log(response.data);
            return response.data;
        }).catch(function (error) {
            console.error(error);
            return error;
        });
    },
    async getPrice(searchValue) {
        //make the specific request of get-sumary and try to get the value
        let priceReturn = await this.execute(searchValue, 4);
        return priceReturn?.price?.regularMarketPrice?.raw;
    }



}