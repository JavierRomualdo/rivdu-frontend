/**
 * Created by MarioMario on 26/03/2018.
 */
import 'rxjs/add/operator/toPromise';

import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { TreeNode } from 'primeng/api';

@Injectable()
export class NodeService {

  constructor(private http: Http) { }


}
