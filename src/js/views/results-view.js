import ejs from "ejs";
import Stock from '../models/stock.js'

const stockView = `
<aside class="stock">
  <header><h3 class="name"> <%= stockInfo.symbol %></h3></header>
  
  <div class="card-layout">
  symbol: <span class="row"><%= stockInfo.symbol %></span>
  open: <span class="row"><%= stockInfo.open %></span>
  high: <span class="row"><%= stockInfo.high %></span>
  low: <span class="row"><%= stockInfo.low %></span>
  close: <span class="row"><%= stockInfo.close %></span>
  volume: <span class="row"><%= stockInfo.volume %></span>
  </div>


</aside>
`;

const noResultsView = `
<aside class="error">
  <header>
    <h3> There are no results matching this search</h3>
 <header>
</aside>
`;

function ResultsView(viewId) {
  this.container = document.querySelector(viewId);
  
  this.configUI = function (stockInfo) {
    // looking for an object with the "stock" property
    const elem = ejs.render(stockView, {stockInfo:stockInfo})
    this.container.insertAdjacentHTML('afterbegin', elem)
  }

  this.renderStocks = function (stocks) {
    const today = new Date();
    const date = (today.getFullYear()+'-'+((today.getMonth()+1).toString().padStart(2, '0'))+'-'+((today.getDate() - 1).toString().padStart(2, '0')));
    const timeSeries = stocks["Time Series (Daily)"][date];
    const stockInfo = new Stock(
                            stocks["Meta Data"]["2. Symbol"],
                            timeSeries["1. open"],
                            timeSeries["2. high"],
                            timeSeries["3. low"],
                            timeSeries["4. close"],
                            timeSeries["5. volume"],
                            );

    this.removeChildElements();
    console.log(stockInfo.symbol)
    if (Object.keys(stockInfo) === 0) {
      const elem = ejs.render(noResultsView)
      this.container.insertAdjacentHTML('afterbegin', elem)
    }

    if (Object.keys(stockInfo) !== 0) {
        const elem = ejs.render(stockView, {stockInfo:stockInfo})
        console.log({stockInfo:stockInfo});
        this.container.insertAdjacentHTML('afterbegin', elem)
    }
  }
  
  this.removeChildElements = function() {
    this.container.querySelectorAll('aside').forEach((stock)=> {
      this.container.removeChild(stock);
    })
  }
}

export default ResultsView
