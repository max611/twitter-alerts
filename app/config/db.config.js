if(process.env.NODE_ENV === 'production') {
    module.exports = {
		  HOST: process.env.DB_HOST,
		  USER: process.env.DB_USERNAME,
		  PASSWORD: process.env.DB_PASSWORD,
		  DB: process.env.DB_DATABASE
		};
} else {
  module.exports = {
	  HOST: "localhost",
	  USER: "max",
	  PASSWORD: "123456",
	  DB: "testdb"
	};
}
