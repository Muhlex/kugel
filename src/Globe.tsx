import type { Component } from "solid-js";

const globes = ["🌍", "🌎", "🌏"];
const globe = globes[Math.floor(Math.random() * globes.length)];

const Globe: Component<{ color?: string }> = (props) => {
	const textShadow = () => {
		const color = props.color;
		if (!color) return undefined;
		return `
0 0 0 ${color},
0 0 0.25em ${color},
0 0 0.5em ${color},
0 0 1em ${color}`;
	};

	return (
		<div class="grid select-none leading-none translate-y-[-6%]">
			<div
				class="row-start-1 row-end-1 col-start-1 col-end-1 grayscale"
				style={{ opacity: props.color ? 1 : 0.25 }}
			>
				{globe}
			</div>
			<div
				class="row-start-1 row-end-1 col-start-1 col-end-1 mix-blend-overlay text-transparent"
				style={{ "text-shadow": textShadow() }}
			>
				{globe}
			</div>
		</div>
	);
};

export default Globe;
