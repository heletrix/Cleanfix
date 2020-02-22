import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { _throw as throwError } from 'rxjs/observable/throw';
import { Observable } from 'rxjs';

import * as interfaces from './interfaces';                

@Injectable()
export class DataService {
    constructor(private http: HttpClient) { }

    postProject(data : interfaces.ProjectPost) : Observable<any> {
        return this.http.post('/api/project', data)
        .map( data => {return data;})
        .catch((err) => {
          this.handleError(err);
          return Observable.throw(err);
        });
    }

    getProjects() : Observable<interfaces.Project> {
        return this.http.get<interfaces.Project>('/api/projects', { withCredentials: true} )
              .map((data) => {return data;})
              .catch((err) => {
                      this.handleError(err);
                      return Observable.throw(err);
                    });
    }

    getProject(id : string) : Observable<interfaces.ProjectDetails> {
        return this.http.get<interfaces.ProjectDetails>('/api/project', { params: {id}, withCredentials: true},)
            .map((data) => {return data;})
            .catch((err) => {
                    this.handleError(err);
                    return Observable.throw(err);
                  });
    }

    // registry as user or sponsor
    postUser(data : interfaces.UserPost) : Observable<any> {
        return this.http.post('/api/user', data)
        .map( data => {return data;})
        .catch((err) => {
          this.handleError(err);
          return Observable.throw(err);
        });
    }

    // login as user or sponsor
    getUser(email : string) : Observable<interfaces.User> {
        return this.http.get<interfaces.User>('/api/project', { params: {email}, withCredentials: true},)
            .map((data) => {return data;})
            .catch((err) => {
                    this.handleError(err);
                    return Observable.throw(err);
                  });
    }

    // became volunteer or sponsor
    postConnection(data : interfaces.Connection) : Observable<any> {
        return this.http.post('/api/joinProject', data)
        .map( data => {return data;})
        .catch((err) => {
          this.handleError(err);
          return Observable.throw(err);
        });
    }

    private handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        console.error('An error occurred:', error.error.message);
      } else {
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
      }
      return throwError(
        'Something bad happened; please try again later.');
    }
}
