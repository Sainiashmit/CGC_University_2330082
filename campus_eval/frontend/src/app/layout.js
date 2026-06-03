import { Geist, Geist_Mono } from "next/font/google";
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import Link from 'next/link';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'Campus Notifications',
  description: 'Campus Hiring Evaluation Notifications Frontend',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body style={{ margin: 0, backgroundColor: '#f5f5f5', fontFamily: 'Roboto, sans-serif' }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Campus Notifications
            </Typography>
            <Link href="/" passHref style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button color="inherit">All</Button>
            </Link>
            <Link href="/priority" passHref style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button color="inherit">Priority Inbox</Button>
            </Link>
          </Toolbar>
        </AppBar>
        <Container maxWidth="md" sx={{ mt: 4 }}>
          {children}
        </Container>
      </body>
    </html>
  );
}
