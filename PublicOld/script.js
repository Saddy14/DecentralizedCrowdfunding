const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('class', currentTheme);

    if (currentTheme === 'dark-mode') {
        toggleSwitch.checked = true;
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('class', 'dark-mode');
        localStorage.setItem('theme', 'dark-mode');
    } else {
        document.documentElement.setAttribute('class', '');
        localStorage.setItem('theme', 'light-mode');
    }    
}

toggleSwitch.addEventListener('change', switchTheme, false);

