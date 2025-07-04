import type { TMenu } from '~/store/layout'

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

// 递归查找路径
export function findMenuPathByRoute(path: string, menus: TMenu[], parentPath: TMenu[] = []): TMenu[] | null {
  for (const menu of menus) {
    if (menu.path === path) {
      return [...parentPath, menu]
    }
    if (menu.children) {
      const found = findMenuPathByRoute(path, menu.children, [...parentPath, menu])
      if (found) return found
    }
  }
  return null
}
