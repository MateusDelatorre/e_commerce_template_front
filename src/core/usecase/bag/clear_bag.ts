import bagRepository from '../../../repository/bag/bag_repository'

export default function clearBag(): void {
	bagRepository.clear()
}