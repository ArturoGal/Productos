import { Component, OnInit } from '@angular/core';
import { Producto } from '../Producto';
import { Subscription } from 'rxjs';
import { ProductosService } from '../productos.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-productos-lista',
  templateUrl: './productos-lista.component.html',
  styleUrls: ['./productos-lista.component.css']
})
export class ProductosListaComponent implements OnInit {
  productos: Producto[];
  carrito: Producto[];
  temp: Producto[];
  private subscript: Subscription;
  public modoCarrito = false;
  error = false;
  total = 0;
  cantidad = 0;


  constructor(private productosService: ProductosService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.productos = this.productosService.getProductos();
    this.carrito = this.productosService.getCarrito();
    this.productosService.productosCarrito.forEach(prod => this.total += prod.precio);

    if (this.router.url === '/productos') {
      this.modoCarrito = false;
    } else {
      this.modoCarrito = true;
    }

    this.subscript = this.productosService.cambiaDato
      .subscribe(
        (arregloProducto: Producto[]) => {
          this.carrito = arregloProducto;
        }
      );
    this.productosService.temp.length = 0;
  }

  anadirAlCarrito() {
    this.productosService.anadirAlCarrito();
    this.cantidad = this.productosService.temp.length;
  }

  anadirATemp(producto: Producto) {
    this.productosService.anadirATemp(producto);
    this.cantidad = this.productosService.temp.length;

  }

  borrarDelCarrito(productoABorrar: Producto) {
    this.productosService.borrarProducto(productoABorrar.id);
    this.total = 0;
    this.productosService.productosCarrito.forEach(prod => this.total += prod.precio);
  }

  mostrarDetalle(productoDetalle: Producto) {
    this.router.navigate([productoDetalle.id], { relativeTo: this.route });
  }

}
