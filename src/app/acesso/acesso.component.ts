import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.css'],
  animations: [
    trigger('animacao-banner', [
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
        style({
          opacity: 0,
          transform: 'translate(-50px, 0)'
        }),
        animate('500ms 0s ease-in-out') //duração, delay e aceleração
      ])
    ]),
    trigger('animacao-painel', [
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
        style({
          opacity: 0,
          transform: 'translate(50px, 0)'
        }),
        animate('1500ms 0s ease-in-out', keyframes([
          style({ offset: 0.10, opacity: 0.10, transform: 'translate(50px, 70px)' }),
          style({ offset: 0.30, opacity: 0.40, transform: 'translateX(0px)' }),
          style({ offset: 0.50, opacity: 0.60, transform: 'translate(25px, 80px)' }),
          style({ offset: 0.60, opacity: 0.80, transform: 'translateX(0px)' }),
          style({ offset: 0.70, opacity: 1, transform: 'translate(10px, 10px)' }),
        ])) //duração, delay e aceleração e keyframes
      ])
    ]),
    trigger('animacao-erro', [
      state('criado', style({
        opacity: 1
      })),
      transition('comErro <=> criado', [
        style({
          opacity: 0,
          transform: 'translate(50px, 0)'
        }),
        animate('1500ms 0s ease-in-out', keyframes([
          style({ offset: 0.10, opacity: 1, transform: 'translate(50px, 0)' }),
          style({ offset: 0.30, opacity: 1, transform: 'translateX(0px)' }),
          style({ offset: 0.50, opacity: 1, transform: 'translate(25px, 0)' }),
          style({ offset: 0.60, opacity: 1, transform: 'translateX(0px)' }),
          style({ offset: 0.70, opacity: 1, transform: 'translate(10px, 0)' }),
        ])) //duração, delay e aceleração e keyframes
      ])
    ])
  ]
})
export class AcessoComponent implements OnInit {

  public estadoBanner = 'criado';
  public estadoPainel = 'criado';

  public cadastro: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  public exibirPainel(event: string): void {
    this.cadastro = event === 'cadastro' ? true : false;
  }

  public estadoPainelErro(event: string): void {
    this.estadoPainel = 'comErro';
  }

  public inicioAnimacao(): void {
    //console.log('Inicio da animação');
  }
  public finalAnimacao(): void {
    //console.log('Final da animação');
  }

}
