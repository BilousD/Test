import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { TaskComponent } from './task.component';
import {CommonModule} from '@angular/common';
import {AppModule} from './app.module';
import {By} from '@angular/platform-browser';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  let span: HTMLSpanElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskComponent ],
      imports: [
        CommonModule,
        AppModule
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    span = fixture.debugElement.query(By.css('span')).nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change', fakeAsync(() => {
    component.generate(5);
    const generated = span.innerText;
    component.generate(5);
    expect(span.innerText).not.toBe(generated);
  }));
  it('should change style', () => {
    component.generate(5);
    // generating until palindrome
    while (!component.checkPalindrome(span.innerText) && span.innerText.includes('0') && isNaN(Number(span.innerText))) {
      component.generate(5);
    }
    // checking style
    checkStyle(span);
    // generating until number
    while (!isNaN(Number(span.innerText)) && span.innerText.includes('0')) {
      component.generate(5);
    }
    checkStyle(span);
    // generating until contains 0
    while (!span.innerText.includes('0')) {
      component.generate(5);
    }
    checkStyle(span);

  });
});
function checkStyle(span): void {
  if (span.innerText.includes('0')) {
    expect(span.hidden).toBe(true);
  } else if (!isNaN(Number(span.innerText))) {
    expect(span.style.color).toBe('blue');
  } else {
    expect(span.style.color).toBe('red');
  }
}
