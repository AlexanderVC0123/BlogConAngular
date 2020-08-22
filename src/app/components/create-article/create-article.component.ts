import { Component, OnInit } from '@angular/core';
import { Article } from '../../models/article';
import { ArticleService } from '../../services/article.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Global } from '../../services/global';
import swal from 'sweetalert';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css'],
  providers: [ArticleService]
})
export class CreateArticleComponent implements OnInit {

  public article: Article;
  public status: string;
  public page_title: string;
  public is_edit:boolean;
  public url:string;



  afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png,.gif,.jpeg",
    maxSize: "50",
    uploadAPI:  {
      url: Global.url+'/upload-image',
    },
    theme: "attachPin",
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: false,
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Sube tu imágen para el artículo',
      afterUploadMsg_success: 'Se ha subido con éxito !',
      afterUploadMsg_error: 'Algo ha fallado!'
    }
  };

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _articleService: ArticleService
  ) {
    this.article = new Article('','','', null, null);
    this.page_title = 'Crear articulo';
    this.is_edit = true;
    this.url = Global.url;


  }

  ngOnInit() {
  }

  onSubmit(){
    this._articleService.create(this.article).subscribe(
      response => {
        if(response.status == 'success'){
          this.status = 'success';
          this.article = response.article;
          //alerta
          swal(
            'Articulo creado!!',
            'El articulo se ha creado correctamente',
            'success'
          )

          this._router.navigate(['/blog']); 
          console.log(response);
        }else{ 
          this.status = 'error';
          
        }
      },
      error => {
        console.log(error)
        this.status = 'error';
      }
    )
  }

  imageUpload(data){
    
    //let image_data = JSON.parse(data.response)
    this.article.image = data.body.image;
    //alert(image_data.image)
  }
}
