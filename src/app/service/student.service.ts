import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:3000/student'

  constructor(private http:HttpClient) {}

  // fetching student data
  getStudents():Observable<any>{
    return this.http.get(`${this.apiUrl}/get`)
  }

  //get student by id
  getStudentById(id:any):Observable<any>{
    return this.http.get(`${this.apiUrl}/get/${id}`)
  }

  // adding student data
  addStudent(student:any):Observable<any>{
    console.log(student);
    
    return this.http.post(`${this.apiUrl}/add`,student)
  }

  // deleting student data
  deleteStudent(id:any):Observable<any>{
    return this.http.delete(`${this.apiUrl}/delete/${id}`)
  }

  // updating student data
  updateStudent(student:any):Observable<any>{
    return this.http.put(`${this.apiUrl}/update`,student)
  }
}
