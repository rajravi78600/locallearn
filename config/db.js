const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://rajravi:1234@cluster0.tao4l3z.mongodb.net/CompanyDatabase?retryWrites=true&w=majority")
      .then((e) => console.log(`Connected to mongoDb:${e.connection.host}`))
      .catch((e) => console.log(e));


      module.exports = mongoose;