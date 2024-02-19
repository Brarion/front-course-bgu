// является ли число степенью двойки
var number = 16;
function PowerOfTwo(number: number): boolean {
    return (number > 0) && ((number & (number -1)) === 0) // тройное равно для избегания путаницы с типами
}
const result: boolean = PowerOfTwo(number);