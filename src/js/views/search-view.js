function SearchView(viewId) {
    // pass in the id of the view
    this.view = document.querySelector(viewId);

    this.configUI = function () {
        console.log("Search View Config");
    }

    this.updateLabel = function (label) {
        // update the label when the radio button changes
        this.view.querySelector('label[for=searchTerm]').textContent = label;
    }

    return this;
}

export default SearchView