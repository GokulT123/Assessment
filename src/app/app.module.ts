import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ListChartComponent } from './list-chart/list-chart.component';
// import { NgChartsModule } from 'ng2-charts';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppService } from './app.service';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { DatePipe } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    ListChartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSelectModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    CanvasJSAngularChartsModule
  ],
  providers: [AppService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
