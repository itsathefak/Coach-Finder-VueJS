export default {
    login() {},
  
    async signup(context, payload) {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCcrDNuuo4gTFeKuwQBgMlb3sPCZe7hf-M',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: payload.email,
            password: payload.password,
            returnSecureToken: true,
          }),
        }
      );
  
      const responseData = await response.json();
  
      if (!response.ok) {
        console.error(responseData.error);
        throw new Error(responseData.error?.message || 'Failed to Authenticate');
      }
  
      context.commit('setUser', {
        token: responseData.idToken,
        userId: responseData.localId,
        tokenExpiration: responseData.expiresIn,
      });
  
      console.log('User signed up successfully:', responseData);
    },
  };
  