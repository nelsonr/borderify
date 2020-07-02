const browser = chrome || browser;
const options = document.querySelectorAll('input');

options.forEach((option) => {
    if (option.type === 'text') {
        option.addEventListener('input', updateStylesheet);
    }

    if (option.type === 'checkbox') {
        option.addEventListener('change', updateStylesheet);
    }
});

function updateStylesheet() {
    let css = '';

    const selectors = []
        .filter.call(options, (option) => {
            if (option.type === 'checkbox') {
                return option.checked;
            } else if (option.type === 'text') {
                return option.value.length > 0;
            }

            return false;
        })
        .map((option) => `.borderify ${option.value}`)
        .join(',\n');

    if (selectors.length > 0) {
        css = `${selectors} { outline: 1px solid hotpink; }`;
    }

    browser.tabs.query({ currentWindow: true, active: true }, (tabs) => {
        browser.tabs.sendMessage(tabs[0].id, { action: 'update', css: css });
    });

    // const textarea = document.querySelector('textarea');
    // textarea.textContent = css;
}