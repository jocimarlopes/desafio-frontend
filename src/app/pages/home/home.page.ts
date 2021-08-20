import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { HelperService } from 'src/app/services/helper.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  //Variáveis
  tools: any = [];
  tags: any = true;

  // Início Variáveis de Responsividade
  laterais: number = 3;
  centro: number = 6;
  search: number = 4;
  tagsOnly: number = 5;
  button: number = 3;
  // Fim Variáveis de Responsividade

  constructor(
    public helper: HelperService,
    public post: PostService,
    public alert: AlertController
  ) {

    this.getTools(); // Chamando as Tools da API
    this.responsive(); // Detectando responsividade

  }

  /**
   * Aqui temos um Método que analisa o Width da tela atual do dispositivo
   * Detectando a responsividade necessária
   */
  responsive() {
    if(window.innerWidth < 780) {
      this.laterais = 1;
      this.centro = 10;
      this.search = 12;
      this.tagsOnly = 9;
      this.button = 3;
    }
    else {
      this.laterais = 3;
      this.centro = 6;
      this.search = 4;
      this.tagsOnly = 5;
      this.button = 3;
    }
  }

  /**
   * Método que lista os Tools
   */
  getTools() {
    this.post.getApi('tools').subscribe(data => {
      this.tools = data;
    })
  }

  /**
   * Alerta padrão para perguntar ao usuário se deseja realizar alguma ação
   * @param button - Recebe 'add' ou 'delete', referente aos dois botões da DOM
   */
  async addItem() {
    const alert = await this.alert.create({
      cssClass: 'alerta',
      header: '+ Add new Tool',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Tool Name'
        },
        {
          name: 'link',
          type: 'text',
          placeholder: 'Tool Link'
        },
        {
          name: 'description',
          type: 'text',
          placeholder: 'Tool Description'
        },
        {
          name: 'tags',
          type: 'text',
          placeholder: 'Tags (separate by spaces)'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Add',
          handler: (data) => {
            var tags = data.tags.split(' ');
            data.tags = tags;
            this.add(data);
          }
        }
      ]
    });

    await alert.present();

  }

  /**
   * Envia o Item Tools para a API
   */
  async add(data) {
    await this.helper.loader();
    let dados = {
      title: data.title,
      link: data.link,
      description: data.description,
      tags: data.tags,
    };
    this.post.postApi(dados, 'tools').subscribe(data => {
      this.helper.loading.dismiss();
      console.log(data);
      this.getTools();
    });
  }

  /**
   * Método para Deletar Tools Item
   * @param data - Recebe os dados do Item a Excluir 
   * (Usar data.id para pegar o ID do ITEM)
   */
  async remove(data) {
    await this.helper.loader();
    this.post.deleteApi('tools/' + data).subscribe(data => {
      this.helper.loading.dismiss();
      console.log(data);
      this.getTools();
    });
  }

  /**
   * 
   * @param data - Recebe os Dados do Item a Excluir
   */
  async removeItem(data) {
    const alert = await this.alert.create({
      header: 'Remove Tool',
      message: 'Are you sure you want to remove <b>' + data.title + '</b>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            this.remove(data.id);
          }
        }
      ]
    });
    await alert.present();

  }

  /**
   * Método de Filtro de Pesquisa
   * @param ev = Recebe do Input Search os dados pesquisados
   */
  async filtroSearch(ev: any) {

    const val = ev.target.value;

    if (!val) {
      this.getTools();
    }

    if (this.tags) {
      this.post.getApi('tools?tags_like=' + val).subscribe(data => {
        this.tools = data;
      });
    }

    if (!this.tags) {
      this.post.getApi('tools?q=' + val).subscribe(data => {
        this.tools = data;
      });
    }
  }

}
