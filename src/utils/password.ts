import bcrypt from "bcrypt"

const hashPassword = async (password: string):Promise<string> => {
  return await bcrypt.hash(password, 10);
};

const comparePassword = async (candidatePass: string, encryptedPass: string): Promise<boolean> => {

  return await bcrypt.compare(candidatePass, encryptedPass);
}

export {
  hashPassword,
  comparePassword
};
