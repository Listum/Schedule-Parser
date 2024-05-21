import axios from 'axios'
import { parse } from 'node-html-parser'
import path from 'path'
import fs from 'fs'
import { useEnv } from '../../hooks/useEnv.js'
useEnv()
const __dirname = path.resolve()

const pageUrl = process.env.UNIVERSITY_URL

try {
  const response = await axios.get(pageUrl)
  const html = response.data

  const root = parse(html)
  const fileLinkElements = root.querySelectorAll('a[href$=".xlsx"]')

  if (fileLinkElements.length > 0) {
    fileLinkElements.forEach(async (fileLinkElement) => {
      const index = fileLinkElements.indexOf(fileLinkElement)
      const fileUrl = fileLinkElement.getAttribute('href')
      const fileName = `schedule_${index + 1}.xlsx`
      const filePath = path.join(__dirname, 'docs', 'XLSXFiles', fileName)

      const fileResponse = await axios({
        method: 'get',
        url: fileUrl,
        responseType: 'stream',
      })

      const writer = fs.createWriteStream(filePath)
      fileResponse.data.pipe(writer)

      writer.on('finish', () => {
        console.log(`Файл ${fileName} успешно загружен.`)
      })

      writer.on('error', (err) => {
        console.error(`Ошибка при сохранении файла ${fileName}:`, err)
      })
    })
  } else {
    console.error('Ссылки на файлы не найдены.')
  }
} catch (error) {
  console.error('Ошибка при загрузке файлов:', error)
}
