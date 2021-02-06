function AVModel() {
    this.apiBaseUrl = "https://www.alphavantage.co/";
  
    this.init = function () {
      const result = this.query("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=RFLPZF1898RN01VR");
      return result
    };

    this.query = async function (url) {
        const req = await fetch(url)
        const res = await req.json()
        return res
      };

    this.search = async function (searchStuff) {
    // set up the url
    // object destructuring
    const {category, name} = {...searchStuff}
    //let url = new URL(this.apiBaseUrl + category + '?')
    let url = new URL("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=RFLPZF1898RN01VR")

    const params = new URLSearchParams()
    params.set('search', name)
    url = url+params
    const req = await fetch(url)
    const res = await req.json()
    console.log(res["Meta Data"]);
    return res
    }
}

export default AVModel