import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

export default [
	{
		input: "bundle.config.js",
		output: [
			{
	      name: "mementus",
				file: pkg.main,
				format: "cjs"
			},
			{
				name: "mementus",
				file: "dist/mementus.min.js",
				format: "iife",
				plugins: [terser()]
			}
		],
		plugins: [json()]
	}
];
