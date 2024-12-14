
import { Producto, ProductoVariante, and, db, eq } from "astro:db";

interface RecetaProducto {
  productoId: number
  recetaId: number
}
export const agregarProductoReceta = async (data: RecetaProducto) => {

}

export const obtenerVariantesXproducto = async (productoId: string, primaryId?: string) => {
  const variantes = await db.select()
    .from(Producto)
    .innerJoin(ProductoVariante, eq(ProductoVariante.primarioId, productoId))
    .where(and(
      eq(Producto.id, ProductoVariante.secundarioId),
      eq(Producto.esPrimario, false),

    ));




  let productos = variantes.map((v) => v.Producto)
  if (primaryId) {
    const productoPrimario = await db.select().from(Producto).where(eq(Producto.id, primaryId)).limit(1);
    productos.push(productoPrimario[0])

  }
  return productos
}
export const obtenerVarianteProductoXsecundarioId = async (secundarioId: string) => {
  const results = await db.select()
    .from(ProductoVariante)
    .where(eq(ProductoVariante.secundarioId, secundarioId));
  if (results.length === 0) return null
  return results[0]
}

