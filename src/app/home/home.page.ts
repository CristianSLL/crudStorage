import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { CrudEmpService } from '../crud-emp.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  nombre= "";
  correo= "";
  fono= "";
  rut= "";
  listado =[];
  constructor(private crud: CrudEmpService, private alerta: ToastController) {}


  async agregar(  txtRut:HTMLInputElement,txtUser:HTMLInputElement,
                txtCorreo:HTMLInputElement, txtfono:HTMLInputElement, )
      {
        ///validar
       if (txtRut.value.trim().length == 0){
        const msjError = await this.alerta.create({
          message : "Rut no especificado",
          duration: 2000,
          color : "danger",
          position: 'top'
        });
         msjError.present();
         return;

      }else if (txtUser.value.trim().length == 0){
          const msjError = await this.alerta.create({
            message : "Nombre no especificado",
            duration: 2000,
            color : "danger",
            position: "top"


          });
          msjError.present();
          return;

        }else if (txtCorreo.value.trim().length == 0 ){
          const msjError = await this.alerta.create({
            message : "Correo no especificado",
            duration: 2000,
            color : "danger",
            position: "top"

          });
          msjError.present();
          return;

          }else if (txtfono.value.trim().length == 0){
            const msjError = await this.alerta.create({
              message : "Telefono No especificado",
              duration: 2000,
              color : "danger",
              position: "top"
            });
            msjError.present();
            return;
          }
        const datos = [{"run": txtRut.value,
                        "nombre": txtUser.value,
                        "correo": txtCorreo.value,
                        "fono": txtfono.value,

                      }];
        await this.crud.agregar(datos)// guarda los datos en bd storage
        const msjExito = await this.alerta.create({
          message : "Usuario Registrado",
          duration: 2000,
          color : "success",
          position: "middle",


        });

         msjExito.present();
         //Limpiar despues de ingresar datos
          txtRut.value= "";
          txtUser.value= "";
          txtfono.value= "";
          txtCorreo.value= "";


      }
      async buscar(txtRut:HTMLInputElement)
      {
       const valor = await this.crud.rescatar(txtRut.value);

       if(valor != null){
         this.rut =valor[0].rut;
         this.nombre =valor[0].nombre;
         this.correo = valor[0].correo;
         this.fono = valor[0].fono;
         txtRut.value = "";
         this.listado= [];
       }
       else
       {
         this.nombre = "";
         this.correo = "";
         this.fono = "";
        const msjError = await this.alerta.create({
          message : "Rut No fue Encontrados",
          duration: 2000,
          color : "danger",
          position: "middle"
        });
        msjError.present();

      }
    }
    async eliminar()
    { let rutEliminar = this.rut;
      if(rutEliminar.trim().length == 0){

        const msjError = await this.alerta.create({
          message : "Rut No fue Encontrados",
          duration: 2000,
          color : "danger",
          position: "middle"
        });
        msjError.present();

      }
      else

      {  const valor = await this.crud.rescatar(rutEliminar);
        if(valor != null)
        {
          const msjError = await this.alerta.create({
            message : ' El Rut' + rutEliminar +'no fue Encontrados',
            duration: 2000,
            color : "danger",
            position: "middle"
          });
          msjError.present();

        }
        else
        {
          this.crud.eliminar(rutEliminar)
          const msjError = await this.alerta.create({
            message : 'El rut'+ rutEliminar + ' fue eliminado',
            duration: 2000,
            color : "danger",
            position: "middle"
          });
          msjError.present();
        }

         this.nombre= "";
         this.correo = "";
         this.fono = "";
      }
    }
    async listar()
    {
         this.nombre= "";
         this.correo = "";
         this.fono = "";
      this.listado = this.crud.listar();
    }
  }
