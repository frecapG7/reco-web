// eslint-disable-next-line no-undef
const fse = require("fs-extra");
// eslint-disable-next-line no-undef
const path = require("path");
// eslint-disable-next-line no-undef
const topDir = __dirname;
fse.emptyDirSync(path.join(topDir, "public", "tinymce"));
fse.copySync(
  path.join(topDir, "node_modules", "tinymce"),
  path.join(topDir, "public", "tinymce"),
  { overwrite: true }
);
fse.copySync(
  path.join(topDir, "plugins", "tinymce"),
  path.join(topDir, "public", "tinymce"),
  { overwrite: true }
);
