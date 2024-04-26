import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormatoMonedaCopPipe } from './pipes/formato-moneda-cop.pipe';
import { InfoTravelComponent } from './pages/info-travel/info-travel.component';
@NgModule({
  declarations: [HomeComponent, FormatoMonedaCopPipe, InfoTravelComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [FormatoMonedaCopPipe],
})
export class HomeModule {}
