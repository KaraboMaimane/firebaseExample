import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/mergeMapTo';
import 'rxjs/add/operator/map';

declare var firebase;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  dataList;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public db: RestProvider) {
    this.db.load().then(
      () => {
        this.dataList = this.db.showDb();
        console.log(this.dataList);
      }
    );
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
    firebase.database().ref('shopping-list').push({
      itemName: item
    });
  }

  deleteItem(key: string) {
    this.db.delete(key).subscribe(
      () => alert('lesson deleted'),
      console.error
    )
  }
}
