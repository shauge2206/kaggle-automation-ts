export function getEnv(name: string): string {
    const value =  process.env[name];
    if (!value) {
        throw new Error(`Missing enviorment variables ${name}`);
    }
    return value;
}