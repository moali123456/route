// Question 1
const showPath = require("path");

function getShowPath() {
  console.log("Question 1 :", {
    file: __filename,
    dir: __dirname,
  });
}

getShowPath();
console.log("-------------------");
/* ------------------------------ */

// Question 2
const pathName = require("path");

function getFileName(filePath) {
  return pathName.basename(filePath);
}
console.log("Question 2 :", getFileName("/user/files/report.pdf"));

console.log("-------------------");
/* ------------------------------ */

// Question 3
const buildPath = require("path");

function getBuildPath(obj) {
  return buildPath.join(obj.dir, obj.name + obj.ext);
}

console.log(
  "Question 3 :",
  getBuildPath({
    dir: "/folder",
    name: "app",
    ext: ".js",
  }),
);

console.log("-------------------");
/* ------------------------------ */

// Question 4
const fileExtension = require("path");

function getFileExtension(fileExt) {
  return fileExtension.extname(fileExt);
}

console.log("Question 4 :", getFileExtension("/docs/readme.md"));

console.log("-------------------");
/* ------------------------------ */

// Question 5
const parsePath = require("path");

function getParsePath(obj) {
  const data = parsePath.parse(obj);

  return {
    name: data.name,
    ext: data.ext,
  };
}

console.log("Question 5 :", getParsePath("/home/app/main.js"));

console.log("-------------------");
/* ------------------------------ */

// Question 6
const absolutePath = require("path");

function getAbsolutePath(obj) {
  return absolutePath.isAbsolute(obj);
}

console.log("Question 6 :", getAbsolutePath("/home/user/file.txt"));

console.log("-------------------");
/* ------------------------------ */

// Question 7
const joinPaths = require("path");

function getJoinPaths(...obj) {
  return joinPaths.join(...obj);
}

console.log("Question 7 :", getJoinPaths("src", "components", "App.js"));

console.log("-------------------");
/* ------------------------------ */

// Question 8
const resolvePath = require("path");

function getResolvePath(obj) {
  return resolvePath.resolve(obj);
}

console.log("Question 8 :", getResolvePath("./index.js"));

console.log("-------------------");
/* ------------------------------ */

// Question 9
const joinTwoPaths = require("path");

function getJoinTwoPaths(obj1, obj2) {
  return joinPaths.join(obj1, obj2);
}

console.log("Question 9 :", getJoinTwoPaths("/folder1", "folder2/file.txt"));

console.log("-------------------");
/* ------------------------------ */

// Question 10
const fs = require("fs");
const deleteFile = require("path");

function getDeleteFile(obj) {
  fs.unlink(obj, (error) => {
    if (error) {
      return console.log(error);
    }

    console.log(
      "Question 10 :",
      `the file ${deleteFile.basename(obj)} is deleted`,
    );
  });
}

// I need to create file with name 'file.txt' every time i run the code
getDeleteFile("./file.txt");

console.log("-------------------");
/* ------------------------------ */

// Question 11
const cf = require("fs");

function createFolder(obj) {
  cf.mkdirSync(obj);

  console.log("Question 11 :", "Success");
}

createFolder("./NewFolder");

console.log("-------------------");
/* ------------------------------ */

// Question 12
const EventEmitter = require("events");
const { start } = require("repl");

const event = new EventEmitter();

event.on("start", () => {
  console.log("Question 12 :", "Welcome event triggered!");
});

event.emit("start");
console.log("-------------------");
/* ------------------------------ */

// Question 13
const customLogin = require("events");

const loginEvent = new customLogin();

event.on("login", (username) => {
  console.log("Question 13 :", `User logged in: ${username}`);
});

event.emit("login", "Ali");
console.log("-------------------");
/* ------------------------------ */

// Question 14
const readSync = require("fs");

function readSyncFile(obj) {
  const readData = readSync.readFileSync(obj, "utf-8");

  console.log("Question 14 :", readData);
}

readSyncFile("./notes.txt");

console.log("-------------------");
/* ------------------------------ */

// Question 15
const writeSync = require("fs");

function writeSyncFile(path, content) {
  writeSync.writeFile(path, content, (error) => {
    if (error) return console.log(error);
  });
}
console.log("Question 15 :", "saved");

writeSyncFile("./async.txt", "Async save");

console.log("-------------------");
/* ------------------------------ */

// Question 16
const dirExist = require("fs");

function checkDirExist(obj) {
  return dirExist.existsSync(obj);
}

console.log("Question 16 :", checkDirExist("./notes"));

console.log("-------------------");
/* ------------------------------ */

// Question 17
const osCheck = require("os");

function systemInfo() {
  return {
    Platform: osCheck.platform(),
    Arch: osCheck.arch(),
  };
}

console.log("Question 17 :", systemInfo());

//console.log("-------------------");
/* ------------------------------ */

// Question 18
const readChunks = require("fs");

function checkReadChunks(obj) {
  const stream = readChunks.createReadStream(obj, "utf-8");

  stream.on("data", (chunk) => {
    console.log("Question 18 :", chunk);
  });

  stream.on("end", () => {
    console.log("finished reading.");
    console.log("-------------------");
  });
}

checkReadChunks("./big.txt");

/* ------------------------------ */

// Question 19
const copyFile = require("fs");

function checkCopyFile(source, destination) {
  const readStream = copyFile.createReadStream(source);
  const writeStream = copyFile.createWriteStream(destination);

  readStream.pipe(writeStream);

  writeStream.on("finish", () => {
    console.log("Question 19 :", "file copied using streams");
    console.log("-------------------");
  });
}

checkCopyFile("./source.txt", "./dest.txt");

/* ------------------------------ */

// Question 19
const compressFile = require("fs");
const zlib = require("zlib");
const { pipeline } = require("stream");

function checkCompressFile(source, destination) {
  const readStream = compressFile.createReadStream(source);
  const gzip = zlib.createGzip();
  const writeStream = compressFile.createWriteStream(destination);

  pipeline(readStream, gzip, writeStream, (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Question 20 :", "file compressed successfully");
    }
  });
}

checkCompressFile("./big.txt", "./big.gz");

console.log("-------------------");
/* ------------------------------ */
