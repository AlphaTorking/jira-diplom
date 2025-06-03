const bcrypt = require('bcrypt');

async function generateHash() {
  const password = 'test'; // Ваш пароль
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  console.log('Хэш пароля:', hash);
}

generateHash();