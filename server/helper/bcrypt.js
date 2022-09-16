const { genSaltSync, hashSync, compareSync } = require('bcryptjs');

const hasPassword = (password) => {
  const salt = genSaltSync(10);
  const hash = hashSync(password, salt);
  return hash;
};

const comparePassword = (password, hashPassword) => {
  console.log();
  const compare = compareSync(password, hashPassword);
  return compare;
};

module.exports = {
  hasPassword,
  comparePassword,
};
