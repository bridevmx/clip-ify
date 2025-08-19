/**
 * @fileoverview clip-ify API client library.
 * @version 0.1.3
 * @author Brian Marquez Hernandez
 * @license MIT
 */

/**
 * @typedef {object} ClipifyConfig
 * @property {string} baseUrl - (Optional) The base URL of your API (e.g., "https://your-api-domain.com").
 */

/**
 * @typedef {object} ShopAddress
 * @property {string|null} addressType
 * @property {string} colony
 * @property {string} firstAddress
 * @property {string} municipality
 * @property {string} postalCode
 * @property {string} secondAddress
 * @property {string} state
 */

/**
 * @typedef {object} ShopProfileConfig
 * @property {boolean} profileActive
 * @property {boolean} showAddress
 * @property {boolean} showEmail
 * @property {boolean} showPhone
 */

/**
 * @typedef {object} ShopConfig
 * @property {ShopAddress} address - Address details of the merchant.
 * @property {string} alias - The alias/short name of the shop.
 * @property {string} createdAt - ISO 8601 timestamp of creation.
 * @property {string} email - Contact email of the merchant.
 * @property {string} fullAddress - Formatted full address.
 * @property {string} image - URL to the shop's profile image.
 * @property {string} opengraphBanner - URL to the OpenGraph banner image.
 * @property {string} phone - Contact phone number.
 * @property {ShopProfileConfig} profileConfig - Configuration for public profile visibility.
 * @property {string} proxyMerchantId - Unique ID of the merchant.
 * @property {string} proxyMerchantToken - **Crucial token for other API calls.**
 * @property {string} proxyUserId - Unique ID of the user.
 * @property {string} publicDescription - Public description of the shop.
 * @property {string} publicName - Public display name of the shop.
 * @property {string} updatedAt - ISO 8601 timestamp of last update.
 */

/**
 * @typedef {object} ShopConfigResponse
 * @property {boolean} success - Indicates if the request was successful.
 * @property {ShopConfig} [config] - The configuration object if `success` is true.
 * @property {string} [error] - Error message if `success` is false.
 */

/**
 * @typedef {object} ProductModifier
 * @property {string} modifierId - Unique ID of the modifier.
 * @property {string} modifierName - Name of the modifier.
 * @property {Array<object>} [options] - Array of modifier options (populated by getProduct).
 */

/**
 * @typedef {object} ProductItem
 * @property {string|null} basePrice
 * @property {string} ct
 * @property {string} description
 * @property {boolean} enabled
 * @property {string} image - Primary image URL.
 * @property {Array<string>} images - Array of all image URLs.
 * @property {Array<ProductModifier>} modifiers - List of modifiers for the product.
 * @property {number} numberOfModifiers
 * @property {number} numberOfVariants
 * @property {string} price
 * @property {string} productId - Unique ID of the product.
 * @property {string} productName - Name of the product.
 * @property {string|null} sku
 * @property {number} stock
 * @property {string} stockStatus
 * @property {string|null} version
 */

/**
 * @typedef {object} ProductsResponse
 * @property {boolean} success - Indicates if the request was successful.
 * @property {Array<ProductItem>} [items] - An array of product items if `success` is true.
 * @property {string} [error] - Error message if `success` is false.
 */

/**
 * @typedef {object} CategoryProductRef
 * @property {string} productId
 * @property {string} productName
 */

/**
 * @typedef {object} CategoryItem
 * @property {string} categoryId - Unique ID of the category.
 * @property {string} categoryName - Name of the category.
 * @property {string|null} description - Description of the category.
 * @property {string|null} image - URL to the category's image.
 * @property {Array<CategoryProductRef>} products - List of products associated with the category.
 */

/**
 * @typedef {object} CategoriesResponse
 * @property {boolean} success - Indicates if the request was successful.
 * @property {Array<CategoryItem>} [items] - An array of category items if `success` is true.
 * @property {string} [error] - Error message if `success` is false.
 */

