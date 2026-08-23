const bcrypt = require('bcrypt');
const supabase = require('../config/supabase');

const findUserByEmail = async (email) => {
  const targetEmail = email.trim().toLowerCase();
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', targetEmail)
    .maybeSingle();

  if (error) throw error;
  return data;
};

const createUser = async (email, password) => {
  const normalizedEmail = email.trim().toLowerCase();
  const existingUser = await findUserByEmail(normalizedEmail);

  if (existingUser) {
    return { success: false, reason: 'EXISTS' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from('users')
    .insert([{ email: normalizedEmail, password: hashedPassword }])
    .select()
    .single();

  if (error) throw error;

  return { success: true, user: { id: data.id, email: data.email } };
};

module.exports = {
  findUserByEmail,
  createUser
};
