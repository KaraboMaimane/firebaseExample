import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { firebaseConfig } from '../../app/firebase.config';
import { Observable } from 'rxjs/Observable';

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

  load(){
    return new Promise(resolve =>{
      this.data = [];
      this.http.get(this.database+ '/shopping-list.json').subscribe(data =>{
        resolve(data);
        // console.log(data); // gives the object here
        this.dataKeys = Object.keys(data);
        this.dataList =  Object.keys(data).map(i => data[i].itemName);
        for(let i = 0 ; i < this.dataKeys.length; i++){
          let item = {}
          item['key'] = this.dataKeys[i];
          item['item'] = this.dataList[i];
          this.data.push(item);
          
        }
      },
      err =>{
        console.log(err);
      }
    )
    });
  }

  add(itemName: string){
    return this.http.put(this.database + '/shopping-list/', {item: itemName});
  }

  delete(id: string): Observable<any>{
    return this.http.delete(this.database + '/' +id);
  }

  showDb(){
    return this.data;
  }

}
