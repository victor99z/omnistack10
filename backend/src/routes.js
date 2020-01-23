const { Router } = require('express');
const DevController = require('./controllers/DevController.js');
const SearchController = require('./controllers/SearchController');

const routes = Router();

routes.post('/devs', DevController.store)
routes.get('/devs', DevController.index)
routes.get('/search', SearchController.index)
routes.delete('/devs/:id', DevController.destroy)
routes.put('/devs', DevController.update)
routes.get('/devs/:id', DevController.show)


module.exports = routes;