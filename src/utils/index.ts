/**
 *
 * @param key 唯一 key
 * @param arrayValue
 * @param target
 * @returns
 */
export function flat2Map<T extends Record<string, any>>(key: string, arrayValue: T[], target: Record<string, T> = {}): Record<string, T> {
  return arrayValue.reduce((acc, cur) => {
    const keyV = cur[key]
    if (keyV) {
      acc[keyV] = cur
    }
    return cur.children?.length ? flat2Map(key, cur.children, acc) : acc
  }, target)
}
