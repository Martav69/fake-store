import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly http = inject(HttpClient)
  private _token: string | undefined

  get token():string | undefined {

    return this._token
  }

  get isAuthenticated(): boolean {
    return !!this._token; // Transforme le token en booleen
  }

  async login(email:string, password: string){

      try{
        
        const req = this.http.post<{access_token:string}>('https://api.escuelajs.co/api/v1/auth/login', {email, password})
        const response = await lastValueFrom(req)
        this._token = response.access_token
       
      } 
      catch (e) {
        console.error('Login failed', e)
      }
 
  }

  logout(): void {
    this._token = undefined;
  }
}
