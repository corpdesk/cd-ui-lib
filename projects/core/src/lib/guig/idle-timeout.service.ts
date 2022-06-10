import {
  Injectable,
  ChangeDetectorRef,
  NgZone,
} from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, interval, merge, Observable, Subscription } from 'rxjs';
import { skipWhile, switchMap, take, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class IdleTimeoutService {
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
  public _cd: ChangeDetectorRef;
  actionCallback: ()=>void;
  constructor(
    public _ngZone: NgZone,
    public router: Router,
  ) {
    let observableArray$: Observable<any>[] = [];
    this.inactivityTimerEvent.forEach(x => {
      observableArray$.push(fromEvent(x[0], x[1]))
    })
    this.mergedObservable$ = merge(...observableArray$);
    this.createObserable();
  }

  // ngOnInit() {
  //   console.log('starting IdleTimeoutComponent::ngOnInit()')
  //   let observableArray$: Observable<any>[] = [];
  //   this.inactivityTimerEvent.forEach(x => {
  //     observableArray$.push(fromEvent(x[0], x[1]))
  //   })
  //   this.mergedObservable$ = merge(...observableArray$);
  //   this.createObserable();
  // }
  createObserable(): void {
    // console.log('starting IdleTimeoutComponent::createObserable()')
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
    // console.log('starting IdleTimeoutComponent::isItTimeToShowPopUp()')
    let timeLeftForInactive = this.inactivityTime - val;
    if (timeLeftForInactive <= 13 && this._cd) {
      // console.log('IdleTimeoutComponent::isItTimeToShowPopUp()/timeLeftForInactive <= 13')
      this.timeLapsedSinceInactivity = timeLeftForInactive;
      this.minute = this.padZero(Math.floor(timeLeftForInactive / 13));
      this.seconds = this.padZero(timeLeftForInactive % 13);
      this._cd.detectChanges();
      console.log('isItTimeToShowPopUp()/timeLeftForInactive:', timeLeftForInactive)
      console.log(timeLeftForInactive);
      if(timeLeftForInactive < 2){
        this.actionCallback();
      }
    }
  }

  subscribeObservable() {
    // console.log('starting IdleTimeoutComponent::subscribeObservable()')
    this.subscription = this.observeable$.subscribe((x) => {
      // console.log(`subscribed for ${x + 1} sec`);
      this.unsubscribeObservable()
    })
  }
  padZero(digit: any) {
    // console.log('starting IdleTimeoutComponent::padZero()')
    return digit <= 9 ? '0' + digit : digit;
  }

  unsubscribeObservable() {
    // console.log('  unsubscriebd')
    this.subscription.unsubscribe();
  }

  startTimer(cd: ChangeDetectorRef, options: any) {
    console.log('starting IdleTimeoutComponent::startTimer()')
    if(cd){
      this.inactivityTime = options.inactivityTime;
      this.actionCallback = options.actionCallback;
      this._cd = cd;
      this.createObserable();
      console.log('IdleTimeoutComponent::startTimer()/subscription started');
    } else {
      console.log('IdleTimeoutComponent::startTimer()/cd is not valid');
    }
    
  }
  stopTimer() {
    if (this.subscription && !this.subscription.closed) {
      this.minute = this.padZero(0);
      this.seconds = this.padZero(0);
      this.unsubscribeObservable();
    }
  }
}