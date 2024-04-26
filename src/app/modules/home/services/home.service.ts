import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private readonly APIURL = environment.api;
  private temperature: any = 0;
  private arrCurrencyTax: any;
  private copAmount: any;
  constructor(private http: HttpClient) {}

  searchCitiesForCountry(country: any): Observable<any> {
    return this.http.get(`${this.APIURL}/cities/${country}`).pipe(
      tap((rspOk: any) => {}),
      catchError((err) => {
        return of({
          resultCode: 'ERROR',
          result: {},
        });
      })
    );
  }

  getDataTravel() {
    return {
      temperature: this.temperature,
      rates: this.arrCurrencyTax,
      copAmount: this.copAmount,
    };
  }
  //auth clima
  authenticateMeteoMatics() {
    const apiUrl = environment.meteoticUrl;
    const username = environment.userNameMeteotics;
    const password = environment.passwordMeteotics;
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });

    return this.http.get(apiUrl, { headers });
  }

  //consulta Clima
  consultMeteMatics(access_token: string, location: string): Observable<any> {
    const base_url = 'https://api.meteomatics.com/';
    const currentDate = new Date();
    const formattedDateTime = currentDate.toISOString();
    let apiUrl = `${base_url}${formattedDateTime}/t_2m:C/${location}/json?access_token=${access_token}`;

    return this.http.get(apiUrl).pipe(
      tap((rsp: any) => {
        console.log(rsp);
        this.temperature = rsp.data[0].coordinates[0].dates[0].value;
      }),
      catchError((err) => {
        return of({
          resultCode: 'ERROR',
          result: {},
        });
      })
    );
  }
  //Consulta tasas de cambio
  consultCurrencyChanges(copAmount: any): Observable<any> {
    const apiUrl = environment.openchangexurl;
    const userid = environment.userIdOpexChanges;
    return this.http.get(`${apiUrl}?app_id=${userid}`).pipe(
      tap((rsp: any) => {
        this.arrCurrencyTax = rsp.rates;
        this.copAmount = copAmount;
      }),
      catchError((err) => {
        return of({
          resultCode: 'ERROR',
          result: {},
        });
      })
    );
  }
}
