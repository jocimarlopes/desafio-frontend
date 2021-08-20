import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(
    public loading: LoadingController,
    public toast: ToastController,
    public alert: AlertController
  ) { }

  /**
   * Loader de Aguardando o Carregamento dos Itens
   * usar o comando abaixo para encerrar o Loader.
   * this.helper.loading.dismiss();
   */
   async loader() {
    const loading = await this.loading.create({
      cssClass: 'loader',
      spinner: 'bubbles',
      message: 'loading..'
    });
    await loading.present();
  }

  /**
   *  Mensagem Toast padrão no app
   *  Podendo escolher a mensagem, tempo e cor nos parametros passados na função
   * this.helper.mensagem('', '', '');
   */
  async mensagem(mensagem, tempo, cor) {
    const toast = await this.toast.create({
      message: mensagem,
      duration: tempo,
      color: cor
    });
    toast.present();
  }

}
