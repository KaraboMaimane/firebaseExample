import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { firebaseConfig } from '../../app/firebase.config';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  database: string = firebaseConfig.databaseURL;
  dataList: any;
  dataKeys: string[];
  data = [];
  constructor(public http: HttpClient) {

  }
  /* I will be making use of the following REST methods in my app
    1.GET - To retrieve my data
    2.DELETE - To delete my data
    3.PATCH - To update my datas
    4.POST - To add new data to my db
  */
  load() {//GET
    return new Promise(resolve => {
      this.data = [];
      this.http.get(this.database + '/shopping-list.json').subscribe(data => {
        resolve(data);
        this.dataKeys = Object.keys(data);
        this.dataList = Object.keys(data).map(i => data[i].itemName);
        for (let i = 0; i < this.dataKeys.length; i++) {
          let item = {}
          item['key'] = this.dataKeys[i];
          item['item'] = this.dataList[i];
          this.data.push(item);
        }
      },
        err => {
          console.log(err);
        }
      )
    });
  }

  add(itemName: string) {//POST
    return this.http.post(this.database + '/shopping-list.json', { itemName: itemName }).subscribe(data => {
    });
  }

  delete(i: number) {//DELETE
    return this.http.delete(this.database + '/shopping-list/' + this.data[i].key + '.json').subscribe(data => {
    });
  }

  edit(i: number, item: string) {//PATCH
    return this.http.patch(this.database + '/shopping-list/' + this.data[i].key + '.json', { itemName: item }).subscribe(data => {
    });
  }

  showDb() {
    return this.data;
  }

}
