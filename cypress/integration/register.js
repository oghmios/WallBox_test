import { UUID } from "../support/common_functions";

describe("Wallbox register", () => {
  let randomName = UUID();

  it("Visit page", () => {
    cy.visit(Cypress.config().baseUrl);
  });
  it("Open register modal", () => {
    cy.clickOnButton("registerBtn"), 
    cy.get(".modal-wrapper").should("exist");
  });
  it("Fill elements", () => {
    cy.writeOnInput({ name: "nameInputModal", text: `name_${randomName}` }),
      cy.writeOnInput({ name: "surnameInputModal", text: `surname_${randomName}` }),
      cy.writeOnInput({ name: "emailInputModal", text: `${randomName}@notvalid.com` }),
      cy.writeOnInput({ name: "confirmEmailInputModal", text: `${randomName}@notvalid.com` }),
      cy.writeOnInput({ name: "passwordInputModal", text: "Alfalfa123", isPassword: true }),
      cy.writeOnInput({ name: "confirmPasswordInputModal", text: "Alfalfa123", isPassword: true }),
      cy.get("div[data-test-id = 'countrySelectModal']").find("input").first().type("Spain"),
      cy.get("li").contains("Spain").should("exist"),
      cy.get("li").contains("Spain").click(),
      cy.get(".checkbox-content").eq(0).click();
  });
  it("Send and check", () => {
    cy.clickOnButton("registerBtnModal"),
      // cy.get(".modal-wrapper").find("p").should("contain", "Gracias"),
      cy.get("button[data-test-id = 'confirmBtnModal'").should("be.visible");
  });
});

// ---------------------------------- NEGATIVE TESTS -------------------------------------------

describe("Form without data", () => {
  it("Visit page", () => {
    cy.visit(Cypress.config().baseUrl);
  });
  it("Open register modal", () => {
    cy.clickOnButton("registerBtn"), 
    cy.get(".modal-wrapper").should("exist");
  });
  it("Send and check", () => {
    cy.clickOnButton("registerBtnModal"),
    cy.get("button[data-test-id = 'confirmBtnModal'").should("not.exist");
      cy.get(".wbInput-have-errors").should("be.visible");
  });
});


describe("Wrong email", () => {
  it("Visit page", () => {
    cy.visit(Cypress.config().baseUrl);
  });
  it("Open register modal", () => {
    cy.clickOnButton("registerBtn"), 
    cy.get(".modal-wrapper").should("exist");
  });
  it("Fill elements correctly", () => {
    cy.writeOnInput({ name: "nameInputModal", text: `name` }),
      cy.writeOnInput({ name: "surnameInputModal", text: `surname` }),
      cy.writeOnInput({ name: "passwordInputModal", text: "Alfalfa123", isPassword: true }),
      cy.writeOnInput({ name: "confirmPasswordInputModal", text: "Alfalfa123", isPassword: true }),
      cy.get("div[data-test-id = 'countrySelectModal']").find("input").first().type("Spain"),
      cy.get("li").contains("Spain").should("exist"),
      cy.get("li").contains("Spain").click(),
      cy.get(".checkbox-content").eq(0).click();
  });
  it("Fill wrong email", () => {
      cy.writeOnInput({ name: "emailInputModal", text: `notvalidemail` }),
      cy.writeOnInput({ name: "confirmEmailInputModal", text: `notvalidemail` })
  });
  it("Send and check", () => {
    cy.clickOnButton("registerBtnModal"),
    cy.get("button[data-test-id = 'confirmBtnModal'").should("not.exist");
      cy.get(".modal-wrapper").find("span").should("contain", "Dirección de correo electrónico inválida")
  });
});

describe("Passwords don't match", () => {
  it("Visit page", () => {
    cy.visit(Cypress.config().baseUrl);
  });
  it("Open register modal", () => {
    cy.clickOnButton("registerBtn"), 
    cy.get(".modal-wrapper").should("exist");
  });
  it("Fill elements correctly", () => {
    cy.writeOnInput({ name: "nameInputModal", text: `name` }),
      cy.writeOnInput({ name: "surnameInputModal", text: `surname` }),
      cy.writeOnInput({ name: "emailInputModal", text: `email@test.com` }),
      cy.writeOnInput({ name: "confirmEmailInputModal", text: `email@test.com` }),
      cy.get("div[data-test-id = 'countrySelectModal']").find("input").first().type("Spain"),
      cy.get("li").contains("Spain").should("exist"),
      cy.get("li").contains("Spain").click(),
      cy.get(".checkbox-content").eq(0).click();
  });
  it("Fill different passwords", () => {
    cy.writeOnInput({ name: "passwordInputModal", text: "CorrectPassword123"}),
    cy.writeOnInput({ name: "confirmPasswordInputModal", text: "anotherPassword"})
  });
  it("Send and check", () => {
    cy.clickOnButton("registerBtnModal"),
    cy.get("button[data-test-id = 'confirmBtnModal'").should("not.exist");
      cy.get(".modal-wrapper").find("span").should("contain", "Los valores introducidos no coinciden")
  });
});

describe("Password doesn't fulfill requirements", () => {
  it("Visit page", () => {
    cy.visit(Cypress.config().baseUrl);
  });
  it("Open register modal", () => {
    cy.clickOnButton("registerBtn"), 
    cy.get(".modal-wrapper").should("exist");
  });
  it("Fill elements correctly", () => {
    cy.writeOnInput({ name: "nameInputModal", text: `name` }),
      cy.writeOnInput({ name: "surnameInputModal", text: `surname` }),
      cy.writeOnInput({ name: "emailInputModal", text: `email@test.com` }),
      cy.writeOnInput({ name: "confirmEmailInputModal", text: `email@test.com` }),
      cy.get("div[data-test-id = 'countrySelectModal']").find("input").first().type("Spain"),
      cy.get("li").contains("Spain").should("exist"),
      cy.get("li").contains("Spain").click(),
      cy.get(".checkbox-content").eq(0).click();
  });
  it("Fill password without full requirements", () => {
    cy.writeOnInput({ name: "passwordInputModal", text: "pass"}),
    cy.writeOnInput({ name: "confirmPasswordInputModal", text: "pass"})
  });
  it("Send and check", () => {
    cy.clickOnButton("registerBtnModal"),
    cy.get("button[data-test-id = 'confirmBtnModal'").should("not.exist");
      cy.get(".modal-wrapper").find("span").should("contain", "Debe tener al menos 6 caracteres, incluyendo 1 letra mayúscula y 1 número.")
  });
});

