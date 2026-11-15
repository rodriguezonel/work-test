# Publicaciones · JSONPlaceholder

Pequeña SPA en **React + TypeScript** que consume la API pública
[jsonplaceholder.typicode.com](https://jsonplaceholder.typicode.com).

## Qué incluye

- Lista de los 10 usuarios con búsqueda por nombre (sin distinguir mayúsculas).
- Al elegir un usuario se muestran sus publicaciones.
- Alta de publicación con formulario validado: **título** y **texto** obligatorios.
  La API no persiste los datos; el post se añade de forma optimista a la lista y,
  si la petición falla, se revierte.
- Estados visibles de carga (skeletons), error con botón **Reintentar**,
  lista vacía y envío en curso.
- Diseño responsive de dos paneles (usuarios / publicaciones) con modo claro y
  oscuro según la preferencia del sistema.

## Modo demo

En la cabecera hay dos casillas, desmarcadas por defecto:

- **Demora (1,2 s):** añade latencia artificial a las peticiones que se hagan a
  partir de ese momento, para ver los skeletons y el estado “Enviando…” con calma.
- **Forzar error 500:** hace fallar las peticiones posteriores como si el
  servidor estuviera caído: al elegir un usuario falla la carga de sus
  publicaciones, al publicar se revierte el post, y “Reintentar” vuelve a fallar
  mientras siga marcado.

Los toggles no recargan los datos ya cargados: el efecto se ve en la siguiente
petición (elegir un usuario sin caché, publicar o reintentar). La lista de
usuarios ya visible no vuelve a pedirse, así que permanece usable. Ambas casillas
se desactivan automáticamente al ejecutar los tests (`MODE === 'test'`), y los
controles ni siquiera se renderizan en ese entorno. El estado de las casillas se
guarda en `localStorage` (`demo-options`) y se recupera al recargar la página;
la primera vez aparecen desmarcadas.

## Stack

| Pieza                              | Uso                                       |
| ---------------------------------- | ----------------------------------------- |
| Vite 8 + React 19 + TypeScript     | Build y SPA                               |
| TanStack Query 5                   | Datos remotos, caché y mutación optimista |
| Vitest 5 + Testing Library + MSW 3 | Tests con la API mockeada a nivel de red  |
| CSS plano                          | Estilos (un solo archivo, variables CSS)  |

## Requisitos

- Node.js 20 o superior
- npm

## Instalación

```bash
npm install
```

## Ejecutar en desarrollo

```bash
npm run dev
```

Abre **http://localhost:5173**. Vite recarga la página automáticamente al guardar.

Opciones:

```bash
npm run dev -- --host        # accesible desde la red local
npm run dev -- --port 3000   # cambiar el puerto
```

## Build de producción

```bash
npm run build     # genera dist/ (incluye comprobación de tipos con tsc -b)
npm run preview   # sirve dist/ para probarlo en local
```

## Tests

```bash
npm run test        # modo watch
npm run test:run    # una pasada (CI)
npm run test:coverage
```

Hay 6 tests repartidos en 4 archivos:

- `src/test/user-list.test.tsx` — listado y búsqueda.
- `src/test/posts.test.tsx` — carga de publicaciones y estado vacío.
- `src/test/post-form.test.tsx` — validación, creación y rollback si falla el POST.
- `src/test/error-retry.test.tsx` — error de red y reintento.

## Estructura

```
src/
  api/jsonplaceholder.ts    # tipos y llamadas a la API
  lib/validatePost.ts       # validación pura del formulario
  lib/initials.ts           # iniciales para los avatares
  hooks/                    # useUsers, usePosts, useCreatePost
  components/               # UserSearch, UserList, PostList, PostForm, QueryState
  test/                     # setup de MSW, fixtures, utilidades y tests
  App.tsx                   # composición y estado de selección/búsqueda
  main.tsx                  # QueryClientProvider
  styles.css                # estilos y tema claro/oscuro
```

## Notas

- `POST /posts` devuelve siempre `id: 101` y no guarda nada. Para evitar claves
  duplicadas, el post local usa un `crypto.randomUUID()` y se marca como local.
- Por eso no se invalida la caché tras crear: un refetch borraría el post recién
  añadido.



## Desiciones

El stack usado, y que la IA lo hiciera todo, yo solo ver el plan y corregir.



## Con mas tiempo

Se podria hacer un backend con un gestor de base de datos.



## IA

A la IA primero le di un resumen hecho anteriormente del stack escogido, y ya creado el proyecto con sus dependencias y luego:

Le pedi en modo plan: Haz una pequeña app con React y TypeScript que use la API pública https://jsonplaceholder.typicode.com

1. Lista de usuarios con búsqueda por nombre.
2. Al elegir un usuario, ver sus publicaciones y crear una nueva con un formulario validado (título y texto obligatorios). La API no guarda los datos de verdad, así que basta con que la nueva publicación aparezca en la lista.
3. Estados de carga y de error visibles.
4. Al menos 3 tests con Vitest o Jest y Testing Library.

Le pedi una posible UI, cuando estuve conforme con el plan le pedi que lo ejecutara.

Despues commit.

No encontre algo para corregirla, luego de ejecutar el plan.

Luego le pedi que pusiera dos checkbox, uno de una demora para que se viera los estados de carga y otro de forzar error 500 para que se vean los errores y donde se muestran los errores. Lo hizo y vi que cuando se marcaba alguno de los dos se volvia a recargar la aplicacion, no era lo que queria, asi que le pedi que no actualizara nada cuando se marcaban o desmarcaban, asi que si se marca forzar error 500 y se da click en un usuario da error y se muestra el error.

Luego le pedi que guardara el estado de los checkbox en localstorage para que se mantuviera entre cargas de la pagina.

Todo eso quedo registrado en los commits.
