export function checkDeprecations(code: string): string[] {
    const deprecatedPatterns = [
        /process\.env\.NODE_TLS_REJECT_UNAUTHORIZED/g,
        /new Buffer/g
    ];

    const results: string[] = [];

    deprecatedPatterns.forEach(pattern => {
        const match = code.match(pattern);
        if (match) {
            results.push(`Uso deprecato trovato: ${match[0]}`);
        }
    });

    return results;
}
