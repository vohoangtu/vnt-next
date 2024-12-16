import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import React, { useState } from 'react';
import "@/components/all.scss";
import { NotificationProvider } from "@/context/NotificationContext";
import { AuthProvider } from '@/context/AuthContext';
import Layout from "@/components/layouts/Layout";
import Topbar from "@/components/layouts/Topbar";
import Sidebar from "@/components/layouts/Sidebar";
import ClientLayout from "@/components/layouts/ClientLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AuthProvider>
          <NotificationProvider>
            <ClientLayout>{children}</ClientLayout>
          </NotificationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
