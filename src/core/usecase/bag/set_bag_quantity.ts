import bagRepository from '../../../repository/bag/bag_repository'

export default function setBagQuantity(productId: number, quantity: number) {
	return bagRepository.setQuantity(productId, quantity)
}