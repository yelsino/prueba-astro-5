import { db, inArray, Producto } from "astro:db";
import type { Carrito, ItemCar } from "src/interfaces";

export const updateCarritoQuery = async (data: Carrito): Promise<Carrito> => {
  // console.log(data);

  const productoIds = data.items.map(item => item.producto.id);

  // productos database
  const productosDB = await db
    .select({
      id: Producto.id,
      precio: Producto.precio,
      cantidadParaDescuento: Producto.cantidadParaDescuento,
      descuentoXCantidad: Producto.descuentoXCantidad
    })
    .from(Producto)
    .where(inArray(Producto.id, productoIds));

  // Crear un mapa de productos para acceso rápido

  const productosMap = productosDB.reduce((acc, producto) => {
    acc[producto.id] = {
      precio: producto.precio,
      cantidadParaDescuento: producto.cantidadParaDescuento,
      descuentoXCantidad: producto.descuentoXCantidad
    };
    return acc;
  }, {} as Record<string, { precio: number, cantidadParaDescuento: number, descuentoXCantidad: number }>);

  // Iterar sobre los items del carrito y actualizar los precios y descuentos
  let nuevoSubTotal = 0;
  const updatedItems = data.items.map((item: ItemCar) => {
    const productoInfo = productosMap[item.producto.id];
    if (productoInfo) {
      const { precio, cantidadParaDescuento, descuentoXCantidad } = productoInfo;

      // Calcular si se aplica el descuento
      let precioFinal = precio;
      if (item.cantidad >= cantidadParaDescuento * 1000) {
        precioFinal = precio - descuentoXCantidad;
      }

      // Actualizar el precio del producto en el item

      // obtener las caracteristicas y setear cada 1
      // const caracteristicas = getCaracteristicsXProduct(item.producto.id)
      // console.log(caracteristicas, "dddddddddddddd");

      item.producto.precio = precioFinal;
      item.producto.cantidadParaDescuento = cantidadParaDescuento;
      item.producto.descuentoXCantidad = descuentoXCantidad;
      // item.detalle = caracteristicas.join(", ")

      // Calcular el monto con el precio (posiblemente con descuento) actualizado
      item.monto = (item.cantidad / 1000) * precioFinal;

      // Acumular el subtotal
      nuevoSubTotal += item.monto;
    }
    return item;
  });

  // Actualizar el carrito con los precios sincronizados y aplicar el descuento si corresponde
  const carritoActualizado: Carrito = {
    ...data,
    items: updatedItems,
    subTotal: nuevoSubTotal,
    total: nuevoSubTotal + data.envio,
  };

  return carritoActualizado;
};
