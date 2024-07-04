/****** Classes ******/

/**********/

class App {
  constructor(expendableNavbar, modalWithValidatableForm) {
    this.expendableNavbar = expendableNavbar;
    this.modalWithValidatableForm = modalWithValidatableForm;
  }
  init() {
    Object.values(this).forEach((feature) => {
      feature.init();
    });
  }
}

/********/

class ExpendableNavbar {
  constructor(NAV) {
    this.navBar = NAV;
    this.menuBtn = Array.from(this.navBar.children).filter(
      (el) => el.tagName === "I"
    )[0];
  }
  toggleExpanded() {
    this.navBar.classList.toggle("expanded");
  }
  init() {
    this.menuBtn.addEventListener("click", () => this.toggleExpanded());
  }
}

class ModalWithValidatableForm {
  constructor(modal, ValidatableForm) {
    this.modal = modal;
    this.ValidatableForm = ValidatableForm;
  }
  init() {
    Object.values(this).forEach((feature) => {
      feature.init();
    });
  }
}

/******/

class Modal {
  constructor(DIALOG, BUTTON) {
    this.dialog = DIALOG;
    this.openBtn = BUTTON;
    this.closeBtn = Array.from(this.dialog.children).filter(
      (el) => el.tagName === "I"
    )[0];
  }
  init() {
    // console.log("Modal connected");
    this.openBtn.addEventListener("click", () => this.dialog.showModal());
    this.closeBtn.addEventListener("click", () => this.dialog.close());
  }
}

class ValidatableForm {
  constructor(FORM, validationBlocksArray) {
    this.form = FORM;
    this.submitBtn = Array.from(this.form.children).filter(
      (el) => el.type === "submit"
    )[0];

    this.validationBlocksArray = validationBlocksArray;
  }
  init() {
    console.log("ValidatableForm connected");
  }

  validateForm() {}
}

/****/

class ValidationBlock {
  constructor(DIV, validatableInputsArray) {
    this.formData = DIV;
    this.validatableInputsArray = validatableInputsArray;
  }
  init() {
    console.log("ValidationBlock connected");
  }
  validateBlock() {}
}

/**/

class ValidatableInputText {
  constructor(INPUT) {
    this.input = INPUT;
  }

  init() {
    this.input.addEventListener("blur", () => this.validate());
  }
  validate() {
    console.log(`${this.input.id} validated`);
  }
}

class ValidatableInputEmail {
  constructor(INPUT) {
    this.input = INPUT;
  }

  init() {
    this.input.addEventListener("blur", () => this.validate());
  }
  validate() {
    console.log(`${this.input.id} validated`);
  }
}

class ValidatableInputDate {
  constructor(INPUT) {
    this.input = INPUT;
  }

  init() {
    this.input.addEventListener("blur", () => this.validate());
  }
  validate() {
    console.log(`${this.input.id} validated`);
  }
}

class ValidatableInputNumber {
  constructor(INPUT) {
    this.input = INPUT;
  }

  init() {
    this.input.addEventListener("blur", () => this.validate());
  }
  validate() {
    console.log(`${this.input.id} validated`);
  }
}

class ValidatableInputRadio {
  constructor(INPUT) {
    this.input = INPUT;
  }

  init() {
    this.input.addEventListener("blur", () => this.validate());
  }
  validate() {
    console.log(`${this.input.id} validated`);
  }
}

class ValidatableInputCheckbox {
  constructor(INPUT) {
    this.input = INPUT;
  }

  init() {
    this.input.addEventListener("blur", () => this.validate());
  }
  validate() {
    console.log(`${this.input.id} validated`);
  }
}

/********** Instantiating the features **********/
const siteHeader = new ExpendableNavbar(document.getElementById("mainNavbar"));

const signupModal = new Modal(
  document.getElementById("signup"),
  document.getElementById("btn-signup")
);
const reserve = new ValidatableForm(document.forms["reserve"], []);
const signup = new ModalWithValidatableForm(signupModal, reserve);

/********** Instantiating the app **********/
const app = new App(siteHeader, signup);
app.init();
app.modalWithValidatableForm.modal.dialog.showModal();
