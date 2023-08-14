| **HTTP method** | **URI path**      | **Description**                    | **JASON** |
|-----------------|-------------------|------------------------------------|-----------|
| GET             | /                 | Index page                         |           |

| GET             | /signup           | Get register route                 |           |
| POST            | /signup           | Post register route                |           |
| GET             | /login            | Get login route                    |           |
| POST            | /login            | Post login route                   |           |
| GET             | /log out          | Get log out route                  |           |

| GET             | /photo/list       | Photo collections                  |           |
| GET             | /photo/create     | New photo form render              |           |
| POST            | /photo/create     | New photo form handler             |           |
| GET             | /photo/{id}       | Photo details                      |           |
| GET             | /photo/{id}/edit  | Edit photo form render             |           |
| POST            | /photo/{id}/edit  | Edit photo form handler            |           |
| POST            | photo/{id}/delete | Delete photo                       |           |

| GET             | /api/photos       | Photo principal colection          | X         |
| GET             | /api/photos/{id}  | Details photos principal colection | X         |

| GET             | /user/profile     | Perfil usuario                     |           |
| GET             | /user/create      | New user photo form render         |           |
| POST            | /user/create      | New user photo form handler        |           |
| GET             | /user/{id}        | Photo details                      |           |
| GET             | /user/{id}/edit   | Edit user photo form render        |           |
| POST            | /user/{id}/edit   | Edit user photo form handler       |           |
| POST            | /user/{id}/delete | Delete user photo                  |           |


Estas son las fases desarrollo proyecto 2 que debéis respetar y que serán verificadas el lunes. 

1. Planificación de endpoints: crear un readme (formato .md) con una tabla que recoja todos los endpoints que tendrá la aplicación. La tabla debe contar con las columnas `PATH`, `METHOD`, `DESCRIPTION` y `JSON` (ruta, verbo HTTP, descripción y si es de tipo API). Ver imagen de referencia más abajo.
2. Desarrollo de modelos: planificar y crear todos los modelos que se tendrán con cada propiedad y tipo de dato.
3. Desarrollo de todo el sistema de Auth (rutas, vistas, configuración de sesión…).
4. Comenzar a desarrollar el resto de la aplicación.