import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/mergeMapTo';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from 'angularfire2/database';


declare var firebase;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  dataList;
  items: Observable<any[]>;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public db: AngularFireDatabase) {
    this.items = db.list('shopping-list').valueChanges();
  }

  ngOnInit() {

  }

  openAlert() {
    const alert = this.alertCtrl.create({
      title: 'Enter some data',
      subTitle: 'Add some items to your shopping cart',
      inputs: [
        {
          name: 'shopping_item',
          placeholder: 'Item here'
        }
      ],
      buttons: [
        {
          text: 'Add',
          handler: data => {
            this.addToCart(data.shopping_item);
            console.log('stuff has been added');
          }
        }
      ]
    });
    alert.present();
  }

  addToCart(item) {
    this.db.list('shopping-list').push({
      itemName: item
    });
  }

  // deleteItem(key: string) {
  //   this.db.delete(key).subscribe(
  //     () => alert('lesson deleted'),
  //     console.error
  //   )
  // }
}
