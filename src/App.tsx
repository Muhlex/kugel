import { type Component, Show, createEffect, createSignal } from "solid-js";

import { colorToMinutes, minutesToColor, parseColor } from "./colors";

import Globe from "./Globe";
import InputColor from "./InputColor";
import InputTime, { parseMinutes } from "./InputTime";

const App: Component = () => {
	const minutesNow = (() => {
		const date = new Date();
		return date.getHours() * 60 + date.getMinutes();
	})();

	const [minutes, setMinutes] = createSignal<number | undefined>(minutesNow);
	const [color, setColor] = createSignal(minutesToColor(minutes()!));
	const validColor = () => parseColor(color());

	const timeRangesStr = () => {
		const ranges = colorToMinutes(color());

		if (ranges.length === 1 && ranges[0][0] === ranges[0][1]) return "";

		return ranges
			.map(([start, end]) =>
				start === end ? parseMinutes(start) : `${parseMinutes(start)} – ${parseMinutes(end)}`,
			)
			.join(" or ");
	};

	const updateMinutes = (value: number | undefined) => {
		setMinutes(value);
		if (value === undefined) return;
		setColor(minutesToColor(value));
	};

	const updateColor = (value: string) => {
		setColor(value);
		const validValue = validColor();
		const minutes = validValue ? colorToMinutes(validValue)[0]?.[0] : undefined;
		setMinutes(minutes);
	};

	const onHashChange = () => {
		const color = parseColor(window.location.hash);
		if (!color || color === validColor()) return;
		updateColor(window.location.hash);
	};
	window.onhashchange = onHashChange;
	onHashChange();
	createEffect(() => {
		window.location.hash = validColor() ?? "";
	});

	return (
		<div class="h-screen">
			<div class="absolute top-0 left-0 right-0 bottom-0 -z-10 flex justify-center items-center text-[min(65vh,120vw)] overflow-hidden">
				<Globe color={validColor()} />
			</div>
			<main class="min-h-screen p-4 flex flex-col justify-center items-center gap-8 text-xl">
				<div class="flex flex-col items-center gap-2">
					<InputTime minutes={minutes()} onInput={updateMinutes} />
					<Show when={timeRangesStr()}>
						<div>({timeRangesStr()})</div>
					</Show>
				</div>
				<InputColor color={color()} onInput={updateColor} />
			</main>
		</div>
	);
};

export default App;
