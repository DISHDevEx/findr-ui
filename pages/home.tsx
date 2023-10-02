import React from "react";
import NextLink from "next/link";
import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "../config/site";
import { title, subtitle } from "../app/components/primitives";
import { GithubIcon } from "../app/components/icons";


export default function Home() {
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<div className="inline-block max-w-lg text-center justify-center">
				<h1 className={title()}>Simple-to-use&nbsp;</h1>
				<h1 className={title({ color: "violet" })}>unified connectivity service&nbsp;</h1>
				<br />
				<h1 className={title()}>
					for industry-specific devices, across a wide range of network and data protocols
				</h1>
				<h2 className={subtitle({ class: "mt-4" })}>
					onboard, observe and interact
				</h2>
			</div>
			<div className="flex gap-3">
				<Link
					isExternal
					as={NextLink}
					href={siteConfig.links.playground}
					className={buttonStyles({ color: "primary", radius: "full", variant: "shadow" })}
				>
					Playground
				</Link>
				<Link
					isExternal
					as={NextLink}
					className={buttonStyles({ variant: "bordered", radius: "full" })}
					href={siteConfig.links.github}
				>
					<GithubIcon size={20} />
					GitHub
				</Link>
			</div>
		</section>
	);
}
