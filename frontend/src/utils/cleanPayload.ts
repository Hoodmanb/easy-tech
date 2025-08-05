export const cleanPayload = (input: any): any => {
    if (input instanceof File || input instanceof Blob) return input;
    if (input instanceof Date) return input;

    // Handle arrays
    if (Array.isArray(input)) {
        const cleanedArray = input
            .map(item => cleanPayload(item))
            .filter(item => item !== undefined && item !== null && item !== "" && !(Array.isArray(item) && item.length === 0) && !(typeof item === "object" && Object.keys(item).length === 0));

        return cleanedArray.length > 0 ? cleanedArray : undefined;
    }

    // Handle objects
    if (typeof input === "object" && input !== null) {
        const entries = Object.entries(input).reduce((acc, [key, value]) => {
            const cleaned = cleanPayload(value);

            const isEmptyObject = typeof cleaned === "object" && cleaned !== null && !Array.isArray(cleaned) && Object.keys(cleaned).length === 0;
            const isEmptyArray = Array.isArray(cleaned) && cleaned.length === 0;

            if (
                cleaned !== undefined &&
                cleaned !== null &&
                cleaned !== "" &&
                !isEmptyObject &&
                !isEmptyArray
            ) {
                acc[key] = cleaned;
            }

            return acc;
        }, {} as Record<string, any>);

        return Object.keys(entries).length > 0 ? entries : undefined;
    }

    // Keep booleans, numbers, and non-empty strings
    return input;
};
