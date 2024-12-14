import { Producto, Receta, RecetaProducto, db, eq } from "astro:db";

export const productosXReceta = async (recetaId: string) => {
  const results = await db.select()
    .from(Producto)
    .innerJoin(RecetaProducto, eq(RecetaProducto.recetaId, recetaId))
    .where(eq(RecetaProducto.productoId, Producto.id));

  const productos = results.map(result => result.Producto);

  return productos
}


export const obtenerRecetas = async (): Promise<any[]> => {


  const result = await db.select().from(Receta);
  const recetas = await Promise.all(result.map(async (r) => {

    const productos = await productosXReceta(r.id);

    return {
      ...r,
      productos: productos
    }
  }))

  return recetas
}