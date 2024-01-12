import { Request, Response } from "express";

const convertAtoB = (req: Request, res: Response) => {
  try {
req.headers.
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
  convertAtoB
}