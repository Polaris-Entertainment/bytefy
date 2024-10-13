import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private baseUrl = environment.uploadServiceBaseUrl;

  constructor(private http: HttpClient) { }

  convertImage(image: File, format: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', image);

    let imgToken = localStorage.getItem('imgToken');

    const headers = new HttpHeaders({
      '2311d8d8-607d-4747-8939-1bde65643254': imgToken!
    });

    return this.http.post(`${this.baseUrl}/convert/${format}`, formData, { headers, responseType: 'blob' });  }

  setAntiforgeryToken(): Observable<string> {    
    return this.http.get<string>(`${this.baseUrl}/antiforgery/token`, { responseType: 'text' as 'json' }).pipe(
      map((token) => {
        localStorage.setItem('imgToken', token.replace('"', ''));
        return token;
      })
    );
  }

  getMimeType(simpleType: string): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/mimetype/${simpleType}`, { responseType: 'text' as 'json' });
  }

  getFormats(): Observable<string[]> {
      return this.http.get<string[]>(`${this.baseUrl}/formats`);
  }
}