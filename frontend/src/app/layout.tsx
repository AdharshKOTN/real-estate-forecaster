import './globals.css';

export const metadata = {
  title: 'Real Estate Forecast',
  description: 'Forecasting UI using ML',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
