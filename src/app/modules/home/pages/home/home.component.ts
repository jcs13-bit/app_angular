import { Component } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormatoMonedaCopPipe } from '../../pipes/formato-moneda-cop.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  public countryIsSelected: boolean = false;
  public formHome: FormGroup;
  public cities: any = {};
  public montoTotal: number = 0;

  constructor(
    private _homeService: HomeService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.formHome = this.fb.group({
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
    });
  }

  searchCitiesForCountry() {
    const country = this.formHome?.get('country')?.value;
    this._homeService.searchCitiesForCountry(country).subscribe((rsp) => {
      this.cities = rsp;
      this.countryIsSelected = true;
    });
  }

  searchInfoTravel() {
    const cityId = this.formHome?.get('city')?.value;

    this._homeService.authenticateMeteoMatics().subscribe((rsp: any) => {
      const acces_token = rsp.access_token;
      const cityData = this.cities.find((city: any) => city.id == cityId);
      const location = cityData.location;
      this._homeService
        .consultMeteMatics(acces_token, location)
        .subscribe((rsp: any) => {
          const params = {
            city: cityData.name,
            moneda: cityData.moneda,
          };
          this.router.navigate(['/home', 'info'], { queryParams: params });
        });
    });

    this._homeService
      .consultCurrencyChanges(this.montoTotal)
      .subscribe((rsp: any) => {});
  }
}
