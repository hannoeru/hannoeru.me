import fg from 'fast-glob'
import sharp from 'sharp'
import chalk from 'chalk'

function log(text: string, color?: string, count?: number) {
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
      const outFile = image.replace('public', 'dist')
      let img = sharp(image)
      const meta = await img.metadata()
      
      if(meta.width > 1280) {
        img = img.resize({ width: 1280 })
      }

      if(meta.format === 'png') {
        img = img.png({ palette: true })
      }

      const info = await img.toFile(outFile)

      console.log(
        `${chalk.dim(`dist/`)}${chalk.cyan(image.replace('public/', '').padEnd(15, ' '))}  ${chalk.dim(getSize(info.size))}`,
      )
    })
  )
  log('Images optimized', 'green')
}