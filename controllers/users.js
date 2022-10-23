const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');

//возвращает информацию о пользователе (email и имя)
module.exports.getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('Пользователь по указанному _id не найден');
    })
    .then((user) => res.json(user))
    .catch(next);
}

//обновляет информацию о пользователе (email и имя)
module.exports.updateUserProfile = (req, res, next) => {
  const { email, name} = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    {
      new: true,
      runValidators: true,
    },
  ).then((user) => {
    if (!user) throw new NotFoundError('Пользователь по указанному _id не найден');
    return res.json(user);
  })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Невалидный id'));
      } else {
        next(err);
      }
    });
};