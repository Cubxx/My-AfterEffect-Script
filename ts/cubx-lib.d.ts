interface Array<T> {
    map<U>(fn: (e: T, i: number, arr: this) => U, order?: boolean): U[];
    filter<U extends T>(fn: (value: T | undefined, index: number, array: this) => value is U): U[];
}
interface Object {
    is<T>(constructor: new (...args: any[]) => T): T;
    each<T extends Record<string, any>>(this: T, fn: (value: T[keyof T], key: keyof T, obj: T) => void): void;
    assign<T>(this: T, config: Partial<T>): T;
}
interface PropertyGroup {
    map<T>(fn: (e: _PropertyClasses, i: number, arr: this) => T, order?: boolean): T[];
}
interface MaskPropertyGroup {
    map<T>(fn: (e: _PropertyClasses, i: number, arr: this) => T, order?: boolean): T[];
}
declare const JSON: {
    /**
     * Converts a JavaScript Object Notation (JSON) string into an object.
     * @param text A valid JSON string.
     * @param reviver A function that transforms the results. This function is called for each member of the object.
     * If a member contains nested objects, the nested objects are transformed before the parent object is.
     */
    parse(text: string, reviver?: (this: any, key: string, value: any) => any): any;
    /**
     * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
     * @param value A JavaScript value, usually an object or array, to be converted.
     * @param replacer A function that transforms the results.
     * @param space Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
     */
    stringify(value: any, replacer?: (this: any, key: string, value: any) => any, space?: string | number): string;
    /**
     * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
     * @param value A JavaScript value, usually an object or array, to be converted.
     * @param replacer An array of strings and numbers that acts as an approved list for selecting the object properties that will be stringified.
     * @param space Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
     */
    stringify(value: any, replacer?: (number | string)[] | null, space?: string | number): string;
}