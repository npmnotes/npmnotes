export function debounce<F extends (...args: any[]) => void>(
    f: F
    , timeout: number): F {
    let to: any
    return ((...args: any[]) => {
        clearTimeout(to);
        to = setTimeout(() => {
            f(...args)
        }, timeout)
    }) as any
}