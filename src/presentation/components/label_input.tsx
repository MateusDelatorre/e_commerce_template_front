export interface LabelInputProps {
	label: string;
	placeholder: string;
	type: string;
	value: string;
	onChange: (value: string) => void;
}

export default function LabelInput({ label, placeholder, type, value, onChange }: LabelInputProps){
	return (
		<label>
			{label}
			<input
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={(event) => onChange(event.target.value)}
			/>
		</label>
	)
}