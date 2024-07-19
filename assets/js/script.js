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
    this.validatableForm = ValidatableForm;
  }
  init() {
    Object.values(this).forEach((feature) => {
      feature.init();
    });
    this.validatableForm.form.addEventListener("validForm", () => {
      this.modal.closeModal();
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
    this.openBtn.addEventListener("click", () => this.dialog.showModal());
    this.closeBtn.addEventListener("click", () => this.dialog.close());
  }

  showModal() {
    this.dialog.showModal();
  }

  closeModal() {
    this.dialog.close();
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
    const closeFn = (e) => {
      e.preventDefault();
      const validFormEvent = new CustomEvent("validForm"); // create a custom event
      this.form.dispatchEvent(validFormEvent); // dispatch the event
    };
    const submitFn = (e) => {
      e.preventDefault();

      try {
        this.validateForm();
      } catch (error) {
        // console.error(error);
        return;
      }

      // if there is need to submit the form
      // this.form.submit();

      this.form.classList.add("valid");

      //prevent all the inputs from being edited after submission
      Array.from(this.form.elements)
        .filter((el) => el.tagName === "INPUT" && el.type !== "submit")
        .forEach((input) => input.setAttribute("disabled", true));

      this.submitBtn.value = "Fermer";

      // no more form validation, instead change the button to close the modal
      this.submitBtn.removeEventListener("click", submitFn);
      this.submitBtn.addEventListener("click", closeFn);
    };

    this.submitBtn.addEventListener("click", submitFn);

    this.validationBlocksArray.forEach((validationBlock) => {
      validationBlock.init();
    });
  }

  validateForm() {
    const formErrors = [];

    this.validationBlocksArray.forEach((block) => {
      // collects all the blocks that have errors
      try {
        block.validateBlock();
      } catch (error) {
        formErrors.push(error);
      }
    });

    if (formErrors.length !== 0) throw new Error("Invalid form");
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
    this.formData.addEventListener("focusout", (e) => this.validateBlock(e));
  }
  validateBlock(event) {
    delete this.formData.dataset.error;
    try {
      this.validatableInputsArray.forEach((input) => input.validateInput());
    } catch (error) {
      this.formData.dataset.error = error.message;
      if (!event) {
        throw new Error(
          `Invalid form block. ${Array.from(this.formData.children)
            .filter((el) => el.tagName === "LABEL")[0]
            .getAttribute("for")}`
        );
      }
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

  #standardConstraintValidation() {
    if (this.input.validity.valid) return;

    // if (this.input.validity.valueMissing)
    //   throw new Error(
    //     `Veuillez remplir votre ${this.label.innerText.toLowerCase()}.`
    //   );

    // if (this.input.validity.tooShort)
    //   throw new Error(
    //     `Veuillez entrer 2 caractères ou plus pour le champ du ${this.label.innerText.toLowerCase()}.`
    //   );

    // if (this.input.validity.patternMismatch)
    //   throw new Error(
    //     `Veuillez n'utiliser que des lettres (les traits d'union et les accents sont également acceptés).`
    //   );
  }
  #customValidation() {
    if (this.input.value === "") {
      throw new Error(
        `Veuillez remplir votre ${this.label.innerText.toLowerCase()}.`
      );
    }

    if (this.input.value.length < 2) {
      throw new Error(
        `Veuillez entrer 2 caractères ou plus pour le champ du ${this.label.innerText.toLowerCase()}.`
      );
    }

    const onlyLetters = new RegExp("^[p{L} -]+$");

    if (!onlyLetters.test(this.input.value)) {
      throw new Error(
        `Veuillez n'utiliser que des lettres (les traits d'union et les accents sont également acceptés).`
      );
    }
  }

  validateInput() {
    this.#standardConstraintValidation();
    this.#customValidation();
  }
}

class ValidatableInputEmail {
  constructor(INPUT) {
    this.input = INPUT;
  }

  #standardConstraintValidation() {
    if (this.input.validity.valid) return;

    // if (this.input.validity.valueMissing)
    //   throw new Error(`Veuillez remplir votre email.`);

    // if (this.input.validity.typeMismatch)
    //   throw new Error(`Veuillez saisir un adresse email valide`);
  }
  #customValidation() {
    if (this.input.value === "") {
      throw new Error(`Veuillez remplir votre email.`);
    }

    const validEmail = new RegExp(
      "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"
    );

    if (!validEmail.test(this.input.value)) {
      throw new Error(`Veuillez saisir un adresse email valide`);
    }
  }

  init() {}
  validateInput() {
    this.#standardConstraintValidation();
    this.#customValidation();
  }
}

class ValidatableInputDate {
  constructor(INPUT) {
    this.input = INPUT;
  }

