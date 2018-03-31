import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UploadService } from '../../servicios/upload.service';
import { AuthService } from '../../servicios/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  @Input() idtipoexpediente;
  @Input() idoperacion;
  @Input() titulo;
  uploadedFiles: any[] = [];
  public cargando:boolean =false;

  constructor(
    public activeModal:NgbActiveModal,
    public apiReport:UploadService,
    public auth:AuthService,
    public toastr:ToastrService,
    private modalService:NgbModal
  ) { }

  ngOnInit() {
  }

  myUploader(event, form) {
    this.cargando = false;
    let formData = new FormData();
    for (var x = 0; x < event.files.length; x++) {
      formData.append("files[]", event.files[x]);
    }
    formData.append('idoperacion', this.idoperacion);
    formData.append('idtipoexpediente', this.idtipoexpediente);
    this.apiReport.post("expediente/subir",formData)
      .then(data => {
        if(data && data.extraInfo){
          this.toastr.success(data.operacionMensaje, 'Exito');
          for(let file of event.files) {
            this.uploadedFiles.push(file);
          }
          form.clear();
        } else {
          this.toastr.info(data.operacionMensaje, 'Error');
        }
        this.cargando = false;
      })
      .catch(err => this.handleError(err));
  }

  handleError(error: any): void {
    this.toastr.error("Error Interno", 'Error');
    this.cargando =false;
  }

}
