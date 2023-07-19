import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-list-chart',
  templateUrl: './list-chart.component.html',
  styleUrls: ['./list-chart.component.css']
})
export class ListChartComponent implements OnInit {

  countryList: any[] = [];
  countryDropdown: any = "INR";
  currencyValue: any = 1;
  countrySecondDropdown: any = "USD";
  currencySecondValue: any = .0123;
  chartValue: number = 1;
  chartCountry: String = "";

  chartOptions: any = {};
  firstCountryBoolean: boolean = false;

  constructor(private datePipe: DatePipe, private appService: AppService) { }

  ngOnInit(): void {
    this.getCountry();
    this.getChart(this.countryDropdown, this.countrySecondDropdown);
  }
  getCountry() {
    this.appService.getCountryApi().subscribe((apiResponse: any) => {
      for (let key in apiResponse) {
        this.countryList.push({
          key: key,
          value: apiResponse[key]
        })
      }
    })
  }
  getCountryFullName(boolean: any) {
    let shortCode = boolean ? this.countryDropdown : this.countrySecondDropdown;
    let filterArray = this.countryList.filter((arr: any) => {
      return arr.key == shortCode;
    })
    return filterArray && filterArray.length > 0 ? filterArray[0].value : '';
  }
  amountConversion(fromCountry: string, toCountry: string, amount: number) {
    this.chartCountry = fromCountry;
    this.chartValue = amount;

    this.getChart(toCountry, fromCountry);
    this.appService.amountConversion(fromCountry, toCountry, amount).subscribe((apiResponse: any) => {
      if (fromCountry == this.countryDropdown) {
        this.firstCountryBoolean = false;
        this.currencySecondValue = apiResponse.rates[toCountry];
      }
      else {
        this.firstCountryBoolean = true;
        this.currencyValue = apiResponse.rates[toCountry];
      }
    })
  }

  onChangeCountry(fromCountry: string, toCountry: string, amount: number, event?: any) {
    this.amountConversion(fromCountry, toCountry, amount)
  }

  getChart(toCountry: any, fromCountry: any) {
    let startDate: any = new Date();
    startDate.setDate(new Date().getDate() - 7);
    let endDate: any = new Date();
    endDate.setDate(new Date().getDate() + 1);
    startDate = this.datePipe.transform(startDate, 'yyyy-MM-dd');
    endDate = this.datePipe.transform(endDate, 'yyyy-MM-dd');

    let date = startDate + '..' + endDate + "?to=" + toCountry + "&base=" + fromCountry;
    this.appService.getChartApi(date)
      .subscribe((apiResponse: any) => {
        let dataPoints: any = [];
        for (let key in apiResponse['rates']) {
          dataPoints.push({
            x: new Date(key),
            y: apiResponse['rates'][key][toCountry]
          })
        }
        this.chartOptions = {
          animationEnabled: true,
          theme: "dark",
          toolTip: {
            shared: true
          },
          legend: {
            cursor: "pointer",
            itemclick: function (e: any) {
              if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                e.dataSeries.visible = false;
              } else {
                e.dataSeries.visible = true;
              }
              e.chart.render();
            }
          },
          data: [
            {
              type: "line",
              showInLegend: true,
              name: "",
              xValueFormatString: "MMM DD",
              dataPoints: dataPoints
            },
          ]
        }
      })
  }

}
