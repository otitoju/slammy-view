import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public BaseUrl:any = environment.baseUrl;
  public fileUrl:any = "https://imageapi.slammyphotography.com/api-file-upload.php";

  constructor(private http: HttpClient,) { }

  NewTransaction(Data:any) {
    let Url = this.BaseUrl + "transaction";

    return this.http.post<any>(Url, Data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    });
  }

  UploadFile(data:any) {
    let Url = this.fileUrl;
    return this.http.post<any>(Url, data);
  }


}
