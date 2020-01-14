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
		let sended = false;
		
		this.databaseReference.on('child_added', snap => {
			sended = true;
		});

		firebase.ref('perfecta/perfecta-category').orderByChild('category').equalTo(categoryName).once('value', obj => {
			if(!obj){
				return false;
			}
			this.databaseReference.child(jobTitle).set({"jobCategory":categoryName, "description":jobDescription});
		});
		return sended;
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
