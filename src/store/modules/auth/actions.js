export default {
   async login(context, payload) {
    const apiKey = process.env.VUE_APP_FIREBASE_API_KEY;

    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      }
    );

    const responseData = await response.json();
  
    if (!response.ok) {
      console.error('Signup Error:', responseData.error);
      throw new Error(responseData.error?.message || 'Failed to Authenticate');
    }

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn,
    });

   },
  
    async signup(context, payload) {
      const apiKey = process.env.VUE_APP_FIREBASE_API_KEY;
  
      if (!apiKey) {
        console.error('Firebase API key is missing! Check your .env file.');
        throw new Error('Missing API key');
      }
    
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: payload.email,
            password: payload.password,
            returnSecureToken: true,
          }),
        }
      );
  
      const responseData = await response.json();
  
      if (!response.ok) {
        console.error('Signup Error:', responseData.error);
        throw new Error(responseData.error?.message || 'Failed to Authenticate');
      }
  
      context.commit('setUser', {
        token: responseData.idToken,
        userId: responseData.localId,
        tokenExpiration: responseData.expiresIn,
      });
  
    },
  };
  