/**
 * @typedef {object} CouponItem
 * @property {string} couponId - Unique ID of the coupon.
 * @property {string} couponName - Name of the coupon.
 * @property {string} [discountType] - Type of discount (e.g., "PERCENTAGE", "FIXED_AMOUNT").
 * @property {number} [value] - Discount value (e.g., 10 for 10% or 10.00 for $10).
 * @property {string} [minPurchaseAmount] - Minimum purchase amount to apply the coupon.
 * @property {string} [validFrom] - ISO 8601 timestamp when the coupon becomes valid.
 * @property {string} [validUntil] - ISO 8601 timestamp when the coupon expires.
 */

/**
 * @typedef {object} CouponsResponse
 * @property {boolean} success - Indicates if the request was successful.
 * @property {Array<CouponItem>} [items] - An array of coupon items if `success` is true. Can be empty.
 * @property {string} [error] - Error message if `success` is false.
 */

/**
 * clip-ify is a client library for interacting with the Clip API.
 * It provides methods to fetch configuration, categories, products, and coupons.
 */
class Clipify {
    /**
     * Creates an instance of Clipify.
     * @param {ClipifyConfig} config - Configuration options for the client.
     * @throws {Error} If baseUrl is not provided.
     */
    constructor(config) {
        this.baseUrl = config?.baseUrl || "https://clip-ify.pockethost.io";
    }

    /**
     * Internal helper to make API requests.
     * @private
     * @param {string} endpoint - The API endpoint (e.g., "/config/shopName").
     * @param {object} [options={}] - Fetch options like headers, method, etc.
     * @returns {Promise<object>} The JSON response from the API.
     * @throws {Error} If the network request fails or the API returns an error status.
     */
    async _request(endpoint, options = {}) {
        const url = `${this.baseUrl}${endpoint}`;
        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                let errorData = null;
                try {
                    errorData = await response.json();
                } catch (e) {
                    // Ignore if response is not JSON
                }
                const errorMessage = errorData && errorData.error ? errorData.error : `Request failed with status ${response.status}`;
                throw new Error(errorMessage);
            }

