import { ChangeDetectorRef, Component, Input, NgZone, OnInit } from '@angular/core';
import { fromEvent, interval, merge, Observable, Subscription } from 'rxjs';
import { skipWhile, switchMap, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-idle-timeout',
  templateUrl: './idle-timeout.component.html',
})
export class IdleTimeoutComponent implements OnInit {
  @Input() name: string;
  isVisible = true;
  // here we need to give the time in second ie how long we want the inactivity timer default i have kept as 5 sec
  inactivityTime: number = 15;

  timeLapsedSinceInactivity: number = 0;
  minute: number = this.padZero(0);
  seconds: number = this.padZero(0);
  subscription: Subscription;
  observeable$: Observable<any>;
  mergedObservable$: Observable<any>;


  public inactivityTimerEvent: Array<any>[] = [[document, 'click'], [document, 'wheel'], [document, 'scroll'], [document, 'mousemove'], [document, 'keyup'], [window, 'resize'], [window, 'scroll'], [window, 'mousemove']];

  constructor(public _ngZone: NgZone,
    public _cd: ChangeDetectorRef) {

  }

  ngOnInit() {
    console.log('starting IdleTimeoutComponent::ngOnInit()')
    let observableArray$: Observable<any>[] = [];
    this.inactivityTimerEvent.forEach(x => {
      observableArray$.push(fromEvent(x[0], x[1]))
    })
    this.mergedObservable$ = merge(...observableArray$);
    this.createObsevable();
  }
  createObsevable(): void {
    console.log('starting IdleTimeoutComponent::createObsevable()')
    this._ngZone.runOutsideAngular(() => {
      this.observeable$ = this.mergedObservable$
        .pipe(
          switchMap(ev => interval(1000).pipe(take(this.inactivityTime))),
          tap(value => this.isItTimeToShowPopUp(value)),
          skipWhile((x) => {
            this.timeLapsedSinceInactivity = x;
            return x != this.inactivityTime - 1
          })
        );
      this.subscribeObservable();
    })

  }

  isItTimeToShowPopUp(val: number) {
    console.log('starting IdleTimeoutComponent::isItTimeToShowPopUp()')
    let timeLeftForInactive = this.inactivityTime - val;
    if (timeLeftForInactive <= 13) {
      console.log('IdleTimeoutComponent::isItTimeToShowPopUp()/timeLeftForInactive <= 13')
      this.timeLapsedSinceInactivity = timeLeftForInactive;
      this.minute = this.padZero(Math.floor(timeLeftForInactive / 13));
      this.seconds = this.padZero(timeLeftForInactive % 13);
      this._cd.detectChanges();
      console.log(timeLeftForInactive);
    }
  }

  subscribeObservable() {
    console.log('starting IdleTimeoutComponent::subscribeObservable()')
    this.subscription = this.observeable$.subscribe((x) => {
      console.log(`subscribed for ${x + 1} sec`);
      this.unsubscribeObservable()
    })
  }
  padZero(digit: any) {
    console.log('starting IdleTimeoutComponent::padZero()')
    return digit <= 9 ? '0' + digit : digit;
  }

  unsubscribeObservable() {
    console.log('  unsubscriebd')
    this.subscription.unsubscribe();
  }

  startTimer($event: any) {
    console.log('starting IdleTimeoutComponent::startTimer()')
    this.createObsevable();
    console.log('subscription started');
  }
  stopTimer(event: any) {
    if (this.subscription && !this.subscription.closed) {
      this.minute = this.padZero(0);
      this.seconds = this.padZero(0);
      this.unsubscribeObservable();
    }
  }
}
