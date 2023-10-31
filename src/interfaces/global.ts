declare global {
    interface Fn<T = any, R = T> {
        (...arg: T[]): R;
    }

    type NonNull<T> = T extends null | undefined ? never : T;
    type Arrayable<T> = T | T[];
    type Nullable<T> = T | null;
    type Nilable<T> = T | null | undefined;
    type Recordable<T = any> = Record<string, T>;
}

export {}