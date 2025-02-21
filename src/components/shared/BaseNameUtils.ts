/**
 * Get the base URL of the application
 *
 * This function returns the base URL of the application
 * by combining the import.meta.env.BASE_URL and the path
 *
 * @param path
 * @returns
 *
 * @example
 *
 * ```ts
 * const path = "/assets/page.png";
 * const baseUrl = getBaseUrl(path);
 * console.log(baseUrl); // http://localhost:3000/assets/page.png
 *
 * @param path
 * @returns
 */

export const getBaseUrl = (path: string): string => {
  return `${import.meta.env.BASE_URL}${path}`;
};
