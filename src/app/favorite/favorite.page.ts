import { Component, OnInit } from '@angular/core';
import { Car } from '../car-list/car';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit {

  constructor(private db_service: DbService) { }

  ngOnInit() {
    this.getFavorite();
  }

  cars: Car[] = [];
  isError:any = false;

  getFavorite() {
    this.db_service.fetchCars().then(res => {
      this.cars = res;
      if (res == undefined) {
        this.isError = true;
        return;
      }
    })
  }


}
