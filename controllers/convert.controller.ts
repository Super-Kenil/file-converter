import { Request, Response } from "express";
import sharp, { FormatEnum } from "sharp";

const convertImageFormat = async (req: Request, res: Response) => {
  try {
    console.log('req', req);

    if (!req.files) {
      return res.status(400).json({ message: "No Images provided" });
    }
    const mimetype = (typeof req.headers.convertfrom === 'string') && req.headers.convertfrom.split('/')[0]

    if (mimetype === 'image') {
      if (req.files && Array.isArray(req.files)) {
        const convertFrom = req.headers.convertfrom?.toString().split('/')[1]
        const convertTo = req.headers.convertto?.toString().split('/')[1]
        const totalFiles = req.files.length
        const convertedFiles: Express.Multer.File[] = []

        if (convertFrom && convertTo) {
          (req.files.forEach(async (inputFile: Express.Multer.File) => {
            const outputFileName: string = inputFile.originalname.replace(convertFrom, convertTo);

            console.log('convertFrom:', convertFrom);
            console.log('convertTo:', convertTo);
            console.log('inputFile.originalname:', inputFile.originalname);
            console.log('outputFileName:', outputFileName);

            try {
              const convertedBuffer = await sharp(inputFile.buffer, {
                animated: true,
              }).toFormat(convertTo as keyof FormatEnum).toBuffer()
              console.log('converted Buffer', convertedBuffer);

              return res.status(200).json({
                status: true,
                message: totalFiles === convertedFiles.length ? 'Converted all files Successfully' : 'Error converting some files',
                data: { body: { ...inputFile, buffer: convertedBuffer, originalname: outputFileName } },
              });

              convertedFiles.push({ ...inputFile, buffer: convertedBuffer, originalname: outputFileName });
            } catch (error) {
              console.error('Error converting file:', inputFile.originalname, error);
            }
          }))
          // return res.status(200).json({
          //   status: true,
          //   message: totalFiles === convertedFiles.length ? 'Converted all files Successfully' : 'Error converting some files',
          //   data: { body: convertedFiles },
          // });
        }
      }
    }

    // return res.status(200).json({
    //   status: true,
    //   message: "",
    //   data: { body: req.body },
    // });

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