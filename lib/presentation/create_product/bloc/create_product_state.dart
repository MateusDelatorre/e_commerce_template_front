part of 'create_product_bloc.dart';

sealed class CreateProductState extends Equatable {
  const CreateProductState();
}

final class CreateProductInitial extends CreateProductState {
  @override
  List<Object> get props => [];
}
