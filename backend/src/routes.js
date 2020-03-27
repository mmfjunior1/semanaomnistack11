const express = require('express');

const OngsController = require('./Controllers/OngsController');
const IncidentController = require('./Controllers/IncidentController');
const ProfileController = require('./Controllers/ProfileController');
const SessionController = require('./Controllers/SessionController');
const routes = express.Router();

routes.post('/sessions', SessionController.create);
routes.get('/ongs', OngsController.index);
routes.post('/ongs', OngsController.create);
routes.post('/incidents', IncidentController.create);
routes.get('/incidents', IncidentController.index);
routes.delete('/incidents/:id', IncidentController.delete);
routes.get('/profile', ProfileController.index);

module.exports = routes;