// https://nuxt.com/docs/api/configuration/nuxt-config
import locales from './i18n/locales.json';
import pages from './i18n/pages.json';
import { writeFileSync } from 'fs';
import path from 'path';

export default defineNuxtConfig({
	devtools: {
		enabled: true,
	},
	ssr: true,
	nitro: {
		static: true,
		// Hacky approach to redirect create index.html file for root redirect
		// hooks: {
		// 	'prerender:generate'(route, nitro) {
		// 		console.log(
		// 			'\n\nNITRO',
		// 			nitro.options.output.publicDir,
		// 			route?.route
		// 		);
		// 		if (route?.route === '/200.html') {
		// 			const redirectHtml =
		// 				'<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=/de"></head></html>';
		// 			const outputPath = path.join(
		// 				nitro.options.output.publicDir,
		// 				'index.html'
		// 			);
		// 			writeFileSync(outputPath, redirectHtml);
		// 		}
		// 	},
		// },
	},
	experimental: {
		sharedPrerenderData: true,
		asyncContext: true, // fix for https://github.com/nuxt/nuxt/issues/22712
	},
	modules: ['@nuxtjs/i18n'],
	i18n: {
		locales,
		strategy: 'prefix',
		defaultLocale: 'de',
		customRoutes: 'config',
		rootRedirect: 'de',
		pages,
		detectBrowserLanguage: {
			useCookie: true,
			cookieKey: 'i18n_redirected',
			redirectOn: 'root',
			fallbackLocale: 'de',
		},
	},
});
