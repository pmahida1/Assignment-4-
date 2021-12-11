import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Car } from '../car-list/car';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  private service_url = 'https://parseapi.back4app.com/classes/Car_Model_List';
  private app_id = 'hlhoNKjOvEhqzcVAJ1lxjicJLZNVv36GdbboZj3Z';
  private master_key = 'SNMJJF0CZZhTPhLDIqGhTlUNV9r60M2Z5spyWfXW';

  constructor(public http: HttpClient) { }

  getCars(search_by, search_term) {

    const where = encodeURIComponent(JSON.stringify(new function(){ this[search_by] = search_term; }));
    
    const httpOptions = {
      headers: new HttpHeaders({
        'X-Parse-Application-Id':  this.app_id,
        'X-Parse-Master-Key': this.master_key
      })
    }
    const url = `${this.service_url}?limit=10&where=${where}`;
    return this.http.get(url, httpOptions).toPromise().then(response => response['results']);
  }

  getCarDetail(objectId): Promise<Car> {

    const httpOptions = {
      headers: new HttpHeaders({
        'X-Parse-Application-Id':  this.app_id,
        'X-Parse-Master-Key': this.master_key
      })
    }

    const url = `${this.service_url}/${objectId}`;
    return this.http.get(url, httpOptions).toPromise().then(response => response as Car)
  }
}
