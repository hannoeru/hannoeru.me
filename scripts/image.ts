import { dirname } from 'path'
import fs from 'fs-extra'
import fg from 'fast-glob'
import sharp from 'sharp'
import pc from 'picocolors'

function log(text: string, count?: number) {
  console.log(`\n${pc.gray('[sharp]')} ${text}${count ? pc.blue(` (${count})`) : ''}`)
}

function getSize(size: number) {
  return `${(size / 1024).toFixed(2)} KiB`
}

export async function optimizeImages() {
  const images = await fg('public/**/*.{png,jpeg,jpg,webp}')

  log(pc.yellow('Optimizing images...'), images.length)

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

        console.log(
          `${pc.dim('dist/')}${pc.cyan(image.replace('public/', '').padEnd(15, ' '))}  ${pc.dim(getSize(info.size))}`,
        )

        return info
      }

      if (fs.existsSync(outFile))
        await fs.copy(outFile, outFile.replace('temp', 'dist'))
      else
        await generateImg()
    }),
  )
  log(pc.green('Images optimized'))
}
