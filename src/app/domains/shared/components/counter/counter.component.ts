import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent implements OnChanges, OnInit,AfterViewInit,OnDestroy{
  @Input({required:true}) duration = 0;
  @Input({required:true}) message = '';

  counter = signal(0);

  counterRef: number | undefined;

  constructor(){
    // NO ASYNC
    //BEFORE RENDER
    console.log('constructor')
    console.log('-'.repeat(10));
  }

  ngOnChanges(changes: SimpleChanges): void {
    const duration = changes['duration'];
    if(duration && duration.currentValue !== duration.previousValue){
      this.doSomething(duration.currentValue);
    }
    //before and during render
    console.log('ngOnChanges')
    console.log('-'.repeat(10));
    console.log(changes)
  }

  ngOnInit(): void {
    this.counterRef = window.setInterval(()=>{
      this.counter.update(prevState => prevState + 1);
      console.log('interval');
    },1000)
  }

  ngAfterViewInit(): void {
    //after render
    // childs already showed
    console.log('ngAfterViewInit')
    console.log('-'.repeat(10));
  }

  ngOnDestroy(): void {
    window.clearInterval(this.counterRef);
  }

  doSomething(currentValue: number){
    console.log(currentValue)
  }
}
