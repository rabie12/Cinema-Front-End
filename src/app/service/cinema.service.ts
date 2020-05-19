import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {
public host: string = 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  public getVilles() {
    return this.http.get(environment.ws.url + '/villes');
  }
  getCinema(ville) {
    return this.http.get(ville._links.cinema.href);
  }
  getSalles(cinema) {
    return this.http.get(cinema._links.salle.href);
  }
  getProjection(salle) {
    const url = salle._links.projections.href.replace('{?projection}', '' );
    return this.http.get(url + '?projection=projection1' );
  }
  getTicketsPlaces(p) {
    const url = p._links.tickets.href.replace('{?projection}', '' );
    return this.http.get(url + '?projection=ticketsProj' );
  }
}
