class FullscreenButtonPlugin {
    constructor(options = {}) {
        this.lang = options.lang || document.documentElement.lang || "en";
        this.buttonLabel = options.buttonLabel || fullscreen_locales[this.lang]?.[0] || "Fullscreen";
        this.exitLabel = options.exitLabel || fullscreen_locales[this.lang]?.[1] || "Exit Fullscreen";
        this.autohide = typeof options.autohide !== "undefined" ? options.autohide : true;
    }

    "after:highlightElement"({ el }) {
        // Prevent duplicate buttons
        if (el.parentElement.querySelector(".hljs-fullscreen-button")) return;

        // Create container and button
        let container = Object.assign(document.createElement("div"), { className: "hljs-fullscreen-container" });
        container.dataset.autohide = this.autohide;
        let button = Object.assign(document.createElement("button"), {
            innerHTML: this.buttonLabel,
            className: "hljs-fullscreen-button"
        });

        // Add container and button to DOM
        el.parentElement.classList.add("hljs-fullscreen-wrapper");
        el.parentElement.appendChild(container);
        container.appendChild(button);
        container.style.setProperty("--hljs-theme-background", window.getComputedStyle(el).backgroundColor);
        container.style.setProperty("--hljs-theme-color", window.getComputedStyle(el).color);
        container.style.setProperty("--hljs-theme-padding", window.getComputedStyle(el).padding);

        // Fullscreen logic
        button.onclick = () => {
            if (!el.parentElement.classList.contains("hljs-fullscreen-active")) {
                el.parentElement.classList.add("hljs-fullscreen-active");
                button.innerHTML = this.exitLabel;
                document.body.style.overflow = "hidden";
            } else {
                el.parentElement.classList.remove("hljs-fullscreen-active");
                button.innerHTML = this.buttonLabel;
                document.body.style.overflow = "";
            }
        };
    }
}

// Simple i18n
const fullscreen_locales = {
    en: ["Fullscreen", "Exit Fullscreen"],
    es: ["Pantalla completa", "Salir de pantalla completa"],
    fr: ["Plein écran", "Quitter le plein écran"],
    de: ["Vollbild", "Vollbild verlassen"],
    ja: ["全画面表示", "全画面表示を終了"],
    ko: ["전체 화면", "전체 화면 종료"],
    ru: ["На весь экран", "Выйти из полноэкранного режима"],
    zh: ["全屏", "退出全屏"],
    "zh-tw": ["全螢幕", "離開全螢幕"]
};

// Check if the NodeJS environment is available before exporting the class
if (typeof module != "undefined") {
  module.exports = FullscreenButtonPlugin;
}

