import bagRepository from '../../../repository/bag/bag_repository'
import type { BagItem } from '../../model/bag'

export default function getBagItems(): BagItem[] {
	return bagRepository.getItems()
}