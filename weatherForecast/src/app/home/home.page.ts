import { environment } from './../../environments/environment';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Toast } from '@capacitor/toast';

const API_URL = environment.API_URL;
const API_KEY =environment.API_KEY;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  weatherTemp :any
  todayDate = new Date()
  cityName = ""
  weatherIcon :any
  weatherDetails :any
  name= ""
  loading = true

  constructor(public httpClient:HttpClient) {
    this.loadData()
  }
/*Logic used to load the city data into the app */

  loadData(){
    this.httpClient.get(`${API_URL}/weather?q=${this.cityName}&appid=${API_KEY}`).subscribe(results => {
      console.log(results);
      this.weatherTemp = results['main']
      this.name = results['name']
      console.log(this.weatherTemp)
      this.weatherDetails = results['weather'][0]
      console.log(this.weatherDetails);
      this.weatherIcon = `http://openweathermap.org/img/wn/${this.weatherDetails.icon}@4x.png`
      this.loading = false
      

    })
  }

  /*Toast inclusion into the app */
  showHelloToast = async () => {
    await Toast.show({
      text: 'Have A Great Day!',
    });
  };
}
