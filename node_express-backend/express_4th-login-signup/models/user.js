const fs = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const filePath = path.join(__dirname, "..", "data", "users.json");

const readUsers = async () => {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.writeFile(filePath, "[]", "utf8");
      return [];
    }
    throw error;
  }
};

const writeUsers = async (users) => {
  await fs.writeFile(filePath, JSON.stringify(users, null, 2), "utf8");
};

const findUserByEmail = async (email) => {
  const users = await readUsers();
  const targetEmail = email.trim().toLowerCase();
  return (
    users.find(
      (user) => user.email && user.email.toLowerCase() === targetEmail,
    ) || null
  );
};

const createUser = async (email, password) => {
  const users = await readUsers();
  const normalizedEmail = email.trim().toLowerCase();
  const existingUser = users.find(
    (user) => user.email && user.email.toLowerCase() === normalizedEmail,
  );

  if (existingUser) {
    return { success: false, reason: "EXISTS" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: Date.now().toString(),
    email: normalizedEmail,
    password: hashedPassword,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  await writeUsers(users);

  return { success: true, user: { id: newUser.id, email: newUser.email } };
};

module.exports = {
  findUserByEmail,
  createUser,
};
