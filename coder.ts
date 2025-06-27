export default class Coder {
    serialize(numbers: number[]): string {
        const len = numbers.length
        const max = Math.max(...numbers)

        // вычисляем сколько бит нужно, чтобы выразить в двоичном виде
        const bitWidth = Math.ceil(Math.log2(max + 1))

        // побитовое кодирование
        const bits: number[] = []
        for (const num of numbers) {
            for (let i = bitWidth - 1; i >= 0; i--) {
                bits.push((num >> i) & 1)
            }
        }

        const byteCount = Math.ceil(bits.length / 8)
        const bytes = new Uint8Array(5 + byteCount) // 4 байта на длину, 1 байт на bitWidth

        // Записываем длину массива
        bytes[0] = (len >> 24) & 0xFF
        bytes[1] = (len >> 16) & 0xFF
        bytes[2] = (len >> 8) & 0xFF
        bytes[3] = len & 0xFF
        bytes[4] = bitWidth

        // Упаковываем в байты
        for (let i = 0; i < bits.length; i++) {
            const byteIndex = Math.floor(i / 8)
            bytes[5 + byteIndex] = (bytes[5 + byteIndex] << 1) | bits[i]
        }

        // дополняяем последний байт нулями
        const pad = 8 - (bits.length % 8)
        if (pad < 8) bytes[bytes.length - 1] <<= pad

        return Buffer.from(bytes).toString('base64')
    }

    deserialize(data: string): number[] {
        const buffer = Buffer.from(data, 'base64')
        const len =
            (buffer[0] << 24) |
            (buffer[1] << 16) |
            (buffer[2] << 8) |
            buffer[3]
        const bitWidth: number = buffer[4]

        // Извлекаем биты из байтов
        const bytes:number[] = Array.from(buffer.slice(5))
        const bits: number[] = []
        for (let byte of bytes) {
            for (let i = 7; i >= 0; i--) {
                bits.push((byte >> i) & 1)
            }
        }

        // восстанавливаем числа
        const result: number[] = []
        for (let i = 0; i < len; i++) {
            let num: number = 0
            for (let j = 0; j < bitWidth; j++) {
                num = (num << 1) | bits[i * bitWidth + j]
            }
            result.push(num)
        }

        return result
    }
}
