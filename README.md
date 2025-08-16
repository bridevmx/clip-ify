# clip-ify

[![npm version](https://badge.fury.io/js/clip-ify.svg)](https://www.npmjs.com/package/clip-ify)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

`clip-ify` es una biblioteca JavaScript ligera y fácil de usar, diseñada para interactuar con las APIs de e-commerce y descuentos de Clip. Proporciona una interfaz sencilla para obtener configuraciones de tiendas, categorías, productos y cupones.

## Tabla de Contenidos

*   [Instalación](#instalación)
*   [Uso](#uso)
    *   [Inicialización](#inicialización)
    *   [Obtener Configuración de la Tienda](#obtener-configuración-de-la-tienda)
    *   [Obtener Categorías](#obtener-categorías)
    *   [Obtener Productos por Categoría](#obtener-productos-por-categoría)
    *   [Obtener un Producto Específico](#obtener-un-producto-específico)
    *   [Obtener Cupones](#obtener-cupones)
*   [Manejo de Errores](#manejo-de-errores)
*   [Contribución](#contribución)
*   [Licencia](#licencia)

## Instalación

Puedes instalar `clip-ify` usando npm o yarn:

```bash
npm i @bridevmx/clip-ify
# o
yarn add @bridevmx/clip-ify
```

## Uso

### Inicialización

Primero, importa la clase `Clipify` (el nombre de la clase interna de la biblioteca) y crea una instancia. Necesitarás proporcionar la `baseUrl` de tu API (la URL donde está alojada tu API de Clip).

```javascript
// En un entorno de módulo (Node.js, React, Vue, Angular, etc.)
import Clipify from 'clip-ify';

// O en CommonJS (Node.js)
// const Clipify = require('clip-ify');

// O si la incluyes directamente en un navegador (después de <script src="path/to/clip-ify.min.js"></script>)
// const Clipify = window.Clipify; // Asumiendo que 'Clipify' es el nombre global expuesto

const config = {
    baseUrl: 'https://your-api-domain.com' // ¡Reemplaza con la URL de tu API! (Opcional)
};

const clipClient = new Clipify(config);
```

### Obtener Configuración de la Tienda

Obtiene la información de configuración de una tienda específica. **Esta acción es crucial ya que de ella se obtiene el `proxyMerchantToken` necesario para otras operaciones.**

```javascript
let proxyMerchantToken = null; // Declaramos una variable para almacenar el token

try {
    const shopName = 'nombre-de-tu-tienda'; // e.g., 'el-rincon-del-cafe'
    const response = await clipClient.getConfig(shopName);

    if (response.success && response.config) {
        console.log('Configuración de la tienda:', response.config);
        // Asumimos que el token se encuentra en response.config.proxyMerchantToken
        // Si la estructura es diferente, ajusta aquí.
        proxyMerchantToken = response.config.proxyMerchantToken;
        console.log('Proxy Merchant Token obtenido:', proxyMerchantToken);

        // Ahora puedes usar proxyMerchantToken en otras llamadas
        // Por ejemplo, cargar categorías para esta tienda
        // if (proxyMerchantToken) {
        //     const categoriesResponse = await clipClient.getCategories(shopName);
        //     console.log('Categorías para la tienda:', categoriesResponse.items);
        // }

    } else {
        console.error('Error al obtener la configuración:', response.error);
    }
} catch (error) {
    console.error('Error en la solicitud de configuración:', error.message);
}
```

### Obtener Categorías

Obtiene una lista de categorías disponibles para una tienda.

```javascript
// Asegúrate de haber obtenido el shopName de alguna manera, por ejemplo, de la URL o configuración.
const shopName = 'nombre-de-tu-tienda';

try {
    const response = await clipClient.getCategories(shopName);

    if (response.success) {
        console.log('Categorías:', response.items);
    } else {
        console.error('Error al obtener categorías:', response.error);
    }
} catch (error) {
    console.error('Error en la solicitud de categorías:', error.message);
}
```

### Obtener Productos por Categoría

Recupera una lista de productos para una categoría específica, usando el `proxyMerchantToken` y opcionalmente un `limit`.

```javascript
// Asegúrate de que proxyMerchantToken ya haya sido obtenido de getConfig()
if (proxyMerchantToken) {
    try {
        const categoryId = 'ID_DE_LA_CATEGORIA'; // e.g., '123456789'
        const limit = 10; // Opcional: número máximo de productos a retornar

        const response = await clipClient.getProducts(categoryId, proxyMerchantToken, limit);

        if (response.success) {
            console.log('Productos:', response.items);
        } else {
            console.error('Error al obtener productos:', response.error);
        }
    } catch (error) {
        console.error('Error en la solicitud de productos:', error.message);
    }
} else {
    console.warn('proxyMerchantToken no disponible. No se pueden obtener productos.');
}
```

### Obtener un Producto Específico

Obtiene los detalles de un solo producto por su ID.

```javascript
// Asegúrate de que proxyMerchantToken ya haya sido obtenido de getConfig()
if (proxyMerchantToken) {
    try {
        const productId = 'ID_DEL_PRODUCTO'; // e.g., '987654321'

        const response = await clipClient.getProduct(productId, proxyMerchantToken);

        if (response.success) {
            console.log('Detalles del producto:', response.item);
        } else {
            console.error('Error al obtener el producto:', response.error);
        }
    } catch (error) {
        console.error('Error en la solicitud de un solo producto:', error.message);
    }
} else {
    console.warn('proxyMerchantToken no disponible. No se puede obtener el producto.');
}
```

### Obtener Cupones

Recupera una lista de cupones activos.

```javascript
// Asegúrate de que proxyMerchantToken ya haya sido obtenido de getConfig()
if (proxyMerchantToken) {
    try {
        const response = await clipClient.getCoupons(proxyMerchantToken);

        if (response.success) {
            console.log('Cupones activos:', response.items);
        } else {
            console.error('Error al obtener cupones:', response.error);
        }
    } catch (error) {
        console.error('Error en la solicitud de cupones:', error.message);
    }
} else {
    console.warn('proxyMerchantToken no disponible. No se pueden obtener cupones.');
}
```

## Manejo de Errores

Todos los métodos de `clip-ify` que realizan solicitudes de red son `async` y devuelven una `Promise`. Es crucial envolver las llamadas en bloques `try...catch` para manejar posibles errores de red, timeouts o respuestas de API con códigos de estado no exitosos.

La biblioteca lanzará un `Error` si:
*   La configuración inicial es inválida (ej. `baseUrl` faltante).
*   Faltan parámetros requeridos en los métodos (ej. `shopName`, `proxyMerchantToken`).
*   La solicitud de red falla (ej. problemas de conexión, timeout).
*   La API de tu backend devuelve un código de estado HTTP no exitoso (4xx, 5xx). En este caso, el mensaje de error del `Error` contendrá el mensaje de la API si está disponible, o un mensaje genérico.

Las respuestas de la API (`response.success: false`) indicarán errores específicos de la lógica de negocio de tu API (ej. tienda no encontrada, datos no parseados).

## Contribución

¡Las contribuciones son bienvenidas! Si encuentras un error o tienes una sugerencia de mejora, por favor abre un *issue* o envía un *pull request* en el repositorio de GitHub.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.