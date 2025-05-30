import { supabase } from '../config/supabaseConfig.js'


const login = async (req, res) => {
  const { username, password } = req.body;
  let { data, error } = await supabase.auth.signInWithPassword({
        email: username,
        password: password,
    });

  if (error) {
    console.error('Login error', error.message);
    return res.status(401).send('Login failed. Please try again or contact a library administrator.');
    }
  // Store user information in session
  req.session.userId = data.user.id;
  req.session.authenticated = true;
  res.redirect('/scrape'); // Redirect to the update page after successful login
}

const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Session destruction error', err);
            return res.status(500).send('Could not log out, please try again');
        }
      res.clearCookie('connect.sid'); 
      res.redirect('/'); // Redirect to the home page or login page after logging out
    });

};

export { login, logout };

