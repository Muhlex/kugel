import type { Component } from "solid-js";

const globes = ["🌍", "🌎", "🌏"];
const globe = globes[Math.floor(Math.random() * globes.length)];

const Globe: Component<{ color?: string }> = (props) => {
	const textShadow = () => props.color && `0 0 0 ${props.color}`;
	const filter = () => {
		const color = props.color;
		if (!color) return undefined;
		return `\
drop-shadow(0 0 0.5em ${color})
drop-shadow(0 0 2em ${color})`;
	};

	return (
		<div class="grid select-none leading-none translate-y-[-5%]">
			<div
				class="row-start-1 row-end-1 col-start-1 col-end-1 grayscale"
				style={{ opacity: props.color ? 1 : 0.25, transition: "opacity 800ms ease" }}
			>
				{globe}
			</div>
			<div
				class="row-start-1 row-end-1 col-start-1 col-end-1 text-transparent mix-blend-overlay"
				style={{
					"text-shadow": textShadow(),
					filter: filter(),
					transition: "text-shadow 800ms ease, filter 1000ms ease",
				}}
			>
				{globe}
			</div>
		</div>
	);
};

export default Globe;
