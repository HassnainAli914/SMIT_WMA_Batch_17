const express = require("express");
const fs = require("fs");
const path = require("path");

const filePath = path.join(process.cwd(), "data", "users.json");
const readFile = async () => {
  return new Promise((resolve, reject) => {
    const fileData = fs.readFile(JSON.parse(filePath.toString()));
    if (!!filedata) {
      resolve();
    } else {
      reject();
    }
  });
};
const writeFile = async () => {
  return new Promise((resolve, reject) => {
    const fileData = fs.writeFile(JSON.parse(filePath.toString()));
    if (!!filedata) {
      resolve();
    } else {
      reject();
    }
  });
};
