import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Producto } from './Producto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cambiaDato = new Subject<Producto[]>();
  private lastId = 0;

  productos: Producto[] = [
    new Producto(this.lastId++, 'Inspire', 'Dell', 'Laptop', 15000, 12),
    new Producto(this.lastId++, 'IdeaPad', 'Lenovo', 'Gaming', 22000, 8),
    new Producto(this.lastId++, 'MacBook', 'Apple', 'Notebook', 13000, 19),
    new Producto(this.lastId++, 'Alienware', 'Dell', 'Gaming', 25000, 6),
    new Producto(this.lastId++, 'Carbon X1', 'Lenovo', 'Notebook', 26000, 3),
    new Producto(this.lastId++, 'Zbook', 'HP', 'Laptop' , 15000, 8),
    new Producto(this.lastId++, 'Satellite', 'Toshiba', 'Laptop', 12000, 5),
    new Producto(this.lastId++, 'ThinkPad', 'Lenovo', 'Notebook', 19000, 10),
    new Producto(this.lastId++, 'Pavilion', 'HP', 'Laptop', 17000, 7)
  ];

  productosCarrito: Producto[] = [];
  temp: Producto[] = [];

  constructor() { }

  getNextId(): number {
    return this.lastId;
  }

  getProductos(): Producto[] {
    return this.productos.slice();
  }

  getCarrito(): Producto[] {
    return this.productosCarrito.slice();
  }

  anadirAlCarrito() {
    this.temp.forEach(prod => {
      if (!this.productosCarrito.includes(prod)) {
        this.productosCarrito.push(prod);
      }
    });
    this.temp.length = 0;
  }

  anadirATemp(producto: Producto) {
    console.log(this.temp);
    const pos = this.temp.findIndex(prod => prod.id === producto.id);
    if (pos === -1) {
      this.temp.push(producto);
    } else {
      this.temp.splice(pos, 1);
    }
    console.log(this.temp);
  }

  getProducto(id: number): Producto {
    const pos = this.productos.findIndex(pr => pr.id === id);
    return Object.assign({}, this.productos[pos]);
  }

  notificarCambios() {
    this.cambiaDato.next(this.productosCarrito.slice());
  }

  borrarProducto(id: number): boolean {
    console.log(this.productosCarrito);
    const pos = this.productosCarrito.findIndex(prod => prod.id === id);
    if (pos >= 0) {
      this.productosCarrito.splice(pos , 1);
      this.notificarCambios();
      return true;
    }
    return false;
  }

}
