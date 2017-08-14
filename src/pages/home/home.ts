import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public myPicture: string = null;
  private basePath:string = '/uploadsIonic';

  constructor(public navCtrl: NavController, public navParams: NavParams, public cameraPlugin: Camera) {}

  takePicture(){
    const storageRef = firebase.storage().ref();
    this.cameraPlugin.getPicture({
      quality : 95,
      destinationType : this.cameraPlugin.DestinationType.DATA_URL,
      sourceType : this.cameraPlugin.PictureSourceType.CAMERA,
      allowEdit : true,
      encodingType: this.cameraPlugin.EncodingType.PNG,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: true
    }).then(imageData => {
      this.myPicture = imageData;
      storageRef
      .child(`${this.basePath}/profilePicture.png`)
      .putString(this.myPicture, 'base64', {contentType: 'image/png'})
      .then((savedPicture) => {
        console.log("Foto guardada");
      });        
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }

}
