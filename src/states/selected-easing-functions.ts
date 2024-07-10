import { atom } from "jotai";
import EasingFunctions from "../meta/easing-functions";

// eslint-disable-next-line unicorn/no-useless-undefined
export const selectedEasingFunctions = atom(new Set<EasingFunctions>());
export default selectedEasingFunctions;
