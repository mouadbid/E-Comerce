/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                ikea: {
                    blue: '#0058a3',
                    yellow: '#ffdb00',
                    gray: '#f5f5f5'
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif']
            }
        },
    },
    plugins: [],
}
