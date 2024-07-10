const PHI_CONJUGATE = (Math.sqrt(5) - 1) / 2;
let hue = Math.random();

function hexFromHsv(hue: number, saturation: number, value: number) {
	hue = (hue < 0 ? 0 : hue > 1 ? 1 : hue) * 360;
	saturation = saturation < 0 ? 0 : saturation > 1 ? 1 : saturation;
	value = value < 0 ? 0 : value > 1 ? 1 : value;

	const c = value * saturation;
	const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
	const m = value - c;

	let red: number;
	let green: number;
	let blue: number;

	if (hue < 60) [red, green, blue] = [c, x, 0];
	else if (hue < 120) [red, green, blue] = [x, c, 0];
	else if (hue < 180) [red, green, blue] = [0, c, x];
	else if (hue < 240) [red, green, blue] = [0, x, c];
	else if (hue < 300) [red, green, blue] = [x, 0, c];
	else [red, green, blue] = [c, 0, x];

	red += m;
	green += m;
	blue += m;

	return `#${Math.trunc(red * 255).toString(16)}${Math.trunc(green * 255).toString(16)}${Math.trunc(blue * 255).toString(16)}`;
}

export default function getRandomColor(saturation = 0.5, value = 0.95) {
	hue = (hue + PHI_CONJUGATE) % 1;
	return hexFromHsv(hue, saturation, value);
}
