#!/usr/bin/env node

import { PathLike, promises as fs } from "fs"
import { binary_to_base58 } from 'base58-js'

export const main  = async() => {
  if (process.argv.length < 3) {
    console.log("Please specify the path to the solana id you want to export")
    process.exit(1)
  }
  const lastArg = process.argv.at(-1)
  if (!lastArg) {
    throw(new Error("Unable to access argv"))
  }
  let configPath: PathLike = lastArg
  try {
    const fileData = await fs.readFile(configPath, 'utf-8')
    const privateKey = JSON.parse(fileData)
    console.log(binary_to_base58(privateKey))
  } catch (e) {
    console.error("Unable to read file at ", configPath)
    console.error("Error: ", e)
    process.exit(2)
  }
}

main().catch((e) => {
  console.error("Error: ", e)
})