//production and development variables
const config = {
  production: { SECRET: 'process.env.SECRET', DATABASE: 'process.env.MONGODB_URI' },
  default: { SECRET: 'jazzyteapassword', DATABASE: 'mongodb://localhost:27017/jazzytea' }, };

exports.get = function get(env) { return config[env] || config.default; };
