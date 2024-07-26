import { Component, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { count, interval, map, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
  private destroy = inject(DestroyRef)
  count = signal<number>(0);
  count$ = toObservable(this.count) //notice arg isnt callable

  //create interval observable & convet to signal...
  intervalSignal = interval(1000)
  count$ignal = toSignal(this.intervalSignal, {initialValue:25});

  customInterval = new Observable((subscriber)=>{
    let count = 0
    const interval = setInterval(() => {
      if (count >2) {
        clearInterval(interval)
        subscriber.complete();
        return;
      }
      console.log('emitting new Value...')
      subscriber.next({message: 'New Value'})
      count++;
    }, 2000);
  });
  constructor(){
    // effect(()=>{console.log(`You clicked button ${this.count()} times...`)})
  }
  ngOnInit() {
    const custSubscr = this.customInterval.subscribe({
      next: (val)=>console.log(val), 
      complete: ()=> console.log('Already run 3 times...Completed!')
    })
    const subscr = this.count$.subscribe({
      next: (data)=> console.log(`You clicked button ${data} times...`),
    })
  }

  onClick(){
    this.count.update((counter)=>counter+=1)
  }
}
