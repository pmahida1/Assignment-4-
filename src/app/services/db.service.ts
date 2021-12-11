import { Injectable } from '@angular/core';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { Car } from '../car-list/car';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  cars: Car[] = [];
 
  constructor(private nativeStorage: NativeStorage) { }

  storeCars(cars) {
    this.nativeStorage.setItem('cars', JSON.stringify(cars))
  .then(
    () => console.log('Stored item!'),
    error => console.error('Error storing item', error)
  );
  }

  fetchCars() {
    return this.nativeStorage.getItem('cars').then(
    data => JSON.parse(data))
    .catch(err => {
    })
  }
}
