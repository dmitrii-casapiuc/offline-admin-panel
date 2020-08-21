import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'

import { SongSet } from '@app/interfaces/song-set.interface'
import { environment } from '../../environments/environment'

@Injectable()
export class SongSetService {
  constructor(private http: HttpClient) {}

  fetch(): Observable<SongSet[]> {
    return this.http.get<SongSet[]>(`${environment.baseUrl}/api/song-set`)
  }

  create(songSet: SongSet): Observable<SongSet> {
    return this.http.post<SongSet>(`${environment.baseUrl}/api/song-set`, songSet)
  }

  update(song: SongSet): Observable<SongSet> {
    return this.http.patch<SongSet>(`${environment.baseUrl}/api/song-set`, song)
  }

  remove(id: string): Observable<string> {
    return this.http.delete<string>(`${environment.baseUrl}/api/song-set/${id}`)
  } 
}
