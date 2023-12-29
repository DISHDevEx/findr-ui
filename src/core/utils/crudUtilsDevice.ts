export function addOne<T>(items: T[] = [], newItem: T) {
  return [...items, newItem];
}

export function removeOne<T extends { deviceId: string }>(
  items: T[] = [],
  itemId: string
) {
  return items.filter((item) => item.deviceId !== itemId);
}

export function removeMany<T extends { deviceId: string }>(
  items: T[] = [],
  itemIds: string[]
) {
  return items.filter((item) => !itemIds.includes(item.deviceId));
}

export function updateOne<T extends { deviceId: string }>(
  items: T[] = [],
  updatedItem: T
) {
  return items.map((item) => (item.deviceId === updatedItem.deviceId ? updatedItem : item));
}
