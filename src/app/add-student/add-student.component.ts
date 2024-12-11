import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from '../service/student.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
})
export class AddStudentComponent {
  addForm!: FormGroup;
  subjects = ['Math', 'Science', 'English'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.addForm = this.fb.group({
      name: ['', Validators.required],
      Math: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      Science: [0,[Validators.required, Validators.min(0), Validators.max(100)]],
      English: [0,[Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  onSubmit() {
    const student = {
      name: this.addForm.value.name,
      marks: this.subjects.map((subject) => ({
        subject_name: subject,
        mark: this.addForm.value[subject],
      })),
      

    };
    console.log(student);
    
    this.studentService.addStudent(student).subscribe(() => {
      this.router.navigate(['/']);
    })
  }
}
