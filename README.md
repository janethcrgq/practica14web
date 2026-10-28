## Práctica 12B
## ¿Por qué el Layout no necesita saber que es una tienda?
Porque el Layout solo tiene el encabezado, el pie y lo que va en medio (children). Lo que se mete en cada hueco lo decide App, así que el Layout no sabe si adentro hay una tienda, un blog o cualquier otra cosa. 
## ¿Qué pasa si escribo onClick={onAgregar(producto)} sin la flecha?
La función se ejecuta cuando se pinta la tarjeta y no cuando se da clic. Lo que se le pasa a onClick es el resultado de esa llamada, no una función. Como onAgregar cambia el estado del carrito, React vuelve a pintar, se vuelve a ejecutar y se hace un ciclo que no termina, y en la consola salen errores. Con la flecha, () => onAgregar(producto), React guarda la función y solo la ejecuta cuando se da clic.
## ¿Por qué con carrito.push(...) el contador no se mueve y no sale ningún error?
Porque push cambia el mismo arreglo que ya existía. React revisa si el estado cambió comparando si es el mismo arreglo o uno nuevo, y como sigue siendo el mismo piensa que no pasó nada y no vuelve a pintar. No sale error porque push es válido en JavaScript, el problema es cómo React detecta los cambios. Por eso hay que crear un arreglo nuevo: setCarrito((anterior) => [...anterior, producto]).
## Práctica 14
## ¿Por qué en la pestaña Red salen dos peticiones al cargar?
Porque en main.tsx la app está dentro de Strict Mode. En desarrollo, StrictMode ejecuta los efectos dos veces a propósito (ejecuta, limpia y vuelve a ejecutar) para ver si el código aguanta que se cancele el efecto, por eso useProductos hace la petición dos veces. La limpieza del efecto pone vigente = false para que la respuesta de la primera no se guarde. Cuando la app ya está en producción, solo sale una petición.
## ¿Qué pasa si quito el arreglo de dependencias del efecto?
El efecto se ejecuta después de cada pintada. Como dentro del efecto se cambian estados (setProductos y setCargando), eso hace que se pinte otra vez, y se vuelve a ejecutar el efecto. En la pestaña Red se ve cómo siguen saliendo peticiones a productos todo el tiempo. Con el intento el efecto solo corre al cargar y cuando se da clic en reintentar, que es cuando intento cambia.
# ¿Qué hace e.preventDefault() y qué pasa si lo quito?
Evita que el navegador haga lo que hace normalmente al enviar un formulario, que es recargar la página. Si se quita, al dar clic en Pagar la página se recarga y se pierde todo lo que estaba en el estado, como el carrito, los mensajes y el folio, y no alcanza a mostrarse lo que regresa crearPedido. Con preventDefault no se recarga y React puede manejar el envío.
