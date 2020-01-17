const firebase = require('../Firebase');

module.exports = class Jobs{
	constructor(){
		this.databaseReference = firebase.ref('perfecta/perfecta-jobs');
	}

	getAllJobs(){
		let jobs = {};
		this.databaseReference.on('value', snapshot => {
			jobs = snapshot.val();
		});
		if(!jobs.length){
			return {"AllJobs": "empty"};
		}
		return {"AllJobs": AllJobs}
	}

	createJob(categoryName, jobTitle, jobDescription){
		let out = _ => (new Promise(async (resolve, reject) => {
			firebase.ref('perfecta/perfecta-category').orderByChild('category').equalTo(categoryName).once('value', async obj => {
				if(obj.val()){
					await this.databaseReference.child(jobTitle).set({"jobCategory":categoryName, "description":jobDescription});
					resolve(true);	
				}else{
					resolve(false);
				}	
			});
		}))

		return await out();
	}

	async deleteJob(jobTitle){
		let removed = false;
		this.databaseReference.on('child_removed', el => {
			removed = true;
		});
		this.databaseReference.child(jobTitle).remove();
		return removed;
	}

}
