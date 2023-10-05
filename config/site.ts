export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "FINDR - Unified connectivity service",
	description: "simple-to-use unified connectivity service to observe, interact, and onboard industry-specific devices across a wide range of network & data protocols",
	navItems: [
		{
			label: "Home",
			href: "/app",
		},
    {
      label: "Documentation",
      href: "/documentation",
    },
	{
		label: "Product",
		href: "/product",
	  },
	],
	links: {
		github: "https://github.com/DISHDevEx/findr",
		docs: "https://github.com/DISHDevEx/findr/wiki",
		playground: "/playground"
	},
};
