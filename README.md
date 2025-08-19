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
*   [Modelos de Datos de Respuesta](#modelos-de-datos-de-respuesta)
    *   [ShopConfig (Configuración de la Tienda)](#shopconfig-configuración-de-la-tienda)
    *   [CategoryItem (Elemento de Categoría)](#categoryitem-elemento-de-categoría)
    *   [ProductItem (Elemento de Producto)](#productitem-elemento-de-producto)
    *   [CouponItem (Elemento de Cupón)](#couponitem-elemento-de-cupón)
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

Primero, importa la clase `Clipify` y crea una instancia.

```javascript
// En un entorno de módulo (Node.js, React, Vue, Angular, etc.)
import Clipify from '@bridevmx/clip-ify';

// Si usas CDN (la clase Clipify estará disponible globalmente)
// <script src="http://unpkg.com/@bridevmx/clip-ify@latest"></script>

const clipClient = new Clipify();
// Puedes especificar un baseUrl personalizado si es necesario:
// const clipClient = new Clipify({ baseUrl: "https://tu-api-personalizada.com" });
```

### Obtener Configuración de la Tienda

Obtiene la información de configuración de una tienda específica. **Esta acción es crucial ya que de ella se obtiene el `proxyMerchantToken` necesario para otras operaciones.**

```javascript
let proxyMerchantToken = null; // Variable para almacenar el token

try {
    const shopName = 'Abarrotes123'; // Reemplaza con el nombre de tu tienda (slug)
    const response = await clipClient.getConfig(shopName);

    if (response.success && response.config) {
        console.log('Configuración de la tienda:', response.config);
        proxyMerchantToken = response.config.proxyMerchantToken;
        console.log('Proxy Merchant Token obtenido:', proxyMerchantToken);

        // Ejemplo: ahora puedes usar proxyMerchantToken en otras llamadas
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
const shopName = 'Abarrotes123'; // Reemplaza con el nombre de tu tienda

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

**Nota:** En esta respuesta, los objetos `ProductModifier` solo contendrán `modifierId` y `modifierName`. Para obtener los detalles completos de los modificadores (incluyendo `options`), debes usar el método `getProduct`.

```javascript
// Asegúrate de que proxyMerchantToken ya haya sido obtenido de getConfig()
if (proxyMerchantToken) {
    try {
        const categoryId = 'ID_DE_LA_CATEGORIA'; // e.g., '603925d0-58a8-49ed-b5de-80a20185a5d2'
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

Obtiene los detalles completos de un solo producto por su ID. Esta respuesta incluye información detallada sobre modificadores (con sus opciones) y variantes.

```javascript
// Asegúrate de que proxyMerchantToken ya haya sido obtenido de getConfig()
if (proxyMerchantToken) {
    try {
        const productId = 'ID_DEL_PRODUCTO'; // e.g., 'd2be2730-d352-4506-b0a4-fe145ce293d3'

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

Recupera una lista de cupones activos para una tienda.

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

## Modelos de Datos de Respuesta

Aquí se detallan las estructuras de los objetos principales que la biblioteca devuelve, incluyendo los campos opcionales.

### ShopConfig (Configuración de la Tienda)

Representa la configuración detallada de una tienda.

| Propiedad              | Tipo                               | Descripción                                                                 |
| :--------------------- | :--------------------------------- | :-------------------------------------------------------------------------- |
| `address`              | `object`                           | Detalles de la dirección de la tienda.                                      |
| `address.addressType`  | `string \| null`                   | Tipo de dirección (ej., "Home", "Work"). Puede ser `null`.                 |
| `address.colony`       | `string`                           | Nombre de la colonia o barrio.                                              |
| `address.firstAddress` | `string`                           | Línea principal de la dirección (ej., calle y número).                     |
| `address.municipality` | `string`                           | Municipio o delegación.                                                    |
| `address.postalCode`   | `string`                           | Código postal.                                                              |
| `address.secondAddress`| `string`                           | Línea secundaria opcional de la dirección.                                 |
| `address.state`        | `string`                           | Estado o provincia.                                                         |
| `alias`                | `string`                           | Alias o nombre corto de la tienda.                                          |
| `createdAt`            | `string`                           | Fecha y hora de creación de la configuración en formato ISO 8601.          |
| `email`                | `string`                           | Correo electrónico de contacto del comercio.                               |
| `fullAddress`          | `string`                           | Dirección completa formateada.                                              |
| `image`                | `string`                           | URL de la imagen de perfil de la tienda.                                    |
| `opengraphBanner`      | `string`                           | URL de la imagen del banner OpenGraph.                                      |
| `phone`                | `string`                           | Número de teléfono de contacto.                                             |
| `profileConfig`        | `object`                           | Configuración de visibilidad del perfil público.                            |
| `profileConfig.profileActive` | `boolean`                   | Indica si el perfil público está activo.                                   |
| `profileConfig.showAddress` | `boolean`                     | Indica si la dirección de la tienda debe mostrarse públicamente.           |
| `profileConfig.showEmail` | `boolean`                       | Indica si el correo de la tienda debe mostrarse públicamente.              |
| `profileConfig.showPhone` | `boolean`                       | Indica si el teléfono de la tienda debe mostrarse públicamente.            |
| `proxyMerchantId`      | `string`                           | ID único del comercio.                                                      |
| `proxyMerchantToken`   | `string`                           | **Token clave necesario para realizar otras llamadas a la API.**            |
| `proxyUserId`          | `string`                           | ID único del usuario asociado.                                              |
| `publicDescription`    | `string`                           | Descripción pública de la tienda.                                           |
| `publicName`           | `string`                           | Nombre público de la tienda.                                                |
| `storeConfiguration`   | `object \| undefined`              | **Opcional:** Configuración detallada de la tienda, presente en respuestas más nuevas. |
| `storeConfiguration.businessProfile` | `boolean`            | Indica si el perfil de negocio está habilitado.                            |
| `storeConfiguration.contactInformation` | `object`          | Información de contacto detallada.                                         |
| `storeConfiguration.contactInformation.email` | `string`    | Email de contacto.                                                         |
| `storeConfiguration.contactInformation.fullname` | `string` | Nombre completo del contacto.                                              |
| `storeConfiguration.contactInformation.phone` | `string`    | Número de teléfono de contacto.                                            |
| `storeConfiguration.contactInformation.socialLinks` | `object`| Enlaces a redes sociales (ej. `facebook`, `tiktok`).                   |
| `storeConfiguration.contactInformation.whatsapp` | `string` | Número de WhatsApp.                                                        |
| `storeConfiguration.createdAt` | `string`                  | Timestamp de creación de la configuración de la tienda.                    |
| `storeConfiguration.directPayments` | `boolean`             | Indica si los pagos directos están habilitados.                            |
| `storeConfiguration.isPublished` | `boolean`                | Indica si la tienda está publicada.                                        |
| `storeConfiguration.sharableCatalog` | `boolean`            | Indica si el catálogo es compartible.                                      |
| `storeConfiguration.storeSettings` | `object`                | Configuraciones operativas de la tienda.                                   |
| `storeConfiguration.storeSettings.abandonedCart` | `object` | Configuración de recordatorios de carritos abandonados.                  |
| `storeConfiguration.storeSettings.abandonedCart.active` | `boolean` | Si los recordatorios están activos.                                     |
| `storeConfiguration.storeSettings.abandonedCart.timeToReminder` | `number` | Tiempo antes de enviar el recordatorio (unidades no especificadas, asumir horas/días). |
| `storeConfiguration.storeSettings.colorPaletteId` | `string` | ID de la paleta de colores del tema.                                      |
| `storeConfiguration.storeSettings.deliveryPricing` | `Array<object>` | Zonas de entrega y sus precios.                                   |
| `storeConfiguration.storeSettings.deliveryPricing[].price` | `number` | Precio de la entrega para la zona.                                       |
| `storeConfiguration.storeSettings.deliveryPricing[].zipCodes` | `Array<object>` | Códigos postales incluidos en la zona.                               |
| `storeConfiguration.storeSettings.deliverySettings` | `object` | Opciones generales de entrega.                                       |
| `storeConfiguration.storeSettings.deliverySettings.fullDelivery` | `boolean` | Entrega completa disponible.                                           |
| `storeConfiguration.storeSettings.deliverySettings.nearByDelivery` | `boolean` | Entrega cercana disponible.                                            |
| `storeConfiguration.storeSettings.deliverySettings.pickUp` | `boolean` | Recogida en tienda disponible.                                            |
| `storeConfiguration.storeSettings.displayAddress` | `boolean` | Mostrar dirección de la tienda.                                         |
| `storeConfiguration.storeSettings.enableEmptyStockVisibility` | `boolean` | Mostrar productos sin stock.                                          |
| `storeConfiguration.storeSettings.googleReviews` | `object` | Configuración de reseñas de Google.                                      |
| `storeConfiguration.storeSettings.googleReviews.active` | `boolean` | Si la integración está activa.                                           |
| `storeConfiguration.storeSettings.googleReviews.placeId` | `string` | ID de lugar de Google para las reseñas.                                   |
| `storeConfiguration.storeSettings.heroImage` | `string`       | URL de la imagen principal (hero) de la tienda.                          |
| `storeConfiguration.storeSettings.maxNearDeliveryTime` | `object` | Tiempo máximo de entrega cercana (`unit`, `value`).                      |
| `storeConfiguration.storeSettings.minPreparationTime` | `object` | Tiempo mínimo de preparación (`unit`, `value`).                           |
| `storeConfiguration.storeSettings.openingHours` | `Array<object>` | Horas de apertura de la tienda.                                    |
| `storeConfiguration.storeSettings.openingHours[].dayFrom` | `number` | Día de inicio (0=Domingo, 6=Sábado).                                      |
| `storeConfiguration.storeSettings.openingHours[].dayTo` | `number` | Día de fin (0=Domingo, 6=Sábado).                                         |
| `storeConfiguration.storeSettings.openingHours[].intervals` | `Array<object>` | Intervalos de apertura/cierre (`opening`, `closing`).             |
| `storeConfiguration.storeSettings.themeId` | `string`         | ID del tema visual de la tienda.                                          |
| `storeConfiguration.updatedAt` | `string`                    | Timestamp de última actualización de la configuración de la tienda.       |
| `updatedAt`            | `string`                           | Fecha y hora de la última actualización en formato ISO 8601.               |

### CategoryItem (Elemento de Categoría)

Representa una categoría de productos.

| Propiedad       | Tipo               | Descripción                                                                 |
| :-------------- | :----------------- | :-------------------------------------------------------------------------- |
| `categoryId`    | `string`           | ID único de la categoría.                                                   |
| `categoryName`  | `string`           | Nombre de la categoría.                                                     |
| `description`   | `string \| null`   | Descripción de la categoría. Puede ser `null`.                              |
| `image`         | `string \| null`   | URL de la imagen de la categoría. Puede ser `null`.                         |
| `products`      | `Array<object>`    | **Opcional:** Lista de productos asociados a la categoría (solo `productId` y `productName`). Puede no estar presente en todas las listas de categorías. |
| `slug`          | `string`           | Slug amigable para URL de la categoría.                                     |

### ProductItem (Elemento de Producto)

Representa un producto individual. Los detalles (`attributes`, `categories`, `modifiers.options`, `variants`) se completan completamente al usar `getProduct`. Al usar `getProducts`, solo se incluyen `modifierId` y `modifierName` en el array `modifiers`.

| Propiedad         | Tipo                      | Descripción                                                                 |
| :---------------- | :------------------------ | :-------------------------------------------------------------------------- |
| `attributes`      | `Array<object> \| undefined` | **Opcional:** Atributos del producto (ej. `[{name: "Tamaño", values: ["Chico", "Grande"]}]`). Presente en `getProduct`. |
| `basePrice`       | `string \| null`          | Precio base del producto antes de variantes o descuentos. Puede ser `null`. |
| `categories`      | `Array<object> \| undefined` | **Opcional:** Lista de categorías a las que pertenece el producto. Presente en `getProduct`. |
| `ct`              | `string`                  | Hash de contenido o rastreador de cambios del producto.                    |
| `description`     | `string`                  | Descripción detallada del producto.                                         |
| `enabled`         | `boolean`                 | Indica si el producto está activo/habilitado.                               |
| `image`           | `string`                  | URL de la imagen principal del producto.                                   |
| `images`          | `Array<string>`           | Array de todas las URLs de imágenes del producto.                           |
| `modifiers`       | `Array<object>`           | Lista de modificadores para el producto.                                    |
| `modifiers[].modifierId` | `string`            | ID único del modificador.                                                  |
| `modifiers[].modifierName` | `string`          | Nombre del modificador.                                                    |
| `modifiers[].options` | `Array<object> \| undefined` | **Opcional:** Opciones detalladas del modificador (presente en `getProduct`). |
| `modifiers[].options[].modifierOptionId` | `string` | ID de la opción del modificador.                                         |
| `modifiers[].options[].modifierOptionName` | `string` | Nombre de la opción del modificador.                                    |
| `modifiers[].options[].price` | `string`       | Precio base de la opción del modificador.                                   |
| `modifiers[].options[].extraPrice` | `string \| null` | Precio adicional si se selecciona esta opción. Puede ser `null`.   |
| `modifiers[].required` | `boolean \| undefined` | **Opcional:** Indica si se debe seleccionar al menos una opción de este modificador (presente en `getProduct`). |
| `modifiers[].selectionLimit` | `number \| undefined` | **Opcional:** Número máximo de opciones que se pueden seleccionar de este modificador (presente en `getProduct`). |
| `numberOfModifiers` | `number`                | Cantidad de modificadores asociados al producto.                           |
| `numberOfVariants` | `number`                 | Cantidad de variantes para el producto.                                     |
| `price`           | `string`                  | Precio actual del producto (puede ser el precio base o el de la variante más económica). |
| `productId`       | `string`                  | ID único del producto.                                                      |
| `productName`     | `string`                  | Nombre del producto.                                                        |
| `sku`             | `string \| null`          | SKU (Stock Keeping Unit) del producto. Puede ser `null`.                   |
| `stock`           | `number`                  | Nivel de stock actual del producto (o de la variante por defecto).         |
| `stockAlert`      | `string \| null \| undefined` | **Opcional:** Mensaje de alerta sobre el stock. Puede ser `null`. Presente en `getProduct`. |
| `stockStatus`     | `string`                  | Estado del stock del producto (ej. "AVAILABLE", "SOLD_OUT").                |
| `variants`        | `Array<object> \| undefined` | **Opcional:** Array de variantes del producto (presente en `getProduct`). |
| `variants[].variantId` | `string`              | ID único de la variante del producto.                                      |
| `variants[].variantName` | `string`            | Nombre de la variante (ej. "Chico", "Mediano").                             |
| `variants[].price` | `number`                | Precio de la variante.                                                     |
| `variants[].stock` | `number`                | Nivel de stock de la variante.                                             |
| `variants[].stockStatus` | `string`          | Estado del stock de la variante (ej. "AVAILABLE").                         |
| `variants[].isAvailable` | `boolean`           | Indica si esta variante está disponible.                                  |
| `variants[].isDefault` | `boolean`             | Indica si esta es la variante por defecto.                                 |
| `variants[].description` | `string`            | Descripción de la variante (a menudo coincide con `variantName`).         |
| `variants[].options` | `Array<object>`         | Pares clave-valor que describen los atributos de la variante.             |
| `variants[].sku` | `string \| null`            | SKU de la variante. Puede ser `null`.                                      |
| `variants[].images` | `Array<string> \| null`  | Imágenes específicas para esta variante. Puede ser `null`.                 |
| `version`         | `string \| null`          | Versión de los datos del producto. Puede ser `null`.                       |

### CouponItem (Elemento de Cupón)

Representa un cupón de descuento activo.

| Propiedad          | Tipo             | Descripción                                                                 |
| :----------------- | :--------------- | :-------------------------------------------------------------------------- |
| `couponId`         | `string`         | ID único del cupón.                                                         |
| `couponName`       | `string`         | Nombre del cupón.                                                           |
| `discountType`     | `string \| undefined` | Tipo de descuento (ej., "PERCENTAGE", "FIXED_AMOUNT"). **Opcional.**    |
| `value`            | `number \| undefined` | Valor del descuento (ej., 10 para 10% o 10.00 para $10). **Opcional.** |
| `minPurchaseAmount`| `string \| undefined` | Monto mínimo de compra para aplicar el cupón, como cadena decimal. **Opcional.** |
| `validFrom`        | `string \| undefined` | Fecha y hora ISO 8601 de inicio de validez del cupón. **Opcional.**     |
| `validUntil`       | `string \| undefined` | Fecha y hora ISO 8601 de vencimiento del cupón. **Opcional.**           |

## Manejo de Errores

Todos los métodos de `clip-ify` que realizan solicitudes de red son `async` y devuelven una `Promise`. Es crucial envolver las llamadas en bloques `try...catch` para manejar posibles errores de red, timeouts o respuestas de API con códigos de estado no exitosos.

La biblioteca lanzará un `Error` si:
*   Faltan parámetros requeridos en los métodos (ej. `shopName`, `proxyMerchantToken`).
*   La solicitud de red falla (ej. problemas de conexión, timeout).
*   La API de tu backend devuelve un código de estado HTTP no exitoso (4xx, 5xx). En este caso, el mensaje de error del `Error` contendrá el mensaje de la API si está disponible, o un mensaje genérico como `Request failed with status 404`.

Las respuestas de la API (`response.success: false`) indicarán errores específicos de la lógica de negocio de tu API (ej. tienda no encontrada, datos no parseados).

## Contribución

¡Las contribuciones son bienvenidas! Si encuentras un error o tienes una sugerencia de mejora, por favor abre un *issue* o envía un *pull request* en el repositorio de GitHub.

## Contacto
bridevmx@gmail.com

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.
