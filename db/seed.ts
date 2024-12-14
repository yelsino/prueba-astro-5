import { Beneficio, Categoria, Producto, ProductoSubCategoria, Receta, RecetaProducto, Rol, SubCategoria, UsoCulinario, Usuario, ProductoVariante, db, TipoVenta, Direccion } from 'astro:db';
import { RECETAS } from './data/recetas';
import { PRODUCTOS } from './data/productos';
import { CULINARIO } from './data/culinario';
import { BENEFICIOS } from './data/beneficios';
import { RECETASPRODUCTO } from './data/recetasProductos';
import { PRODUCTOSUBCATEGORIA } from './data/productosSubcategoria';
import { CATEGORIAS } from './data/categorias';
import { SUBCATEGORIAS } from './data/subcategorias';
import { VARIANTES } from './data/variantes';
import { TipoVentaEnum } from '@tools/utils/enums';



export default async function () {

	await db.insert(Rol).values([
		{
			id: '1',
			nombre: 'cliente'
		},
		{
			id: '2',
			nombre: 'admin'
		},
	])
	await db.insert(Usuario).values([
		{
			id: '1',
			email: 'yelsino321@gmail.com',
			celular: '939616350',
			document: '77068139',
			foto: '',
			idExterno: '',
			nombres: 'yelsin pablo caso alanya',
			tipoDocumento: '',
			rol: '2'

		},
		{
			id: '2',
			email: '913501889',
			celular: '913501889',
			document: '',
			foto: '',
			idExterno: '',
			nombres: 'Luis Caso Alanya',
			tipoDocumento: '',
			rol: '2'
		},

	]);
	await db.insert(Direccion).values([
		{
			id: "1",
			usuarioId: '1',
			nombre: '',
			coordenadas: '',
			numero: '',
			referencia: '',
		},
		{
			id: "2",
			usuarioId: '2',
			nombre: '',
			coordenadas: '',
			numero: '',
			referencia: '',
		}
	])
	await db.insert(Categoria).values(CATEGORIAS);
	await db.insert(SubCategoria).values(SUBCATEGORIAS);

	const SolveProductos = PRODUCTOS.map((p) => ({
		...p,
		actualizacion: new Date(p.actualizacion),
		creacion: new Date(p.creacion),
		mayoreo: Boolean(p.mayoreo),
		status: Boolean(p.status),
		esPrimario: Boolean(p.esPrimario),
		fraccionable: Boolean(p.fraccionable),
	}));
	await db.insert(Producto).values(SolveProductos);

	await db.insert(ProductoVariante).values(VARIANTES);
	await db.insert(Receta).values(RECETAS);
	await db.insert(Beneficio).values(BENEFICIOS);
	await db.insert(UsoCulinario).values(CULINARIO);

	await db.insert(RecetaProducto).values(RECETASPRODUCTO);
	await db.insert(ProductoSubCategoria).values(PRODUCTOSUBCATEGORIA);
	await db.insert(TipoVenta).values([
		{ id: '1', nombre: TipoVentaEnum.Kilogramo },
		{ id: '2', nombre: TipoVentaEnum.Unidad },
		{ id: '3', nombre: TipoVentaEnum.Saco },
		{ id: '4', nombre: TipoVentaEnum.Docena },
		{ id: '5', nombre: TipoVentaEnum.Arroba },
		{ id: '6', nombre: TipoVentaEnum.Caja },
		{ id: '7', nombre: TipoVentaEnum.Balde },
		{ id: '8', nombre: TipoVentaEnum.Bolsa },
		{ id: '9', nombre: TipoVentaEnum.Paquete },
	]);


	// adicionales

	// await db.insert(ProductoSubCategoria).values(PRODUCTOSUBCATEGORIA);
}