            return await response.json();
        } catch (error) {
            console.error(`clip-ify: Error fetching ${url}:`, error);
            throw error; // Re-throw to allow caller to handle
        }
    }

    /**
     * Fetches the configuration for a specific shop.
     * @param {string} shopName - The name of the shop.
     * @returns {Promise<ShopConfigResponse>} The shop configuration, including `proxyMerchantToken`.
     * @throws {Error} If the API request fails.
     *
     * @example
     * // Example response structure:
     * // {
     * //   "config": {
     * //     "address": { "colony": "string", "firstAddress": "string", "municipality": "string", ... },
     * //     "alias": "string",
     * //     "createdAt": "string (ISO 8601)",
     * //     "email": "string",
     * //     "fullAddress": "string",
     * //     "image": "string (URL)",
     * //     "opengraphBanner": "string (URL)",
     * //     "phone": "string",
     * //     "profileConfig": { "profileActive": "boolean", "showAddress": "boolean", ... },
     * //     "proxyMerchantId": "string (UUID)",
     * //     "proxyMerchantToken": "string (UUID)", // <-- Este es el token clave
     * //     "proxyUserId": "string (UUID)",
     * //     "publicDescription": "string",
     * //     "publicName": "string",
     * //     "updatedAt": "string (ISO 8601)"
     * //   },
     * //   "success": boolean
     * // }
     */
    async getConfig(shopName) {
        if (!shopName) {
            throw new Error("Clipify.getConfig: 'shopName' is required.");
        }
        return this._request(`/config/${shopName}`);
    }

    /**
     * Fetches categories for a specific shop.
     * @param {string} shopName - The name of the shop.
     * @returns {Promise<CategoriesResponse>} A list of categories.
     * @throws {Error} If the API request fails.
     *
     * @example
     * // Example response structure:
     * // {
     * //   "items": [
     * //     {
     * //       "categoryId": "string (UUID)",
     * //       "categoryName": "string",
     * //       "description": "string | null",
     * //       "image": "string (URL) | null",
     * //       "products": [
     * //         { "productId": "string (UUID)", "productName": "string" }
     * //       ]
     * //     }
     * //   ],
     * //   "success": boolean
     * // }
     */
    async getCategories(shopName) {
        if (!shopName) {
            throw new Error("Clipify.getCategories: 'shopName' is required.");
        }
        return this._request(`/categories/${shopName}`);
    }

    /**
     * Fetches products for a given category and merchant token.
     * @param {string} categoryId - The ID of the category.
     * @param {string} proxyMerchantToken - The proxy merchant token (obtained from `getConfig`).
     * @param {number} [limit] - Optional limit for the number of products.
     * @returns {Promise<ProductsResponse>} A list of products.
     * @throws {Error} If the API request fails.
     *
     * @example
     * // Example response structure:
     * // {
     * //   "items": [
     * //     {
     * //       "basePrice": "string | null",
     * //       "ct": "string",
     * //       "description": "string",
     * //       "enabled": "boolean",
     * //       "image": "string (URL)",
     * //       "images": ["string (URL)", "string (URL)"],
     * //       "modifiers": [
     * //         { "modifierId": "string (UUID)", "modifierName": "string" },
     * //         { "modifierId": "string (UUID)", "modifierName": "string" }
     * //       ],
     * //       "numberOfModifiers": "number",
     * //       "numberOfVariants": "number",
     * //       "price": "string",
     * //       "productId": "string (UUID)",
     * //       "productName": "string",
     * //       "sku": "string | null",
     * //       "stock": "number",
     * //       "stockStatus": "string",
     * //       "version": "string | null"
     * //     }
     * //   ],
     * //   "success": boolean
     * // }
     */
    async getProducts(categoryId, proxyMerchantToken, limit) {
        if (!categoryId || !proxyMerchantToken) {
            throw new Error("Clipify.getProducts: 'categoryId' and 'proxyMerchantToken' are required.");
        }
        let endpoint = `/products/${categoryId}/${proxyMerchantToken}`;
        if (limit !== undefined) {
            endpoint += `?limit=${limit}`;
        }
        return this._request(endpoint);
    }

    /**
     * Fetches a single product by its ID and merchant token.
     * @param {string} productId - The ID of the product.
     * @param {string} proxyMerchantToken - The proxy merchant token (obtained from `getConfig`).
     * @returns {Promise<{success: boolean, item?: object, error?: string}>} The product details.
     * @throws {Error} If the API request fails.
     */
    async getProduct(productId, proxyMerchantToken) {
        if (!productId || !proxyMerchantToken) {
            throw new Error("Clipify.getProduct: 'productId' and 'proxyMerchantToken' are required.");
        }
        return this._request(`/product/${productId}/${proxyMerchantToken}`);
    }

    /**
     * Fetches active coupons for a given merchant token.
     * @param {string} proxyMerchantToken - The proxy merchant token (obtained from `getConfig`).
     * @returns {Promise<CouponsResponse>} A list of coupons.
     * @throws {Error} If the API request fails.
     *
     * @example
     * // Example response structure:
     * // {
     * //   "items": [], // Array of CouponItem objects. Can be empty if no active coupons.
     * //   "success": boolean
     * // }
     * //
     * // Possible CouponItem structure (if items array is not empty):
     * // {
     * //   "couponId": "string (UUID)",
     * //   "couponName": "string",
     * //   "discountType": "string (e.g., 'PERCENTAGE', 'FIXED_AMOUNT')",
     * //   "value": "number", // e.g., 10 for 10% or 10.00 for $10
     * //   "minPurchaseAmount": "string (decimal number)",
     * //   "validFrom": "string (ISO 8601)",
     * //   "validUntil": "string (ISO 8601)"
     * // }
     */
    async getCoupons(proxyMerchantToken) {
        if (!proxyMerchantToken) {
            throw new Error("Clipify.getCoupons: 'proxyMerchantToken' is required.");
        }
        return this._request(`/coupons/${proxyMerchantToken}`);
    }
}

export default Clipify;