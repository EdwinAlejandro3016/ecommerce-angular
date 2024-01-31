import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent implements OnChanges{
  @Input({required:true}) duration = 0;
  @Input({required:true}) message = '';

  constructor(){
    // NO ASYNC
    //BEFORE RENDER
    console.log('constructor')
    console.log('-'.repeat(10));
  }

  ngOnChanges(changes: SimpleChanges): void {
    //before and during render
    console.log('ngOnChanges')
    console.log('-'.repeat(10));
    console.log(changes)
  }
}
