import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from "@angular/fire/auth";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {getDownloadURL, ref, Storage, uploadBytes} from "@angular/fire/storage";
import {Timestamp} from "firebase/firestore";
import {ProductService} from "../../services/product.service";
import {Product} from "../../interfaces/product";

@Component({
  selector: 'app-products-new',
  templateUrl: './products-new.component.html',
  styleUrls: ['./products-new.component.scss']
})
export class ProductsNewComponent {
  @Input() firebaseUser = {} as User;
  @Output() outTemplate = new EventEmitter<string>();

  /** VARIABLES **/
  newProductForm: FormGroup;
  loadingEffect: boolean = false;

  /** PHOTO FILES **/
  photo1_file: string | any;
  photo1_preview: string = '';
  photo2_file: string | any;
  photo2_preview: string = '';
  photo3_file: string | any;
  photo3_preview: string = '';
  dataSheet_file: string | any;

  constructor(private productService: ProductService, private storage: Storage, private fb: FormBuilder) {

    this.newProductForm = this.fb.group({
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      feature1: [''],
      feature2: [''],
      feature3: [''],
      feature4: [''],
      feature5: [''],
      feature6: [''],
      feature7: [''],
      feature8: [''],
      feature9: [''],
      feature10: [''],
    });
  }

  getTemplate(template: string) {
    this.outTemplate.emit(template);
  }

  take_photo1($event: any) {
    this.photo1_file = $event.target.files[0];
    const reader: FileReader = new FileReader();
    reader.onload = () => {
      this.photo1_preview = reader.result as string;
    }
    reader.readAsDataURL(this.photo1_file);
  }

  take_photo2($event: any) {
    this.photo2_file = $event.target.files[0];
    const reader: FileReader = new FileReader();
    reader.onload = () => {
      this.photo2_preview = reader.result as string;
    }
    reader.readAsDataURL(this.photo2_file);
  }

  take_photo3($event: any) {
    this.photo3_file = $event.target.files[0];
    const reader: FileReader = new FileReader();
    reader.onload = () => {
      this.photo3_preview = reader.result as string;
    }
    reader.readAsDataURL(this.photo3_file);
  }

  take_dataSheet($event: any) {
    this.dataSheet_file = $event.target.files[0];
  }

  deletePreview(photo: string) {
    if (photo === 'photo1') {
      this.photo1_preview = '';
    }
    if (photo === 'photo2') {
      this.photo2_preview = '';
    }
    if (photo === 'photo3') {
      this.photo3_preview = '';
    }
  }

