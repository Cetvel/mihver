'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/nextjs';
import { useTheme } from 'next-themes';
import { dark } from '@clerk/themes';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    { name: 'Hakkında', href: '#about' },
    { name: 'Özellikler', href: '#features' },
    { name: 'İletişim', href: '#contact' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        isScrolled
          ? 'bg-background/80 backdrop-blur-md border-b'
          : 'bg-transparent'
      )}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-14'>
          {/* Logo */}
          <div className='flex-shrink-0'>
            <Link href='#' className='text-2xl font-bold text-primary'>
              <Image
                src={'/image/logo.svg'}
                alt='Logo'
                width={32}
                height={32}
              />
            </Link>
          </div>

          {/* Centered Menu Links */}
          <div className='hidden md:flex flex-grow justify-start pl-6'>
            <div className='flex items-center space-x-2'>
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className='text-secondary-foreground transition-colors hover:text-primary px-3 py-2 rounded-md text-sm font-medium'
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className='hidden md:flex items-center space-x-4'>
            <SignedOut>
              <SignInButton>
                <Button variant='outline' size={'sm'}>
                  Giriş Yap
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button variant='default' size={'sm'}>
                  Kayıt Ol
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link href='/dashboard'>
                <Button variant='default' size={'sm'}>
                  Panele git
                </Button>
              </Link>
            </SignedIn>
            <UserButton
              appearance={{
                baseTheme: resolvedTheme === 'dark' ? dark : undefined,
              }}
            />
          </div>

          {/* Mobile Menu Button */}
          <div className='md:hidden'>
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant='ghost' size='icon'>
                  <Menu className='h-6 w-6' />
                </Button>
              </SheetTrigger>
              <SheetContent side='right' className='w-[300px] sm:w-[400px]'>
                <nav className='flex flex-col h-full'>
                  <div className='flex items-center justify-between mb-6'>
                    <span className='text-lg font-semibold'>Menü</span>
                  </div>
                  <div className='space-y-4'>
                    {navItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className='block px-3 py-2 rounded-md text-base font-medium text-secondary-foreground hover:text-primary hover:bg-accent'
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <SignedOut>
                    <div className='mt-auto space-y-4 flex-col flex w-full'>
                      <SignInButton>
                        <Button variant='outline'>Giriş Yap</Button>
                      </SignInButton>
                      <SignUpButton>
                        <Button variant='default'>Kayıt Ol</Button>
                      </SignUpButton>
                    </div>
                  </SignedOut>
                  <SignedIn>
                    <div className='mt-auto space-y-4 flex-row flex w-full'>
                      <Link href='/dashboard'>
                        <Button variant='default'>Panele git</Button>
                      </Link>
                      <UserButton
                        appearance={{
                          baseTheme:
                            resolvedTheme === 'dark' ? dark : undefined,
                        }}
                      />
                    </div>
                  </SignedIn>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
