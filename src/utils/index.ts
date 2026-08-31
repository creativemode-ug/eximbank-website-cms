export enum STORAGE_KEYS {
    TOKEN = "TOKEN",
    USER = "CLIENT",
    STAFF = "STAFF",
    ROLE = "ROLE"
};


export const setFromStorage = <T>(key: string, value: T): void => {
    try {
        const serializedValue = JSON.stringify(value);
        localStorage.setItem(key, serializedValue);
    } catch (error) {
        console.error(`Error storing item in local storage: ${error}`);
    }
};


export const getFromStorage = <T>(key: string): T | null => {
    try {
        const serializedValue = localStorage.getItem(key);
        if (serializedValue !== null) {
        return JSON.parse(serializedValue) as T;
        }
    } catch (error) {
        console.error(`Error retrieving item from local storage: ${error}`);
    }
    return null;
};

export const deleteFromStorage = (key: string): void => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error(`Error deleting item from local storage: ${error}`);
    }
};