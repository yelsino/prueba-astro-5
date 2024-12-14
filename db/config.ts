import { defineTable, column, NOW, dbUrl, defineDb } from 'astro:db';
const Rol = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    nombre: column.text()
  },
})

const Usuario = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    email: column.text(),
    // password: column.text(),
    rol: column.text({ references: () => Rol.columns.id, default: '1' }),
    nombres: column.text(),
    celular: column.text(),
    foto: column.text(),
    tipoDocumento: column.text(),
    document: column.text(),
    idExterno: column.text()
  }
});

const Carrito = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    usuarioId: column.text({ references: () => Usuario.columns.id }),
    nombre: column.text({ default: 'carrito' })
  }
});





const UsuarioRol = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    rolId: column.text({ references: () => Rol.columns.id }),
    usuarioId: column.text({ references: () => Usuario.columns.id })
  }
});

const CodigoTemporal = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    codigo: column.text(),
    usuarioId: column.text(),
    tipo: column.text(),
    estado: column.text(),
    fecha: column.date()
  }
});

const Direccion = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    usuarioId: column.text({ references: () => Usuario.columns.id }),
    nombre: column.text(),
    numero: column.text(),
    coordenadas: column.text(),
    referencia: column.text({})
  }
});

const Pedido = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    fechaEntrega: column.date({ default: NOW }),
    estado: column.text({}),
    datosPedido: column.json(),
    numeroPedido: column.number(),
    porcentajeDescuento: column.number(),
    subTotal: column.number(),
    total: column.number(),
    codigo: column.text({ unique: true }),
    costoEnvio: column.number(),
    usuarioId: column.text({ references: () => Usuario.columns.id }),
    creacion: column.date({ default: NOW }),
    actualizacion: column.date({ default: NOW }),
  }
});

const TipoVenta = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    nombre: column.text({ default: 'kilogramo' })
  }
})

const PedidoDetalle = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    detalleLista: column.json(),
    detalleDireccion: column.json(),
    detalleUsuario: column.json(),
    detallePedido: column.json(),

  }
})

const Producto = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    idPrimario: column.text({ default: '' }),
    mayoreo: column.boolean({ default: false, }),
    cantidadParaDescuento: column.number({ default: 0 }),
    descuentoXCantidad: column.number({ default: 0 }),
    nombre: column.text(),
    categorieId: column.text({ references: () => Categoria.columns.id }),
    precio: column.number(),
    titulo: column.text(),
    descripcion: column.text(),
    status: column.boolean({ default: true }),
    url: column.text(),
    esPrimario: column.boolean(), // primario o secundario,
    tipoVenta: column.text({ default: 'kilogramo' }),
    fraccionable: column.boolean({ default: false }),
    peso: column.text({ default: '1' }),
    consideraciones: column.text({ optional: true }),
    caracteristicas: column.text({ optional: true }),
    creacion: column.date({ default: NOW }),
    actualizacion: column.date({ default: NOW }),
  },

});

const ItemsCarrito = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    productoId: column.text({ references: () => Producto.columns.id }),
    carritoId: column.text({ references: () => Carrito.columns.id })
  }
})


const ProductoVariante = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    primarioId: column.text({ references: () => Producto.columns.id }),
    secundarioId: column.text({ references: () => Producto.columns.id }),

  }
});




const Categoria = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    nombre: column.text(),
    tag: column.text()
  }
})

const SubCategoria = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    nombre: column.text(),
    descripcion: column.text()
  }
})

const ProductoSubCategoria = defineTable({
  columns: {
    id: column.text({ primaryKey: true, unique: true, optional: false }),
    productoId: column.text({ references: () => Producto.columns.id }),
    subcategoriaId: column.text({ references: () => SubCategoria.columns.id })
  }
})

const Receta = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    nombre: column.text(),
    descripcion: column.text(),
    imagen: column.text(),
    url: column.text(),
  }
})

const RecetaProducto = defineTable({
  columns: {
    id: column.text({ primaryKey: true, unique: true, optional: false }),
    recetaId: column.text({ references: () => Receta.columns.id }),
    productoId: column.text({ references: () => Producto.columns.id }),
  }
})

const Beneficio = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    title: column.text(),
    descripcion: column.text(),
    productoId: column.text({ references: () => Producto.columns.id })
  }
})

const UsoCulinario = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    title: column.text(),
    descripcion: column.text(),
    productoId: column.text({ references: () => Producto.columns.id, })
  }
})


const Lista = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    nombre: column.text(),
    items: column.json(),
    total: column.number(),
    creacion: column.date({ default: NOW }),
    actualizacion: column.date({ default: NOW }),
    numero: column.number(),
    usuarioId: column.text({ references: () => Usuario.columns.id })
  }
})


export default defineDb({
  tables: { Producto, Categoria, Receta, Beneficio, UsoCulinario, RecetaProducto, SubCategoria, ProductoSubCategoria, ProductoVariante, Rol, Usuario, UsuarioRol, CodigoTemporal, Pedido, PedidoDetalle, Direccion, Carrito, ItemsCarrito, TipoVenta, Lista },

})