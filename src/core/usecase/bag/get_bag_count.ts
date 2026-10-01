import bagRepository from '../../../repository/bag/bag_repository'

export default function getBagCount(): number {
	return bagRepository.count()
}
