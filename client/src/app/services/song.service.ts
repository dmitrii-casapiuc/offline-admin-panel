import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'
import {HttpClient} from '@angular/common/http'

import { Song } from '@interfaces/song.interface'
import { environment } from '@environments/environment';

@Injectable()
export class SongService {
  constructor(private http: HttpClient) {}

  create(song: Song): Observable<Song> {
    return this.http.post<Song>(`${environment.baseUrl}/api/song`, song)
  }
}
