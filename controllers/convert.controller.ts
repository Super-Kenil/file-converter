import { Request, Response } from "express"
import sharp, { FormatEnum } from "sharp"
import archiver from 'archiver'
import { zipFiles } from '../helpers/zip-files.js'

const convertImageFormat = async (req: Request, res: Response) => {
  try {

    if (!req.files) {
      return res.status(400).json({ message: "No Images provided" })
    }
    const mimeType = (typeof req.headers.convertfrom === 'string') && req.headers.convertfrom.split('/')[0]

    if (mimeType === 'image') {
      if (req.files && Array.isArray(req.files)) {
        const convertFrom: string | undefined = req.headers.convertfrom?.toString().split('/')[1]
        const convertTo: string | undefined = req.headers.convertto?.toString().split('/')[1]
        const isAnimated: boolean = (typeof req.headers.isanimated === 'string') ? JSON.parse(req.headers.isanimated) : false
        const totalFiles = req.files.length
        const convertedFiles: Express.Multer.File[] = []
        if (convertFrom && convertTo) {
          await Promise.all(req.files.map(async (inputFile: Express.Multer.File) => {
            const outputFileName: string = inputFile.originalname.replace(convertFrom, convertTo)
            try {
              const convertedBuffer = await sharp(inputFile.buffer, {
                animated: isAnimated,
              }).toFormat(convertTo as keyof FormatEnum).toBuffer()
              convertedFiles.push({ ...inputFile, buffer: convertedBuffer, originalname: outputFileName })
            } catch (error) {
              console.error('Error converting file:', inputFile.originalname, error)
            }
          }))

          zipFiles({ res, convertedFiles, mimeType })



          // res.set({
          //   'Content-Type': 'application/zip',
          //   'Content-Disposition': 'attachment; filename=converted_images.zip',
          // });

          // convertedFiles.forEach((convertedFile: Express.Multer.File) => {
          //   res.write(convertedFile.buffer);
          // });

          // res.end();

          return res.status(200).json({
            status: true,
            message: totalFiles === convertedFiles.length ? 'Converted all files Successfully' : 'Error converting some files',
            data: { body: convertedFiles },
          })
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