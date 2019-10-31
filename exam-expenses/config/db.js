const mongoose = require('mongoose');
const config = require('./config');
const dbName = 'moneygone';

module.exports = () => {
  return mongoose
    .connect(
      config.dbURL + dbName,
      { 
        useNewUrlParser: true, 
        useUnifiedTopology: true, 

        // The followin flags forces useCreateIndex to true and removes the nasty DepricationWarning, you can thank me later ;-)
        useCreateIndex: true,
        useFindAndModify: false
       },
      console.log("Database is ready!!!")
    );
};