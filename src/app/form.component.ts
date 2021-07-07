import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, Validators} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  form = this.fb.group({
    firstName: [''],
    lastName: [''],
    dateOfBirth: [''],
    framework: [''],
    frameworkVersion: [''],
    email: ['', Validators.email, (a) => this.emailValidator(a)],
    hobby: this.fb.array([], Validators.required)
  });
  get hobby(): FormArray {
    return this.form.controls.hobby as FormArray;
  }
  frameworks = ['angular', 'react', 'vue'];
  versions = {
    angular: ['1.1.1', '1.2.1', '1.3.3'],
    react: ['2.1.2', '3.2.4', '4.3.1'],
    vue: ['3.3.1', '5.2.1', '5.1.3'],
  };
  validating = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    // send data to server
    console.log(this.form.value);
  }

  emailValidator(control: AbstractControl): Observable<any> {
    // restricting submit button, until validation is over
    this.validating = true;
    // imitating server validation
    return new Observable(subscriber => {
      setTimeout(() => {
        if (control.value === 'test@test.test') {
          subscriber.next({emailExists: true});
        } else {
          subscriber.next(null);
        }
        this.validating = false;
        subscriber.complete();
      }, 2000);
    });
  }

  getError(control: AbstractControl): string {
    if (control.hasError('required')) {
      return 'The field is empty';
    }
    return control.hasError('emailExists') ? 'This email already exists' : '';
  }

  addHobby(): void {
    const hobbyForm = this.fb.group({
      name: [''],
      duration: ['']
    });
    this.hobby.push(hobbyForm);
  }
  deleteHobby(i): void {
    this.hobby.removeAt(i);
  }

  changeSelect(): void {
    // forcing to reselect framework version
    this.form.patchValue({frameworkVersion: ''});
  }
}
