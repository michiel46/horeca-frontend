import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

interface Adres {
  straat: string;
  huisNummer: string;
  postcode: string;
  gemeente: string;
  deelgemeente: string;
}

interface Geolocatie {
  lengtegraad: string;
  breedtegraad: string;
}

interface Sector {
  code: string;
  naam: string;
}

interface Winkelgebied {
  naam: string;
  subcentrum: string;
}

export interface Horeca {
  naam: string;
  creatieDatum: string;
  checkDatum: string;
  keten: boolean;
  ketenNaam: string;
  adres: Adres;
  geolocatie: Geolocatie;
  sector: Sector;
  winkelgebied: Winkelgebied;
}

const url = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class HorecaService {
  constructor(private http: HttpClient) { }

  load(): Observable<Horeca[]> {
    return this.http.get<Horeca[]>(url);
  }
}
