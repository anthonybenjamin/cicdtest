import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  returnVar: any;
  email: string;
  password: string;

  constructor(private alertCtrl: AlertController, private http: HttpClient) {}

  do_something_email($event) {
    this.email = $event.target.value;

  }

  do_something_password($event){
    this.password = $event.target.value;
  }

  logOut(payload){

    /*this.alertCtrl.create({header: 'Let\'s log in!', message: 'Your email is: ' + this.email + ' Your password is: ' + this.password}).then(alertEl =>{
    alertEl.present();*/

    payload = [{name: 'Kala'}, {email: this.email}, {password: this.password}, {premium: 0}];

    this.http.post<any>('https://farmingtoncounselingcenter.com/cboodl-api/users/create/index.php', {title: payload}).subscribe(data => {
      next: this.returnVar = data;
      //console.log(this.returnVar);
      alert('working');
      alert(JSON.stringify(this.returnVar));
    },
    error => {
      console.log(error);
      alert(JSON.stringify(error));
  });

    }

  }
