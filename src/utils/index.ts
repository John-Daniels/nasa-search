import moment from "moment";

export const isVideo = (string: string) => {
  // List of common video file extensions
  const allowedExts = [".mp4", ".avi", ".mkv", ".mov", ".wmv", ".flv", ".webm"];
  // Convert the input string to lowercase for case-insensitive comparison
  // Check if the string contains any video file extensions
  return allowedExts.some((extension) =>
    string.toLowerCase().includes(extension)
  );
};

export const isImage = (string: string) => {
  const allowedExts = [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".bmp",
    ".svg",
    ".webp",
  ];
  return allowedExts.some((extension) =>
    string.toLowerCase().includes(extension)
  );
};

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

export const formatDDMMYYY = (date: string) =>
  moment(date).format("ddd Mmm, YYYY");

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
