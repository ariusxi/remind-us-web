'use strict'

class Storage {

    set(key: string, value: any): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    get(key: string): any {
        const currentItemStorage = localStorage.getItem(key);

        return JSON.parse(currentItemStorage);
    }

    remove(key: string): void {
        localStorage.removeItem(key);
    }

    clear(): void {
        localStorage.clear();
    }

}

export default new Storage();
