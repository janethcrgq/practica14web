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
  <>
    <form className="pago" onSubmit={manejarEnvio}>
      <h2>Pago</h2>
      <label>
        Correo
        <input type="email" placeholder="correo" value={correo}
               onChange={(e) => setCorreo(e.target.value)} />
      </label>
      <label>
        Teléfono
        <input type="tel" placeholder="telefono" value={telefono}
               onChange={(e) => setTelefono(e.target.value)} />
      </label>
      {error && <p className="pago__error">{error}</p>}
      <button type="submit" disabled={enviando}>
        {enviando ? 'Enviando...' : 'Pagar'}
      </button>
    </form>
    {folio && <p className="confirmacion">Pedido confirmado. Tu folio es: {folio}</p>}
  </>
)
}