import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class HttpClient {
  headers: Headers;
  options: RequestOptions;
  constructor(private http: Http) {
    this.getOptions();
  }

  get(url) {
    this.getOptions();
    return this.http.get('http://localhost:3000/' + url, this.options);
  }

  post(url, data) {
    this.getOptions();
    return this.http.post('http://localhost:3000/' + url , data, this.options);
  }

  put(url, data) {
    this.getOptions();
    return this.http.put('http://localhost:3000/' + url, data, this.options);
  }

  delete(url) {
    this.getOptions();
    return this.http.delete('http://localhost:3000/' + url, this.options);
  }

  private getOptions() {
    this.getHeaders();
    this.options = new RequestOptions({ headers: this.headers });
  }

  private getHeaders() {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('_token')
    });
  }
}
