import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('publicacoes') public publicacoes: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  public sair(): void {
    this.authService.sair();
  }

  public atualizarTimeLine(): void {
    this.publicacoes.atualizarTimeLine();
  }

}
