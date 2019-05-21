import { Usuario } from "./acesso/usuario.model";
import * as firebase from 'firebase';
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { reject } from "q";

@Injectable()
export class AuthService {

    public token_id: string;

    constructor(private router: Router) { }

    public cadastrarUsuario(usuario: Usuario): Promise<any> {
        console.log('Usuario: ' + usuario);

        return firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
            .then((resposta: any) => {

                //Remover senha do objeto usuario
                delete usuario.senha;
                firebase.database().ref('usuario_detalhe/' + btoa(usuario.email))
                    .set(usuario);

            })
            .catch((erro: any) => {

                switch (erro.code) {
                    case "auth/invalid-email":
                        erro.message = "E-mail com formato inválido";
                        break;
                }

                return erro;
            });
    }

    public autenticar(email: string, senha: string): Promise<any> {

        return firebase.auth().signInWithEmailAndPassword(email, senha)
            .then((resposta: any) => {

                firebase.auth().currentUser.getIdToken()
                    .then((idToken: string) => {
                        this.token_id = idToken;
                        localStorage.setItem('token_id', idToken);
                        this.router.navigate(['/home']);

                    });

                return resposta;
            })
            .catch((erro: any) => {

                switch (erro.code) {
                    case 'auth/invalid-email':
                        erro.message = "E-mail com formato inválido.";
                        break;

                    case 'auth/user-not-found':
                        erro.message = "E-mail ou senha inválidos.";
                        break;

                }

                return erro;

            });

    }

    public autenticado(): boolean {

        if (this.token_id === undefined && localStorage.getItem('token_id') !== null) {
            this.token_id = localStorage.getItem('token_id');
        }

        if (this.token_id === undefined) {
            this.router.navigate(['/'])
        }

        return this.token_id !== undefined;
    }

    public sair(): void {
        firebase.auth().signOut()
            .then(() => {
                localStorage.removeItem('token_id');
                this.token_id = undefined;
                this.router.navigate(['/'])
            });
    }

}