const fs = require("fs");
const path = require("path");

function findJsFiles(dir) {
  let results = [];
  fs.readdirSync(dir).forEach(file => {
    file = path.resolve(dir, file);
    let stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(findJsFiles(file));
    } else if (file.endsWith(".js")) {
      results.push(file);
    }
  });
  return results;
}

function checkRequires(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const regex = /require['"](.+?)['"]/g;
  const dir = path.dirname(filePath);
  let match;
  let missing = [];

  while ((match = regex.exec(content)) !== null) {
    const reqPath = match[1];
    if (reqPath.startsWith(".")) {
      const fullPath = path.resolve(dir, reqPath);
      if (!fs.existsSync(fullPath + ".js") && !fs.existsSync(fullPath + "/index.js")) {
        missing.push(reqPath);
      }
    }
  }

  return missing;
}

function checkSyntax(filePath) {
  try {
    new Function(fs.readFileSync(filePath, "utf8"));
    return null;
  } catch (err) {
    return err.message;
  }
}

// تشغيل الفحص
const baseDir = process.cwd(); // مجلد التشغيل الحالي
const files = findJsFiles(baseDir);
let hasIssues = false;

files.forEach(file => {
  const syntaxError = checkSyntax(file);
  const requireErrors = checkRequires(file);

  if (syntaxError || requireErrors.length > 0) {
    hasIssues = true;
    console.log("\n[!] File:", file.replace(baseDir + "/", ""));
    if (syntaxError) console.log("    Syntax Error:", syntaxError);
    if (requireErrors.length > 0) {
      console.log("    Missing Requires:");
      requireErrors.forEach(r => console.log("     -", r));
    }
  }
});

if (!hasIssues) {
  console.log("✔️ لا توجد مشاكل في الكود أو الموديولات المطلوبة.");
}