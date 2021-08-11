import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {interval, Observable, Subject, Subscriber, Subscription, timer} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.scss']
})
export class StopwatchComponent implements OnDestroy {

  private destroy = new Subject();
  time = 0;
  sub: Subscription;
  timer = interval(1000).pipe(takeUntil(this.destroy));
  doubleClick;
  @ViewChild('buttonElement') button: ElementRef<HTMLButtonElement>;

  constructor() {
  }

  startClick(): void {
    if (!this.sub || this.sub.closed) {
      this.button.nativeElement.innerText = 'Stop';
      this.start();
    } else {
      this.stop();
    }
  }
  start(): void {
    this.sub = this.timer.subscribe(() => {
      this.time += 1000;
    });
  }
  stop(): void {
    this.sub.unsubscribe();
    this.time = 0;
  }
  wait(): void {
    if (this.doubleClick) {
      this.button.nativeElement.innerText = 'Start';
      this.sub.unsubscribe();
    } else {
      this.doubleClick = true;
      timer(300).subscribe(() => {
        this.doubleClick = false;
      });
    }
  }
  reset(): void {
    this.time = 0;
    if (!this.sub || this.sub.closed) {
      this.start();
    }
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }

}
