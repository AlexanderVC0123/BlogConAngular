import { Component, OnInit } from '@angular/core';
import { Article } from '../../models/article';
import { ArticleService } from '../../services/article.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Global } from '../../services/global';
import swal from 'sweetalert';



@Component({
  selector: 'app-edit-article',
  templateUrl: '../create-article/create-article.component.html',
  styleUrls: ['./edit-article.component.css'],
  providers: [ArticleService]
})
export class EditArticleComponent implements OnInit {

  public article: Article;
  public status: string;
  public is_edit:boolean;
  public page_title: string;
  public url:string;

  afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png,.gif,.jpeg",
    maxSize: "50",
    uploadAPI: {
      url: Global.url + '/upload-image/',
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
    this.article = new Article('', '', '', null, null);
    this.is_edit = true;
    this.page_title = 'Editar articulo';
    this.url = Global.url;
  }

  ngOnInit(): void {
    this.getArticle();
  }

  onSubmit(){
    this._articleService.update(this.article._id, this.article).subscribe(
      response => {
        if(response.status == 'success'){
          this.status = 'success';
          this.article = response.articleUpdate;

          //alerta
          swal(
            'Articulo editado!!',
            'El artículo se ha creado correctamente',
            'success'
          );

          this._router.navigate(['/blog/articulo', this.article._id]); 
          console.log(response);
        }else{ 
          this.status = 'error';
          
        }
      },
      error => {
        console.log(error)
        this.status = 'error';
        swal(
          'Edición fallida!!',
          'El artículo no se ha editado correctamente',
          'error'
        );

      }
    )
  }

  imageUpload(data){
    
    //let image_data = JSON.parse(data.response)
    this.article.image = data.body.image;
    //alert(image_data.image)
  }

  getArticle(){
    this._route.params.subscribe(params => {
      let id = params['id'];

      this._articleService.getArticle(id).subscribe(
        response => {
          if(response.article){
            this.article = response.article;
            
          }else{
            this._router.navigate(['/home']);
          }
        },
        error => {
          console.log(error);
          this._router.navigate(['/home'])
        }
      );
    });
  }

}
