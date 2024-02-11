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
                    <img src="/logo.svg" width={25} />
                    U Projects
                </Button>
            </Link>
            <div className="hidden gap-8 md:flex lg:flex items-center">
                <Link to="pinnedrepos">
                    <Button variant={"outline"} className="text-2xl gap-3">
                        Pinned Repos
                    </Button>
                </Link>
                <Link to="/repos">
                    <Button variant={"outline"} className="text-2xl gap-3">
                        All Repos
                    </Button>
                </Link>
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
                            <div className="flex flex-row justify-center items-center">
                                <SheetClose asChild>
                                    <Link to="/">
                                        <Button variant={"ghost"} className="text-4xl gap-3">
                                            <img src="/logo.svg" width={28} />
                                            U Projects
                                        </Button>

                                    </Link>
                                </SheetClose>
                                <div className="flex justify-center my-3 ml-2 items-center">
                                    <ModeToggle />
                                </div>
                            </div>
                            <SheetDescription>
                                <div className="flex flex-col items-start gap-3 justify-center text-2xl text-accent-foreground">

                                    <SheetClose asChild>
                                        <Link to="pinnedrepos" className="">
                                            Pinned Repos
                                        </Link>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <Link to="/repos" className="">
                                            All Repos
                                        </Link>
                                    </SheetClose>
                                </div>
                            </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    )
}