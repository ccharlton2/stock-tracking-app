import ejs from "ejs";
import Stock from "../models/stock.js";

// what the user sees if the search returned results
const stockView = `
<aside class="stock">
  <header><h3 class="name"> <%= stockInfo.symbol %></h3></header>
  <span class="row"><%= stockInfo.date %></span>

  <div class="card-layout">
    Opened At: <span class="row"><%= stockInfo.open %></span>
    High Of: <span class="row"><%= stockInfo.high %></span>
    Low Of: <span class="row"><%= stockInfo.low %></span>
    Closed At: <span class="row"><%= stockInfo.close %></span>
    Volume Sold: <span class="row"><%= stockInfo.volume %></span>
  </div>
</aside>
`;

// what the user sees if the search did not return results
const noResultsView = `
<aside class="error">
  <header>
    <h3> 
      There are no results matching this search. Please try another symbol name.
      <span style="color: red;">Please keep in mind that symbol names are case sensitive.</span>
    </h3>
 <header>
</aside>
`;

function ResultsView(viewId) {
  this.container = document.querySelector(viewId);

  // sets the views
  this.setStock = function (stocks) {
    this.removeChildElements();

    /* 
      if there's no "Meta Data" property returned from the object
      then we can assume it's a bad call
    */
    if (!stocks.hasOwnProperty("Meta Data")) {
      // create the element that will be appended to the DOM
      const elem = ejs.render(noResultsView);
      // append element to the DOM
      this.container.insertAdjacentHTML("afterbegin", elem);
    }

    /* 
      if the "Meta Data" exists we can assume it's a good call
    */
    if (stocks.hasOwnProperty("Meta Data")) {
      this.removeChildElements();

      const lastRefreshed = stocks["Meta Data"]["3. Last Refreshed"];
      const timeSeries = stocks["Time Series (Daily)"][lastRefreshed];

      // convert last refreshed date to a date object
      const date = new Date(lastRefreshed);

      // add a day onto the date
      date.setDate(date.getDate() + 1);

      // set options for LocaleDate
      var options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };

      // build the Stock object that will be displayed
      const stockInfo = new Stock(
        stocks["Meta Data"]["2. Symbol"],
        timeSeries["1. open"],
        timeSeries["2. high"],
        timeSeries["3. low"],
        timeSeries["4. close"],
        timeSeries["5. volume"],
        date.toLocaleDateString("en-US", options)
      );

      // create the element that will be appended to the DOM
      const elem = ejs.render(stockView, { stockInfo: stockInfo });
      // append element to the DOM
      this.container.insertAdjacentHTML("afterbegin", elem);
    }
  };

  /* 
    removes child elements from the aside where stock 
    information is displayed
  */
  this.removeChildElements = function () {
    this.container.querySelectorAll("aside").forEach((stock) => {
      this.container.removeChild(stock);
    });
  };
}

export default ResultsView;
