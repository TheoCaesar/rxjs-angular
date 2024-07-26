import { Component, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
  private destroy = inject(DestroyRef)
  count = signal<number>(0);
  constructor(){
    effect(()=>{
      console.log(`You clicked button ${this.count()} times...`)
    })
  }
  ngOnInit() {
    const interval$ = interval(1000).pipe(
      map((val) => val*2)
    ).subscribe({
      next:(value)=>console.log(value),
    })

    //unsubscribe
    setTimeout(() => {
      interval$.unsubscribe()
    }, 15000);
 
    // unsubscribe onDestroy of component
    this.destroy.onDestroy(interval$.unsubscribe)
  }

  onClick(){
    this.count.update((counter)=>counter+=1)
  }
}
