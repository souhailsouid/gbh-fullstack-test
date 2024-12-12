
export function cleanFilters(filters: Record<string, string | number | undefined>) {
    return Object.entries(filters).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== '') {
            acc[key] = value;
        }
        return acc;
    }, {} as Record<string, string | number | undefined>)
}