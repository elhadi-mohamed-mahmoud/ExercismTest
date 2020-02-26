import { Component, OnInit } from '@angular/core';
import { ExerciseServiceService } from "./exercise-service.service"
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit
 {
  title = 'myNewApp';



data : any;
topics : any;
newData : any;
id="all";

topic = "All"
difficulty = "All"
status= "All"


constructor(private exerciseService:ExerciseServiceService){

}

ngOnInit() {
	    this.allExercises();
  }

selectDifficulty(id) {
    console.log(id);
    this.conditionSelect(id);
  }

selectTopic(id){
	this.topic = id;
	console.log(id);
	if(id ==="All"){
		this.newData = this.data;
		this.selectDifficulty(this.difficulty);
	}else{
		this.topic = id;
		let dataTopics = [];
		for(let d of this.newData){
				console.log(d['topics'].length);
				console.log(d['topics'].length !==0)
			if (d['topics'].length !==0) {
				for (let topic of d['topics'] ) {
					console.log(topic.name);
					console.log(typeof (topic))
					if(topic.name === this.topic){
						d = JSON.parse(JSON.stringify(d));
						dataTopics.push(d);
					}
				}
			}
		}
	this.newData = dataTopics;
	// this.resetData(this.newData, this.difficulty,this.status);
	}
}


selectStatus(status){
	console.log("enter status");
	this.status = status;
	if(status === "All"){
		this.newData = this.data;
		this.selectTopic(this.topic);
	}else{
		let help =[]
		for (let d of this.newData){
			console.log(d.status);
			console.log(this.status);
			if(d.status === this.status){
				console.log(d.status === this.status)
				console.log("in if status")
				d = JSON.parse(JSON.stringify(d));
				help.push(d);
		}
	}
	this.newData = help;
	}
}

// resetData(data, diff , status){
// this.selectDifficulty(this.difficulty);
// this.se
// }

conditionSelect(id){
	console.log("enter sleect difff")
	this.difficulty = id;
	if(id =="All"){
		this.newData= this.data;
	}else{
		let help = []
		console.log(id);
	for (let d of this.newData){
			console.log(d.difficulty);
		if(d.difficulty === this.difficulty){
			console.log(d["difficulty"]);
			d = JSON.parse(JSON.stringify(d));
			help.push(d);
		}
	}
			this.newData = help;
			console.log(JSON.parse(JSON.stringify(this.newData)));
}
	console.log(this.newData);
	console.log("left sleect difff")
}


allExercises(){
 			this.exerciseService.getAllExercises().then((result) => {
 			console.log("heyyy");
 			JSON.stringify(result);
 			this.data = result;
 			console.log(this.data);
 			this.newData = this.data;
 		 }, (err) => {
            console.log(err);
          });}

}



