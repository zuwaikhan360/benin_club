import bcrypt from 'bcrypt';

const SALT_ROUNDS = parseInt('10');

export const hashPassword = async (password: string): Promise<string> => {
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(SALT_ROUNDS);

    // Hash the password with the salt
    const hash = await bcrypt.hash(password, salt);

    return hash;
  } catch (error) {
    console.error(error);
    throw new Error('Error hashing password');
  }
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  try {
    const match = await bcrypt.compare(password, hashedPassword);

    return match;
  } catch (error) {
    console.error(error);
    throw new Error('Error comparing passwords');
  }
};
