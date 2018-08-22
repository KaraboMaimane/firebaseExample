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
  }

  ngOnInit() {
    this.refreshDb();
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
            this.db.add(data.shopping_item);

            this.refreshDb();
          }
        }
      ]
    });
    alert.present();
  }

  actionSheet(i: number){

    const action = this.actionSht.create({
      title: `You have selected ${this.dataList[i].item}`,
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.db.delete(i);
            this.refreshDb();
          }
        },{
          text: 'Edit',
          handler: () => {
            const alert = this.alertCtrl.create({
              title: `${this.dataList[i].item}`,
              message:`Would you like to edit the data for ${this.dataList[i].item}?`,
              inputs: [
                {
                  name: 'shopping_item',
                  placeholder: `${this.dataList[i].item}`
                },
              ],
              buttons: [
                {
                  text: 'Cancel'
                },
                {
                  text: 'Save',
                  handler: data => {
                    this.db.edit(i, data.shopping_item);

                    this.refreshDb();
                  }
                }
              ]
            });
            alert.present();
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {

          }
        }
      ]
    })

    action.present();
  }

  refreshDb(){
    /*this will be a small method that i will use to refresh
     the data on my database and allow it to update on the pages*/
    let timer = setInterval(() => {
      this.db.load().then(
        (data) => {
          this.dataList = [];
          this.dataList = this.db.showDb();
          clearInterval(timer);
        }
      );
    }, 2000);
  }
}
