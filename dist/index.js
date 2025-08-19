/**
 * @fileoverview clip-ify API client library.
 * @version 0.1.8
 * @author Brian Marquez Hernandez
 * @license MIT
 */

/**
 * @typedef {object} ClipifyConfig
 * @property {string} [baseUrl="https://clip-ify.pockethost.io"] - (Optional) The base URL of your API. Defaults to "https://clip-ify.pockethost.io".
 */

/**
 * @typedef {object} ShopAddress
 * @property {string|null} addressType - The type of address (e.g., "Home", "Work"). Can be null.
 * @property {string} colony - The name of the colony or neighborhood.
 * @property {string} firstAddress - The primary address line (e.g., street name and number).
 * @property {string} municipality - The municipality or borough.
 * @property {string} postalCode - The postal code.
 * @property {string} secondAddress - An optional second address line.
 * @property {string} state - The state or province.
 */

/**
 * @typedef {object} ShopProfileConfig
 * @property {boolean} profileActive - Indicates if the public profile is active.
 * @property {boolean} showAddress - Indicates if the shop's address should be publicly displayed.
 * @property {boolean} showEmail - Indicates if the shop's email should be publicly displayed.
 * @property {boolean} showPhone - Indicates if the shop's phone number should be publicly displayed.
 */

/**
 * @typedef {object} SocialLinks
 * @property {string} [facebook] - URL to the shop's Facebook page.
 * @property {string} [tiktok] - URL to the shop's TikTok profile.
 * // Add more social links as needed (e.g., instagram, twitter)
 */

/**
 * @typedef {object} ContactInformation
 * @property {string} email - The contact email of the business.
 * @property {string} fullname - The full name of the contact person.
 * @property {string} phone - The contact phone number.
 * @property {SocialLinks} socialLinks - Object containing social media links.
 * @property {string} whatsapp - WhatsApp contact number.
 */

/**
 * @typedef {object} DeliveryPricingZone
 * @property {string} city - City for this delivery zone.
 * @property {string} colony - Colony/neighborhood for this delivery zone.
 * @property {string} municipality - Municipality for this delivery zone.
 * @property {string|null} shortCity - Abbreviated city name.
 * @property {string|null} shortColony - Abbreviated colony name.
 * @property {string|null} shortMunicipality - Abbreviated municipality name.
 * @property {string} shortState - Abbreviated state name.
 * @property {string} state - Full state name.
 * @property {string} zipCode - Postal code for this delivery zone.
 * @property {string} zipcode - Duplicate property for postal code (consider unifying if possible).
 */

/**
 * @typedef {object} DeliveryPricing
 * @property {number} price - The delivery price for this zone.
 * @property {Array<DeliveryPricingZone>} zipCodes - An array of postal codes/zones covered by this pricing.
 */

/**
 * @typedef {object} DeliverySettings
 * @property {boolean} fullDelivery - Indicates if full delivery is available.
 * @property {boolean} nearByDelivery - Indicates if nearby delivery is available.
 * @property {boolean} pickUp - Indicates if pick-up is available.
 */

/**
 * @typedef {object} TimeInterval
 * @property {string} closing - Closing time (e.g., "11:00").
 * @property {string} opening - Opening time (e.g., "07:00").
 */

/**
 * @typedef {object} OpeningHours
 * @property {number} dayFrom - Start day of the week (0 for Sunday, 6 for Saturday).
 * @property {number} dayTo - End day of the week (0 for Sunday, 6 for Saturday).
 * @property {Array<TimeInterval>} intervals - Array of opening/closing time intervals for the specified days.
 */

/**
 * @typedef {object} DurationSetting
 * @property {string} unit - Unit of time (e.g., "hrs", "min").
 * @property {number} value - The numerical value for the duration.
 */

/**
 * @typedef {object} GoogleReviews
 * @property {boolean} active - Indicates if Google Reviews integration is active.
 * @property {string} placeId - Google Place ID for reviews.
 */

/**
 * @typedef {object} AbandonedCartSettings
 * @property {boolean} active - Indicates if abandoned cart reminders are active.
 * @property {number} timeToReminder - Time in units (likely hours/days) before a reminder is sent.
 */

