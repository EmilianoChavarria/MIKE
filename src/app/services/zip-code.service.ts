import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ZipCodeService {

  constructor(private http: HttpClient) { }

  getCP(zipCode: number) {
    return this.http.get(`https://app.zipcodebase.com/api/v1/search?apikey=f4d581a0-ac3f-11ef-8b6a-2df75c18e1bc&codes=${zipCode}&country=mx`)
  }
}
