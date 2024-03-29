"use client";

import { isClient } from "@/constants/index.constant";

/* eslint-disable consistent-return */
/* eslint-disable no-restricted-globals */
/**
 * Save new item on session storage
 *
 * @note It performs same actions as {@link deleteItem} when value is set to undefined
 * @param name - item name
 * @param value - item value
 */

export const saveItem = (name: string, value: any) => {
  if (!isClient) return;
  if (["string", "number", "boolean"].includes(typeof value)) {
    localStorage.setItem(name, `${value}`);
  } else if (typeof value === "undefined") deleteItem(name);
  else {
    localStorage.setItem(name, JSON.stringify(value));
  }
};

/**
 * Remove item from session storage
 * @param name - item name
 */
export const deleteItem = (name: string) => {
  if (!isClient) return;
  localStorage.removeItem(name);
};

/**
 * update Items stored on session storage
 *
 * @descriptions
 * @note If item doesn't exist, stores as new item.
 * @note If item is an array or object, update existing properties with new properties.
 * @note If item is string, number or boolean, replace item
 *
 * @param name - item name
 * @param value - value to update item with
 * @returns
 */
export const updateItem = (name: string, value: any) => {
  if (!isClient) return;

  if (typeof value === "object" && localStorage.getItem(name)) {
    let existingValue = JSON.parse(localStorage.getItem(name) || "{}");
    existingValue = { ...existingValue, ...value };
    localStorage.setItem(name, JSON.stringify(existingValue));
    return existingValue;
  }
  saveItem(name, value);
};

/**
 * Retrieve item store on session storage
 *
 * @param name - item name
 * @returns
 */
export const getItem = (name: string) => {
  if (!isClient) return;

  try {
    const value = localStorage.getItem(name);
    if (!value) return undefined;
    if (["[", "{"].includes(value.charAt(0))) {
      return JSON.parse(value);
    }
    if (value === "false") return false;
    if (value === "true") return true;
    if (!isNaN(value as any)) return Number(value);
    return value;
  } catch (err) {
    return localStorage.getItem(name);
  }
};
