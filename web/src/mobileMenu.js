const menutoggle = document.querySelector("#menuToggle");
const links = document.querySelectorAll("a")

for (let link of links) {
    link.addEventListener('click', () => {
        menutoggle.checked = false;
    });
}