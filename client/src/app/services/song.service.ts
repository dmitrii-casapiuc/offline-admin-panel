import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'

import { Song } from '@app/interfaces/song.interface'
import { environment } from '../../environments/environment'

@Injectable()
export class SongService {
  constructor(private http: HttpClient) {}

  fetch(): Observable<Song[]> {
    return this.http.get<Song[]>(`${environment.baseUrl}/api/song`)
  }

  create(song: Song): Observable<Song> {
    return this.http.post<Song>(`${environment.baseUrl}/api/song`, song)
  }

  getById(id: string): Observable<Song> {
    return this.http.get<Song>(`${environment.baseUrl}api/song/${id}`)
  }

  update(song: Song): Observable<Song> {
    return this.http.patch<Song>(`${environment.baseUrl}/api/song`, song)
  }

  remove(id: string): Observable<Song> {
    return this.http.delete<Song>(`${environment.baseUrl}/api/song/${id}`)
  }
}
