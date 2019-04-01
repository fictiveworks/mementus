import pkg from './package.json';

export default [
	{
		input: 'src/mementus.js',
		output: {
      name: 'mementus',
			file: pkg.browser,
			format: 'iife'
		}
	},
	{
		input: 'src/mementus.js',
		output: [
			{
				file: pkg.main,
				format: 'cjs'
			}
		]
	}
];
