export const importAsync = path => typeof System === "object" && typeof System.import === "function" ? System.import(`../${path}`) : null;
