/**
 * User Service
 * 
 * Provides user-related functionality including authentication and session management.
 * Handles user logout, token retrieval, and authentication status checks.
 * 
 * @class UserService
 * @example
 * UserService.logout();
 * const token = UserService.getToken();
 * const isAuth = UserService.isAuthenticated();
 */

import { CookieHelper } from '@/helper/cookie.helper';

export class UserService {
  /**
   * Logout the current user
   * 
   * Clears all authentication tokens and user-related cookies.
   * This method should be called when a user explicitly logs out.
   * 
   * @static
   * @returns {void}
   * @example
   * UserService.logout();
   */
  static logout(): void {
    // Clear authentication token from cookies
    CookieHelper.remove('authToken');
    CookieHelper.remove('token');
    
    // Clear any other user-related cookies
    CookieHelper.remove('user');
    CookieHelper.remove('userId');
  }

  /**
   * Get the current authentication token
   * 
   * Retrieves the authentication token from cookies.
   * Checks both 'authToken' and 'token' cookie names for compatibility.
   * 
   * @static
   * @returns {string | null} The authentication token or null if not found
   * @example
   * const token = UserService.getToken();
   * if (token) {
   *   // Use token for API requests
   * }
   */
  static getToken(): string | null {
    return CookieHelper.get('authToken') || CookieHelper.get('token');
  }

  /**
   * Set authentication token
   * 
   * Stores the authentication token in cookies.
   * 
   * @static
   * @param {string} token - The authentication token to store
   * @param {number} [days=7] - Number of days until expiration (default: 7)
   * @returns {void}
   * @example
   * UserService.setAuthToken('abc123token');
   */
  static setAuthToken(token: string, days: number = 7): void {
    CookieHelper.set('authToken', token, days);
  }

  /**
   * Check if user is authenticated
   * 
   * Determines if a user is currently authenticated by checking
   * if an authentication token exists.
   * 
   * @static
   * @returns {boolean} True if user is authenticated, false otherwise
   * @example
   * if (UserService.isAuthenticated()) {
   *   // User is logged in
   * }
   */
  static isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
