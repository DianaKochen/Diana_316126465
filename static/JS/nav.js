const navLinks = [
    { link: "/index.html", text: "Home", active: false },
    { link: "/EnterDetails.html", text: "Enter Details", active: false },
    { link: "/reviews.html", text: "Reviews", active: false },
    { link: "/AboutUs.html", text: "About Us", active: false },
    { link: "/ContactUs.html", text: "Contact Us", active: false },
];

const activeLink = navLinks.find(link => link.link === window.location.pathname);
if (activeLink) {
    activeLink.active = true;
}

let navLinksHTML = `<nav id="site-nav" class="navbar bg-success nav nav-pills nav-justified" data-bs-theme="dark">`;
for (let i = 0; i < navLinks.length; i++) {
    const navlink = navLinks[i];
    if (navlink.active) {
        navLinksHTML += `<a class="nav-item nav-link active bg-success" href="${navlink.link}">${navlink.text}</a>`;
    }
    else {
        navLinksHTML += `<a class="nav-item nav-link bg-success" href="${navlink.link}">${navlink.text}</a>`;
    }
}
navLinksHTML += `</nav>`;

document.body.innerHTML = navLinksHTML + document.body.innerHTML;
