import { Request } from 'express';
import jwt from 'jsonwebtoken';
import User from '../../models/User';


export const requestUser = async (req: Request): Promise<User | null> => {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader?.replace('Bearer ', '');
  
      if (!token) {
        return null;
      }
  
      const decoded = jwt.decode(token) as { id: string };
      
      return await User.findOne({
        where: { id: decoded.id }
      });

    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  };
