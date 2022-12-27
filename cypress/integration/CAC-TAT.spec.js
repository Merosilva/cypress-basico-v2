/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
  beforeEach(function() {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', function() {
    cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', function() {
    const longText = 'Minha automação com curso Cypress, considerando que estou seguindo todos os passos que está sendo sugerido no curso on line que comprei'
    //Exercício Extra 1 - Cenário de Success
    cy.get ('#firstName').type('Romero')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('romerosilva@outlook.com')
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.contains('button','Enviar').click()

    cy.get('.success').should('be.visible')
  })

    //Exercício Extra 2 - Cenário de Error informando email não válido
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida',function(){
    cy.get ('#firstName').type('Romero')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('romerosilva@outlook,com')
    cy.get('#open-text-area').type('Minhas automações realizadas através do curso Cypress')
    cy.contains('button','Enviar').click()

    cy.get('.error ').should('be.visible')

  })

    //Exercício Extra 3 - Cenário de Error informando um valor não numérico no campo telefone
  it('campo telefone continua vazio quando preenchido com valor não-numérico',function(){
    cy.get('#phone')
      .type('abcdefghij')
      .should('have.value','')

  })

    //Exercício Extra 4 - Cenário de Error marcando flag campo telefone tornando obrigatório sem informá-lo
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
    cy.get ('#firstName').type('Romero')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('romerosilva@outlook.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('Minhas automações realizadas através do curso Cypress')
    cy.contains('button','Enviar').click()

    cy.get('.error ').should('be.visible')
  })

    //Exercício Extra 5 - Cenário validação da função clear onde digita e apaga o campo automaticamente
  it('preenche e limpa os campos nome, sobrenome, email e telefone', function (){
      cy.get('#firstName')
        .type('Romero')
        .should('have.value', 'Romero')
        .clear()
        .should('have.value','')
        cy.get('#lastName')
        .type('Silva')
        .should('have.value', 'Silva')
        .clear()
        .should('have.value','') 
        cy.get('#email')
        .type('romerosilva@outlook.com')
        .should('have.value', 'romerosilva@outlook.com')
        .clear()
        .should('have.value','')  
        cy.get('#phone')
        .type('1234567890')
        .should('have.value', '1234567890')
        .clear()
        .should('have.value','')   
       
    })

      //Exercício Extra 6 - Cenário Error validação dos campos obrigatórios
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
      cy.contains('button','Enviar').click()
      cy.get('.error ').should('be.visible')

    })

    it('envia o formuário com sucesso usando um comando customizado', function() {
      cy.fillMandatoryFieldsAndSubmit()
      cy.get('.success ').should('be.visible')
    })

      //Selecionando opções em campos de seleção suspensa - seleciona um produto (YouTube) por seu texto
    it('seleciona um produto (youtube) por seu texto', function(){
      cy.get('#product')
        .select('youtube')
        .should('have.value','youtube')
    })

      //Selecionando opções em campos de seleção suspensa - seleciona um produto (Mentoria) por seu valor (value)
    it('seleciona um produto (Mentoria) por seu valor (value)',function(){
      cy.get('#product')
        .select('mentoria')
        .should('have.value','mentoria')
    })
      //Selecionando opções em campos de seleção suspensa - seleciona um produto (Blog) por seu índice
    it('seleciona um produto (Blog) por seu índice', function(){
      cy.get('#product')
        .select(1)
        .should('have.value','blog')
    })

      //Marcando inputs do tipo radio - marca o tipo de atendimento "Feedback"
    it('marca o tipo de atendimento "Feedback"', function(){
      cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value','feedback')
    })

      //Marcando inputs do tipo radio - marca cada tipo de atendimento
    it('marca cada tipo de atendimento', function(){
      cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio){
          cy.wrap($radio).check()
          cy.wrap($radio).should('be.checked')
        })
    })

      //Marcando (e desmarcando) inputs do tipo checkbox - marca ambos checkboxes, depois desmarca o último
    it('marca ambos checkboxes, depois desmarca o último',function(){
      cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    })

      //Fazendo upload de arquivos com Cypress - seleciona um arquivo da pasta fixtures
    it('seleciona um arquivo da pasta fixtures', function(){
      cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input) {
          expect($input[0].files[0].name).to.equal('example.json')
        })
    
    })

        //Fazendo upload de arquivos com Cypress - seleciona um arquivo simulando um drag-and-drop (simula clicar no arquivo e arrascar para anexar)
    it('seleciona um arquivo simulando um drag-and-drop', function(){
      cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop'})
        .should(function($input) {
          expect($input[0].files[0].name).to.equal('example.json')
        })
    
        })
      //Fazendo upload de arquivos com Cypress - seleciona um arquivo utilizando uma fixture para a qual foi dada um alias
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
       cy.fixture('example.json').as('samplefile')
       cy.get('input[type="file"]')
         .selectFile('@samplefile')
         .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
      })
  
      //Lidando com links que abrem em outra aba - verifica que a política de privacidade abre em outra aba sem a necessidade de um clique
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
      cy.get('#privacy a').should('have.attr','target','_blank')
    })

    //Lidando com links que abrem em outra aba - acessa a página da política de privacidade removendo o target e então clicando no link
    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
      cy.get('#privacy a')
        .invoke('removeAttr','target')
        .click()
      cy.contains('Talking About Testing').should('be.visible')
    })
            
  })

  

    