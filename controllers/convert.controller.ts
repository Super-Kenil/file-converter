import { Request, Response } from "express";

const convertImageFormat = (req: Request, res: Response) => {
  try {
    console.log('req', req);

    if (req.headers.fileType === 'image') {
      console.log('valid file type');
    }

    return res.status(200).json({
      status: true,
      message: "",
      data: { body: req.body },
    });

  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        status: false,
        message: 'Error converting files'
      })
    }
  }
}

export default {
  convertImageFormat
}