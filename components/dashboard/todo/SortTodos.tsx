"use client";

import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { Activity, ArrowUpDown, Calendar, Star } from "lucide-react";
import React from "react";

export type SortOption = "priority" | "date" | "status";

interface SortTodosProps {
    onSort: (option: SortOption) => void;
    currentSort: SortOption;
    isAscending: boolean;
    onDirectionChange: () => void;
}

const SortTodos = ({ onSort, currentSort, isAscending, onDirectionChange }: SortTodosProps) => {
    return (
        <div className="flex items-center gap-2">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={onDirectionChange}
                            className="h-10 w-10 relative"
                        >
                            <motion.div
                                className="absolute inset-0 flex items-center justify-center"
                                animate={{ rotate: isAscending ? 0 : 180 }}
                                transition={{
                                    duration: 0.3,
                                    ease: "easeInOut",
                                    type: "tween"
                                }}
                            >
                                <ArrowUpDown className="h-4 w-4" />
                            </motion.div>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                        <p>Sort {isAscending ? "Ascending" : "Descending"}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <Select value={currentSort} onValueChange={(value: SortOption) => onSort(value)}>
                <SelectTrigger className="w-[200px] bg-background">
                    <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="priority" >
                        <div className="flex items-center gap-2">
                            <Star className="h-4 w-4" />
                            <span>Priority</span>
                        </div>
                    </SelectItem>
                    <SelectItem value="date" >
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>Due Date</span>
                        </div>
                    </SelectItem>
                    <SelectItem value="status" >
                        <div className="flex items-center gap-2">
                            <Activity className="h-4 w-4" />
                            <span>Status</span>
                        </div>
                    </SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};

export default SortTodos; 