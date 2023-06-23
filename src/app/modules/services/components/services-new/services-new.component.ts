import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from "@angular/fire/auth";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ServiceService} from "../../services/service.service";
import {Timestamp} from "firebase/firestore";
import {ref, uploadBytes, getDownloadURL, Storage,} from "@angular/fire/storage";
import {Service} from "../../interfaces/service";

@Component({
  selector: 'app-services-new',
  templateUrl: './services-new.component.html',
  styleUrls: ['./services-new.component.scss']
})
export class ServicesNewComponent {
  @Input() firebaseUser = {} as User;
  @Output() outTemplate = new EventEmitter<string>();

  /** VARIABLES **/
  newServiceForm: FormGroup;
  loadingEffect: boolean = false;

  /** PHOTO FILES **/
  photo1_file: string | any;
  photo1_preview: string = '';
  photo2_file: string | any;
  photo2_preview: string = '';
  photo3_file: string | any;
  photo3_preview: string = '';

  constructor(private serviceService: ServiceService, private storage: Storage, private fb: FormBuilder) {

    this.newServiceForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      feature1: [''],
      feature2: [''],
      feature3: [''],
      feature4: [''],
      feature5: [''],
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
    let newService: Service;

    if (this.newServiceForm.valid) {
      newService = this.newServiceForm.value;
      newService.photoURL1 = '';
      newService.photoURL2 = '';
      newService.photoURL3 = '';

      newService.createdAt = Timestamp.fromDate(new Date());
      newService.createdBy = firebaseUser.uid;
      newService.updatedAt = Timestamp.fromDate(new Date());
      newService.updatedBy = firebaseUser.uid;

      /********************* UPLOAD ALL PHOTOS **********************/
      if (this.photo1_file && this.photo2_file && this.photo3_file) {
        const storageRef1 = ref(this.storage, `services/${this.photo1_file.name}`);
        const storageRef2 = ref(this.storage, `services/${this.photo2_file.name}`);
        const storageRef3 = ref(this.storage, `services/${this.photo3_file.name}`);

        /** UPLOAD PHOTO 1 **/
        uploadBytes(storageRef1, this.photo1_file)
          .then(async () => {
            newService.photoURL1 = await getDownloadURL(storageRef1);

            /** UPLOAD PHOTO 2 **/
            uploadBytes(storageRef2, this.photo2_file)
              .then(async () => {
                newService.photoURL2 = await getDownloadURL(storageRef2);

                /** UPLOAD PHOTO 3 **/
                uploadBytes(storageRef3, this.photo3_file)
                  .then(async () => {
                    newService.photoURL3 = await getDownloadURL(storageRef3);
                    await this.serviceService.addService(newService);
                    this.newServiceForm.reset();
                    this.outTemplate.emit('LIST');
                  })
                  .catch((e) => console.log(e));
              })
              .catch((e) => console.log(e));
          })
          .catch((e) => console.log(e));


        /********************* DO NOT UPLOAD ANYTHING ************************/
      } else if (!this.photo1_file && !this.photo2_file && !this.photo3_file) {
        await this.serviceService.addService(newService);
        this.newServiceForm.reset();
        this.outTemplate.emit('LIST');

        /********************** UPLOAD JUST PHOTO 1 *************************/
      } else if (this.photo1_file && !this.photo2_file && !this.photo3_file) {
        const storageRef1 = ref(this.storage, `services/${this.photo1_file.name}`);

        uploadBytes(storageRef1, this.photo1_file)
          .then(async () => {
            newService.photoURL1 = await getDownloadURL(storageRef1);
            await this.serviceService.addService(newService);
            this.newServiceForm.reset();
            this.outTemplate.emit('LIST');

          })
          .catch((e) => console.log(e));

        /********************** UPLOAD JUST PHOTO 2 *************************/
      } else if (!this.photo1_file && this.photo2_file && !this.photo3_file) {
        const storageRef2 = ref(this.storage, `services/${this.photo2_file.name}`);

        uploadBytes(storageRef2, this.photo2_file)
          .then(async () => {
            newService.photoURL2 = await getDownloadURL(storageRef2);
            await this.serviceService.addService(newService);
            this.newServiceForm.reset();
            this.outTemplate.emit('LIST');

          })
          .catch((e) => console.log(e));

        /********************** UPLOAD JUST PHOTO 3 *************************/
      } else if (!this.photo1_file && !this.photo2_file && this.photo3_file) {
        const storageRef3 = ref(this.storage, `services/${this.photo3_file.name}`);

        uploadBytes(storageRef3, this.photo3_file)
          .then(async () => {
            newService.photoURL3 = await getDownloadURL(storageRef3);
            await this.serviceService.addService(newService);
            this.newServiceForm.reset();
            this.outTemplate.emit('LIST');
          })
          .catch((e) => console.log(e));

        /******************** UPLOAD JUST PHOTO 1 AND 2 **********************/
      } else if (this.photo1_file && this.photo2_file && !this.photo3_file) {
        const storageRef1 = ref(this.storage, `services/${this.photo1_file.name}`);
        const storageRef2 = ref(this.storage, `services/${this.photo2_file.name}`);

        /** UPLOAD PHOTO 1 **/
        uploadBytes(storageRef1, this.photo1_file)
          .then(async () => {
            newService.photoURL1 = await getDownloadURL(storageRef1);

            /** UPLOAD PHOTO 2 **/
            uploadBytes(storageRef2, this.photo2_file)
              .then(async () => {
                newService.photoURL2 = await getDownloadURL(storageRef2);
                await this.serviceService.addService(newService);
                this.newServiceForm.reset();
                this.outTemplate.emit('LIST');
              })
              .catch((e) => console.log(e));

          })
          .catch((e) => console.log(e));

        /******************* UPLOAD JUST PHOTO 1 AND 3 **********************/
      } else if (this.photo1_file && !this.photo2_file && this.photo3_file) {
        const storageRef1 = ref(this.storage, `services/${this.photo1_file.name}`);
        const storageRef3 = ref(this.storage, `services/${this.photo3_file.name}`);

        /** UPLOAD PHOTO 1 **/
        uploadBytes(storageRef1, this.photo1_file)
          .then(async () => {
            newService.photoURL1 = await getDownloadURL(storageRef1);

            /** UPLOAD PHOTO 3 **/
            uploadBytes(storageRef3, this.photo3_file)
              .then(async () => {
                newService.photoURL3 = await getDownloadURL(storageRef3);
                await this.serviceService.addService(newService);
                this.newServiceForm.reset();
                this.outTemplate.emit('LIST');
              })
              .catch((e) => console.log(e));
          })
          .catch((e) => console.log(e));

        /******************* UPLOAD JUST PHOTO 2 AND 3 **********************/
      } else if (!this.photo1_file && this.photo2_file && this.photo3_file) {
        const storageRef2 = ref(this.storage, `services/${this.photo2_file.name}`);
        const storageRef3 = ref(this.storage, `services/${this.photo3_file.name}`);

        /** UPLOAD PHOTO 2 **/
        uploadBytes(storageRef2, this.photo2_file)
          .then(async () => {
            newService.photoURL2 = await getDownloadURL(storageRef2);

            /** UPLOAD PHOTO 3 **/
            uploadBytes(storageRef3, this.photo3_file)
              .then(async () => {
                newService.photoURL3 = await getDownloadURL(storageRef3);
                await this.serviceService.addService(newService);
                this.newServiceForm.reset();
                this.outTemplate.emit('LIST');
              })
              .catch((e) => console.log(e));

          })
          .catch((e) => console.log(e));
      }
    }
  }

}
