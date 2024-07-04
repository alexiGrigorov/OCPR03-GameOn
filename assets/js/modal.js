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
      (el) => el.tagName === "BUTTON"
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
      (el) => el.tagName === "BUTTON"
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
    this.submitBtn.addEventListener("click", (e) => {
      e.preventDefault();

      this.validateForm();
    });
    this.validationBlocksArray.forEach((validationBlock) => {
      validationBlock.init();
    });
  }

  validateForm() {
    this.validationBlocksArray.forEach((block) => block.validateBlock());
  }
}

/****/

class ValidationBlock {
  constructor(FIELDSET, validatableInputsArray) {
    this.formData = FIELDSET;
    this.validatableInputsArray = validatableInputsArray;
  }
  init() {
    this.validatableInputsArray.forEach((input) => input.init());
  }
  validateBlock() {
    delete this.formData.dataset.error;
    try {
      this.validatableInputsArray.forEach((input) => input.validateInput());
    } catch (error) {
      this.formData.dataset.error = error.message;
    }
  }
}

/**/

class ValidatableInputText {
  constructor(INPUT) {
    this.input = INPUT;
    this.label = this.input.previousElementSibling;
  }

  init() {}

  validateInput() {
    if (this.input.validity.valid) return;

    if (this.input.validity.valueMissing)
      throw new Error(
        `Veuillez remplir votre ${this.label.innerText.toLowerCase()}.`
      );

    if (this.input.validity.tooShort)
      throw new Error(
        `Veuillez entrer 2 caractères ou plus pour le champ du ${this.label.innerText.toLowerCase()}.`
      );
  }
}

class ValidatableInputEmail {
  constructor(INPUT) {
    this.input = INPUT;
  }

  init() {}
  validateInput() {
    if (this.input.validity.valid) return;

    if (this.input.validity.valueMissing)
      throw new Error(`Veuillez remplir votre email.`);

    if (this.input.validity.typeMismatch)
      throw new Error(`Veuillez saisir un adresse email valide`);
  }
}

class ValidatableInputDate {
  constructor(INPUT) {
    this.input = INPUT;
  }

  init() {}
  validateInput() {}
}

class ValidatableInputNumber {
  constructor(INPUT) {
    this.input = INPUT;
  }

  init() {}
  validateInput() {
    // Custom validation that is outside the scope of the Constraint Validation API
    const onlyDigits = /^-?\d+(\.\d+)?$/;
    if (!onlyDigits.test(this.input.value))
      throw new Error("Veuillez saisir une valeur numérique en chiffres.");

    if (this.input.validity.valid) return;

    if (this.input.validity.rangeUnderflow)
      throw new Error(
        `Il y a toujours une première fois, mais jamais de fois négative`
      );

    if (this.input.validity.rangeOverflow)
      throw new Error(`Nous n'avons même pas organisé autant d'événements`);
  }
}

class ValidatableInputRadio {
  constructor(INPUT) {
    this.input = INPUT;
    this.label = this.input.nextElementSibling;
  }

  init() {
    // this.input.addEventListener("blur", () => this.validate());
    this.label.addEventListener("keyup", (e) => {
      if (e.keyCode === 32) this.input.click();
    });
  }
  validateInput() {}
}

class ValidatableInputCheckbox {
  constructor(INPUT) {
    this.input = INPUT;
    this.label = this.input.nextElementSibling;
  }

  init() {
    // this.input.addEventListener("blur", () => this.validate());
    this.label.addEventListener("keyup", (e) => {
      console.log(e.target);
      if (e.keyCode === 32) this.input.click();
    });
  }
  validateInput() {
    if (this.input.validity.valid) return;

    console.log(this.input.validity);
    if (this.input.validity.valueMissing)
      throw new Error(
        `Veuillez remplir votre ${this.label.innerText.toLowerCase()}.`
      );
  }
}

/********** Instantiating the Validation blocks **********/

const first = new ValidatableInputText(document.getElementById("first"));
const last = new ValidatableInputText(document.getElementById("last"));
const email = new ValidatableInputEmail(document.getElementById("email"));
const birthdate = new ValidatableInputDate(
  document.getElementById("birthdate")
);
const quantity = new ValidatableInputNumber(
  document.getElementById("quantity")
);
const locations = Array.from(document.getElementsByName("location")).map(
  (el) => new ValidatableInputRadio(el)
);
const terms = new ValidatableInputCheckbox(document.getElementById("terms"));
const interested = new ValidatableInputCheckbox(
  document.getElementById("interested")
);

const formValidationBlocks = [first, last, email, birthdate, quantity].map(
  (field) => new ValidationBlock(field.input.parentNode, [field])
);
formValidationBlocks.push(
  new ValidationBlock(locations[0].input.parentNode, locations)
); // location is an array of radio buttons
formValidationBlocks.push(
  new ValidationBlock(document.getElementsByClassName("conditions")[0], [
    terms,
    interested,
  ])
); // location is an array of radio buttons

/********** Instantiating the features **********/
const mainNavbar = new ExpendableNavbar(document.getElementById("mainNavbar"));

const signup = new Modal(
  document.getElementById("signup"),
  document.getElementById("btn-signup")
);
const reserve = new ValidatableForm(
  document.forms["reserve"],
  formValidationBlocks
);
const signupModalForm = new ModalWithValidatableForm(signup, reserve);

/********** Instantiating the app **********/
const app = new App(mainNavbar, signupModalForm);
console.log(app);

app.init();
app.modalWithValidatableForm.modal.dialog.showModal();
