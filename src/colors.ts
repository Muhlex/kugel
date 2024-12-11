import { colord } from "colord";

const colors = [
	"#ff745b",
	"#b88b81",
	"#9a9ca0",
	"#a8afb9",
	"#becee0",
	"#cde3ff",
	"#cceaff",
	"#c0f0ff",
	"#a5edff",
	"#89e9fb",
	"#78e9f5",
	"#6fe8f2",
	"#6fe7f2",
	"#6ce4ef",
	"#78e1f0",
	"#97ddf9",
	"#b5cffd",
	"#d0c7ff",
	"#eabdff",
	"#e7b8ff",
	"#eaace8",
	"#ff9faf",
	"#ff9293",
	"#ff8161",
	"#ff745b",
];

export const minutesToColor = (minutes: number): string => {
	const h = Math.floor(minutes / 60);
	const m = minutes % 60;
	const frac = m / 60;
	const startColor = colors[h];
	const endColor = colors[(h + 1) % colors.length];
	return colord(startColor).mix(endColor, frac).toHex();
};

export const colorToMinutes = (() => {
	const minutesByHexColor = new Map<string, number[]>();
	const rangesByHexColor = new Map<string, [number, number][]>();

	const minutesInDay = 24 * 60;
	for (let minutes = 0; minutes < minutesInDay; minutes++) {
		const color = minutesToColor(minutes);
		const values = minutesByHexColor.get(color) ?? [];
		if (values.length === 0) minutesByHexColor.set(color, values);
		values.push(minutes);
	}

	for (const [color, values] of minutesByHexColor) {
		const ranges: [number, number][] = [];
		let start = values[0];
		let end = values[0];

		for (let i = 1; i < values.length; i++) {
			if (values[i] === end + 1) {
				end = values[i];
			} else {
				ranges.push([start, end]);
				start = values[i];
				end = values[i];
			}
		}
		ranges.push([start, end]);
		rangesByHexColor.set(color, ranges);
	}

	return (color: string): [number, number][] => rangesByHexColor.get(colord(color).toHex()) ?? [];
})();

export const parseColor = (color?: string): string | undefined => {
	if (color === undefined) return undefined;
	const parsed = colord(color);
	if (!parsed.isValid()) return undefined;
	const alpha = parsed.alpha();
	return parsed
		.alpha(1)
		.desaturate(1.0 - alpha)
		.toHex();
};
