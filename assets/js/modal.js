/********** Classes **********/

/********** App **********/

class App {
  constructor(expendableNavbar, modal, validatableForm) {
    this.expendableNavbar = expendableNavbar;
    this.modal = modal;
    this.validatableForm = validatableForm;
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
  constructor(inputTextElement, formDataElement) {
    if (inputTextElement.type !== "text") {
      throw new Error("The provided element is not a text input");
    }
    this.input = inputTextElement;

    if (!formDataElement.classList.contains("formData")) {
      throw new Error("The provided element is not formData input wrapper");
    }
    if (!formDataElement.contains(this.input)) {
      throw new Error(
        "The provided element is not the appropriate formData input wrapper for the input element"
      );
    }

    this.formData = formDataElement;

    // this.formData.dataset.errorVisible = "false";
  }

  init() {
    console.log(`${this.input.id} ValidatableTextInput is connected`);
  }
  validate() {}
}

//

const first = new ValidatableTextInput(
  document.getElementById("first"),
  document.getElementById("first").parentElement
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
