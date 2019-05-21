import { Component, OnInit } from '@angular/core';
import { BdService } from '../../bd.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.css']
})
export class PublicacoesComponent implements OnInit {

  public email: string;
  public publicacoes: any;

  constructor(private bdService: BdService) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email;

      this.atualizarTimeLine();
    });
  }

  public atualizarTimeLine(): void {
    this.bdService.consultaPublicacoes(this.email)
      .then((publicacoes: any) =>{
        console.log(publicacoes);
        this.publicacoes = publicacoes;
      });
  }

}
