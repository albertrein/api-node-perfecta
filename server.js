const express = require('express');
const app = express();
const cors = require('cors');

//Models
const Category = require('./src/model/category/Category');
const Job = require('./src/model/job/Job');
const category = new Category();
const job = new Job();

//Json Comunication
app.use(express.urlencoded())
app.use(express.json())
app.use(cors())

//Controllers
//Routes GET
app.get("/categorys", (req, res) => {
	res.send(category.getAllCategorys());
});

app.get('/jobs', (req, res) => {
	//res.send(job.getAllJobs);
});

//Routes POST
app.post('/new/category/:category', async (req, res) => {
	if(await category.createCategory(req.params.category)){
		res.send({"OK":"Sucess"})
	}else{
		res.send({"OK":"Fail"})
	}
});
app.post('/new/job/', async (req, res) => {
	if(await job.createJob(req.body.jobCategory, req.body.jobTitle, req.body.jobDescription)){
		res.send({"OK":"Success"});
	}else{
		res.send({"OK":"Fail"});		
	}
});

//Routes DELETE
app.delete('/delete/category/:categoryName', async (req, res) => {
	if(await category.deleteCategory(req.params.categoryName)) {
		res.send({"OK":"Sucess"})
	}else{
		res.send({"OK":"Fail"})
	}	
});

app.delete('/delete/job/:jobTitle', async (req, res) => {
	if(await job.deleteJob(req.params.jobTitle)){
		res.send({"OK":"Success"});
	}else{
		res.send({"OK":"Fail"});
	}
});

app.listen(process.env.PORT || 3000);