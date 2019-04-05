import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Producto } from '../../Producto';
import { ProductosListaComponent } from '../productos-lista.component';

@Component({
  selector: 'app-producto-item',
  templateUrl: './producto-item.component.html',
  styleUrls: ['./producto-item.component.css']
})
export class ProductoItemComponent implements OnInit {
  @Input() producto: Producto;
  @Output() detalle = new EventEmitter();
  @Output() borrar = new EventEmitter();
  @Output() anadir = new EventEmitter();
  modoCarrito = false;

  constructor(private productoLista: ProductosListaComponent) { }

  ngOnInit() {
    this.modoCarrito = this.productoLista.modoCarrito;
  }

  mostrarDetalle() {
    this.detalle.emit(this.producto);
  }

  borrarProducto() {
    this.borrar.emit(this.producto);
  }

  anadirATemp() {
    this.anadir.emit(this.producto);
  }

}
