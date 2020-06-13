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

const fakeSpy = {
  path: {
    root: "C:/Users/TRSch/AppData/Roaming/Adobe/CEP/extensions/panelify-demo",
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
};

const spy = {
  path: {
    root: getRealString(
      decodeURI(window.__adobe_cep__.getSystemPath("extension")).replace(
        /file\:\/{1,}/,
        ""
      )
    ),
    userData: getRealString(
      decodeURI(window.__adobe_cep__.getSystemPath("userData")).replace(
        /file\:\/{1,}/,
        ""
      )
    ),
    commonFiles: getRealString(
      decodeURI(window.__adobe_cep__.getSystemPath("commonFiles")).replace(
        /file\:\/{1,}/,
        ""
      )
    ),
    myDocuments: getRealString(
      decodeURI(window.__adobe_cep__.getSystemPath("myDocuments")).replace(
        /file\:\/{1,}/,
        ""
      )
    ),
    hostApplication: getRealString(
      decodeURI(window.__adobe_cep__.getSystemPath("hostApplication")).replace(
        /file\:\/{1,}/,
        ""
      )
    ),
  },
  package: JSON.parse(
    window.cep.fs.readFile(
      getRealString(
        `${decodeURI(window.__adobe_cep__.getSystemPath("extension")).replace(
          /file\:\/{1,}/,
          ""
        )}/package.json`
      )
    ).data
  ),
  author: JSON.parse(
    window.cep.fs.readFile(
      getRealString(
        `${decodeURI(window.__adobe_cep__.getSystemPath("extension")).replace(
          /file\:\/{1,}/,
          ""
        )}/package.json`
      )
    ).data
  ).author,
  repository: JSON.parse(
    window.cep.fs.readFile(
      getRealString(
        `${decodeURI(window.__adobe_cep__.getSystemPath("extension")).replace(
          /file\:\/{1,}/,
          ""
        )}/package.json`
      )
    ).data
  ).repository,
  homepage: JSON.parse(
    window.cep.fs.readFile(
      getRealString(
        `${decodeURI(window.__adobe_cep__.getSystemPath("extension")).replace(
          /file\:\/{1,}/,
          ""
        )}/package.json`
      )
    ).data
  ).homepage,
  localhost: `http://localhost:${
    window.cep.fs
      .readFile(
        getRealString(
          `${decodeURI(window.__adobe_cep__.getSystemPath("extension")).replace(
            /file\:\/{1,}/,
            ""
          )}/.debug`
        )
      )
      .data.match(
        new RegExp(
          `\\<Host\\sName\\=\\"${
            JSON.parse(window.__adobe_cep__.getHostEnvironment()).appName
          }\\"\\sPort\\=\\"(\\d*)`
        )
      )[1]
  }`,
  isDev: /localhost/.test(document.location.href),
  extVersion: window.cep.fs
    .readFile(
      getRealString(
        `${decodeURI(window.__adobe_cep__.getSystemPath("extension")).replace(
          /file\:\/{1,}/,
          ""
        )}/CSXS/manifest.xml`
      )
    )
    .data.match(/ExtensionBundleVersion\=\"(\d|\.)*(?=\")/)[0]
    .replace(/\w*\=\"/, ""),
  appName: JSON.parse(window.__adobe_cep__.getHostEnvironment()).appName,
  appLocale: JSON.parse(window.__adobe_cep__.getHostEnvironment()).appLocale,
  appVersion: JSON.parse(window.__adobe_cep__.getHostEnvironment()).appVersion,
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
  activeExt: JSON.parse(window.__adobe_cep__.getExtensions()).find((ext) => {
    return ext.id == window.__adobe_cep__.getExtensionId();
  }),
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
    return match && match.length ? match[0].replace(/\w*\=\"/, "") : "unknown";
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

const realSpy = window.__adobe_cep__ ? spy : fakeSpy;
export default realSpy;
