import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Only these env vars reach the browser. STRIPE_PAYMENT_LINK_* are public checkout URLs;
  // anything else in .env (e.g. the Stripe secret key) stays out of the site bundle.
  envPrefix: ['VITE_', 'STRIPE_PAYMENT_LINK_'],
})
