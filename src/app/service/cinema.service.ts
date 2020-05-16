import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {
public host: 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  public getVilles() {
    return this.http.get(this.host + '/villes');
  }
  getCinema(ville){
    return this.http.get(ville._links.cinema.href);
  }
  getSalles(cinema){
    return this.http.get(cinema._links.salle.href);
  }
  getProjection(salle){
    let url = salle._links.projections.href.replace('{?projection}', '' );
    return this.http.get(url + '?projection=projection1' );
  }
}
