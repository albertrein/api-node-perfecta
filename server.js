const express = require('express');
const app = express();
const cors = require('cors');
const sendmail = require('./services/SendMail');

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
app.get("/categorys", async (req, res) => {
	let out = await category.getAllCategories();
	res.send(out);
});

//Get All jobs by categoryName
app.get('/category/jobs/:categoryName', async (req, res) => {
	let out = await job.getJobsByCategory(req.params.categoryName);
	res.send(out);
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

app.post('/sendmail' , async (req, res) => {
	if(!(req.get('origin').includes('perfecta-rh.'))){
		res.send({"success": 'fail'});
	}
	let resultOfSendMail = sendmail.sendThisMail(req.body.name, req.body.)
})

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