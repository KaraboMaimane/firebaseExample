import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/mergeMapTo';
import 'rxjs/add/operator/map';

declare var firebase;

@IonicPage()
@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})
export class StartPage {
  stuff;
  dataList;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public db: RestProvider, public actionSht: ActionSheetController) {
    this.db.load().then(
      (data) => {
        this.dataList = [];
        this.dataList = this.db.showDb();
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

            let timer = setInterval(() => {
              this.db.load().then(
                (data) => {
                  this.dataList = [];
                  this.dataList = this.db.showDb();
                  console.log(this.db.showDb());
                  clearInterval(timer);
                }
              );
            }, 2000);
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
      (data) => console.log(data),
      console.error
    )
  }
  // addPage(){
  //   this.navCtrl.push('AdditemPage');
  // }

  actionSheet(i: number){

    const action = this.actionSht.create({
      title: `You have selected ${this.dataList[i].item}`,
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
          }
        },{
          text: 'Edit',
          handler: () => {
            console.log('Archive clicked');
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    })

    action.present();
  }
}
