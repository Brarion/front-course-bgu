type MyReadOnly<T> = {
    readonly [K in keyof T]: T[K];
};

interface myType {
    title: string;
    description: string;
}

const myType: MyReadOnly<myType> = {
    title: "Hey",
    description: "foobar",
};

// Errors
myType.title = "Hello"; // попытка изменить рид-онли значение
myType.description = "barFoo";
