/**
 * Safely parse JSON from localStorage
 * Returns null if parsing fails or data is invalid
 */
export function safeJSONParse<T>(data: string | null, fallback: T | null = null): T | null {
    if (!data) return fallback;

    try {
        return JSON.parse(data) as T;
    } catch (error) {
        console.error('Failed to parse JSON:', error);
        return fallback;
    }
}

/**
 * Safely get and parse data from localStorage
 */
export function safeLocalStorageGet<T>(key: string, fallback: T | null = null): T | null {
    if (typeof window === 'undefined') return fallback;

    const data = localStorage.getItem(key);
    return safeJSONParse<T>(data, fallback);
}
