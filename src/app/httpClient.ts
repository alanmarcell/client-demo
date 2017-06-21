import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class HttpClient {
  headers: Headers;
  options: RequestOptions;
  base = 'http://localhost:3010/';
  constructor(private http: Http) {
    this.getOptions();
  }


  get(url) {
    this.getOptions();
    return this.http.get(this.base + url, this.options);
  }

  post(url, data) {
    this.getOptions();
    return this.http.post(this.base + url, data, this.options);
  }

  put(url, data) {
    this.getOptions();
    return this.http.put(this.base + url, data, this.options);
  }

  delete(url) {
    this.getOptions();
    return this.http.delete(this.base + url, this.options);
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
