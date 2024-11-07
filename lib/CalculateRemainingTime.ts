"use client";

import {
  differenceInYears,
  differenceInMonths,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  isFuture,
} from "date-fns";

/**
 * Calculates the time difference between the current date and a target date,
 * returning a human-readable string indicating the remaining or past time.
 *
 * @param {Date} targetDate - The date to compare with the current date.
 * @returns {string} A string representing the time difference in a readable format.
 *                   For example: "2 days remain", "1 month past", "57 minutes remain".
 */
export function CalculateRemainingTime(targetDate: Date): string {
  const now = new Date();
  const isInFuture = isFuture(targetDate);

  let output: string;

  // Calculate the largest difference unit
  const years = differenceInYears(targetDate, now);
  const months = differenceInMonths(targetDate, now) % 12;
  const days = differenceInDays(targetDate, now) % 30;
  const hours = differenceInHours(targetDate, now) % 24;
  const minutes = differenceInMinutes(targetDate, now) % 60;

  if (Math.abs(years) > 0) {
    output = `${Math.abs(years)} year${Math.abs(years) > 1 ? "s" : ""} ${
      isInFuture ? "remain" : "past"
    }`;
  } else if (Math.abs(months) > 0) {
    output = `${Math.abs(months)} month${Math.abs(months) > 1 ? "s" : ""} ${
      isInFuture ? "remain" : "past"
    }`;
  } else if (Math.abs(days) > 0) {
    output = `${Math.abs(days)} day${Math.abs(days) > 1 ? "s" : ""} ${
      isInFuture ? "remain" : "past"
    }`;
  } else if (Math.abs(hours) > 0) {
    output = `${Math.abs(hours)} hour${Math.abs(hours) > 1 ? "s" : ""} ${
      isInFuture ? "remain" : "past"
    }`;
  } else if (Math.abs(minutes) > 0) {
    output = `${Math.abs(minutes)} minute${Math.abs(minutes) > 1 ? "s" : ""} ${
      isInFuture ? "remain" : "past"
    }`;
  } else {
    output = "Less than a minute remain";
  }

  return output;
}
