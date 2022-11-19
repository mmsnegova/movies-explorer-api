const SALT_OR_ROUNDS = 10;
const regex = /(https?:\/\/)([www.]?[a-zA-Z0-9-]+\.)([^\s]{2,})/;

const allowedCors = [
  'https://movies-explr.msnegova.nomoredomains.icu',
  'http://movies-explr.msnegova.nomoredomains.icu',
  'http://localhost:3000',
];

module.exports = {
  SALT_OR_ROUNDS,
  regex,
  allowedCors,
};
