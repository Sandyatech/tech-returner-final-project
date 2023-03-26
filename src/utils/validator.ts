export function dateValidator(input: -1 | 1, dateSubtract: number) {
    const max_dateSubtract = 7; // 7 days before
    const min_dateSubtract = 0; // today
    const adjusted_dateSubtract = dateSubtract + input;
    if (adjusted_dateSubtract >= min_dateSubtract && adjusted_dateSubtract <= max_dateSubtract) {
        return true;
    }
}
