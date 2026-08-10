import type { ReactNode } from 'react';
import { NavigationBar } from './NavigationBar';
import { MainFooter } from './MainFooter';

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      <NavigationBar />
      {children}
      <MainFooter />
    </div>
  );
}
