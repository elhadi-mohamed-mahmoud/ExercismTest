import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ExerciseServiceService {

  constructor(private http: HttpClient) { }


    private baseUrl = 'http://localhost:8080/';

getAllExercises(){

	// return this.http.get(`${this.baseUrl}/all`);

	return new Promise((resolve, reject) => {
        let headers = new HttpHeaders();
       
       headers.append('Access-Control-Allow-Origin' , '*');
       headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
       headers.append('Accept','application/json');
       headers.append('content-type','application/json');
 
        this.http.get(this.baseUrl+'api/all', {headers: headers})
          .subscribe(res => {
            let data = res;
            JSON.stringify(data);
            console.log(data);
            resolve(data);
 				
          }, (err) => {
            reject(err);
          });
    });
}
}
