import { api }from "./api"
import type { Producto } from '../datos';
import { isAxiosError } from "axios";

interface Sobre<T>{
  data: T
}

export interface Pedido{
  correo: string;
  telefono: string;
  productos: string[];

}

export async function traerProductos(): Promise<Producto[]>{
  const response= await api.get<Sobre<Producto[]>>('/productos')
  return response.data.data;

}

export async function crearPedido(pedido: Pedido): Promise<{folio: string, total: number}>{
  try{
    const response = await api.post<Sobre<{folio: string, total: number}>>('/pedidos', pedido);
    return response.data.data;

  } catch(error){
    if (isAxiosError(error) && error.response) {
      const mensaje = error.response.data?.message;
      throw new Error(typeof mensaje === 'string' ? mensaje : 'No se logró guardar el pedido');
    }
    throw new Error('No se pudo conectar con el servidor');
  }

  }






