const mongoose=require("mongoose");
// const Schema=mongoose.Schema;


const productSchema = mongoose.Schema({
    name:{type: String,require},
 
    price:{type: Number,require},
  
    image:{type: String,require},
    desc:{type: String,require}

},{
    timestamps:true,
})
const productmodel=  mongoose.model("product",productSchema)

module.exports=productmodel;
module.exports.updateProducts = async (req, res) => {
	try {
		const id = req.params.id;
		const updatePostData = await mongo.selectedDb
			.collection("products")
			.findOneAndUpdate({ _id: ObjectId(id) }, { $set: { ...req.body } }, { returnDocument: "after" });
		res.send(updatePostData);
	} catch (err) {
		console.error(err);
		res.status(500).send(err);
	}
};
module.exports.deleteProducts = async (req, res) => {
	try {
		const id = req.params.id;
		const deletePostData = await mongo.selectedDb.collection("products").remove({ _id: ObjectId(id) });
		res.send(deletePostData);
	} catch (err) {
		console.error(err);
		res.status(500).send(err);
	}
};
