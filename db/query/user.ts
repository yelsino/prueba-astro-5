import { and, Carrito, db, Direccion, eq, ItemsCarrito, like, Usuario } from "astro:db";
import type { Direccion as IDireccion, ItemCarDB, Usuario as IUsuario, } from "src/interfaces";
import { v4 } from "uuid";
import bcrypt from "bcryptjs";
import type { UserDetailed } from "./InterfazQuery";


export const verificarNumberPhone = async (numberPhone: string) => {

  const results = await db.select()
    .from(Usuario)
    .where(eq(Usuario.celular, numberPhone));

  if (results.length === 0) return false;
  return true
}

export const verificarUsuario = async (email: string) => {

  const results = await db.select()
    .from(Usuario)
    .where(eq(Usuario.email, email));

  if (results.length === 0) return false;
  return true
}

export const usuarioXnumberPhone = async (numberPhone: string) => {

  const results = await db.select()
    .from(Usuario)
    .where(eq(Usuario.celular, numberPhone));

  if (results.length === 0) return null;

  return results[0]
}

export type AuthMethod = 'WHATSAPP' | 'NUMBER_PHONE' | 'EMAIL' | 'FACEBOOK'
type PersonaOpcional = Partial<IUsuario> & {
  picture?: string;
  metodo?: AuthMethod;
};
export const createNewUser = async (user: PersonaOpcional): Promise<IUsuario | null> => {
  try {

    const userChecket = await verificarUsuario(user.email ?? "")

    if (userChecket) return null


    const newId = v4()
    const valores = {
      email: user.email ?? "",
      id: newId ?? "",
      nombres: user.nombres ?? "",
      celular: user.celular ?? "",
      document: user.document ?? "",
      foto: user.foto ?? "",
      idExterno: user.idExterno ?? "",
      tipoDocumento: user.tipoDocumento ?? ""
    }

    const insertedUser = await db.insert(Usuario).values(valores).returning();

    const carritoID = v4();
    const usuario = insertedUser[0]
    await db.insert(Carrito).values({
      id: carritoID,
      usuarioId: usuario.id,
      nombre: 'carrito'
    })

    const direccionID = v4();
    await db.insert(Direccion).values({
      id: direccionID,
      coordenadas: '',
      nombre: '',
      numero: '',
      referencia: '',
      usuarioId: usuario.id
    })

    return usuario;
  } catch (error) {
    console.error('Error creating new user:', error);
    return null
  }
}

export const getUserDetailed = async (id: string): Promise<UserDetailed | null> => {
  try {
    const results = await db.select()
      .from(Usuario)
      .innerJoin(Direccion, eq(Usuario.id, Direccion.usuarioId))
      .where(eq(Usuario.id, id))
      .limit(1)
      .execute(); // Asegúrate de que tu ORM requiere `execute()` o el método correspondiente

    if (results.length > 0) {
      const result = results[0];

      return {
        usuario: result.Usuario,
        direccion: result.Direccion
      };
    }

    return null;
  } catch (error: any) {
    console.error("Error en getUserDetailed:", error);
    return null;
  }
};

export const getUserByManyParams = async (usuario: Partial<IUsuario>) => {
  const conditions = [];

  // Agregar condiciones dinámicas basadas en las propiedades definidas
  if (usuario.id) conditions.push(eq(Usuario.id, usuario.id));
  if (usuario.nombres) conditions.push(like(Usuario.nombres, `%${usuario.nombres}%`)); // Ejemplo con 'like' para búsqueda parcial
  if (usuario.email) conditions.push(eq(Usuario.email, usuario.email));
  if (usuario.celular) conditions.push(eq(Usuario.celular, usuario.celular));
  // Añade aquí otras propiedades según sea necesario

  const results = await db.select()
    .from(Usuario)
    .where(and(...conditions));

  if (results.length === 0) return null
  return results[0];
};


export const addItemCar = async (item: ItemCarDB) => {
  const newId = v4();
  const newItem: ItemCarDB = {
    id: newId,
    carritoId: item.carritoId,
    productoId: item.productoId
  };

  await db.insert(ItemsCarrito).values(newItem)
}

export const getUserCar = async (userId: string) => {
  const results = await db.select()
    .from(Carrito)
    .where(eq(Carrito.usuarioId, userId))
    .limit(1);

  if (results.length === 0) return [];

  return results[0]
}