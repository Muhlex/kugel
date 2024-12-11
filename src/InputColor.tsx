import type { Component } from "solid-js";

const InputColor: Component<{ color: string; onInput: (v: string) => void }> = (props) => {
	return <input value={props.color} onInput={(e) => props.onInput(e.currentTarget.value)} />;
};

export default InputColor;
