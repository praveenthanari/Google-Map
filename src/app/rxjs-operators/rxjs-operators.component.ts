import { Component, OnInit } from '@angular/core';
// import { resolve } from 'dns';
import { from, of} from 'rxjs';
import{reduce,filter, map} from 'rxjs/operators'

@Component({
  selector: 'app-rxjs-operators',
  templateUrl: './rxjs-operators.component.html',
  styleUrls: ['./rxjs-operators.component.css']
})
export class RxjsOperatorsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let arr = [1,2,3,4,5,6,6,7,8,9];
    let test = from(arr);
  
  test.subscribe(x=>console.log(x));

  const promise = from(new Promise(resolve => resolve('Hello Angular')));
  const subscribe = promise.pipe(map(x => console.log(x)))

console.log(subscribe.subscribe(x=>console.log(x)))
  const test1 = from('Hello');
  test1.subscribe(x=> console.log(x))
  }
}
