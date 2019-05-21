import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { ProgressoService } from './progresso.service';

@Injectable()
export class BdService {

    constructor(private progressoService: ProgressoService) { }

    public publicar(publicacao: any): void {

        let nomeImagem = Date.now();

        firebase.database().ref('publicacoes/' + btoa(publicacao.email))
            .push({ titulo: publicacao.titulo_publicacao })
            .then((resposta: any) => {
                nomeImagem = resposta.key;

                firebase.storage().ref()
                    .child('imagens/' + nomeImagem)
                    .put(publicacao.imagem)
                    .on(firebase.storage.TaskEvent.STATE_CHANGED,
                        //acompanhamento do progresso do upload
                        (snapshot: any) => {
                            this.progressoService.status = 'andamento'
                            this.progressoService.estado = snapshot;
                            //console.log(snapshot)
                        },
                        (error) => {
                            this.progressoService.status = 'erro'
                            //console.log(error)
                        },
                        () => {
                            this.progressoService.status = 'finalizado'
                            //finalização do processo
                            //console.log('upload completo')


                        }
                    );
            });

    }

    public consultaPublicacoes(email: string): Promise<any> {

        return new Promise((resolve, reject) => {

            firebase.database().ref('publicacoes/' + btoa(email))
                .orderByKey()
                .once('value')
                .then((snapshot: any) => {

                    let publicacoes: Array<any> = [];

                    snapshot.forEach((childSnapshot: any) => {

                        let publicacao = childSnapshot.val();

                        //consultar a url da imagem
                        firebase.storage().ref()
                            .child('imagens/' + childSnapshot.key)
                            .getDownloadURL()
                            .then((url: string) => {

                                publicacao.url_imagem = url;

                                //consultar nome do usuario
                                firebase.database().ref('usuario_detalhe/' + btoa(email))
                                    .once('value')
                                    .then((snapshot: any) => {
                                        publicacao.nome_usuario = snapshot.val().nome_usuario;

                                        publicacoes.push(publicacao);
                                    });
                            });
                    });

                    console.log(publicacoes);
                    resolve(publicacoes);

                });

        });

    }

}