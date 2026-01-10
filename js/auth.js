// Minimal client-side auth stub. Replace with real API calls if available.
export const auth = {
  login: async ({ username }) => {
    // client-side stub: accept any username
    sessionStorage.setItem('user', username || 'guest');
    return true;
  },
  logout: () => {
    sessionStorage.removeItem('user');
  },
  getUser: () => sessionStorage.getItem('user')
};

window.auth = auth;