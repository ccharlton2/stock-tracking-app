/* 
    models a stock object with defined parameters
*/

function Stock(symbol, open, high, low, close, volume, date) {
    this.symbol = symbol;
    this.open = open;
    this.high = high;
    this.low = low;
    this.close = close;
    this.volume = volume;
    this.date = date;
}

export default Stock