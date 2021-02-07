function SearchView(viewId) {
    // pass in the id of the view
    this.view = document.querySelector(viewId);

    this.configUI = function () {
    }

    return this;
}

export default SearchView