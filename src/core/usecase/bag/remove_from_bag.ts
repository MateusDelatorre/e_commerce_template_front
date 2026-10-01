import bagRepository from '../../../repository/bag/bag_repository'

export default function removeFromBag(productId: number) {
	return bagRepository.remove(productId)
}