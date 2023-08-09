import fontList from "@/utils/fontList.json";
import WebFont from "webfontloader";

// TODO: Remove limit on font list
const fontListNames = fontList.items.filter((f) => f.variants.length >= 3).map((font) => font.family);
const setFont = (font: string | null) => {
	return new Promise((resolve) => {
		if (!font) {
			return resolve(font);
		}
		WebFont.load({
			google: {
				families: [font],
				crossOrigin: "anonymous",
			},
			active: resolve(font),
		});
	});
};

const getFontWeightOptions = (font: string) => {
	const defaultOptions = [{ value: "400", label: "Regular" }];
	if (!font) {
		return defaultOptions;
	}
	const fontObj = fontList.items.find((f) => f.family === font);
	if (!fontObj) {
		return defaultOptions;
	}
	return fontObj.variants
		.filter((variant) => !variant.includes("italic"))
		.map((variant) => {
			switch (variant) {
				case "regular":
					return {
						value: "400",
						label: "Regular",
					};
				case "100":
					return {
						value: "100",
						label: "Thin",
					};
				case "200":
					return {
						value: "200",
						label: "Extra Light",
					};
				case "300":
					return {
						value: "300",
						label: "Light",
					};
				case "400":
					return {
						value: "400",
						label: "Regular",
					};
				case "500":
					return {
						value: "500",
						label: "Medium",
					};
				case "600":
					return {
						value: "600",
						label: "Semi Bold",
					};
				case "700":
					return {
						value: "700",
						label: "Bold",
					};
				case "800":
					return {
						value: "800",
						label: "Extra Bold",
					};
				case "900":
					return {
						value: "900",
						label: "Black",
					};
				default:
					return {
						value: variant,
						label: variant,
					};
			}
		});
};

function setFontFromHTML(html: string) {
	const fontFamilies = html.match(/font-family: ([^;"]+)["|;]/g)?.map((fontFamily) => {
		return fontFamily.replace(/font-family: ([^;"]+)["|;]/, "$1");
	});
	if (fontFamilies) {
		fontFamilies.forEach((fontFamily) => {
			setFont(fontFamily);
		});
	}
}

export { fontListNames, getFontWeightOptions, setFont, setFontFromHTML };
