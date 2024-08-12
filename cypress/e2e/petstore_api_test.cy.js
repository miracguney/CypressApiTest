// cypress/e2e/petstore_api_test.cy.js

describe('Petstore API Tests', () => {

  // POST: Yeni bir pet oluştur
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

  // GET: Oluşturulan pet'i al
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

  // PUT: Oluşturulan pet'in durumunu güncelle
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

  // DELETE: Oluşturulan pet'i sil
  it('should delete the pet', () => {
      cy.request({
          method: 'DELETE',
          url: 'https://petstore.swagger.io/v2/pet/12345',
      }).then((response) => {
          expect(response.status).to.eq(200);
      });
  });

  // GET: Silinen pet'i tekrar kontrol et (olmamalı)
  it('should return 404 for a deleted pet', () => {
      cy.request({
          method: 'GET',
          url: 'https://petstore.swagger.io/v2/pet/12345',
          failOnStatusCode: false
      }).then((response) => {
          expect(response.status).to.eq(404);
      });
  });

});
