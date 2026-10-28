import { useState } from "react";
import { crearPedido } from "./Servicios/tienda";

interface FormularioPagoProps{
  productos: string[],
  onPagado: () => void
}

export function FormularioPago({productos, onPagado}: FormularioPagoProps){
  const [correo, setCorreo] = useState<string>('');
  const [telefono, setTelefono] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [folio, setFolio] = useState<string | null>(null);

  async function manejarEnvio(e: React.FormEvent){
    e.preventDefault();
    setFolio(null);

    if (!correo.includes('@')) {
      setError('El correo debe incluir @');
      return;
    }
    if (!/^\d{10}$/.test(telefono)) {
      setError('El teléfono debe tener 10 dígitos');
      return;
    }
    if (productos.length === 0) {
      setError('Tu carrito está vacío');
      return;
    }

    setError(null);
    setEnviando(true);

    try {
      const resultado = await crearPedido({ correo, telefono, productos });
      setFolio(resultado.folio);
      setCorreo('');
      setTelefono('');
      onPagado();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo completar el pago');
    } finally {
      setEnviando(false);
    }
  }

  return(
    <form onSubmit={manejarEnvio}>
      <input type="email" placeholder="correo" value={correo}
             onChange={(e) => setCorreo(e.target.value)} />
      <input type="tel" placeholder="telefono" value={telefono}
             onChange={(e) => setTelefono(e.target.value)} />
      <button type="submit" disabled={enviando}>
        {enviando ? 'Enviando...' : 'Pagar'}
      </button>
      {error && <p>{error}</p>}
      {folio && <p>Pedido confirmado. Tu folio es: {folio}</p>}
    </form>
  )
}