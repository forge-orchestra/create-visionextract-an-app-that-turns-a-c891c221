import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, User } from '@prisma/client';
import Cors from 'cors';

const prisma = new PrismaClient();

// Initialize CORS middleware
const cors = Cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  origin: '*',
});

function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

type Data = {
  message: string;
  user?: User;
  users?: User[];
};

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  await runMiddleware(req, res, cors);

  try {
    switch (req.method) {
      case 'GET':
        const users = await prisma.user.findMany();
        res.status(200).json({ message: 'Users retrieved successfully', users });
        break;
      case 'POST':
        if (!req.body.name || !req.body.email) {
          res.status(400).json({ message: 'Name and email are required' });
          return;
        }
        const newUser = await prisma.user.create({
          data: {
            name: req.body.name,
            email: req.body.email,
          },
        });
        res.status(201).json({ message: 'User created successfully', user: newUser });
        break;
      case 'PUT':
        if (!req.body.id || !req.body.name || !req.body.email) {
          res.status(400).json({ message: 'ID, name, and email are required' });
          return;
        }
        const updatedUser = await prisma.user.update({
          where: { id: req.body.id },
          data: {
            name: req.body.name,
            email: req.body.email,
          },
        });
        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
        break;
      case 'DELETE':
        if (!req.body.id) {
          res.status(400).json({ message: 'ID is required' });
          return;
        }
        await prisma.user.delete({
          where: { id: req.body.id },
        });
        res.status(200).json({ message: 'User deleted successfully' });
        break;
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export default handler;