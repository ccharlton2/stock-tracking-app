function AVModel() {
  this.apiBaseUrl = "https://www.alphavantage.co/query?";

  this.init = function () {
    const result = this.query(
      "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=RFLPZF1898RN01VR"
    );
    return result;
  };

  this.query = async function (url) {
    const req = await fetch(url);
    const res = await req.json();
    return res;
  };

  this.search = async function (queryParams) {
    // set up the url
    console.log(queryParams.name);
    const name = queryParams.name;
    let url = new URL(this.apiBaseUrl);

    // build search params
    const params = new URLSearchParams({
      function: "TIME_SERIES_DAILY",
      symbol: "symbol",
      apikey: "RFLPZF1898RN01VR",
    });

    // set the parameter with a key of symbol to the value given by the user
    params.set("symbol", name);
    url = url + params.toString();

    // fetch the data
    const req = await fetch(url);
    const res = await req.json();

    return res;
  };
}

export default AVModel;
