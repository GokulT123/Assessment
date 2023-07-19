import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpClient: HttpClient) { }

  amountConversion(fromCountry:string, toCountry:string,amount:number) {
    console.log(fromCountry,toCountry,amount)
    let url = `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCountry}&to=${toCountry}`;
    console.log("url: ", url);
    return this.httpClient.get(url);
  }
  getCountryApi() {
    let url = 'https://api.frankfurter.app/currencies'
    return this.httpClient.get(url)

  }

  getChartApi(date:String) {
    let url = `https://api.frankfurter.app/${date}`
    return this.httpClient.get(url)
  }

}
