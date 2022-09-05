import { Component, OnInit } from '@angular/core';
import { Adress } from '../classes/adress';
import { Bricoleur } from '../classes/bricoleur';
import { SousService } from '../classes/sous-service';
import { AdressService } from '../services/adress.service';
import { BricoleurService } from '../services/bricoleur.service';
import { SousServiceService } from '../services/sous-service.service';

@Component({
  selector: 'app-bricoleur',
  templateUrl: './bricoleur.component.html',
  styleUrls: ['./bricoleur.component.css']
})
export class BricoleurComponent implements OnInit {

  Bricoleur: Bricoleur = {
    id:null,
    nom: '',
    prenom: '',
    cin: '',
    adresse: '',
    tel: '',
    password: '',
    email: '',
    anneexperience: 0,
    apropos: '',
    id_ville: 0,
    id_sousServices: 0

  };
  submitted = false;
  Bricoleurs: Bricoleur[];
  villes: Adress[];
  category: SousService[];

  constructor(private bricoleurService: BricoleurService,
    private _adressService: AdressService,
    private _SousService: SousServiceService) { }

  ngOnInit() {
    this._adressService.getAll().subscribe((adresses:any[])=> {
      this.villes = adresses;
    }, err => {
      console.log("err");
      console.log(err);
    }
    );

    this.getSousServices();
    this.getAllBricoleur();

  }

  showBrico(brico : Bricoleur){
    this.Bricoleur = brico;
  }

  deleteBricoleur(id: any) {
   
    this.bricoleurService.delete(id)
      .subscribe(
        response => {
          this.Bricoleurs = [];
          this.getAllBricoleur();
        },
        error => {
          console.log(error);
        });
  }
  getSousServices() {

    this._SousService.getAll().subscribe(sousService => {
      this.category = sousService;
    }, err => {
      console.log("err");
      console.log(err);
    }
    );

  }
  saveBricoleur() {
    const data = {
      id: this.Bricoleur.id,
      nom: this.Bricoleur.nom,
      prenom: this.Bricoleur.prenom,
      cin: this.Bricoleur.cin,
      adresse: this.Bricoleur.adresse,
      tel: this.Bricoleur.tel,
      password: this.Bricoleur.password,
      email: this.Bricoleur.email,
      anneexperience: this.Bricoleur.anneexperience,
      apropos: this.Bricoleur.apropos,
      id_ville: this.Bricoleur.id_ville,
      id_sousServices: this.Bricoleur.id_sousServices
    };
    this.bricoleurService.create(data)
      .subscribe(
        response => {
          this.submitted = true;
          this.newBricoleur();
          this.Bricoleurs = [];
          this.getAllBricoleur();
          //this.router.navigate(['/bricoleur']);
        },
        error => {
          console.log(error);
        });
  }

  newBricoleur() {
    this.submitted = false;
    this.Bricoleur = {
      nom: '',
      prenom: '',
      cin: '',
      adresse: '',
      tel: '',
      password: '',
      email: '',
      anneexperience: 0,
      apropos: '',
      id_ville: 0,
      id_sousServices: 0
    };
  }

  async getAllBricoleur() {
    this.bricoleurService.getAll().subscribe(bricoleurs => {
      this.Bricoleurs = bricoleurs;

    }, err => {
      console.log("err");
      console.log(err);

    }
    );
  }

}
