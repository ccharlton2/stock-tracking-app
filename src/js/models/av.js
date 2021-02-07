function AVModel() {
    this.apiBaseUrl = "https://www.alphavantage.co/query?";
  
    this.init = function () {
      const result = this.query("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=RFLPZF1898RN01VR");
      return result
    };

    this.query = async function (url) {
        const req = await fetch(url)
        const res = await req.json()
        return res
      };

    this.search = async function (queryParams) {
    // set up the url
    // object destructuring
    console.log(queryParams.name);
    const name = queryParams.name;
    let url = new URL(this.apiBaseUrl)

    const params = new URLSearchParams({
      function: "TIME_SERIES_DAILY",
      symbol: "symbol",
      apikey: "RFLPZF1898RN01VR",
    })

    console.log(params.toString());
    params.set('symbol', name)
    url = url+params.toString()
    console.log(url);
    const req = await fetch(url)
    const res = await req.json()
    return res
    }
}

export default AVModel