#!/usr/bin/env node

'use strict'
import chalk from 'chalk'
import shell from 'shelljs'
import fs from 'fs'

const log = console.log;
try {
    const curdir = process.cwd()
    const args = process.argv.slice(2)
    
    let projname = args[0]
    if(projname === '.'){
        projname = curdir.split("\\").slice(-1)[0]
    } else {
        //create project directory
        if (!fs.existsSync(projname)){
            fs.mkdirSync(projname)
        }
    }
    const setPy = () => {
        shell.cd(`${projname}`).output
        //create Python virtual environment and activate
        shell.exec(`python -m venv ${process.cwd()}/venv`)
        shell.exec(`${process.cwd()}/venv/Scripts/activate`)
        shell.exec(`code .`)
    }
    const checkDirIfEmpty = (dirname) => {
        fs.readdir(dirname, function(err, files) {
            if (err) {
                log({state:2, status:false})
            } else {
               if (!files.length) {
                    setPy();
               } else {
                log({state:1, status:false})
               }
            }
        })
    }
    checkDirIfEmpty(projname)
    log(`${chalk.green(projname)}`)
} catch (error) {
    log(error)
}