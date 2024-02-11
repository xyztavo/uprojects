import { ModeToggle } from "./mode-toggle";
import { Link } from 'react-router-dom';
import { Button } from "./ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Squash as Hamburger } from 'hamburger-react'
import { useState } from "react";



export function Navbar() {
    const [isOpen, setOpen] = useState(false)


    return (
            <div className="flex flex-row justify-between items-center p-2 text-2xl border-b-2 pr-2 pb-2 sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <Link to="/" className="flex flex-row">
                    <Button variant={"ghost"} className="text-3xl gap-3">
                        <img src="logo.svg" width={25} />
                        U Projects
                    </Button>
                </Link>
                <div className="hidden gap-8 md:flex lg:flex ">
                    <div className="flex justify-center items-center m-auto h-[50px]">
                        <ModeToggle />
                    </div>
                </div>

                <div className="flex md:hidden lg:hidden">
                    <Sheet onOpenChange={setOpen}>
                        <SheetTrigger className="flex w-[3rem] h-[auto] border rounded-md items-center justify-center m-auto">
                            <Hamburger size={15} duration={0.25} toggled={isOpen} />
                        </SheetTrigger>

                        <SheetContent side={"left"} className="flex justify-center">
                            <SheetHeader>
                                <SheetClose asChild>
                                    <Link to="/" className="flex flex-row">
                                        <Button variant={"ghost"} className="text-4xl gap-3">
                                            <img src="logo.svg" width={28} />
                                            U Projects
                                        </Button>
                                    </Link>
                                </SheetClose>
                                <SheetDescription>
                                    <div className="scale-[1.3] flex justify-center">
                                        <ModeToggle />
                                    </div>
                                </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
    )
}