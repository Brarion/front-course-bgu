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

myType.title = "Hello"; // примеры ошибки
myType.description = "barFoo"; // попытка изменить рид-онли значение
