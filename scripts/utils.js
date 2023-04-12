const path = require('path');

const JoinCwd = (...dirOrPath) => {
  if (!dirOrPath) {
    return process.cwd();
  }
  return path.join(process.cwd(), ...dirOrPath);
};

const isPro = () => process.env.NODE_ENV === 'production';

module.exports = {
  JoinCwd,
  isPro
};