  #standardConstraintValidation() {
    if (this.input.validity.valid) return;

    // if (this.input.validity.valueMissing)
    //   throw new Error(`Vous devez entrer votre date de naissance.`);

    // if (this.input.validity.rangeUnderflow)
    //   throw new Error(
    //     `Veuillez nous contacter directement si vous avez plus de 100 ans.`
    //   );
  }
  #customValidation() {
    if (this.input.value === "") {
      throw new Error(`Vous devez entrer votre date de naissance.`);
    }

    const inputDate = new Date(this.input.value);

    if (inputDate > new Date())
      throw new Error(
        `Veuillez vous assurer que vous êtes bien né(e) avant de participer.`
      );

    const dateAdulthood = new Date(inputDate.getTime()).setFullYear(
      inputDate.getFullYear() + 18
    );

    if (dateAdulthood > new Date())
      throw new Error(
        `Vous devez être majeur(e) pour participer à nos événements.`
      );

    const moreThan100YearsAgo = new Date(
      new Date().getFullYear() - 100,
      new Date().getMonth(),
      new Date().getDate()
    );

    if (inputDate < moreThan100YearsAgo)
      throw new Error(
        `Veuillez nous contacter directement si vous avez plus de 100 ans.`
      );
  }

  init() {}
  validateInput() {
    this.#standardConstraintValidation();
    this.#customValidation();
  }
}

class ValidatableInputNumber {
  constructor(INPUT) {
    this.input = INPUT;
  }

  #standardConstraintValidation() {
    if (this.input.validity.valid) return;

    // if (this.input.validity.rangeUnderflow)
    //   throw new Error(
    //     `Il y a toujours une première fois, mais jamais de fois négative`
    //   );

    // if (this.input.validity.rangeOverflow)
    //   throw new Error(`Nous n'avons même pas organisé autant d'événements`);
  }
  #customValidation() {
    if (Number.parseInt(this.input.value) < 0)
      throw new Error(
        `Il y a toujours une première fois, mais jamais de fois négative`
      );

    if (Number.parseInt(this.input.value) > 30)
      throw new Error(`Nous n'avons même pas organisé autant d'événements`);

    const onlyDigits = /^-?\d+(\.\d+)?$/;
    if (!onlyDigits.test(this.input.value))
      throw new Error("Veuillez saisir une valeur numérique en chiffres.");
  }

  init() {}
  validateInput() {
    this.#standardConstraintValidation();
    this.#customValidation();
  }
}

class ValidatableInputRadio {
  constructor(INPUT) {
    this.input = INPUT;
    this.label = this.input.nextElementSibling;
  }

  #standardConstraintValidation() {
    if (this.input.validity.valid) return;

    // if (this.input.validity.valueMissing)
    //   throw new Error("Vous devez choisir une option.");
  }
  #customValidation() {
    const radioGroup = Array.from(
      document.querySelectorAll(`input[name="${this.input.name}"]`)
    );

    const selectedValue = radioGroup.reduce(
      (value, radio) => (radio.checked ? radio.value : value),
      null
    );
    if (!selectedValue) throw new Error("Vous devez choisir une option.");
  }

  init() {
    this.label.addEventListener("keyup", (e) => {
      if (e.keyCode === 32) this.input.click();
    });
  }
  validateInput() {
    this.#standardConstraintValidation();
    this.#customValidation();
  }
}

class ValidatableInputCheckbox {
  constructor(INPUT, customErrorMessage) {
    this.input = INPUT;
    this.label = this.input.nextElementSibling;
    this.customErrorMessage = customErrorMessage;
  }

  init() {
    this.label.addEventListener("keyup", (e) => {
      if (e.keyCode === 32) this.input.click();
    });
  }
  validateInput() {
    if (this.input.validity.valid) return;

    // if (this.input.validity.valueMissing)
    //   throw new Error(this.customErrorMessage);

    if (this.input.value) throw new Error(this.customErrorMessage);
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
const terms = new ValidatableInputCheckbox(
  document.getElementById("terms"),
  "Vous devez vérifier que vous acceptez les termes et conditions."
);

// There is no need to create an object for interested as it is not validated, but we can easily do so
// const interested = new ValidatableInputCheckbox(
//   document.getElementById("interested"),
//   "Veuillez cocher cette case pour continuer."
// );

const formValidationBlocks = [
  first,
  last,
  email,
  birthdate,
  quantity,
  terms,
].map((field) => new ValidationBlock(field.input.parentNode, [field]));

// location is an array of radio buttons
formValidationBlocks.push(
  new ValidationBlock(locations[0].input.parentNode, locations)
);

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

/********** Initializing the app **********/
app.init();
