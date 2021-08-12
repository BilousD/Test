import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { FormComponent } from './form.component';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AppModule} from './app.module';
import {By} from '@angular/platform-browser';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormComponent ],
      imports: [
        ReactiveFormsModule,
        CommonModule,
        AppModule
      ],
      providers: [
        {provide: FormBuilder, useValue: formBuilder},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('frameworkVersion should change visibility', () => {
    expect(fixture.debugElement.query(By.css('#frameworkVersion'))).toBeNull();
    component.form.patchValue({framework: 'angular'});
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('#frameworkVersion'))).toBeTruthy();
    component.form.patchValue({framework: ''});
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('#frameworkVersion'))).toBeNull();
  });

  it('validation should change', fakeAsync(() => {
    const submit = fixture.debugElement.query(By.css('button[type="submit"]'));
    expect(submit.nativeElement.disabled).toBe(true);
    component.addHobby();
    fixture.detectChanges();
    component.form.setValue({firstName: 'Foo',
      lastName: 'Bar',
      dateOfBirth: '2021-06-28',
      framework: 'angular',
      frameworkVersion: '1.1.1',
      email: 'test@test.com',
      hobby: [{name: 'test', duration: 'test'}]});
    tick(2000);
    expect(component.form.valid).toBe(true);
    fixture.detectChanges();
    expect(submit.nativeElement.disabled).toBe(false);
  }));
  it('email should fail to validate', fakeAsync(() => {
    component.form.patchValue({email: 'test@test.test'});
    component.form.controls.email.markAsTouched();
    tick(2000);
    expect(component.form.controls.email.valid).toBe(false);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('span')).nativeElement.innerText).toBe('This email already exists');
  }));
});
