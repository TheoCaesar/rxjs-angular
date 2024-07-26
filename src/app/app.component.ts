import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
  private destroy = inject(DestroyRef)
  ngOnInit() {
    const interval$ = interval(1000).subscribe({
      next:(value)=>console.log(value),
      error: (err) => console.error(err),
      complete: ()=>console.log('RxJs Interval Observable Complete')
    })

    //unsubscribe
    setTimeout(() => {
      interval$.unsubscribe()
    }, 15000);

    // unsubscribe onDestroy of component
    this.destroy.onDestroy(interval$.unsubscribe)
  }

}
