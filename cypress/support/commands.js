Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get ('#firstName').type('Romero')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('romerosilva@outlook.com')
    cy.get('#open-text-area').type('Minhas automações realizadas através do curso Cypress')
    cy.contains('button','Enviar').click()
})