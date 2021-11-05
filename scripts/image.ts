import { dirname } from 'path'
import fs from 'fs-extra'
import fg from 'fast-glob'
import sharp from 'sharp'
import chalk, { ForegroundColor } from 'chalk'

function log(text: string, color?: typeof ForegroundColor, count?: number) {
  // eslint-disable-next-line no-console
  console.log(`\n${chalk.gray('[sharp]')} ${chalk[color || 'yellow'](text)}${count ? chalk.blue(` (${count})`) : ''}`)
}

function getSize(size: number) {
  return `${(size / 1024).toFixed(2)} KiB`
}

export async function optimizeImages() {
  const images = await fg('public/**/*.{png,jpeg,jpg,webp}')

  log('Optimizing images...', undefined, images.length)

  await Promise.all(
    images.map(async(image) => {
      const outFile = image.replace('public', 'temp')
      const generateImg = async() => {
        let img = sharp(image)
        const meta = await img.metadata()

        if (meta.width && meta.width > 1280)
          img = img.resize({ width: 1280 })

        if (meta.format === 'png')
          img = img.png({ palette: true })

        await fs.ensureDir(dirname(outFile))

        const info = await img.toFile(outFile)

        // eslint-disable-next-line no-console
        console.log(
          `${chalk.dim('dist/')}${chalk.cyan(image.replace('public/', '').padEnd(15, ' '))}  ${chalk.dim(getSize(info.size))}`,
        )

        return info
      }

      if (fs.existsSync(outFile))
        await fs.copy(outFile, outFile.replace('temp', 'dist'))
      else
        await generateImg()
    }),
  )
  log('Images optimized', 'green')
}
