function hideMenu() {
    const menuToggle = document.querySelector("#menuToggle");
    const links = document.querySelectorAll("a")

    for (let link of links) {
        link.addEventListener('click', () => {
            menuToggle.checked = false;
        });
    }
}