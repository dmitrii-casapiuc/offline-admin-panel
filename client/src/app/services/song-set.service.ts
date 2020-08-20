import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'

import { SongSet } from '@app/interfaces/song-set.interface'
import { environment } from '../../environments/environment'

@Injectable()
export class SongSetService {
  constructor(private http: HttpClient) {}

  /* fetch(): Observable<Song[]> {
    return this.http.get<Song[]>(`${environment.baseUrl}/api/song`)
  } */

  create(songSet: SongSet): Observable<SongSet> {
    return this.http.post<SongSet>(`${environment.baseUrl}/api/song-set`, songSet)
  }

  /* getById(id: string): Observable<Song> {
    return this.http.get<Song>(`${environment.baseUrl}/api/song/${id}`)
  }

  update(song: Song): Observable<Song> {
    return this.http.patch<Song>(`${environment.baseUrl}/api/song`, song)
  }

  remove(id: string): Observable<Song> {
    return this.http.delete<Song>(`${environment.baseUrl}/api/song/${id}`)
  } */
}
