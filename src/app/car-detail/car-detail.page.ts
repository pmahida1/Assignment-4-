import { Component, OnInit } from '@angular/core';
import { Car } from '../car-list/car';
import { CarsService } from '../services/cars.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DbService } from '../services/db.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.page.html',
  styleUrls: ['./car-detail.page.scss'],
})
export class CarDetailPage implements OnInit {

  objId: any;

  constructor(private route: ActivatedRoute, private router: Router, private db_service: DbService
  ,private car_service: CarsService, public toastController: ToastController) {
    this.objId = this.route.snapshot.paramMap.get('myid');
    this.getCarDetail(this.objId);
  }

  car: Car = new Car;
  cars: Car[] = [];
  favCarList: Car[] = [];

  ngOnInit() {
    // Fetch the favorite cars
    this.fetchFromStorage();
  }

  getCarDetail(objId) {
    this.car_service.getCarDetail(objId).then(res => {
      this.car = res;
    })
  }

  AddFavorite() {

    if (this.favCarList.length < 0) {
      this.favCarList.push(this.car);
      this.saveStorage(this.favCarList);
      this.presentToast("Item added to favorites!");
      return;
    }

    for (const element of this.favCarList) {
      if (element.objectId == this.car.objectId) {
        this.presentToast("Item already in favorites!");
        return; // item already in favorites
      }
    }

    this.favCarList.push(this.car);
    this.saveStorage(this.favCarList);
    this.presentToast("Item added to favorites!");
  }

  fetchFromStorage() {
    this.db_service.fetchCars().then(res => {
      console.log("Inside fetch function");
      if (res != undefined) {
        this.favCarList = res;
      }
    });
  }

  saveStorage(cars) {
    this.db_service.storeCars(cars);
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
