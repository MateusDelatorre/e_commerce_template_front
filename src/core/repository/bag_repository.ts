import type { BagItem } from '../model/bag'

export interface BagRepository {
	add(item: BagItem): number
	count(): number
	getItems(): BagItem[]
	setQuantity(productId: number, quantity: number): BagItem[]
	remove(productId: number): BagItem[]
	clear(): void
}
