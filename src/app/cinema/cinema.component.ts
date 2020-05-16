import { Component, OnInit } from "@angular/core";
import { CinemaService } from "../service/cinema.service";

@Component({
  selector: "app-cinema",
  templateUrl: "./cinema.component.html",
  styleUrls: ["./cinema.component.css"]
})
export class CinemaComponent implements OnInit {
  public villes;
  public cinemas;
  public salles;
  public currentVille;
  public currentCinema;
  constructor(public cinemaService: CinemaService) {}

  ngOnInit() {
    this.cinemaService.getVilles().subscribe(data => {
      this.villes = data;
    });
  }
  getCinemaByCity(ville) {
    this.currentVille = ville;
    return this.cinemaService.getCinema(ville).subscribe(
      data => {
        this.cinemas = data;
      },
      err => {
        console.log(err);
      }
    );
  }
  getSalles(cinema) {
    this.currentCinema = cinema;
    return this.cinemaService.getSalles(cinema).subscribe(
      data => {
        this.salles = data;
        this.salles._embedded.salles.forEach( salle => {
          this.cinemaService.getProjection(salle).subscribe(
            projection => {
              salle.projections = projection;
            },
            err => {
              console.log(err);
            }
          );
        });
      },
      err => {
        console.log(err);
      }
    );
  }
}
