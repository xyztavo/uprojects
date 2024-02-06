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
        <div className="flex flex-row justify-between items-center p-2 text-2xl border-b-2 ">
            <Link to="/">
                <Button variant={"ghost"} className="text-3xl">Projects Hub</Button>
            </Link>
            <div className="hidden gap-8 md:flex lg:flex">
                <div className="flex justify-center items-center m-auto">
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
                            <SheetTitle><Button variant={"ghost"} className="text-3xl w-[200px] my-3">Projects Hub</Button></SheetTitle>
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