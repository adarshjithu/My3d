import bcrypt from 'bcrypt'
import { BadRequestError } from '../Constants/errors';

// Function to hash a password
export const hashPassword = async (password: string): Promise<string> => {
     const saltRounds = 10; // Number of salt rounds
     try {
          const hashedPassword = await bcrypt.hash(password, saltRounds);

          return hashedPassword;
     } catch (error) {
        console.log("Error while password encryption",error)
        throw new BadRequestError("Something went wrong");
        
     }
};

export const comparePassword = async (normalPassword: string, encryptedPassword: string) => {
     try {
         
          return await bcrypt.compare(normalPassword, encryptedPassword);
     } catch (error) {
          console.log('error while password comparison');
          throw new BadRequestError("Something went wrong")
     }
};