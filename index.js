export default {
  path: {
    root: decodeURI(window.__adobe_cep__.getSystemPath("extension")).replace(
      /file\:\/{1,}/,
      ""
    ),
    userData: decodeURI(window.__adobe_cep__.getSystemPath("userData")).replace(
      /file\:\/{1,}/,
      ""
    ),
    commonFiles: decodeURI(
      window.__adobe_cep__.getSystemPath("commonFiles")
    ).replace(/file\:\/{1,}/, ""),
    myDocuments: decodeURI(
      window.__adobe_cep__.getSystemPath("myDocuments")
    ).replace(/file\:\/{1,}/, ""),
    hostApplication: decodeURI(
      window.__adobe_cep__.getSystemPath("hostApplication")
    ).replace(/file\:\/{1,}/, "")
  },
  package: JSON.parse(
    window.cep.fs.readFile(
      `${decodeURI(window.__adobe_cep__.getSystemPath("extension")).replace(
        /file\:\/{1,}/,
        ""
      )}/package.json`
    ).data
  ),
  author: JSON.parse(
    window.cep.fs.readFile(
      `${decodeURI(window.__adobe_cep__.getSystemPath("extension")).replace(
        /file\:\/{1,}/,
        ""
      )}/package.json`
    ).data
  ).author,
  repository: JSON.parse(
    window.cep.fs.readFile(
      `${decodeURI(window.__adobe_cep__.getSystemPath("extension")).replace(
        /file\:\/{1,}/,
        ""
      )}/package.json`
    ).data
  ).repository,
  homepage: JSON.parse(
    window.cep.fs.readFile(
      `${decodeURI(window.__adobe_cep__.getSystemPath("extension")).replace(
        /file\:\/{1,}/,
        ""
      )}/package.json`
    ).data
  ).homepage,
  localhost: `http://localhost:${
    window.cep.fs
      .readFile(
        `${decodeURI(window.__adobe_cep__.getSystemPath("extension")).replace(
          /file\:\/{1,}/,
          ""
        )}/.debug`
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
      `${decodeURI(window.__adobe_cep__.getSystemPath("extension")).replace(
        /file\:\/{1,}/,
        ""
      )}/CSXS/manifest.xml`
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
  ext: JSON.parse(window.__adobe_cep__.getExtensions()).find(ext => {
    return ext.id == window.__adobe_cep__.getExtensionId();
  }),
  activeExt: JSON.parse(window.__adobe_cep__.getExtensions()).find(ext => {
    return ext.id == window.__adobe_cep__.getExtensionId();
  }),
  extName: JSON.parse(window.__adobe_cep__.getExtensions()).find(ext => {
    return ext.id == window.__adobe_cep__.getExtensionId();
  }).name,
  getAllExtensions() {
    return JSON.parse(window.__adobe_cep__.getExtensions()).map(ext => {
      let obj = {};
      obj["version"] = this.getVersion(ext);
      return Object.assign(obj, ext);
    });
  },
  getExtData(id) {
    const target = JSON.parse(window.__adobe_cep__.getExtensions()).find(
      ext => {
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
  launchLocalHost(url = null) {
    if (this.localhost) this.launchInNewTab(this.localhost || null);
    else console.log(`Panel has no .debug file`);
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
  }
};
