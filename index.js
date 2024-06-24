// database code
import app from "./server.js"
import mongodb from "mongodb"
import ReviewsDAO from "./dao/reviewsDAO.js"

const MongoClient = mongodb.MongoClient;

const mongo_username = "<your_mongodb_username>";
const mongo_password = "<your_mongodb_password>";

const uri = `<your_mongo_db_cluster_connection_string>`;
const port = 8000;

MongoClient.connect(uri, {
		maxPoolSize: 50,
		wtimeoutMS: 2500,
		useNewUrlParser: true
	})
	.catch(err => {
		console.error(err.stack);
		process.exit(1)
	})
	.then(async client => {
		await ReviewsDAO.injectDB(client)
		app.listen(port, () => {
			console.log(`listening on port: ${port}`)
		})
	})

