/// <reference types="cypress" />

describe('Testes para a agenda de contatos', () => {
  // Antes de cada teste, visita a página da aplicação
  beforeEach(() => {
    cy.visit('https://ebac-agenda-contatos-tan.vercel.app/')
  })

  it('Deve incluir um novo contato na lista', () => {
    // Preenche os campos do formulário
    cy.get('input[type="text"]').type('Fulano de Tal')
    cy.get('input[type="email"]').type('fulano@teste.com')
    cy.get('input[type="tel"]').type('11988887777')
    
    // Clica no botão de adicionar (geralmente o botão de submit do form)
    cy.get('.adicionar').click()

    // Verifica se o novo contato aparece na lista
    cy.contains('Fulano de Tal').should('exist')
    cy.contains('fulano@teste.com').should('exist')
  })

  it('Deve alterar um contato existente', () => {
    // Clica no botão "Editar" do primeiro contato da lista
    cy.get('.edit').first().click()

    // Limpa os campos e digita novos valores
    cy.get('input[type="text"]').clear().type('Nome Alterado')
    cy.get('input[type="email"]').clear().type('alterado@email.com')
    
    // Salva a alteração
    cy.get('.alterar').click()

    // Valida se as alterações foram aplicadas
    cy.contains('Nome Alterado').should('exist')
    cy.contains('alterado@email.com').should('exist')
  })

  it('Deve remover um contato da lista', () => {
    // Armazena o nome do contato que será deletado para verificar depois
    cy.get('h3').first().invoke('text').then((nomeContato) => {
      // Clica no botão "Deletar" do primeiro contato
      cy.get('.delete').first().click()

      // Verifica se o nome do contato não existe mais na página
      cy.contains(nomeContato).should('not.exist')
    })
  })
})
