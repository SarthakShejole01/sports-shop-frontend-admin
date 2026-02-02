/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // We can extend here if we want to match our specific custom vars, 
                // but for now standard tailwind colors are fine.
            }
        },
    },
    plugins: [],
}
