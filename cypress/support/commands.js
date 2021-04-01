Cypress.Commands.add('writeOnInput', ({name,text,isPassword = false}) => {
	cy.get("input[data-test-id = " + name + "]").type(text, {log: !isPassword})
})

Cypress.Commands.add('clickOnButton', (name) => {
	cy.get(`button[data-test-id = ${name} ]`).click()
})