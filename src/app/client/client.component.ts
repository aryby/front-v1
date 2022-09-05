import { Component, OnInit } from '@angular/core';
import { Adress } from 'app/classes/adress';
import { Client } from 'app/classes/client';
import { AdressService } from 'app/services/adress.service';
import { ClientService } from 'app/services/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {


  Client: Client = {
    id: null,
    nom: '',
    prenom: '',
    email: '',
    id_ville: 0

  };
  submitted = false;
  Clients: Client[];
  villes: Adress[];

  constructor(private ClientService: ClientService, private _adressService: AdressService) { }

  ngOnInit() {

    this._adressService.getAll().subscribe((adresses: any[]) => {
      this.villes = adresses;
    }, err => {
      console.log("err");
      console.log(err);
    }
    );

    this.getAllClient();
  }

  showClient(clt: Client) {
    this.Client = clt;
  }

  deleteClient(id: any) {

    this.ClientService.delete(id)
      .subscribe(
        response => {
          this.getAllClient();
          //this.router.navigate(['/bricoleur']);
        },
        error => {
          console.log(error);
        });
  }
  saveClient() {
    this.ClientService.create(this.Client)
      .subscribe(
        response => {
          this.submitted = true;
          this.newClient();
          this.Clients = [];
          this.getAllClient();
        },
        error => {
          console.log(error);
        });
  }

  newClient() {
    this.submitted = false;
    this.Client = {
      nom: this.Client.nom,
      prenom: this.Client.prenom,
      email: this.Client.email,
      id_ville: this.Client.id_ville,
    };
  }


  async getAllClient() {
    this.ClientService.getAll().subscribe(Clients => {
      this.Clients = Clients;
    }, err => {
      console.log("err");
      console.log(err);
    }
    );
  }

}
