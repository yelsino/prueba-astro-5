import type { TipoVentaEnum } from "@tools/utils/enums";
import { productodbToProducto } from "@tools/utils/mappers";
import { Receta, Producto, RecetaProducto, eq, db, Beneficio, UsoCulinario, ProductoSubCategoria, SubCategoria, desc, and, asc, sql, } from "astro:db"
import type { BeneficiosProducto, Producto as IProducto, Receta as IReceta, UsosCulinariosProducto } from "src/interfaces";

export const recetasXproducto = async (productoId: string) => {

  const results = await db.select()
    .from(Receta)
    .innerJoin(RecetaProducto, eq(RecetaProducto.recetaId, Receta.id))
    .where(eq(RecetaProducto.productoId, productoId));

  const recetas = results.map(result => result.Receta);

  return recetas;
};

export const beneficiosXproducto = async (productoId: string) => {


  const results = await db.select()
    .from(Beneficio)
    .innerJoin(Producto, eq(Producto.id, Beneficio.productoId))
    .where(eq(Beneficio.productoId, productoId));

  const beneficios = results.map(result => result.Beneficio)

  return beneficios
}

export const usosCulinarioXproducto = async (productoId: string) => {


  const results = await db.select()
    .from(UsoCulinario)
    .innerJoin(Producto, eq(Producto.id, UsoCulinario.productoId))
    .where(eq(UsoCulinario.productoId, productoId));

  const usosCulinarios = results.map(result => result.UsoCulinario);

  return usosCulinarios
}

export const productosXSubCategorias = async (subCategoriasId: string) => {

  const subcategorias = subCategoriasId.split(',');


  const promises = subcategorias.map(async (subCategoriaId) => {
    const result = await db.select()
      .from(Producto)
      .innerJoin(ProductoSubCategoria, eq(ProductoSubCategoria.subcategoriaId, subCategoriaId))
      .where(and(
        eq(ProductoSubCategoria.productoId, Producto.id),
        eq(Producto.status, true)
      )).orderBy(asc(sql`LOWER(${Producto.nombre})`));

    return result.map(res => res.Producto);
  });

  const productos = (await Promise.all(promises)).flat();
  return productos
}

export const obtenerSubCategoriasXproducto = async (productoId: string) => {
  const results = await db.select()
    .from(SubCategoria)
    .innerJoin(ProductoSubCategoria, eq(SubCategoria.id, ProductoSubCategoria.subcategoriaId))
    .where(eq(ProductoSubCategoria.productoId, productoId));

  const subCategoriasId = results.map((r) => r.SubCategoria.id);

  // Usar un Set para eliminar duplicados
  const uniqueSubCategoriasId = Array.from(new Set(subCategoriasId));

  return uniqueSubCategoriasId.join(',');
}



interface ProductoDetalle {
  producto: IProducto
  culinarios: UsosCulinariosProducto[]
  beneficios: BeneficiosProducto[]
  recetas: IReceta[]
}


export const obtenerProducto = async (productoId: string): Promise<IProducto | null> => {
  const results = await db.select()
    .from(Producto)
    .where(eq(Producto.id, productoId));

  if (results.length === 0) return null;

  const producto = results[0]

  return {
    ...producto,
    creacion: producto.creacion as Date,
    actualizacion: producto.actualizacion as Date,
    tipoVenta: producto.tipoVenta as TipoVentaEnum,
    consideraciones: producto.consideraciones ?? "",
    caracteristicas: producto.consideraciones ?? "",
  }
}

// fecha de actualziacion basada en el ultimo producto actualziado
export const obtenerFechaActualizacion = async () => {
  const result = await db.select({ actualizacion: Producto.actualizacion })
    .from(Producto)
    .orderBy(desc(Producto.actualizacion))
    .limit(1);


  return result[0].actualizacion
}