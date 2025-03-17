import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { ApiModule } from '../api.module';

export interface Person {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

export interface PersonToUpdate {
  firstName: string;
  lastName: string;
}

@Injectable({
  providedIn: ApiModule
})
export class PersonService {

  private readonly baseUrl = environment.backendApiUrlPort + '/persons';

  constructor(private http: HttpClient) { }

  getAllPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(this.baseUrl);
  }

  getPersonById(id: number): Observable<Person> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Person>(url);
  }

  createPerson(person: Person): Observable<string> {
    return this.http.post<void>(this.baseUrl, person, { observe: 'response' })
      .pipe(
        map((res: HttpResponse<void>) => {
          const split = res.headers.get('Location')?.split("/");
          if (!split) {
            throw new Error('Location header missing from response');
          }
          return split[split.length - 1];
        })
      );
  }

  updatePerson(id: string, person: PersonToUpdate): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.patch<void>(url, person);
  }

  deletePersonById(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }

}
