import SearchView from "../views/search-view";

function SearchController(model, searchView, resultsView) {
    this.model = model;
    this.searchView = searchView;
    this.resultsView = resultsView;
    this.category='stocks';

    this.configUI = async function () {
        this.searchView.view.addEventListener('submit', this.onHandleSubmit);
        const data = await model.init();
        // pass the data to the view
        console.log(data);
        this.resultsView.configUI(data)

        const radios = this.searchView.view.querySelectorAll('input[type=radio]')
        radios.forEach(radio => {
            radio.addEventListener('change', this.onCheckedHandler);
        });
    }

    this.onCheckedHandler = (e) => {
        this.category = e.currentTarget.value;
        this.searchView.updateLabel(this.category);
    };

    this.onHandleSubmit = async(e) => {
        // key this
        e.preventDefault();
        // no validation

        console.log(e.currentTarget.searchTerm.value);

        // take form name values
        const queryParams = {
            name:e.currentTarget.searchTerm.value
        }
        
        const searchResponse = await this.model.search(queryParams)
        resultsView.renderStocks(searchResponse)
    }
/* 
    demonstrates "this" and arrow functions (compare to above)

    this.onCheckedHandler = (e)=> {
        console.log(this)
    }
 */
    this.configUI();

    return this;
}

export default SearchController