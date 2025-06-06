import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"*.{js,ts,jsx,tsx,mdx}"
	],
	theme: {
		extend: {
			colors: {
				background: 'hsl(210, 20%, 98%)', // #F9FAFB
				foreground: 'hsl(222, 33%, 17%)', // #1F2937

				card: {
					DEFAULT: 'hsl(0, 0%, 100%)',
					foreground: 'hsl(222, 33%, 17%)',
				},
				popover: {
					DEFAULT: 'hsl(0, 0%, 100%)',
					foreground: 'hsl(222, 33%, 17%)',
				},
				primary: {
					DEFAULT: 'hsl(243, 77%, 58%)',   // #4F46E5
					foreground: 'hsl(0, 0%, 100%)',
				},
				secondary: {
					DEFAULT: 'hsl(187, 72%, 61%)',   // #22D3EE
					foreground: 'hsl(222, 33%, 17%)',
				},
				accent: {
					DEFAULT: 'hsl(243, 77%, 58%)',
					foreground: 'hsl(0, 0.00%, 100.00%)',
				},
				muted: {
					DEFAULT: 'hsl(210, 40%, 96%)',
					foreground: 'hsl(0, 0.00%, 0.00%)',
				},
				destructive: {
					DEFAULT: 'hsl(0, 84%, 60%)',
					foreground: 'hsl(0, 0%, 100%)',
				},
				border: 'hsl(214, 32%, 91%)',
				input: 'hsl(214, 32%, 91%)',
				ring: 'hsl(243, 77%, 58%)',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
};
export default config;
