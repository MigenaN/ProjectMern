const UserControllers = require('../controllers/user.controllers');
module.exports = (app) => {   

    app.post('/api/register', UserControllers.register);
    app.post('/api/login', UserControllers.login);
    app.get('/api/users/:id', UserControllers.getUserById)
    app.post('/api/logout', UserControllers.logout);
}