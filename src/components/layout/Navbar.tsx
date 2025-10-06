"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '../ui/ThemeToggle';

const navItems = [
	{ href: '/', label: 'Home' },
	{ href: '/about', label: 'About' },
	{ href: '/projects', label: 'Projects' },
	{ href: '/experience', label: 'Experience' },
	{ href: '/blog', label: 'Blog' },
	{ href: '/contact', label: 'Contact' }
];

export function Navbar() {
	const pathname = usePathname();
	return (
		<header className="sticky top-0 z-40 w-full border-b border-border/60 bg-bg/40 backdrop-blur-xl supports-[backdrop-filter]:bg-bg/30">
			<div className="container-base flex h-14 items-center justify-between">
				<Link
					href="/"
					className="font-bold tracking-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-md px-1 py-0.5"
				>
					Omar Allam
				</Link>
				<nav className="hidden md:flex gap-2 text-sm">
					{navItems.map((item) => {
						const active = pathname === item.href;
						return (
							<Link
								key={item.href}
								href={item.href}
								aria-current={active ? 'page' : undefined}
								className={cn(
									'group relative px-3 py-1.5 rounded-md font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
									active
										? 'text-primary bg-primary/10 ring-1 ring-primary/25 shadow-[inset_0_0_0_1px_hsl(var(--primary)/0.35)]'
										: 'text-fg-muted hover:text-primary hover:bg-primary/5'
								)}
							>
								<span className="relative z-10 tracking-tight">
									{item.label}
								</span>
								{/* Animated background accent (gradient bar) */}
								<span
									className={cn(
										'pointer-events-none absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity',
										'bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.18),transparent_60%),radial-gradient(circle_at_70%_80%,hsl(var(--secondary)/0.18),transparent_65%)]',
										active && 'opacity-100'
									)}
								/>
							</Link>
						);
					})}
				</nav>
				<div className="flex items-center gap-3">
					<a
						href="/cv.pdf"
						download
						className="hidden sm:inline-block text-xs rounded-md border border-border/60 px-3 py-1.5 bg-bg/40 backdrop-blur hover:text-primary hover:border-primary/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
					>
						Resume
					</a>
					<ThemeToggle />
				</div>
			</div>
		</header>
	);
}
