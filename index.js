export default {
  rootPath: decodeURI(window.__adobe_cep__.getSystemPath("extension")).replace(
    /file\:\/{1,}/,
    ""
  ),
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
    cep.util.openURLInDefaultBrowser(url || this.localhost);
  }
};
