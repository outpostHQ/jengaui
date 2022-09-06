/** @type {import('next').NextConfig} */
const path = require('path');
// const withPlugins = require('next-compose-plugins');
const I18N = {
	i18n: {
		locales: ['en'],
		defaultLocale: 'en'
	},
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')]
	},
	swcMinify: true,
	reactStrictMode: true,
	compiler: {
		styledComponents: true
	}
};
module.exports = I18N;
