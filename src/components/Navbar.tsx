import { ModeToggle } from "./mode-toggle";
import { Link } from 'react-router-dom';
import { Button } from "./ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Squash as Hamburger } from 'hamburger-react'
import { useState } from "react";



export function Navbar() {
    const [isOpen, setOpen] = useState(false)


    return (
        <div className="flex flex-row justify-between items-center p-4 text-2xl border-b-2">
            <Link to="/">
                <Button variant={"ghost"} className="text-3xl">Project hub</Button>
            </Link>
            <div className="hidden gap-8 md:flex lg:flex">
                <div className="scale-[1.2] flex justify-center">
                    <ModeToggle />
                </div>
            </div>
            <div className="flex gap-8  md:hidden lg:hidden">
                <Sheet onOpenChange={setOpen}>
                    <SheetTrigger>
                        <div className="border rounded-md">
                            <Hamburger size={20} duration={0.25} toggled={isOpen} />
                        </div>
                    </SheetTrigger>
                    <SheetContent side={"left"} className="flex justify-center">
                        <SheetHeader>
                            <SheetTitle className="text-3xl mb-10">Projects Hub</SheetTitle>
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