import Coder from "./coder"

const coeffsArr: number[] = []

const codeTask = (arr: number[], description: string): void =>
{
    const coder = new Coder()
    console.log(`${description}`)
    console.log('Исходная строка: ', arr.toString(), '\n')
    const codedArr: string = coder.serialize(arr)
    console.log('Сжатая строка: ', codedArr)
    const decodedArr: number [] = coder.deserialize(codedArr)
    const originalSize = JSON.stringify(arr).length
    const encodedSize = codedArr.length
    const coeff = ((1 - encodedSize / originalSize) * 100).toFixed()
    const ok = JSON.stringify(arr) === JSON.stringify(decodedArr)
    console.log(`Коэффициент сжатия: ${coeff}% \n---------------------------------------------------------------------`)
    console.log(`${ok ? '' : 'некорректное восстановление !!!!!'}`)
    coeffsArr.push(Number(coeff))
}

const randomArr = (n: number): number[] =>
    Array.from({ length: n }, () => Math.floor(Math.random() * 300) + 1)

codeTask(randomArr(50),  'Тест: случайные 50 чисел')
codeTask(randomArr(100), 'Тест: случайные 100 чисел')
codeTask(randomArr(500), 'Тест: случайные 500 чисел')
codeTask(randomArr(1000),'Тест: случайные 1000 чисел')

codeTask(Array.from({ length: 10 }, (_, i) => i), 'Тест: однозначные 0–9')
codeTask(Array.from({ length: 90 }, (_, i) => i + 10), 'Тест: двузначные 10–99')
codeTask(Array.from({ length: 900 }, (_, i) => i + 100), 'Тест: трёхзначные 100–999')

let arr: number[] = []
for (let i = 0; i < 300; i++) {
    arr.push(i, i, i)
}
codeTask(arr, 'Тест: каждый из 0–299 по 3 раза (900 чисел)')

const avarageCoeff: string = (coeffsArr.reduce((a, b) => a + b, 0) / coeffsArr.length).toFixed()
console.log(`Средний коэффициент сжатия ${coeffsArr.length} тестов: ${avarageCoeff}%`)