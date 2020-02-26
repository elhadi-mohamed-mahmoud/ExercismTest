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
topic = "All"
difficulty = "All"
status= "All"


constructor(private exerciseService:ExerciseServiceService){

}

ngOnInit() {
	    this.allExercises();
  }

firstSelect(id){
	this.selectFilter(id,this.topic, this.status);
}

secondSelect(id){
		this.selectFilter(this.difficulty,id, this.status);
}

thirdSelect(id){
			this.selectFilter(this.difficulty,this.topic, id);
}

// a fonction that helps filter topics that was choosen by the user 
selectTopic(id){
	this.topic = id;
	console.log(id);
	if(id ==="All"){
		console.log(this.newData);
	}else{
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
	}
}

// filter status 
selectStatus(status){
	console.log("enter status");
	this.status = status;
	if(status === "All"){
		console.log("status func :"+this.newData)
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


selectFilter(diff, topic, status){

	this.selectDifficulty(diff);
	this.selectTopic(topic);
	this.selectStatus(status);
}


selectDifficulty(id){
	this.difficulty = id;
	if(id ==="All"){
		this.newData= this.data;
	}else{
		let help = []
		console.log(id);
	for (let d of this.data){
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



