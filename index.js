const path = window.__adobe_cep__ ? require("path") : null;
const fs = window.__adobe_cep__ ? require("fs") : null;

/**
 *
 * @param {String} str - The path to attempt resolution to
 * @param {Boolean} asJSON - If data should return as parsed JSON
 */
function resolveString(str, asJSON = false) {
  let result = path
    .resolve(
      str.replace(
        /file\:\/{1,}/,
        navigator.platform.indexOf("Mac") > -1 ? "/" : ""
      )
    )
    .replace(/\\{1}/gm, "/");
  return asJSON ? JSON.parse(result) : result;
}

/**
 *
 * @param {String} root - Base extension path
 * @param {String} file - Name of file to read
 * @param {String} key - When a parsed JSON, return as this key value
 * @param {Boolean} asJSON - If data should return as parsed JSON
 */

function tryReadingFile(root, file, key = "", asJSON = false) {
  root =
    root && root.length
      ? root
      : resolveString(window.__adobe_cep__.getSystemPath("extension"));
  let target = resolveString(`${root}/${file}`);
  if (fs.existsSync(target)) {
    let data = fs.readFileSync(target, "utf-8");
    return asJSON
      ? key || key.length
        ? JSON.parse(data)[key]
          ? JSON.parse(data)[key]
          : ""
        : JSON.parse(data)
      : data;
  } else if (fs.existsSync(target.replace(/%20/g, " "))) {
    let data = fs.readFileSync(target.replace(/%20/g, " "), "utf-8");
    return asJSON
      ? key || key.length
        ? JSON.parse(data)[key]
          ? JSON.parse(data)[key]
          : ""
        : JSON.parse(data)
      : data;
  } else {
    console.error("Target not found:", file, target);
    return null;
  }
}

/**
 * Should be a platform independent way to get localhost
 */
function getLocalHost() {
  let data = tryReadingFile("", "/.debug");
  if (!data) return "http://localhost:8081";
  return `http://localhost:${
    data.match(
      new RegExp(
        `\\<Host\\sName\\=\\"${
          JSON.parse(window.__adobe_cep__.getHostEnvironment()).appName
        }\\"\\sPort\\=\\"(\\d*)`
      )
    )[1]
  }`;
}

/**
 * Should be a platform independent way to get manifest
 */
