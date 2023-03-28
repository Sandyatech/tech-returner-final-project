export function createConsecutiveArray(num: number) {
    return Array.from({ length: num }, (_, i) => i);
}

export function timeout(delay: number) {
    return new Promise(res => setTimeout(res, delay));
}