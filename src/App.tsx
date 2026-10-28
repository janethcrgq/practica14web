import { useState } from 'react';
import { PiePagina } from './PiePagina';
import { useProductos } from './hooks/useProductos';
import type { Producto } from './datos';
import { Encabezado } from './Encabezado';
import { Filtros } from './filtros';
import { Catalogo } from './catalogo';
import { Layout } from './layout';
import { Cargando } from './Cargando';
import { MensajeError } from './MensajeError';
import { FormularioPago } from './FormularioPago';

function App() {
  //Estado # 1 depende del filtro
  const { productos, cargando, error, reintentar } = useProductos();
  const [categoria, setCategoria] = useState('todas');
  const [carrito, setCarrito] = useState<Producto[]>([]);


  const categorias = ['todas', ...new Set(productos.map(p => p.categoria))];
  const productosvisibles = categoria === 'todas' ? productos: productos.filter((p)=>p.categoria === categoria);
  const total = carrito.reduce((suma, p) => suma + p.precio, 0);

  function agregar(producto: Producto){
    setCarrito((anterior)=> [...anterior, producto]);
  }

  function pagado(){
    setCarrito([]);
    reintentar();
  }

return (
    <Layout 
      encabezado={<Encabezado piezas={carrito.length} />} 
      pie={<PiePagina piezas={carrito.length} total={total} />}>
      <section className='portada'>
        <h1>Catalogo de temporada</h1>
        <p>{productosvisibles.length} productos disponibles</p>
      </section>
        {cargando && <Cargando />}
        {error && <MensajeError mensaje={error} onReintentar={reintentar} />}
        {!cargando && !error && (
          <>
            <Filtros categorias={categorias} activa={categoria} onCambiar={setCategoria} />
            <Catalogo productos={productosvisibles} onAgregar={agregar} />
            
          </>
        )}
        <FormularioPago productos={carrito.map((p) => p.id)} onPagado={pagado} />
    </Layout>
  );
}

export default App
