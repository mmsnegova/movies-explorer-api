const router = require('express').Router();
const routerUsers = require('./users');
const routerMovies = require('./movies');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-err');
const {
  login,
  createUser,
} = require('../controllers/users');

const { validateUserBody, validateAuthentication } = require('../middlewares/validatons');

router.post('/signin', validateUserBody, login);
router.post('/signup', validateAuthentication, createUser);
router.use(auth);
router.use('/users', routerUsers);
router.use('/movies', routerMovies);
router.use((req, res, next) => next(new NotFoundError('Страница не найдена')));

module.exports = router;
