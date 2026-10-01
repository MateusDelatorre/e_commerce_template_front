import bagRepository from '../../../repository/bag/bag_repository'
import { toBagItem } from '../../model/bag'
import type { Product } from '../../model/product'

export default function addToBag(product: Product): number {
	return bagRepository.add(toBagItem(product))
}
