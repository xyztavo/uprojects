import { ModeToggle } from "./mode-toggle";
import { Link, useNavigate } from 'react-router-dom';
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
import { Input } from "@/components/ui/input"

import { useState } from "react";
import { Search } from "lucide-react";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog"



export function Navbar() {
    const [isOpen, setOpen] = useState(false)
    const [search, setSearch] = useState('')

    const navigate = useNavigate()


    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        navigate(`/search?q=${search}`)
        setSearch('')
    }

    return (
        <div className="flex flex-row justify-between items-center p-2 text-2xl border-b-2 pr-2 pb-2 sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <Link to="/" className="flex flex-row">
                <Button variant={"ghost"} className="text-3xl gap-3 bg-transparent">
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
                <form className="flex space-x-2" onSubmit={handleSubmit}>
                    <Input placeholder="Search a repo" value={search} onChange={(e) => setSearch(e.target.value)} />
                    <Button variant={"outline"}><Search /></Button>
                </form>
                <div className="flex justify-center items-center m-auto h-[50px]">
                    <ModeToggle />
                </div>
            </div>

            <div className="flex md:hidden lg:hidden justify-center items-center gap-3">
                <Dialog>
                    <DialogTrigger><Button variant={"outline"} className="flex w-[50px] h-[50px] border rounded-md items-center justify-center m-auto"><Search /></Button></DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <form className="flex space-x-2 my-4" onSubmit={handleSubmit}>
                                <Input placeholder="Search a repo" value={search} onChange={(e) => setSearch(e.target.value)} />
                                <DialogClose asChild>
                                    <Button variant={"outline"} type="submit"><Search /></Button>
                                </DialogClose>
                            </form>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>

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