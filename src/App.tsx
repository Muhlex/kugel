import { type Component, Show, createSignal } from "solid-js";

import { colorToMinutes, minutesToColor, parseColor } from "./colors";

import Globe from "./Globe";
import InputColor from "./InputColor";
import InputTime, { parseMinutes } from "./InputTime";

const App: Component = () => {
	const minutesNow = new Date().getHours() * 60 + new Date().getMinutes();

	const [minutes, setMinutes] = createSignal<number | undefined>(minutesNow);
	const [color, setColor] = createSignal(minutesToColor(minutes()!));
	const displayColor = () => parseColor(color());

	const timeRangesStr = () => {
		const ranges = colorToMinutes(color());

		if (ranges.length === 1 && ranges[0][0] === ranges[0][1]) return "";

		return ranges
			.map(([start, end]) =>
				start === end ? parseMinutes(start) : `${parseMinutes(start)} – ${parseMinutes(end)}`,
			)
			.join(" or ");
	};

	return (
		<div class="h-screen">
			<div class="absolute top-0 left-0 right-0 bottom-0 -z-10 flex justify-center items-center text-[min(65vh,120vw)] overflow-hidden">
				<Globe color={displayColor()} />
			</div>
			<main class="min-h-screen p-4 flex flex-col justify-center items-center gap-8 text-xl">
				<div class="flex flex-col items-center gap-2">
					<InputTime
						minutes={minutes()}
						onInput={(v) => {
							setMinutes(v);
							if (v === undefined) return;
							setColor(minutesToColor(v));
						}}
					/>
					<Show when={timeRangesStr()}>
						<div>({timeRangesStr()})</div>
					</Show>
				</div>
				<InputColor
					color={color()}
					onInput={(v) => {
						setColor(v);
						const minutes = colorToMinutes(v)[0]?.[0];
						setMinutes(minutes);
					}}
				/>
			</main>
		</div>
	);
};

export default App;