  async onSubmit(firebaseUser: User) {
    this.loadingEffect = true;
    let newProduct: Product;

    if (this.newProductForm.valid) {
      newProduct = this.newProductForm.value;
      newProduct.photoURL1 = '';
      newProduct.photoURL2 = '';
      newProduct.photoURL3 = '';
      newProduct.dataSheetURL = '';

      newProduct.createdAt = Timestamp.fromDate(new Date());
      newProduct.createdBy = firebaseUser.uid;
      newProduct.updatedAt = Timestamp.fromDate(new Date());
      newProduct.updatedBy = firebaseUser.uid;

      /********************* UPLOAD ALL PHOTOS **********************/
      if (this.photo1_file && this.photo2_file && this.photo3_file) {
        const storageRef1 = ref(this.storage, `products/${this.photo1_file.name}`);
        const storageRef2 = ref(this.storage, `products/${this.photo2_file.name}`);
        const storageRef3 = ref(this.storage, `products/${this.photo3_file.name}`);

        /** UPLOAD PHOTO 1 **/
        uploadBytes(storageRef1, this.photo1_file)
          .then(async () => {
            newProduct.photoURL1 = await getDownloadURL(storageRef1);

            /** UPLOAD PHOTO 2 **/
            uploadBytes(storageRef2, this.photo2_file)
              .then(async () => {
                newProduct.photoURL2 = await getDownloadURL(storageRef2);

                /** UPLOAD PHOTO 3 **/
                uploadBytes(storageRef3, this.photo3_file)
                  .then(async () => {
                    newProduct.photoURL3 = await getDownloadURL(storageRef3);

                    if (this.dataSheet_file) {
                      const storageRefDataSheet = ref(this.storage, `products/${this.dataSheet_file.name}`);
                      /** UPLOAD DATASHEET **/
                      uploadBytes(storageRefDataSheet, this.dataSheet_file)
                        .then(async () => {
                          newProduct.dataSheetURL = await getDownloadURL(storageRefDataSheet);
                          await this.productService.addProduct(newProduct);
                          this.newProductForm.reset();
                          this.outTemplate.emit('LIST');
                        })
                        .catch((e) => console.log(e));
                    } else {
                      await this.productService.addProduct(newProduct);
                      this.newProductForm.reset();
                      this.outTemplate.emit('LIST');
                    }

                  })
                  .catch((e) => console.log(e));
              })
              .catch((e) => console.log(e));
          })
          .catch((e) => console.log(e));


        /********************* DO NOT UPLOAD ANYTHING ************************/
      } else if (!this.photo1_file && !this.photo2_file && !this.photo3_file) {

        if (this.dataSheet_file) {
          const storageRefDataSheet = ref(this.storage, `products/${this.dataSheet_file.name}`);
          /** UPLOAD DATASHEET **/
          uploadBytes(storageRefDataSheet, this.dataSheet_file)
            .then(async () => {
              newProduct.dataSheetURL = await getDownloadURL(storageRefDataSheet);
              await this.productService.addProduct(newProduct);
              this.newProductForm.reset();
              this.outTemplate.emit('LIST');
            })
            .catch((e) => console.log(e));
        } else {
          await this.productService.addProduct(newProduct);
          this.newProductForm.reset();
          this.outTemplate.emit('LIST');
        }

        /********************** UPLOAD JUST PHOTO 1 *************************/
      } else if (this.photo1_file && !this.photo2_file && !this.photo3_file) {
        const storageRef1 = ref(this.storage, `products/${this.photo1_file.name}`);

        uploadBytes(storageRef1, this.photo1_file)
          .then(async () => {
            newProduct.photoURL1 = await getDownloadURL(storageRef1);

            if (this.dataSheet_file) {
              const storageRefDataSheet = ref(this.storage, `products/${this.dataSheet_file.name}`);
              /** UPLOAD DATASHEET **/
              uploadBytes(storageRefDataSheet, this.dataSheet_file)
                .then(async () => {
                  newProduct.dataSheetURL = await getDownloadURL(storageRefDataSheet);
                  await this.productService.addProduct(newProduct);
                  this.newProductForm.reset();
                  this.outTemplate.emit('LIST');
                })
                .catch((e) => console.log(e));
            } else {
              await this.productService.addProduct(newProduct);
              this.newProductForm.reset();
              this.outTemplate.emit('LIST');
            }
          })
          .catch((e) => console.log(e));

        /********************** UPLOAD JUST PHOTO 2 *************************/
      } else if (!this.photo1_file && this.photo2_file && !this.photo3_file) {
        const storageRef2 = ref(this.storage, `products/${this.photo2_file.name}`);

        uploadBytes(storageRef2, this.photo2_file)
          .then(async () => {
            newProduct.photoURL2 = await getDownloadURL(storageRef2);

            if (this.dataSheet_file) {
              const storageRefDataSheet = ref(this.storage, `products/${this.dataSheet_file.name}`);
              /** UPLOAD DATASHEET **/
              uploadBytes(storageRefDataSheet, this.dataSheet_file)
                .then(async () => {
                  newProduct.dataSheetURL = await getDownloadURL(storageRefDataSheet);
                  await this.productService.addProduct(newProduct);
                  this.newProductForm.reset();
                  this.outTemplate.emit('LIST');
                })
                .catch((e) => console.log(e));
            } else {
              await this.productService.addProduct(newProduct);
              this.newProductForm.reset();
              this.outTemplate.emit('LIST');
            }
          })
          .catch((e) => console.log(e));

        /********************** UPLOAD JUST PHOTO 3 *************************/
      } else if (!this.photo1_file && !this.photo2_file && this.photo3_file) {
        const storageRef3 = ref(this.storage, `products/${this.photo3_file.name}`);

        uploadBytes(storageRef3, this.photo3_file)
          .then(async () => {
            newProduct.photoURL3 = await getDownloadURL(storageRef3);

            if (this.dataSheet_file) {
              const storageRefDataSheet = ref(this.storage, `products/${this.dataSheet_file.name}`);
              /** UPLOAD DATASHEET **/
              uploadBytes(storageRefDataSheet, this.dataSheet_file)
                .then(async () => {
                  newProduct.dataSheetURL = await getDownloadURL(storageRefDataSheet);
                  await this.productService.addProduct(newProduct);
                  this.newProductForm.reset();
                  this.outTemplate.emit('LIST');
                })
                .catch((e) => console.log(e));
            } else {
              await this.productService.addProduct(newProduct);
              this.newProductForm.reset();
              this.outTemplate.emit('LIST');
            }

          })
          .catch((e) => console.log(e));

        /******************** UPLOAD JUST PHOTO 1 AND 2 **********************/
      } else if (this.photo1_file && this.photo2_file && !this.photo3_file) {
        const storageRef1 = ref(this.storage, `products/${this.photo1_file.name}`);
        const storageRef2 = ref(this.storage, `products/${this.photo2_file.name}`);

        /** UPLOAD PHOTO 1 **/
        uploadBytes(storageRef1, this.photo1_file)
          .then(async () => {
            newProduct.photoURL1 = await getDownloadURL(storageRef1);

            /** UPLOAD PHOTO 2 **/
            uploadBytes(storageRef2, this.photo2_file)
              .then(async () => {
                newProduct.photoURL2 = await getDownloadURL(storageRef2);

                if (this.dataSheet_file) {
                  const storageRefDataSheet = ref(this.storage, `products/${this.dataSheet_file.name}`);
                  /** UPLOAD DATASHEET **/
                  uploadBytes(storageRefDataSheet, this.dataSheet_file)
                    .then(async () => {
                      newProduct.dataSheetURL = await getDownloadURL(storageRefDataSheet);
                      await this.productService.addProduct(newProduct);
                      this.newProductForm.reset();
                      this.outTemplate.emit('LIST');
                    })
                    .catch((e) => console.log(e));
                } else {
                  await this.productService.addProduct(newProduct);
                  this.newProductForm.reset();
                  this.outTemplate.emit('LIST');
                }
              })
              .catch((e) => console.log(e));

          })
          .catch((e) => console.log(e));

        /******************* UPLOAD JUST PHOTO 1 AND 3 **********************/
      } else if (this.photo1_file && !this.photo2_file && this.photo3_file) {
        const storageRef1 = ref(this.storage, `products/${this.photo1_file.name}`);
        const storageRef3 = ref(this.storage, `products/${this.photo3_file.name}`);

        /** UPLOAD PHOTO 1 **/
        uploadBytes(storageRef1, this.photo1_file)
          .then(async () => {
            newProduct.photoURL1 = await getDownloadURL(storageRef1);

            /** UPLOAD PHOTO 3 **/
            uploadBytes(storageRef3, this.photo3_file)
              .then(async () => {
                newProduct.photoURL3 = await getDownloadURL(storageRef3);

                if (this.dataSheet_file) {
                  const storageRefDataSheet = ref(this.storage, `products/${this.dataSheet_file.name}`);
                  /** UPLOAD DATASHEET **/
                  uploadBytes(storageRefDataSheet, this.dataSheet_file)
                    .then(async () => {
                      newProduct.dataSheetURL = await getDownloadURL(storageRefDataSheet);
                      await this.productService.addProduct(newProduct);
                      this.newProductForm.reset();
                      this.outTemplate.emit('LIST');
                    })
                    .catch((e) => console.log(e));
                } else {
                  await this.productService.addProduct(newProduct);
                  this.newProductForm.reset();
                  this.outTemplate.emit('LIST');
                }
              })
              .catch((e) => console.log(e));
          })
          .catch((e) => console.log(e));

        /******************* UPLOAD JUST PHOTO 2 AND 3 **********************/
      } else if (!this.photo1_file && this.photo2_file && this.photo3_file) {
        const storageRef2 = ref(this.storage, `products/${this.photo2_file.name}`);
        const storageRef3 = ref(this.storage, `products/${this.photo3_file.name}`);

        /** UPLOAD PHOTO 2 **/
        uploadBytes(storageRef2, this.photo2_file)
          .then(async () => {
            newProduct.photoURL2 = await getDownloadURL(storageRef2);

            /** UPLOAD PHOTO 3 **/
            uploadBytes(storageRef3, this.photo3_file)
              .then(async () => {
                newProduct.photoURL3 = await getDownloadURL(storageRef3);

                if (this.dataSheet_file) {
                  const storageRefDataSheet = ref(this.storage, `products/${this.dataSheet_file.name}`);
                  /** UPLOAD DATASHEET **/
                  uploadBytes(storageRefDataSheet, this.dataSheet_file)
                    .then(async () => {
                      newProduct.dataSheetURL = await getDownloadURL(storageRefDataSheet);
                      await this.productService.addProduct(newProduct);
                      this.newProductForm.reset();
                      this.outTemplate.emit('LIST');
                    })
                    .catch((e) => console.log(e));
                } else {
                  await this.productService.addProduct(newProduct);
                  this.newProductForm.reset();
                  this.outTemplate.emit('LIST');
                }
              })
              .catch((e) => console.log(e));

          })
          .catch((e) => console.log(e));
      }
    }
  }

}
