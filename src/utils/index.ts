import moment from "moment";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const getUserImg = (image?: string) =>
  image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

export function convertObjectValuesToLowercase(obj: { [key: string]: any }) {
  // Check if the input is an object
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];

      if (typeof value === "string") {
        obj[key] = value.toLowerCase();
      } else if (typeof value === "object") {
        // Recursively call the function for nested objects
        obj[key] = convertObjectValuesToLowercase(value);
      }
    }
  }

  return obj;
}

export function getFileExtension(fileName) {
  const lastDotIndex = fileName.lastIndexOf(".");
  if (lastDotIndex === -1) {
    // No dot found in the file name, return an empty string or handle the case as needed
    return "";
  }
  return fileName.substr(lastDotIndex);
}

export const getUserRole = (role: number): "user" | "admin" | "super-admin" | "super-dictator" => {
  const roles = ["user", "admin", "super-admin"];
  roles[99] = "super-dictator";
  return roles[role !== 99 ? role - 1 : role] as any;
};

export const formatDDMMYYY = (date: string) => moment(date).format("dd Mmm, YYYY");

// Reusable function to convert time from 24-hour format to 12-hour format
export const convertTo12HourFormat = (time24: string): string => {
  const [hours, minutes] = time24.split(":");
  let period = "AM";

  let hours12 = parseInt(hours, 10);

  if (hours12 > 12) {
    hours12 -= 12;
    period = "PM";
  }

  return `${hours12}:${minutes} ${period}`;
};
