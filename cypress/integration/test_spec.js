describe('AddStaff', () => {

    it('AddStaff', () => {
        cy.visit('/')
        cy.get('#openStaff').click();
        cy.url().should('include', '/staff')
        cy.get('#addItem').click();

        cy.get('#nameStaffTF')
            .type('Название штаба')

        cy.get('#dataCreatedStaffTF')
          .type('2017-04-14')
           // .contains('2017-04-14')
        cy.server()

        cy.route('POST', '/staff/add').as('AddStaff')

        cy.server()

        cy.route('GET', '/staff').as('AddStaff')

        cy.get('#saveBtn').click();
        // cy.wait('@AddStaff').its('status').should('eq', 200)
        // cy.wait('@AddStaff').its('status').should('eq', 200)
        })
})

describe('UpdateStaff', () => {

    it('UpdateStaff', () => {
        cy.visit('/')
        cy.get('#openStaff').click();
        cy.url().should('include', '/staff')
        cy.get('#addItem').click();

        cy.get('#nameStaffTF')
            .type('Название штаба')

        cy.get('#dataCreatedStaffTF')
            .type('2017-04-14')

        cy.server()

        cy.route('POST', '/staff/add').as('AddStaff')

        cy.server()

        cy.route('GET', '/staff').as('AddStaff')

        cy.get('#saveBtn').click();
        // cy.wait('@AddStaff').its('status').should('eq', 200)
        // cy.wait('@AddStaff').its('status').should('eq', 200)
    })
})
