export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "FINDR - Unified connectivity service",
	description: "simple-to-use unified connectivity service to observe, interact, and onboard industry-specific devices across a wide range of network & data protocols",
	navItems: [
		{
			label: "Home",
			href: "/",
		},
    {
      label: "Documentation",
      href: "/documentation",
    },
	{
		label: "Playground",
		href: "/playground",
	  },
	],
	navMenuItems: [
		{
			label: "Profile",
			href: "/profile",
		},
		{
			label: "Dashboard",
			href: "/dashboard",
		},
		{
			label: "Projects",
			href: "/projects",
		},
		{
			label: "Team",
			href: "/team",
		},
		{
			label: "Calendar",
			href: "/calendar",
		},
		{
			label: "Settings",
			href: "/settings",
		},
		{
			label: "Help & Feedback",
			href: "/help-feedback",
		},
		{
			label: "Logout",
			href: "/logout",
		},
	],
	links: {
		github: "https://github.com/DISHDevEx/findr",
		docs: "https://github.com/DISHDevEx/findr/wiki",
		playground: "http://localhost:4000/graphql"
	},
};
