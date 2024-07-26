import { Component, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { count, interval, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
  private destroy = inject(DestroyRef)
  count = signal<number>(0);
  count$ = toObservable(this.count) //notice arg isnt callable
  constructor(){
    // effect(()=>{console.log(`You clicked button ${this.count()} times...`)})
  }
  ngOnInit() {
    const subscr = this.count$.subscribe((data)=>{
      console.log(`You clicked button ${data} times...`)
    })
  }

  onClick(){
    this.count.update((counter)=>counter+=1)
  }
}
