const entityService = require('../services/entity');
const authService = require('../services/auth');
const supabase = require('../config/supabase');

async function testEntity() {
  try {
    console.log('Testing entity operations...');

    // First sign in to get authenticated
    const { user } = await authService.signIn('test@example.com', 'testtesttest');
    console.log('Authentication successful');

    if (!user) {
      throw new Error('No user returned from authentication');
    }

    console.log('\nTesting entity creation...');
    const entityData = {
      name: 'Test Company',
      type: 'organization',
      email: 'company@test.com',
      phone: '+1234567890',
      address: {
        line1: '123 Test St',
        city: 'Test City',
        state: 'TS',
        postal_code: '12345',
        country: 'US'
      },
      userId: user.id
    };

    // Create entity
    const entity = await entityService.createEntity(entityData);
    console.log('Entity created:', entity);

    if (!entity || !entity.id) {
      throw new Error('Entity creation failed - no entity returned');
    }

    // Test entity retrieval
    console.log('\nTesting entity retrieval...');
    const retrievedEntity = await entityService.getEntity(entity.id);
    console.log('Entity retrieved:', retrievedEntity);

    if (!retrievedEntity) {
      throw new Error('Entity retrieval failed');
    }

    // Test entity update
    console.log('\nTesting entity update...');
    const updates = {
      name: 'Updated Test Company',
      phone: '+1987654321'
    };
    const updatedEntity = await entityService.updateEntity(entity.id, updates);
    console.log('Entity updated:', updatedEntity);

    if (!updatedEntity || updatedEntity.name !== updates.name) {
      throw new Error('Entity update failed');
    }

    // Test entity listing
    console.log('\nTesting entity listing...');
    const entities = await entityService.listEntities();
    console.log(`Found ${entities.length} entities`);

    console.log('\nAll entity tests completed successfully');
  } catch (error) {
    console.error('Entity test failed:', error);
    process.exit(1);
  }
}

testEntity();