// Profile verification script
const verifyProfile = () => {
  console.log('🔍 Profile Verification Script');
  console.log('==============================');
  
  // Check localStorage
  const storedUser = localStorage.getItem('user');
  const storedToken = localStorage.getItem('token');
  
  console.log('📦 LocalStorage Check:');
  console.log('- User data exists:', !!storedUser);
  console.log('- Token exists:', !!storedToken);
  
  if (storedUser) {
    try {
      const user = JSON.parse(storedUser);
      console.log('- User data:', {
        id: user.id,
        username: user.username,
        email: user.email,
        firstname: user.name?.firstname,
        lastname: user.name?.lastname,
        hasAddress: !!user.address,
        hasPhone: !!user.phone
      });
    } catch (error) {
      console.error('❌ Error parsing user data:', error);
    }
  }
  
  // Check Redux store (if available)
  if (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__) {
    console.log('🔍 Redux store available - check DevTools');
  }
  
  // Test profile page requirements
  console.log('\n✅ Profile Page Requirements:');
  console.log('1. Should show firstname, lastname, email by default');
  console.log('2. Should load data from Redux currentUser or localStorage');
  console.log('3. Should handle missing data gracefully');
  console.log('4. Should show loading state while fetching data');
  
  return {
    hasUser: !!storedUser,
    hasToken: !!storedToken,
    userData: storedUser ? JSON.parse(storedUser) : null
  };
};

// Auto-run if in browser
if (typeof window !== 'undefined') {
  verifyProfile();
}

module.exports = verifyProfile; 