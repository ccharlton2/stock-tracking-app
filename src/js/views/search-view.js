function SearchView(viewId) {
    // pass in the id of the view
    this.view = document.querySelector(viewId);

    this.configUI = function () {
        console.log("Search View Config");
    }

    return this;
}

export default SearchView