/**
 * @file routes.ts
 * @description Configuration file for application routes including public, private, and API routes
 */

/**
 * Routes that are accessible without authentication
 * @type {string[]}
 */
export const publicRoutes = [
  "/",
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
];

/**
 * Routes that are used for authentication
 * These routes will redirect logged in users to /dashboard
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";

/**
 * Routes that require authentication
 * Users will be redirected to login if they are not authenticated
 * @type {string[]}
 */
export const privateRoutes = [
  "/dashboard",
  "/dashboard/settings",
  "/dashboard/profile",
  "/dashboard/todo",
];

/**
 * API routes that require authentication
 * These routes will return 401 if the user is not authenticated
 * @type {string[]}
 */
export const apiRoutes = ["/api/todo", "/api/user", "/api/settings"];

/**
 * Configuration object containing all route settings
 * @type {Object}
 */
export const routeConfig = {
  publicRoutes,
  authRoutes,
  apiAuthPrefix,
  DEFAULT_LOGIN_REDIRECT,
  privateRoutes,
  apiRoutes,
} as const;
