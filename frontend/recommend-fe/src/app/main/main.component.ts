import { Component, OnInit, AfterViewInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {HttpService} from '../shared/http.service';

declare let $: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, AfterViewInit {
  bands: any;
  items: any;

  constructor(httpService: HttpService) { 
    this.bands = []
    this.items = []
    httpService.get("/rest/v1/bands").subscribe(data => () =>{
      console.log(data)
      this.bands=data
    })
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }
}