/**
 * @typedef {object} StoreSettings
 * @property {AbandonedCartSettings} abandonedCart - Settings related to abandoned cart reminders.
 * @property {string} colorPaletteId - Identifier for the store's color palette/theme.
 * @property {Array<DeliveryPricing>} deliveryPricing - Array of delivery pricing zones and their costs.
 * @property {DeliverySettings} deliverySettings - General delivery options.
 * @property {boolean} displayAddress - Indicates if the store's address should be displayed.
 * @property {boolean} enableEmptyStockVisibility - Indicates if out-of-stock products should be visible.
 * @property {GoogleReviews} googleReviews - Settings for Google Reviews integration.
 * @property {string} heroImage - URL to the store's hero banner image.
 * @property {DurationSetting} maxNearDeliveryTime - Maximum time for nearby delivery.
 * @property {DurationSetting} minPreparationTime - Minimum product preparation time.
 * @property {Array<OpeningHours>} openingHours - Array defining the store's operating hours.
 * @property {string} themeId - Identifier for the store's visual theme.
 */

/**
 * @typedef {object} StoreConfiguration
 * @property {boolean} businessProfile - Indicates if the business profile is enabled.
 * @property {ContactInformation} contactInformation - Detailed contact information for the store.
 * @property {string} createdAt - ISO 8601 timestamp of store configuration creation.
 * @property {boolean} directPayments - Indicates if direct payments are enabled.
 * @property {boolean} isPublished - Indicates if the store is publicly published.
 * @property {boolean} sharableCatalog - Indicates if the product catalog is shareable.
 * @property {StoreSettings} storeSettings - Detailed settings for the store's operation.
 * @property {string} updatedAt - ISO 8601 timestamp of last update to store configuration.
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
 * @property {StoreConfiguration} [storeConfiguration] - Optional, detailed store configuration, present in newer responses.
 * @property {string} updatedAt - ISO 8601 timestamp of last update.
 */

/**
 * @typedef {object} ShopConfigResponse
 * @property {boolean} success - Indicates if the request was successful.
 * @property {ShopConfig} [config] - The configuration object if `success` is true.
 * @property {string} [error] - Error message if `success` is false.
 */

/**
 * @typedef {object} ProductModifierOption
 * @property {boolean} active - Indicates if the modifier option is active.
 * @property {string} ct - Content hash or change tracker.
 * @property {string|null} [extraPrice] - Additional price if this option is selected. Can be null.
 * @property {string} modifierGroupId - The ID of the modifier group this option belongs to.
 * @property {string} modifierOptionId - Unique ID of the modifier option.
 * @property {string} modifierOptionName - Name of the modifier option (e.g., "Extra Cheese").
 * @property {number} order - Display order of the option.
 * @property {string} price - Base price for this modifier option.
 */

/**
 * @typedef {object} ProductModifier
 * @property {string} modifierId - Unique ID of the modifier.
 * @property {string} modifierName - Name of the modifier.
 * @property {Array<ProductModifierOption>} [options] - Array of modifier options. Populated when fetching a single product (`getProduct`).
 * @property {boolean} [required] - Indicates if at least one option from this modifier group must be selected. Present in `getProduct` response.
 * @property {number} [selectionLimit] - Maximum number of options that can be selected from this modifier group. Present in `getProduct` response.
 */

/**
 * @typedef {object} ProductAttributeValue
 * @property {string} name - Name of the attribute (e.g., "Tamaño").
 * @property {string} value - Value of the attribute (e.g., "Mediano").
 */

/**
 * @typedef {object} ProductVariant
 * @property {string|null} [basePrice] - Base price of the variant. Can be null.
 * @property {string} description - Description of the variant (often matches `variantName`).
 * @property {Array<string>|null} [images] - Specific images for this variant. Can be null.
 * @property {boolean} isAvailable - Indicates if this variant is currently available.
 * @property {boolean} isDefault - Indicates if this is the default variant.
 * @property {Array<ProductAttributeValue>} options - Key-value pairs describing variant attributes.
 * @property {number} price - Price of the variant.
 * @property {string|null} [size] - Size of the variant (e.g., "Small", "Large"). Can be null.
 * @property {string|null} sku - Stock Keeping Unit for the variant. Can be null.
 * @property {number} stock - Current stock level for the variant.
 * @property {string|null} [stockAlert] - Optional alert message regarding stock. Can be null.
 * @property {string} stockStatus - Status of the variant's stock (e.g., "AVAILABLE", "SOLD_OUT").
 * @property {string|null} [type] - Type of the variant. Can be null.
 * @property {string} variantId - Unique ID of the product variant.
 * @property {string} variantName - Name of the product variant (e.g., "Mediano").
 * @property {number} version - Version of the variant data.
 */

