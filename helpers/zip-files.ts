import archiver from 'archiver'
import { Response } from "express"

type ZIPFilesProps = {
  mimeType: string
  res: Response
  convertedFiles: Express.Multer.File[]
}

export async function zipFiles ({ res, mimeType, convertedFiles }: ZIPFilesProps) {
  const zipStream = archiver('zip')
  res.set({
    'Content-Type': 'application/zip',
    'Content-Disposition': `attachment; filename=converted_${mimeType}s.zip`,
  })
  zipStream.pipe(res)
  convertedFiles.forEach((convertedFile: Express.Multer.File) => {
    zipStream.append(convertedFile.buffer, { name: convertedFile.originalname })
  })
  zipStream.finalize()
}