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
        this.resultsView.setStock(data)
    }

    this.onHandleSubmit = async(e) => {
        e.preventDefault();

        // get the symbol from user input
        const queryParams = {
            name:e.currentTarget.searchTerm.value
        }
        
        const searchResponse = await this.model.search(queryParams)
        resultsView.setStock(searchResponse)
    }

    this.configUI();

    return this;
}

export default SearchController