/**
 * @typedef {object} ProductItem
 * @property {Array<object>} [attributes] - Product attributes (e.g., "Size"). Populated by `getProduct`.
 * @property {string|null} basePrice - The original price of the product before discounts or variants. Can be null.
 * @property {Array<CategoryProductRef>} [categories] - List of categories the product belongs to. Populated by `getProduct`.
 * @property {string} ct - Content hash or change tracker for the product.
 * @property {string} description - Detailed description of the product.
 * @property {boolean} enabled - Indicates if the product is active/enabled.
 * @property {string} image - Primary image URL for the product.
 * @property {Array<string>} images - Array of all image URLs for the product.
 * @property {Array<ProductModifier>} modifiers - List of modifiers for the product. Contains only `modifierId` and `modifierName` in `getProducts`, but `options`, `required`, `selectionLimit` in `getProduct`.
 * @property {number} numberOfModifiers - Count of modifiers associated with the product.
 * @property {number} numberOfVariants - Count of variants for the product.
 * @property {string} price - The current price of the product (might be base price or lowest variant price).
 * @property {string} productId - Unique ID of the product.
 * @property {string} productName - Name of the product.
 * @property {string|null} sku - Stock Keeping Unit for the product. Can be null.
 * @property {number} stock - Total stock level for the product (or for the default variant).
 * @property {string|null} [stockAlert] - Optional alert message regarding product stock. Present in `getProduct`. Can be null.
 * @property {string} stockStatus - Status of the product's stock (e.g., "AVAILABLE", "SOLD_OUT").
 * @property {Array<ProductVariant>} [variants] - Array of product variants. Populated by `getProduct`.
 * @property {string|null} version - Version of the product data. Can be null.
 */

/**
 * @typedef {object} ProductsResponse
 * @property {boolean} success - Indicates if the request was successful.
 * @property {Array<ProductItem>} [items] - An array of product items if `success` is true. Can be empty.
 * @property {string} [error] - Error message if `success` is false.
 */

/**
 * @typedef {object} CategoryProductRef
 * @property {string} productId - Unique ID of the product.
 * @property {string} productName - Name of the product.
 */

/**
 * @typedef {object} CategoryItem
 * @property {string} categoryId - Unique ID of the category.
 * @property {string} categoryName - Name of the category.
 * @property {string|null} description - Description of the category. Can be null.
 * @property {string|null} image - URL to the category's image. Can be null.
 * @property {Array<CategoryProductRef>} [products] - List of products associated with the category. May not be present in all category listings.
 * @property {string} slug - URL-friendly slug for the category.
 */

/**
 * @typedef {object} CategoriesResponse
 * @property {boolean} success - Indicates if the request was successful.
 * @property {Array<CategoryItem>} [items] - An array of category items if `success` is true. Can be empty.
 * @property {string} [error] - Error message if `success` is false.
 */

/**
 * @typedef {object} CouponItem
 * @property {string} couponId - Unique ID of the coupon.
 * @property {string} couponName - Name of the coupon.
 * @property {string} [discountType] - Type of discount (e.g., "PERCENTAGE", "FIXED_AMOUNT"). Optional.
 * @property {number} [value] - Discount value (e.g., 10 for 10% or 10.00 for $10). Optional.
 * @property {string} [minPurchaseAmount] - Minimum purchase amount required to apply the coupon, as a decimal string. Optional.
 * @property {string} [validFrom] - ISO 8601 timestamp when the coupon becomes valid. Optional.
 * @property {string} [validUntil] - ISO 8601 timestamp when the coupon expires. Optional.
 */

/**
 * @typedef {object} CouponsResponse
 * @property {boolean} success - Indicates if the request was successful.
 * @property {Array<CouponItem>} [items] - An array of coupon items if `success` is true. Can be empty.
 * @property {string} [error] - Error message if `success` is false.
 */

/**
 * clip-ify is a client library for interacting with the Clip API.
 * It provides methods to fetch configuration, categories, products, and coupons for a given shop.
 */
class Clipify {
    /**
     * @private
     * @type {string}
     */
    baseUrl;