function getManifestVersion() {
  let data = tryReadingFile("", "/CSXS/manifest.xml");
  if (!data) return "1.0.0";
  return data
    .match(/ExtensionBundleVersion\=\"(\d|\.)*(?=\")/)[0]
    .replace(/\w*\=\"/, "");
}

//
//
//

// If this is browser, return a fake object with static values. Otherwise, be dynamic per host app
const spy = !window.__adobe_cep__
  ? {
      path: {
        root:
          "C:/Users/TRSch/AppData/Roaming/Adobe/CEP/extensions/panelify-demo",
        userData: "C:/Users/TRSch/AppData/Roaming",
        commonFiles: "C:/Program Files/Common Files",
        myDocuments: "C:/Users/TRSch/OneDrive/Documents",
        hostApplication:
          "C:/Program Files/Adobe/Adobe Illustrator 2020/Support Files/Contents/Windows/Illustrator.exe",
      },
      package: {
        name: "panelify-demo",
        version: "1.0.0",
        description: "Bombino-quasar-panelify template",
        productName: "Quasar Panelify",
        cordovaId: "org.cordova.panelify",
        repository: "Inventsable/bombino-quasar-panelify",
        author: "Tom Scharstein II <tom@inventsable.cc>",
        homepage: "https://github.com/Inventsable/panelify-demo",
        capacitorId: "",
        private: true,
        scripts: {
          serve: "quasar dev",
          build: "quasar build",
          sign: "bombino-cmd sign",
          switch: "bombino-cmd switch",
          update: "bombino-cmd update",
          register: "bombino-cmd register",
          help: "bombino-cmd help",
          convert: "node ./bin/convertToPanelify.js",
        },
        dependencies: {
          "@quasar/extras": "^1.0.0",
          "cep-spy": "^1.1.1",
          cluecumber: "0.0.31",
          "lottie-web": "^5.5.9",
          quasar: "^1.0.0",
          starlette: "^0.4.5",
        },
        devDependencies: {
          "@quasar/app": "^1.0.0",
          "@quasar/quasar-app-extension-dotenv": "^1.0.0",
          "bombino-commands": "^1.0.1",
          chalk: "^3.0.0",
          "fs-extra": "^8.1.0",
          inquirer: "^7.0.0",
          "types-for-adobe": "^1.5.0",
        },
        engines: {
          node: ">= 8.9.0",
          npm: ">= 5.6.0",
          yarn: ">= 1.6.0",
        },
        browserslist: ["last 1 version, not dead, ie >= 11"],
      },
      author: "Tom Scharstein II <tom@inventsable.cc>",
      repository: "Inventsable/bombino-quasar-panelify",
      homepage: "https://github.com/Inventsable/panelify-demo",
      localhost: "http://localhost:2266",
      isDev: true,
      extVersion: "1.0.0",
      appName: "ILST",
      appLocale: "en_US",
      appVersion: "24.0.0",
      userAgent: "Windows",
      cepVersion: "9.4.0",
      hostCapabilities: {
        DISABLE_FLASH_EXTENSIONS: false,
        EXTENDED_PANEL_ICONS: true,
        SUPPORT_HTML_EXTENSIONS: true,
        DELEGATE_APE_ENGINE: false,
        EXTENDED_PANEL_MENU: true,
      },
      userId: "",
      extID: "com.panelify-demo.panel",
      exts: [],
      ext: {
        mainPath:
          "C:\\Users\\TRSch\\AppData\\Roaming\\Adobe\\CEP\\extensions\\panelify-demo\\src\\index-dev.html",
        maxHeight: 500,
        maxWidth: 598,
        specialExtensionDataXML: "",
        id: "com.panelify-demo.panel",
        name: "panelify-demo",
        width: 280,
        windowType: "Panel",
        isAutoVisible: true,
        basePath:
          "C:\\Users\\TRSch\\AppData\\Roaming\\Adobe\\CEP\\extensions\\panelify-demo",
        height: 400,
        minWidth: 260,
        requiredRuntimeList: [
          {
            name: "CSXS",
            versionRange: {
              lowerBound: {
                version: {
                  minor: 0,
                  micro: 0,
                  major: 8,
                },
                inclusive: true,
              },
            },
          },
        ],
        minHeight: 300,
        isPluginExtension: false,
        defaultExtensionDataXML: "",
      },
      activeExt: {
        mainPath:
          "C:\\Users\\TRSch\\AppData\\Roaming\\Adobe\\CEP\\extensions\\panelify-demo\\src\\index-dev.html",
        maxHeight: 500,
        maxWidth: 598,
        specialExtensionDataXML: "",
        id: "com.panelify-demo.panel",
        name: "panelify-demo",
        width: 280,
        windowType: "Panel",
        isAutoVisible: true,
        basePath:
          "C:\\Users\\TRSch\\AppData\\Roaming\\Adobe\\CEP\\extensions\\panelify-demo",
        height: 400,
        minWidth: 260,
        requiredRuntimeList: [
          {
            name: "CSXS",
            versionRange: {
              lowerBound: {
                version: {
                  minor: 0,
                  micro: 0,
                  major: 8,
                },
                inclusive: true,
              },
            },
          },
        ],
        minHeight: 300,
        isPluginExtension: false,
        defaultExtensionDataXML: "",
      },
      extName: "panelify-demo",
      getAllExtensions() {
        return null;
      },
      getExtData(id) {
        return null;
      },
      openExtension(ext) {
        return null;
      },
      getVersion(ext) {
        return this.extVersion;
      },
      launchLocalhost(url = null) {
        return null;
      },
      launchInNewTab(url) {
        window.open(url);
      },
      launchHomepage() {
        if (this.homepage) this.launchInNewTab(this.homepage || null);
        else console.log("Panel has no homepage defined in package.json");
      },
      launchGitRepo() {
        if (this.repository)
          this.launchInNewTab("https://github.com/" + this.repository);
        else console.log("Panel has no repo defined in package.json");
      },
    }
  : {
      path: {
        root: resolveString(window.__adobe_cep__.getSystemPath("extension")),
        userData: resolveString(window.__adobe_cep__.getSystemPath("userData")),
        commonFiles: resolveString(
          window.__adobe_cep__.getSystemPath("commonFiles")
        ),
        myDocuments: resolveString(
          window.__adobe_cep__.getSystemPath("myDocuments")
        ),
        hostApplication: resolveString(
          window.__adobe_cep__.getSystemPath("hostApplication")
        ),
      },
      package: tryReadingFile(
        window.__adobe_cep__.getSystemPath("extension"),
        "/package.json",
        "",
        true
      ),
      author: tryReadingFile(
        window.__adobe_cep__.getSystemPath("extension"),
        "/package.json",
        "author",
        true
      ),
      repository: tryReadingFile(
        window.__adobe_cep__.getSystemPath("extension"),
        "/package.json",
        "repository",
        true
      ),
      homepage: tryReadingFile(
        window.__adobe_cep__.getSystemPath("extension"),
        "/package.json",
        "homepage",
        true
      ),
      localhost: getLocalHost(),
      isDev: /localhost/.test(document.location.href),
      extVersion: getManifestVersion(),
      appName: JSON.parse(window.__adobe_cep__.getHostEnvironment()).appName,
      appLocale: JSON.parse(window.__adobe_cep__.getHostEnvironment())
        .appLocale,
      appVersion: JSON.parse(window.__adobe_cep__.getHostEnvironment())
        .appVersion,
      userAgent:
        navigator.platform.indexOf("Win") > -1
          ? "Windows"
          : navigator.platform.indexOf("Mac") > -1
          ? "Mac"
          : "Unknown",
      cepVersion: `${
        JSON.parse(window.__adobe_cep__.getCurrentApiVersion()).major
      }.${JSON.parse(window.__adobe_cep__.getCurrentApiVersion()).minor}.${
        JSON.parse(window.__adobe_cep__.getCurrentApiVersion()).micro
      }`,
      hostCapabilities: JSON.parse(window.__adobe_cep__.getHostCapabilities()),
      userId: window.__adobe_cep__.getCurrentImsUserId(),
      extID: window.__adobe_cep__.getExtensionId(),
      exts: JSON.parse(window.__adobe_cep__.getExtensions()),
      ext: JSON.parse(window.__adobe_cep__.getExtensions()).find((ext) => {
        return ext.id == window.__adobe_cep__.getExtensionId();
      }),
      activeExt: JSON.parse(window.__adobe_cep__.getExtensions()).find(
        (ext) => {
          return ext.id == window.__adobe_cep__.getExtensionId();
        }
      ),
      extName: JSON.parse(window.__adobe_cep__.getExtensions()).find((ext) => {
        return ext.id == window.__adobe_cep__.getExtensionId();
      }).name,
      getAllExtensions() {
        return JSON.parse(window.__adobe_cep__.getExtensions()).map((ext) => {
          let obj = {};
          obj["version"] = this.getVersion(ext);
          return Object.assign(obj, ext);
        });
      },
      getExtData(id) {
        const target = JSON.parse(window.__adobe_cep__.getExtensions()).find(
          (ext) => {
            return ext.id == id;
          }
        );
        target["version"] = this.getVersion(target);
        return target;
      },
      openExtension(ext) {
        window.__adobe_cep__.requestOpenExtension(ext.id);
      },
      getVersion(ext) {
        const xml = window.cep.fs.readFile(`${ext.basePath}/CSXS/manifest.xml`);
        const verID = /ExtensionBundleVersion\=\"(\d|\.)*(?=\")/;
        const match = xml.data.match(verID);
        return match && match.length
          ? match[0].replace(/\w*\=\"/, "")
          : "unknown";
      },
      launchLocalhost(url = null) {
        this.launchInNewTab(url || this.localhost);
      },
      launchInNewTab(url) {
        if (url) cep.util.openURLInDefaultBrowser(url);
      },
      launchHomepage() {
        if (this.homepage) this.launchInNewTab(this.homepage || null);
        else console.log(`Panel has no homepage defined in package.json`);
      },
      launchGitRepo() {
        if (this.repository)
          this.launchInNewTab(`https://github.com/${this.repository}`);
        else console.log(`Panel has no repo defined in package.json.`);
      },
    };

export default spy;
//
//
// UNUSED
//
//
/**
 * @param {String} string - The string to sanitize as Mac equivalent
 * @returns {String} - A correctly formatted path regardless of OS
 */
function getRealString(string) {
  return navigator.platform.indexOf("Mac") > -1
    ? `/${string}`.replace(/\s/g, "\\ ")
    : string;
}

/**
 * @param {Object} parent - The containing object to recurse through
 */
function recheckPathData(parent) {
  function fixPath(string) {
    return navigator.platform.indexOf("Mac") > -1
      ? `/${string}`.replace(/\s/g, "\\ ")
      : string;
  }
  Object.keys(parent).forEach((key) => {
    if (/object/i.test(typeof parent[key]))
      parent[key] = recheckPathData(parent[key]);
    else if (
      /string/i.test(typeof parent[key]) &&
      /(\\|\/)\w{1,}(\\|\/)/.test(parent[key])
    )
      parent[key] = fixPath(parent[key]);
  });
  return parent;
}
