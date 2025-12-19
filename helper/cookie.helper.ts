/**
 * Cookie Helper Utility
 * 
 * Provides utility methods for managing browser cookies.
 * Handles cookie operations including get, set, remove, and existence checks.
 * Includes server-side rendering (SSR) safety checks.
 * 
 * @class CookieHelper
 * @example
 * CookieHelper.set('username', 'john', 7);
 * const username = CookieHelper.get('username');
 * CookieHelper.remove('username');
 */

/**
 * Cookie Helper Class
 * 
 * Static utility class for cookie management operations
 */
export class CookieHelper {
  /**
   * Get a cookie value by name
   * 
   * Retrieves the value of a cookie by its name.
   * Returns null if the cookie doesn't exist or if running on server-side.
   * 
   * @static
   * @param {string} name - Cookie name to retrieve
   * @returns {string | null} Cookie value or null if not found
   * @example
   * const token = CookieHelper.get('authToken');
   */
  static get(name: string): string | null {
    // Server-side rendering safety check
    if (typeof document === 'undefined') {
      return null;
    }

    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    
    // Iterate through all cookies to find the matching one
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      // Trim whitespace from cookie string
      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length);
      }
      // Check if this cookie matches the requested name
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
    
    return null;
  }

  /**
   * Set a cookie
   * 
   * Creates or updates a cookie with the specified name, value, and expiration.
   * Default expiration is 7 days if not specified.
   * 
   * @static
   * @param {string} name - Cookie name
   * @param {string} value - Cookie value
   * @param {number} [days=7] - Number of days until expiration (default: 7)
   * @returns {void}
   * @example
   * CookieHelper.set('theme', 'dark', 30);
   */
  static set(name: string, value: string, days: number = 7): void {
    // Server-side rendering safety check
    if (typeof document === 'undefined') {
      return;
    }

    // Calculate expiration date
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    
    // Set the cookie with expiration and path
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  }

  /**
   * Remove a cookie
   * 
   * Deletes a cookie by setting its expiration date to the past.
   * 
   * @static
   * @param {string} name - Cookie name to remove
   * @returns {void}
   * @example
   * CookieHelper.remove('authToken');
   */
  static remove(name: string): void {
    // Server-side rendering safety check
    if (typeof document === 'undefined') {
      return;
    }

    // Set expiration to past date to delete the cookie
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  }

  /**
   * Check if a cookie exists
   * 
   * Determines whether a cookie with the given name exists.
   * 
   * @static
   * @param {string} name - Cookie name to check
   * @returns {boolean} True if cookie exists, false otherwise
   * @example
   * if (CookieHelper.exists('authToken')) {
   *   // Cookie exists
   * }
   */
  static exists(name: string): boolean {
    return this.get(name) !== null;
  }
}
