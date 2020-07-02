const browser = chrome || browser;

function updateStylesheet(css) {
    const stylesheet = getStylesheet();
    stylesheet.textContent = undefined;

    if (css.length > 0) {
        stylesheet.textContent = css;
    }
}

function getStylesheet() {
    let stylesheet = document.head.querySelector('style.borderify-stylesheet');

    if (stylesheet === null) {
        stylesheet = document.createElement('style');
        stylesheet.type = 'text/css';
        stylesheet.classList.add('borderify-stylesheet');

        document.head.appendChild(stylesheet);
    }

    return stylesheet;
}

window.addEventListener('load', () => {
    document.body.classList.add('borderify');

    browser.runtime.onMessage.addListener((message) => {
        if (message.action == 'update') {
            updateStylesheet(message.css);
        }
    });
});