import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../service/student.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent {
editForm!:FormGroup
studentId!:number
subjects = ['Math','Science','English']

constructor(private studentService:StudentService,private fb:FormBuilder,private router:Router, private route:ActivatedRoute){} 

ngOnInit():void{
  this.studentId = Number(this.route.snapshot.paramMap.get('id'))
  console.log(this.studentId);

  this.editForm = this.fb.group({
    name: [{value:'',disabled:true}, Validators.required],
    Math: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
    Science: [0,[Validators.required, Validators.min(0), Validators.max(100)]],
    English: [0,[Validators.required, Validators.min(0), Validators.max(100)]]
  });

  this.studentService.getStudentById(this.studentId).subscribe((data)=>{
    const studentDetails = this.formatData(data);
    console.log(studentDetails);
    // console.log(data);
    // console.log(studentDetails.marks['Math']);
    
    this.editForm.patchValue({
      name: studentDetails.name,
      Math: studentDetails.marks['Math'],
      Science: studentDetails.marks['Science'],
      English: studentDetails.marks['English']
    });
    
    
  })
 

}

formatData(data: any[]) {
  const name = data[0]?.name || '';
  const marks: { [key: string]: number } = {};
  data.forEach((subject: any) => {
    marks[subject.subject_name] = subject.mark;
  });
  return { name, marks };
}

onSubmit():void{
  const updatedData = {
    student_id: this.studentId,
    marks: this.subjects.map((subject) => ({
      subject_name: subject,
      mark: this.editForm.value[subject]
    }))

    
  }

  console.log(updatedData);
  

    this.studentService.updateStudent(updatedData).subscribe({
      next: (response) =>{
        console.log(response);
        this.router.navigate(['/'])
      },
      error:(err)=>{
        console.log(err);
      }
    })
}



}