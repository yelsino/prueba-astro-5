// import Google from '@auth/core/providers/google';
// import Facebook from '@auth/core/providers/facebook';
// import { defineConfig } from 'auth-astro';
// import { db, eq, Usuario } from 'astro:db';
// import Credentials from '@auth/core/providers/credentials';
// // import { getUserByManyParams, verificarUsuario } from 'db/query/user';
// // import { serviceLogin } from '@pages/api/service/auth.service';

// interface UserType {
// 	id: string;
// 	name: string;
// 	email: string;
// 	avatar: string;
// 	premiumSubscription: boolean;
// 	accessToken: string;
// 	refreshToken: string;
// 	subId: string;
// }

// declare module "auth-astro" {
// 	interface User extends UserType { }
// }

// export default defineConfig({
// 	debug: true,
// 	providers: [
// 		Facebook({
// 			clientId: import.meta.env.FACEBOOK_CLIENT_ID,
// 			clientSecret: import.meta.env.FACEBOOK_CLIENT_SECRET,
// 			authorization: {
// 				params: {
// 					prompt: "consent",
// 					access_type: "offline",
// 					response_type: "code"
// 				}
// 			}
// 		}),
// 		Google({
// 			clientId: import.meta.env.GOOGLE_CLIENT_ID,
// 			clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET,
// 		}),
// 		Credentials({
// 			credentials: {
// 				email: { label: "Email", type: "email", required: true },
// 				nombres: { label: "Nombres", type: "text", required: false },
// 			},
// 			// authorize: async (credentials: any): Promise<{} | null> => {
// 			// 	try {
// 			// 		console.log("CREDENTIALS: ", credentials);

// 			// 		if (!credentials || !credentials.email) {
// 			// 			throw new Error("No hay resultado.");
// 			// 		}

// 			// 		const existsUser = await getUserByManyParams({
// 			// 			email: credentials.email
// 			// 		})

// 			// 		if (!existsUser) return null

// 			// 		return existsUser

// 			// 	} catch (error) {
// 			// 		console.error("Error de autorización:", error);
// 			// 		return null;
// 			// 	}
// 			// },
// 		}),
// 	],
// 	callbacks: {
// 		// si hay algun inicio de session agregar datos como el token
// 		async session({ session, token }: any): Promise<any> {
// 			try {

// 				const user = await db.select().from(Usuario).where(eq(Usuario.email, session?.user?.email));

// 				if (user.length === 0) {
// 					return null;
// 				}

// 				return user[0]

// 			} catch (error) {
// 				return session; // Devolver la sesión original en caso de error
// 			}
// 		},
// 		// para google y otros
// 		// async signIn({ profile }) {
// 		// 	try {

// 		// 		const searchUser = await verificarUsuario(profile?.email ?? "");

// 		// 		if (searchUser) return true;

// 		// 		const result = await serviceLogin({
// 		// 			email: profile?.email ?? "",
// 		// 			nombres: profile?.name ?? "",
// 		// 			foto: profile?.picture ?? "",
// 		// 		});

// 		// 		if (result) return true

// 		// 		return true
// 		// 	} catch (error) {
// 		// 		console.log(error);
// 		// 		return true;
// 		// 	}
// 		// }
// 	},
// 	pages: {
// 		signIn: "/auth/login-whatsapp",
// 		signOut: '/tienda/vegetales'
// 	},
// 	session: {
// 		strategy: "jwt"
// 	},
// });
