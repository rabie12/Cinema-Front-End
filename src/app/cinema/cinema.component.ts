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
  public currentProjection: any;
  public selectedTicket: any [];
  constructor(public cinemaService: CinemaService) {}

  ngOnInit() {
    this.cinemaService.getVilles().subscribe(data => {
      this.villes = data;
    });
  }
  getCinemaByCity(ville) {
    this.currentVille = ville;
    this.salles = undefined ;
    this.currentProjection = undefined;
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
    this.currentProjection = undefined;
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
  onGetTicketsPlaces(p) {
    this.currentProjection = p;
    this.cinemaService.getTicketsPlaces(p).subscribe(data => {
        this.currentProjection.tickets = data;
        this.selectedTicket = [];
        console.log(data);

    }, err => {
        console.log(err);
    }
    );
  }

  onSelectedTicket(t) {
    if (!t.selected) {
    t.selected = true;
    this.selectedTicket.push(t);
  } else if (t.selected) {
      t.selected = false;
      this.selectedTicket.splice(this.selectedTicket.indexOf(t), 1);
  }
  }

  getBtnClass(t) {
     let str = 'btn ticket ';
     if (t.reserve === true) {
       str += 'btn-danger' ;
     } else if (t.selected ) {
      str += 'btn-warning';
     } else { str += 'btn-success'; }
     return str;
  }
  onPayTicket(dataForm) {
    let tickets = [];
    this.selectedTicket.forEach(t => {
      tickets.push( t.idTicket );
    });
    dataForm.ticket = tickets;
    console.log(dataForm);
  }

}
