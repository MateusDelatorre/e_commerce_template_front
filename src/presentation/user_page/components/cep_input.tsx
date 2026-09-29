import type { FocusEventHandler } from "react";

type CepInputProps = {
	onBlur?: FocusEventHandler<HTMLInputElement>;
};

export default function CepInput({ onBlur }: CepInputProps) {
	return (
		<label>CEP
			<input type="number" placeholder="1" maxLength={8} min={0} step="1" 
			inputMode="numeric" pattern="[0-9]*" onInput={(e) => {
				const input = e.target as HTMLInputElement;
				input.value = input.value.replace(/[^0-9]/g, '')
				if (input.value.length > 8) {
					input.value = input.value.slice(0, 8);
				}
			}} onBlur={onBlur} />
		</label>
	)
}