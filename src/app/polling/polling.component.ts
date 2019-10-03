import { OnInit, Component, OnDestroy } from '@angular/core';
import { interval } from 'rxjs/internal/observable/interval';
import {startWith, switchMap} from "rxjs/operators";

@Component(
    {
        selector:'polling-component',
        templateUrl:'./polling.component.html'
    }
)

export class PollingComponent implements OnInit,OnDestroy{

    
    pollingData:any;
    value:any="";
    pollingFreq:number;
    pollingCount:number;
    constructor(){
        this.PollValues();
    }
    ngOnInit(){

    }
    
    ngOnDestroy(){
        this.pollingData.unsubscribe();
    }

    PollValues(): any {
        let count=0;
        this.pollingData=interval(1000)
        .pipe(
          startWith(0),
          switchMap(() => this.value+"s")
        )
        .subscribe(
            res => {
                count+=1;
                this.value+=count+",";
                if(count>16){          
                    this.pollingData.unsubscribe();          
                }                
            },
            error=>{

            }
        );
    }
}