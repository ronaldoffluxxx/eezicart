// LocalStorage helper functions

export const saveData = <T>(key: string, value: T): void => {
    try {
        if (typeof window !== 'undefined') {
            localStorage.setItem(key, JSON.stringify(value));
        }
    } catch (error) {
        console.error('Save error:', error);
    }
};

export const getData = <T>(key: string): T | null => {
    try {
        if (typeof window !== 'undefined') {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : null;
        }
        return null;
    } catch (error) {
        console.error('Get error:', error);
        return null;
    }
};

export const removeData = (key: string): void => {
    try {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(key);
        }
    } catch (error) {
        console.error('Remove error:', error);
    }
};

export const clearAllData = (): void => {
    try {
        if (typeof window !== 'undefined') {
            localStorage.clear();
        }
    } catch (error) {
        console.error('Clear error:', error);
    }
};

// Add item to array in storage
export const addToArray = <T>(key: string, item: T): void => {
    const array = getData<T[]>(key) || [];
    array.push(item);
    saveData(key, array);
};

// Update item in array by id
export const updateInArray = <T extends { id: string }>(
    key: string,
    id: string,
    updates: Partial<T>
): void => {
    const array = getData<T[]>(key) || [];
    const index = array.findIndex((item) => item.id === id);
    if (index !== -1) {
        array[index] = { ...array[index], ...updates };
        saveData(key, array);
    }
};

// Remove item from array by id
export const removeFromArray = <T extends { id: string }>(
    key: string,
    id: string
): void => {
    const array = getData<T[]>(key) || [];
    const filtered = array.filter((item) => item.id !== id);
    saveData(key, filtered);
};

// Find item in array by id
export const findInArray = <T extends { id: string }>(
    key: string,
    id: string
): T | null => {
    const array = getData<T[]>(key) || [];
    return array.find((item) => item.id === id) || null;
};
