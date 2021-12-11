import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CarsService } from '../services/cars.service';
import { DbService } from '../services/db.service';
import { Car } from './car';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.page.html',
  styleUrls: ['./car-list.page.scss'],
})
export class CarListPage implements OnInit {

  constructor(private car_service: CarsService, private router: Router) { }

  cars: Car[] = [];
  carlist:any;

  searchTerm: any;
  search_by: string = "Make"; // By default search by Make

  ngOnInit() {
  }

  getCarsList() {
    this.searchTerm = (this.search_by == 'Year') ?  parseInt(this.searchTerm): this.searchTerm;
    this.car_service.getCars(this.search_by, this.searchTerm).then(res => {
      this.cars = res;
    });
  }

  inputChange() {
    if (this.searchTerm && this.searchTerm.trim() != '') {
      this.getCarsList();
    } 
  }

}
