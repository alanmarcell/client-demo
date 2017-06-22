import { Injectable } from '@angular/core';
import { HttpClient } from '../httpClient';
import 'rxjs/add/operator/toPromise';
import { User } from '../models/user';

@Injectable()
export class UserService {

  private usersUrl = 'api/users';  // URL to web api
  private usersPtzUrl = 'api/seedusers';

  constructor(private http: HttpClient) { }

  getUsers(): Promise<User[]> {
    return this.http.get(this.usersUrl)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getUser(id: string) {
    return this.http.get(this.usersUrl + '/' + id)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  save(user: User): Promise<User> {
    if (user._id) {
      return this.put(user);
    }
    return this.post(user);
  }

  savePtz(user: User): Promise<User> {
    if (user._id) {
      console.log('USER ID', user._id);
      return this.put(user);
    }
    return this.postPtz(user);
  }

  delete(user: User) {

    const url = `${this.usersUrl}/${user._id}`;

    return this.http
      .delete(url)
      .toPromise()
      .catch(this.handleError);
  }

  private post(user: User): Promise<User> {

    console.log('post !!!!')
    return this.http
      .post(this.usersUrl, JSON.stringify(user))
      .toPromise()
      .then(response => {
        return response.json().data;
      })
      .catch(this.handleError);
  }

  private postPtz(user: User): Promise<User> {

    console.log('postPtz')
    return this.http
      .post(this.usersPtzUrl, JSON.stringify(user))
      .toPromise()
      .then(response => {
        return response.json().data;
      })
      .catch(this.handleError);
  }

  private put(user: User) {

    const url = `${this.usersUrl}/${user._id}`;

    return this.http
      .put(url, JSON.stringify(user))
      .toPromise()
      .then(() => user)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
