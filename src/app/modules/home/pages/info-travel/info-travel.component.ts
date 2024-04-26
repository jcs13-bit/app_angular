import { Component } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-info-travel',
  templateUrl: './info-travel.component.html',
  styleUrls: ['./info-travel.component.css'],
})
export class InfoTravelComponent {
  public temperature: any;
  public city: any;
  public moneda: string = '';
  public taxChange: any;
  public travelAmount: any;
  public copAmount: any;

  constructor(
    private _homeService: HomeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams
      .pipe(
        map((params: any) => {
          this.city = params['city'];
          this.moneda = params['moneda'];
        })
      )
      .subscribe();

    const dataTravel = this._homeService.getDataTravel();
    const copAmount = dataTravel.copAmount;
    this.copAmount = copAmount;
    const copCurrencyChange = dataTravel.rates['COP'];
    const currencyDynamicChange = dataTravel.rates[this.moneda];
    this.temperature = dataTravel.temperature;

    this.travelAmount = (copAmount / copCurrencyChange) * currencyDynamicChange;
  }
}
