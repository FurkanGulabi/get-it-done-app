// Options.tsx
"use client";
import { Database, Palette, Sliders, User } from "lucide-react"; // Icons for sidebar items
import { Session } from "next-auth";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import DeleteAllTodoButton from "./DeleteAllTodoButton";
import DeleteMyAccount from "./DeleteMyAccount";
import { ThemeChanger } from "./ThemeChanger";

interface OptionsProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    session: Session;
}

const Options = ({ open, setOpen, session }: OptionsProps) => {
    const [activeSection, setActiveSection] = React.useState<string>("account");

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    Options
                </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] w-full flex flex-col p-0">
                <DialogTitle className="p-4 border-b">Settings</DialogTitle>
                <DialogDescription className="sr-only">
                    Your account settings and preferences.
                </DialogDescription>
                <div className="flex flex-row h-[400px]">
                    {/* Sidebar */}
                    <div className="w-1/4 border-r p-2 flex flex-col gap-1">
                        <Button
                            variant={activeSection === "account" ? "secondary" : "ghost"}
                            className="w-full justify-start gap-2"
                            onClick={() => setActiveSection("account")}
                        >
                            <User className="h-4 w-4" />
                            Account
                        </Button>
                        <Button
                            variant={activeSection === "appearance" ? "secondary" : "ghost"}
                            className="w-full justify-start gap-2"
                            onClick={() => setActiveSection("appearance")}
                        >
                            <Palette className="h-4 w-4" />
                            Appearance
                        </Button>
                        <Button
                            variant={activeSection === "customize" ? "secondary" : "ghost"}
                            className="w-full justify-start gap-2"
                            onClick={() => setActiveSection("customize")}
                        >
                            <Sliders className="h-4 w-4" />
                            Customize
                        </Button>
                        <Button
                            variant={activeSection === "data" ? "secondary" : "ghost"}
                            className="w-full justify-start gap-2"
                            onClick={() => setActiveSection("data")}
                        >
                            <Database className="h-4 w-4" />
                            Data
                        </Button>
                    </div>

                    {/* Main Content */}
                    <div className="w-3/4 p-4 overflow-y-auto">
                        {activeSection === "account" ? (
                            <div className="space-y-6">
                                {/* User Info Section */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                                            <Avatar>
                                                <AvatarImage src={session.user.image} />
                                                <AvatarFallback>
                                                    {session.user.name.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                        </div>
                                        <div>
                                            <p className="font-medium">{session.user.name}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {session.user.email}
                                            </p>
                                        </div>
                                    </div>
                                    <Button variant="outline">Manage</Button>
                                </div>

                                {/* Language Section */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Language</p>
                                        <p className="text-sm text-muted-foreground">
                                            English (default)
                                        </p>
                                    </div>
                                    <Button variant="outline">Change</Button>
                                </div>

                                {/* Delete account section */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p>Delete account</p>
                                        <p className="text-sm text-muted-foreground">
                                            Delete your account permanently
                                        </p>
                                    </div>
                                    <DeleteMyAccount />
                                </div>

                            </div>
                        ) : activeSection === "appearance" ? (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <p>Theme</p>
                                    <ThemeChanger />
                                </div>
                            </div>
                        ) : activeSection === "customize" ? (
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Customization Settings</h3>
                                <p className="text-sm text-muted-foreground">
                                    Adjust your preferences and behavior settings.
                                </p>
                                {/* Add customize settings here */}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="flex flex-row items-center justify-between">
                                    <div>
                                        <p>Delete todos</p>
                                        <p className="text-sm break-words text-muted-foreground">
                                            Delete all your todos permanently.
                                        </p>
                                    </div>
                                    <DeleteAllTodoButton />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default Options;
