/********** Classes **********/

/********** App Features **********/

class App {
  constructor(expendableNavbar, formModal) {
    this.expendableNavbar = expendableNavbar;
    this.formModal = formModal;
  }
  init() {
    Object.values(this).forEach((feature) => {
      feature.init();
    });
  }
}

/********** App Features **********/

class ExpendableNavbar {
  constructor(navElement) {
    this.nav = navElement;
    this.menuBtn = this.nav.lastElementChild;
  }
  toggleExpanded() {
    console.log("clicked");
    this.nav.classList.toggle("expanded");
  }
  init() {
    this.menuBtn.addEventListener("click", () => this.toggleExpanded());
  }
}

class Modal {
  constructor(dialogElement, openBtn) {
    this.dialog = dialogElement;
    this.openBtn = openBtn;
    this.closeBtn = dialogElement.firstElementChild;
  }
  init() {
    console.log("Modal connected");
    this.openBtn.addEventListener("click", () => this.dialog.showModal());
    this.closeBtn.addEventListener("click", () => this.dialog.close());
  }
}

const siteHeader = new ExpendableNavbar(document.getElementById("mainNavbar"));
const signupModal = new Modal(
  document.getElementsByClassName("signup")[0],
  document.getElementsByClassName("btn-signup")[0]
);
const app = new App(siteHeader, signupModal);
app.init();
app.formModal.dialog.showModal();

// DOM Elements

const formData = document.querySelectorAll(".formData");
