// Connection Limit Test Script
// Run this in your browser console on https://rafid-portofolio.vercel.app/

async function testConnectionLimit() {
  console.log('🧪 Starting Connection Limit Test...');
  console.log('📍 Site: https://rafid-portofolio.vercel.app/');
  console.log('');

  // Step 1: Check initial status
  console.log('Step 1: Checking initial connection status...');
  let status = await fetch('/api/connection-status').then(r => r.json());
  console.log('Initial status:', {
    userConnections: status.userConnections,
    totalConnections: status.totalConnections,
    availableSlots: status.availableSlots
  });
  console.log('');

  // Step 2: Add fake connections to test limit
  console.log('Step 2: Adding 55 fake connections to test limit...');
  try {
    const addResult = await fetch('/api/debug-connections?action=add&count=55').then(r => r.json());
    console.log('✅ Added connections:', addResult.results.filter(r => r.success).length, 'successful');
    console.log('❌ Rejected connections:', addResult.results.filter(r => !r.success).length, 'rejected');
    console.log('');
  } catch (error) {
    console.log('❌ Error adding connections:', error);
    return;
  }

  // Step 3: Check status after adding
  console.log('Step 3: Checking status after adding connections...');
  status = await fetch('/api/connection-status').then(r => r.json());
  console.log('Status after adding:', {
    userConnections: status.userConnections,
    totalConnections: status.totalConnections,
    availableSlots: status.availableSlots
  });
  console.log('');

  // Step 4: Test if new requests are blocked
  console.log('Step 4: Testing if new page requests are blocked...');
  try {
    const pageResponse = await fetch('/', {
      method: 'GET',
      cache: 'no-cache'
    });
    
    console.log(`Response status: ${pageResponse.status} ${pageResponse.statusText}`);
    
    if (pageResponse.status === 503) {
      console.log('✅ SUCCESS: Connection limit is working! Got 503 Service Unavailable.');
    } else if (pageResponse.status === 302 || pageResponse.status === 307) {
      console.log('✅ SUCCESS: Connection limit is working! Got redirect to capacity page.');
    } else if (pageResponse.status === 200) {
      console.log('⚠️  WARNING: Got 200 OK. Connection limit might not be working properly.');
    } else {
      console.log(`ℹ️  INFO: Got unexpected status ${pageResponse.status}`);
    }
  } catch (error) {
    console.log('❌ Error testing page request:', error);
  }
  console.log('');

  // Step 5: Test capacity page access
  console.log('Step 5: Testing direct access to capacity page...');
  try {
    const capacityResponse = await fetch('/server-capacity');
    console.log(`Capacity page status: ${capacityResponse.status}`);
    if (capacityResponse.status === 200) {
      console.log('✅ Capacity page is accessible');
    }
  } catch (error) {
    console.log('❌ Error accessing capacity page:', error);
  }
  console.log('');

  // Step 6: Clean up test connections
  console.log('Step 6: Cleaning up test connections...');
  try {
    await fetch('/api/debug-connections?action=cleanup');
    console.log('✅ Cleaned up test connections');
  } catch (error) {
    console.log('❌ Error cleaning up:', error);
  }

  // Step 7: Final status check
  console.log('Step 7: Final status check...');
  try {
    status = await fetch('/api/connection-status').then(r => r.json());
    console.log('Final status:', {
      userConnections: status.userConnections,
      totalConnections: status.totalConnections,
      availableSlots: status.availableSlots
    });
  } catch (error) {
    console.log('❌ Error getting final status:', error);
  }

  console.log('');
  console.log('🏁 Test completed!');
  console.log('');
  console.log('📊 Test Summary:');
  console.log('- If you saw 503 or redirect responses in Step 4, the connection limit is working ✅');
  console.log('- If you only saw 200 responses, the connection limit needs debugging ❌');
  console.log('- Check the Network tab in DevTools for more details');
}

// Auto-run test
testConnectionLimit();

// Also provide manual functions
window.testConnectionLimit = testConnectionLimit;
window.addTestConnections = async (count = 55) => {
  const result = await fetch(`/api/debug-connections?action=add&count=${count}`).then(r => r.json());
  console.log(`Added ${count} connections:`, result);
  return result;
};
window.cleanupConnections = async () => {
  await fetch('/api/debug-connections?action=cleanup');
  console.log('Cleaned up connections');
};
window.getConnectionStatus = async () => {
  const status = await fetch('/api/connection-status').then(r => r.json());
  console.log('Connection status:', status);
  return status;
};

console.log('💡 Manual test functions available:');
console.log('- testConnectionLimit() - Run full test');
console.log('- addTestConnections(count) - Add fake connections');
console.log('- cleanupConnections() - Clean up test connections');
console.log('- getConnectionStatus() - Get current status');
