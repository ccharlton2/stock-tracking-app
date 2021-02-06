import AVModel from './models/av.js'
import SearchView from './views/search-view'
import ResultsView from './views/results-view'
import SearchController from './controllers/search-controller'


// creating an instance of the SwapiModel
const model = new AVModel();
const searchView = new SearchView('#search');
const resultView = new ResultsView('#results');
const searchController = new SearchController(model, searchView, resultView)

console.log(searchController);