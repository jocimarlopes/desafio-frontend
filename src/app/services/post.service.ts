import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  server: any = 'http://localhost:3000/';

  constructor(
    private http: HttpClient
  ) { }

  /**
   * @param dados = Recebe um array que será enviado pelo body do request
   * @param api = recebe o restante do caminho da API após o / 
   * @returns o retorno é a resposta da API conforme o Request
   */
  postApi(dados: any, api: string) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }

    let url = this.server + api;
    return this.http.post(url, JSON.stringify(dados), httpOptions).map(res => res);
  }

  /**
   * 
   * @param api = recebe o restante do caminho da API após o /
   * @returns = o retorno é a resposta da API, conforme o Request
   */
  getApi(api: string) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }

    let url = this.server + api;
    return this.http.get(url, httpOptions).map(res => res);
  }
  
  /**
   * 
   * @param api = recebe o restante do caminho da API após o /
   * @returns = o retorno é a resposta da API, conforme o Request
   */
   deleteApi(api: string) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }

    let url = this.server + api;
    return this.http.delete(url, httpOptions).map(res => res);
  }
}
