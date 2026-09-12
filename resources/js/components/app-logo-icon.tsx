import type { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg
            {...props}
            viewBox="0 0 40 42"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m25.323 24.488 6.357 3.1-3.1 6.357M27.454 14.634A8.333 16.667 0 1 0 21.667 38.0M36.33 18.333A16.667 8.333 0 1 0 31.667 25.951" />
        </svg>
    );
}
