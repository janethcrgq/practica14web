import { useEffect, useState } from "react";
import type { Producto } from "../datos";
import { traerProductos } from "../Servicios/tienda";

export function useProductos(){

  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando]= useState(true);
  const [error, setError]= useState<string | null>(null);
  const [intento, setIntento]= useState(0);


  useEffect(()=>{
    let vigente= true;

    traerProductos()
       .then((lista)=> {if(vigente) setProductos(lista)})
        .catch(()=> {if(vigente) setError('no se logro obtener la lista de productos')})
        .finally(()=> {if(vigente) setCargando(false)});

       return()=> {vigente= false}
    
    
  }, [intento]);


  function reintentar(){
    setCargando(true);
    setError(null);
    setIntento((n) => n+1 );
  }

  return { productos, cargando, error, reintentar }
  
}






