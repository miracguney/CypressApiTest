// cypress/e2e/petstore_api_test.cy.js

describe('Petstore API Tests', () => {

  // POST: Yeni bir pet oluşturma
  it('should create a new pet', () => {
      cy.request({
          method: 'POST',
          url: 'https://petstore.swagger.io/v2/pet',
          body: {
              id: 12345,
              name: 'Fluffy',
              status: 'available'
          }
      }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('id', 12345);
          expect(response.body).to.have.property('name', 'Fluffy');
          expect(response.body).to.have.property('status', 'available');
      });
  });

   // POST: Farklı bir pet oluşturma
   it('should create another new pet', () => {
    cy.request({
        method: 'POST',
        url: 'https://petstore.swagger.io/v2/pet',
        body: {
            id: 54321,
            name: 'Sparky',
            status: 'available'
        }
    }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('id', 54321);
        expect(response.body).to.have.property('name', 'Sparky');
        expect(response.body).to.have.property('status', 'available');
    });
});

 //POST: Geçersiz bir pet oluşturma isteği gönderme (Eksik alanlarla)
 it('should not create a pet with missing required fields', () => {
    cy.request({
        method: 'POST',
        url: 'https://petstore.swagger.io/v2/pet',
        failOnStatusCode: false, // Hata durumlarında testi durdurmamak için
        body: {
            name: 'IncompletePet'
            // status alanı eksik
        }
    }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('message');
    });
    
});

  // GET: Oluşturulan pet'i alme
  it('should get the pet by ID', () => {
      cy.request({
          method: 'GET',
          url: 'https://petstore.swagger.io/v2/pet/12345',
      }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('id', 12345);
          expect(response.body).to.have.property('name', 'Fluffy');
          expect(response.body).to.have.property('status', 'available');
      });
  });
    // GET: Farklı bir pet'i alma
    it('should get the other pet by ID', () => {
        cy.request({
            method: 'GET',
            url: 'https://petstore.swagger.io/v2/pet/54321',
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('id', 54321);
            expect(response.body).to.have.property('name', 'Sparky');
            expect(response.body).to.have.property('status', 'available');
        });
    });

  // PUT: Oluşturulan pet'in durumunu güncelleme
  it('should update the pet status', () => {
      cy.request({
          method: 'PUT',
          url: 'https://petstore.swagger.io/v2/pet',
          body: {
              id: 12345,
              name: 'Fluffy',
              status: 'sold'
          }
      }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('id', 12345);
          expect(response.body).to.have.property('name', 'Fluffy');
          expect(response.body).to.have.property('status', 'sold');
      });
  });
  
   // PUT: Farklı bir pet'in durumunu güncelleme
   it('should update the other pet status', () => {
    cy.request({
        method: 'PUT',
        url: 'https://petstore.swagger.io/v2/pet',
        body: {
            id: 54321,
            name: 'Sparky',
            status: 'pending'
        }
    }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('id', 54321);
        expect(response.body).to.have.property('name', 'Sparky');
        expect(response.body).to.have.property('status', 'pending');
    });
});


// PUT: Farklı bir pet'in durumunu tekrar güncelleme
it('should update the other pet status again', () => {
    cy.request({
        method: 'PUT',
        url: 'https://petstore.swagger.io/v2/pet',
        body: {
            id: 54321,
            name: 'Sparky',
            status: 'sold'
        }
    }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('id', 54321);
        expect(response.body).to.have.property('name', 'Sparky');
        expect(response.body).to.have.property('status', 'sold');
    });
});

  // DELETE: Oluşturulan pet'i silme
  it('should delete the pet', () => {
      cy.request({
          method: 'DELETE',
          url: 'https://petstore.swagger.io/v2/pet/12345',
      }).then((response) => {
          expect(response.status).to.eq(200);
      });
  });

   // DELETE: Farklı bir pet'i silme
   it('should delete the other pet', () => {
    cy.request({
        method: 'DELETE',
        url: 'https://petstore.swagger.io/v2/pet/54321',
    }).then((response) => {
        expect(response.status).to.eq(200);
    });
});

  // GET: Silinen pet'i tekrar kontrol etme (olmamalı)
  it('should return 404 for a deleted pet', () => {
      cy.request({
          method: 'GET',
          url: 'https://petstore.swagger.io/v2/pet/12345',
          failOnStatusCode: false
      }).then((response) => {
          expect(response.status).to.eq(404);
      });
  });
//DELETE: Olmayan bir pet'i silmeye çalışma
it('should return 404 when deleting a non-existent pet', () => {
    cy.request({
        method: 'DELETE',
        url: 'https://petstore.swagger.io/v2/pet/99999', // Geçersiz bir ID
        failOnStatusCode: false // Hata durumlarında testi durdurmamak için
    }).then((response) => {
        expect(response.status).to.eq(404);
    });
});



});
