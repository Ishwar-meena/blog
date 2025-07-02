'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button'; // Adjust path to your Button component
import { Menu } from 'lucide-react';
import { ModeToggle } from './ui/theme-btn';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import LoadingBar from 'react-top-loading-bar';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';


export default function Header() {

    const pathname = usePathname();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        setProgress(30); // Reset progress when pathname changes
        const timer2 = setTimeout(() => {
            setProgress(60);
        }, 200);
        const timer3 = setTimeout(() => {
            setProgress(100);
        }, 400);
        return () => clearTimeout(timer2, timer3); // Cleanup on unmount or pathname change
    }, [pathname])


    return (
        <header className="sticky top-0 z-50 border-b backdrop-blur-lg  shadow-sm">
            <LoadingBar
                color="blue" // Adjust color as needed
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
                height={2} // Adjust height as needed
                shadow={true} // Optional: adds a shadow effect
                transitionTime={300} // Adjust transition time as needed
            />
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
                <div className="text-2xl font-bold ">HackerX</div>
                <ul className="hidden md:flex items-center gap-6  font-medium">
                    <li ><Link href={'/'}>Home</Link></li>
                    <li ><Link href={'/blog'}>Blog</Link></li>
                    <li ><Link href={'/about'}>About</Link></li>
                    <li>
                        <Button className="h-8" variant="outline">Login</Button>
                    </li>
                    <li>
                        <Button className="h-8" variant="outline">Signup</Button>
                    </li>
                    <li>
                        <ModeToggle />
                    </li>
                </ul>
                {/* Mobile Menu Toggle */}
                <div className='md:hidden'>
                    <Sheet>
                        <div className='flex gap-2 items-center justify-center'>
                            <SheetTrigger>
                                <Menu className="w-6 h-6 cursor-pointer" />
                            </SheetTrigger>
                            <ModeToggle className="cursor-pointer"/>
                        </div>
                        <SheetContent className="w-full">
                            <SheetHeader>
                                <SheetTitle>HackerX</SheetTitle>
                                <SheetDescription>
                                    <div className="md:hidden px-4 pb-4">
                                        <ul className="flex flex-col items-center justify-center gap-4 font-medium">
                                            <li>Home</li>
                                            <li>Blog</li>
                                            <li>About</li>
                                            <li>
                                                <Button className="w-full" variant="outline">Login</Button>
                                            </li>
                                            <li>
                                                <Button className="w-full" variant="outline">Signup</Button>
                                            </li>
                                        </ul>
                                    </div>
                                </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>

                </div>
            </nav>
        </header>
    );
}
