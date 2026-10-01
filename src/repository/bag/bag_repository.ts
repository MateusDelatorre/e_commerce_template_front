import type { BagItem } from '../../core/model/bag'
import type { BagRepository } from '../../core/repository/bag_repository'

const BAG_STORAGE_KEY = 'sillage-bag'

function readItems(): BagItem[] {
	try {
		const storedItems = localStorage.getItem(BAG_STORAGE_KEY)
		if (!storedItems) return []
		const items = JSON.parse(storedItems) as BagItem[]
		return Array.isArray(items) ? items : []
	} catch {
		return []
	}
}

const bagRepository: BagRepository = {
	add(item) {
		const items = readItems()
		const existingItem = items.find((storedItem) => storedItem.productId === item.productId)
		if (existingItem) {
			const maxQuantity = existingItem.stock ?? item.stock
			existingItem.quantity = Math.min(existingItem.quantity + 1, maxQuantity ?? Number.MAX_SAFE_INTEGER)
			existingItem.stock = maxQuantity
		} else {
			items.push(item)
		}
		localStorage.setItem(BAG_STORAGE_KEY, JSON.stringify(items))
		const count = items.reduce((total, storedItem) => total + storedItem.quantity, 0)
		window.dispatchEvent(new Event('bag-updated'))
		return count
	},
	count() {
		return readItems().reduce((total, item) => total + item.quantity, 0)
	},
	getItems() {
		return readItems()
	},
	setQuantity(productId, quantity) {
		const items = readItems()
		const item = items.find((storedItem) => storedItem.productId === productId)
		if (item) item.quantity = Math.min(Math.max(1, quantity), item.stock ?? Number.MAX_SAFE_INTEGER)
		localStorage.setItem(BAG_STORAGE_KEY, JSON.stringify(items))
		window.dispatchEvent(new Event('bag-updated'))
		return items
	},
	remove(productId) {
		const items = readItems().filter((item) => item.productId !== productId)
		localStorage.setItem(BAG_STORAGE_KEY, JSON.stringify(items))
		window.dispatchEvent(new Event('bag-updated'))
		return items
	},
	clear() {
		localStorage.removeItem(BAG_STORAGE_KEY)
		window.dispatchEvent(new Event('bag-updated'))
	},
}

export default bagRepository
