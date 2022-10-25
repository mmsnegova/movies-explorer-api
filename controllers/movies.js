const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');

//возвращает все сохранённые текущим  пользователем фильмы
module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id})
    .then((movies) => res.send(movies))
    .catch(next);
};

//создаёт фильм по переданным в теле параметрам
module.exports.createMovie = (req, res, next) => {
  const {country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId } = req.body;
  Movie.create({ country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId, owner: req.user._id })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании фильма'));
      } else {
        next(err);
      }
    });
};


//удаляет сохранённый фильм по id
module.exports.deleteMovieById = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((movie) => {
      console.log(!movie.owner.equals(req.user._id))
      if (!movie) throw new NotFoundError('Передан несуществующий id фильма');
      if (!movie.owner.equals(req.user._id)) throw new ForbiddenError('Нельзя удалить чужой фильм');
      Movie.deleteOne(movie).then(() => res.send({ movie }));
    }).catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Невалидный id'));
      } else {
        next(err);
      }
    });
};


