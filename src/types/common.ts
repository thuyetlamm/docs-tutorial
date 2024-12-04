export interface QueryParams<T extends Record<string, string>> {
  params : Promise<T>
}