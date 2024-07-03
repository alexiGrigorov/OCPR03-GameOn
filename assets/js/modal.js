/********** Classes **********/

/********** App **********/

class App {
  constructor(expendableNavbar, modal, validatableForm) {
    this.expendableNavbar = expendableNavbar;
    this.modal = modal;
    this.validatableForm = validatableForm;
  }
  init() {
    console.log("App connected");
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
    console.log("ExpendableNavbar connected");
    this.menuBtn.addEventListener("click", () => this.toggleExpanded());
  }
}

/*****/

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

/*****/

class ValidatableForm {
  constructor(formElement, submitBtn) {
    this.form = formElement;
    if (!this.form.contains(submitBtn)) {
      throw new Error(
        "The provided submit button is not associated with this form"
      );
    }
    this.submitBtn = submitBtn;
  }
  init() {
    console.log("ValidatableForm connected");
  }

  validateForm() {}
}

/********** Validatable Form Elements **********/

class ValidatableTextInput {
  constructor(formDataElement, inputTextElement) {
    if (!formDataElement.classList.contains("formData")) {
      throw new Error("The provided element is not formData input wrapper");
    }

    this.formData = formDataElement;

    if (!formDataElement.contains(inputTextElement)) {
      throw new Error(
        "The provided element is not the appropriate input element for the formData wrapper"
      );
    }

    if (inputTextElement.type !== "text") {
      throw new Error("The provided element is not a text input");
    }
    this.input = inputTextElement;
  }

  init() {
    console.log(`${this.input.id} ValidatableTextInput is connected`);
    this.input.addEventListener("blur", () => this.validate());
  }
  validate() {
    let error = null;

    const value = this.input.value.trim();
  }
}

//

const first = new ValidatableTextInput(
  document.getElementById("first").parentElement,
  document.getElementById("first")
);
first.init();

//

/********** Instantiating the features **********/
const siteHeader = new ExpendableNavbar(document.getElementById("mainNavbar"));

const signupModal = new Modal(
  document.getElementById("signup"),
  document.getElementById("btn-signup")
);

const form = new ValidatableForm(
  document.forms["reserve"],
  document.getElementById("btn-submit")
  // test for the constructor validation -> document.getElementById("btn-signup")
);

/********** Instantiating the app **********/
const app = new App(siteHeader, signupModal, form);
app.init();
app.modal.dialog.showModal();

// DOM Elements

const formData = document.querySelectorAll(".formData");
