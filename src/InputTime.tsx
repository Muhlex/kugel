import type { Component } from "solid-js";

const parseInput = (input: string): number | undefined => {
	if (input === "") return undefined;
	const [hours, minutes] = input.split(":");
	return Number.parseInt(hours) * 60 + Number.parseInt(minutes);
};

export const parseMinutes = (minutes?: number): string => {
	if (minutes === undefined) return "";
	const h = Math.floor(minutes / 60);
	const m = minutes % 60;
	return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
};

const InputTime: Component<{ minutes?: number; onInput: (v?: number) => void }> = (props) => {
	return (
		<input
			type="time"
			min="00:00"
			max="24:00"
			value={parseMinutes(props.minutes)}
			onInput={(e) => props.onInput(parseInput(e.currentTarget.value))}
		/>
	);
};

export default InputTime;
