import { ModeToggle } from "./mode-toggle";
import { Link } from 'react-router-dom';
import { Button } from "./ui/button";

export function Navbar() {
    return (
        <div className="flex flex-row justify-between items-center p-4 text-2xl border-b-2">
            <Link to="/">
                <Button variant={"ghost"} className="text-3xl">Project hub</Button>
            </Link>
            <div className="flex gap-8">
                <ModeToggle />
            </div>
        </div>
    )
}