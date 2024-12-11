import { Component } from '@angular/core';
import { StudentService } from '../service/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent {
  students: any[] = [];
  selectedStudentId: number | null = null;

  constructor(private studentService: StudentService, private router: Router) {}

  ngOnInit() {
   this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.getStudents().subscribe((data) => {
      this.students = data;
    });
  }

  editStudent(id: number) {
    // if (confirm('Are you sure you want to delete this student?')) {
      this.router.navigate([`/edit/${id}`]);
    
  }

 /*  deleteStudent(id: number) {
    this.studentService.deleteStudent(id).subscribe({
      next: () => {
        this.loadStudents();
      },
      error:()=>{
        alert('Error deleting student')
      }
    })
  } */

    setSelectedStudentID(id:number){
        this.selectedStudentId = id;
        console.log(this.selectedStudentId);
        

    }

    deleteStudent(){
      this.studentService.deleteStudent(this.selectedStudentId!).subscribe({
        next: () => {
          this.loadStudents();
        },
        error:()=>{
          alert('Error deleting student')
        }
      })
    }

  
}
