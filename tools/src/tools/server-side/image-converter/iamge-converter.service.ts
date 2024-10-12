import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private baseUrl = 'http://localhost:1337'; // replace with your API base URL

  constructor(private http: HttpClient) { }

  convertImage(image: File, format: string): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);

    let imgToken = localStorage.getItem('imgToken');

    const headers = new HttpHeaders({
      '2311d8d8-607d-4747-8939-1bde65643254': imgToken!
    });

    return this.http.post(`${this.baseUrl}/convert/${format}`, formData, { headers });
  }

  seteAntiforgeryToken(): void {    
    this.http.get<string>(`${this.baseUrl}/antiforgery/token`, { responseType: 'text' as 'json' }).pipe(
        tap(token => localStorage.setItem('imgToken', token))
    )
  }
}