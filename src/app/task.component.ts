import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscriber, Subscription, timer} from 'rxjs';

// using both lower- and uppercase result in higher chance of generating letter
const ALLOWED_CHARACTERS = 'qwertyuiopasdfghjklzxcvbnm1234567890';

@Component({
  selector: 'app-task',
  template: `Generated string:
<br>
<span #generated></span>`,
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements AfterViewInit, OnDestroy {

  subscriber: Subscription;
  @ViewChild('generated') span: ElementRef<HTMLSpanElement>;

  constructor() { }

  ngAfterViewInit(): void {
    const t = timer(0, 3000);
    this.subscriber = t.subscribe(() => this.generate(5));
  }

  generate(length): void {
    const s = this.span.nativeElement;
    // resetting span if it was changed before
    s.hidden = false;
    s.style.color = 'black';
    let generated = '';
    for (let i = 0; i < length; i++) {
      // generating random character from allowed chars
      const l = ALLOWED_CHARACTERS.charAt(Math.random() * ALLOWED_CHARACTERS.length);
      // 50% chance for each letter to be uppercase
      generated += (Math.random() < 0.5) ? l : l.toUpperCase();
    }
    s.innerText = generated;
    if (generated.includes('0')) {
      s.hidden = true;
      // no need to check other conditions
      return;
    }
    if (this.checkPalindrome(generated)) {
      s.style.color = 'red';
    }
    // 0x123 etc. will be treated as number
    // also number palindrome styles will be overwritten
    // @ts-ignore
    if (!isNaN(generated)) {
      s.style.color = 'blue';
    }
  }
  checkPalindrome(str): boolean {
    const reverse = str.split('').reverse().join('');
    return reverse === str.toLowerCase();
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

}
