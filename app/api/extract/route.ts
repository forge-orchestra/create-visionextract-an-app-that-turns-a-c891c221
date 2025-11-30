import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import { extractDataFromImage } from '@/lib/imageProcessor';
import Cors from 'cors';

// Initialize CORS middleware
const cors = Cors({
  methods: ['POST', 'OPTIONS'],
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

export const config = {
  api: {
    bodyParser: false,
  },
};

type ExtractResponse = {
  success: boolean;
  data?: any;
  error?: string;
};

async function handler(req: NextApiRequest, res: NextApiResponse<ExtractResponse>) {
  await runMiddleware(req, res, cors);

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ success: false, error: 'Method Not Allowed' });
    return;
  }

  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(500).json({ success: false, error: 'Internal Server Error' });
      return;
    }

    if (!files.screenshot) {
      res.status(400).json({ success: false, error: 'No screenshot uploaded' });
      return;
    }

    try {
      const data = await extractDataFromImage(files.screenshot.filepath);
      res.status(200).json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to process image' });
    }
  });
}

export default handler;