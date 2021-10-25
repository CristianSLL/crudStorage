import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class CrudEmpService {

  constructor(private storage : Storage) { 

  // Crear Storage para usarlo
  this.init();
}
// Crear el Storage
  async init(){
    await this.storage.create();

}
// ingresando datos a storage
async agregarConKey(key: string, valor: string){
  await this.storage.set(key, valor);
}
// ingresar datos con  key autoincrmentable
async agregar(valor:any){
  let id = await this.storage.length() + 1;
  await this.storage.set(id.toString(), valor);
}

async rescatar(key:string){
  return await this.storage.get(key)
}
listar(){
let listado=[]
this.storage.forEach((v,k) => {listado.push(v); })
return listado;
}
eliminar(key: string){
this.storage.remove(key);
}

}