    /**
     * Creates an instance of Clipify.
     * @param {ClipifyConfig} [config] - Configuration options for the client.
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
                    // Attempt to parse JSON error, if available
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
            // Re-throw to allow caller to handle the error further
            throw error;
        }
    }

    /**
     * Fetches the configuration for a specific shop.
     * @param {string} shopName - The name of the shop. This is typically a slug or unique identifier.
     * @returns {Promise<ShopConfigResponse>} A promise that resolves to the shop configuration, including `proxyMerchantToken`.
     * @throws {Error} If `shopName` is not provided or if the API request fails.
     *
     * @example
     * // Example usage:
     * const clipify = new Clipify();
     * try {
     *   const response = await clipify.getConfig("Abarrotes123");
     *   if (response.success) {
     *     console.log("Shop Config:", response.config);
     *     const merchantToken = response.config.proxyMerchantToken;
     *   } else {
     *     console.error("Error fetching config:", response.error);
     *   }
     * } catch (e) {
     *   console.error("Network or unexpected error:", e);
     * }
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
     * @returns {Promise<CategoriesResponse>} A promise that resolves to a list of categories.
     * @throws {Error} If `shopName` is not provided or if the API request fails.
     *
     * @example
     * // Example usage:
     * const clipify = new Clipify();
     * try {
     *   const response = await clipify.getCategories("Abarrotes123");
     *   if (response.success) {
     *     console.log("Categories:", response.items);
     *   } else {
     *     console.error("Error fetching categories:", response.error);
     *   }
     * } catch (e) {
     *   console.error("Network or unexpected error:", e);
     * }
     */
    async getCategories(shopName) {
        if (!shopName) {
            throw new Error("Clipify.getCategories: 'shopName' is required.");
        }
        return this._request(`/categories/${shopName}`);
    }

    /**
     * Fetches products for a given category and merchant token.
     * Note: The `modifiers` property in the returned `ProductItem` objects will only contain
     * `modifierId` and `modifierName` at this endpoint. For full modifier details (e.g., `options`),
     * use `getProduct`.
     * @param {string} categoryId - The ID of the category.
     * @param {string} proxyMerchantToken - The proxy merchant token (obtained from `getConfig`).
     * @param {number} [limit] - Optional limit for the number of products to return.
     * @returns {Promise<ProductsResponse>} A promise that resolves to a list of products.
     * @throws {Error} If `categoryId` or `proxyMerchantToken` are not provided or if the API request fails.
     *
     * @example
     * // Example usage:
     * const clipify = new Clipify();
     * // Assume categoryId and proxyMerchantToken are obtained from previous calls
     * try {
     *   const response = await clipify.getProducts("your-category-id", "your-merchant-token", 10);
     *   if (response.success) {
     *     console.log("Products in category:", response.items);
     *   } else {
     *     console.error("Error fetching products:", response.error);
     *   }
     * } catch (e) {
     *   console.error("Network or unexpected error:", e);
     * }
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
     * This endpoint provides comprehensive product details, including full modifier options
     * and variant information.
     * @param {string} productId - The ID of the product.
     * @param {string} proxyMerchantToken - The proxy merchant token (obtained from `getConfig`).
     * @returns {Promise<{success: boolean, item?: ProductItem, error?: string}>} A promise that resolves to the product details.
     * @throws {Error} If `productId` or `proxyMerchantToken` are not provided or if the API request fails.
     *
     * @example
     * // Example usage:
     * const clipify = new Clipify();
     * // Assume productId and proxyMerchantToken are obtained from previous calls
     * try {
     *   const response = await clipify.getProduct("your-product-id", "your-merchant-token");
     *   if (response.success) {
     *     console.log("Product details:", response.item);
     *   } else {
     *     console.error("Error fetching product:", response.error);
     *   }
     * } catch (e) {
     *   console.error("Network or unexpected error:", e);
     * }
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
     * @returns {Promise<CouponsResponse>} A promise that resolves to a list of coupons. The `items` array might be empty if no active coupons exist.
     * @throws {Error} If `proxyMerchantToken` is not provided or if the API request fails.
     *
     * @example
     * // Example usage:
     * const clipify = new Clipify();
     * // Assume proxyMerchantToken is obtained from getConfig
     * try {
     *   const response = await clipify.getCoupons("your-merchant-token");
     *   if (response.success) {
     *     console.log("Active coupons:", response.items);
     *   } else {
     *     console.error("Error fetching coupons:", response.error);
     *   }
     * } catch (e) {
     *   console.error("Network or unexpected error:", e);
     * }
     */
    async getCoupons(proxyMerchantToken) {
        if (!proxyMerchantToken) {
            throw new Error("Clipify.getCoupons: 'proxyMerchantToken' is required.");
        }
        return this._request(`/coupons/${proxyMerchantToken}`);
    }
}

export default Clipify;