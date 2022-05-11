const chalk = require('chalk');

const arrayTemplate = (arrayLinks) => {
    console.log(chalk.cyan.bold('| | ✧ ✿ ...Found links... ✿ ✧ | |'));
    arrayLinks.forEach(link => {
        console.log(chalk.blueBright.bold(`✿ href:  ${chalk.cyan(link.href)} ✿ text: ${chalk.yellowBright(link.text)}  ✿ fileName: ${chalk.white(link.file)} \n ---- `));
    })
};

const statusTemplate = (arrayLinks) => {
    console.log(chalk.cyanBright.bold('| | ✧ ✿ ...Link status... ✿ ✧ | |'));
    arrayLinks.forEach(link => {
        if (link.status === 200) {
            console.log(chalk.blueBright.bold(`✿ href: ${chalk.cyan(link.href)}  ✿ status: ${chalk.cyanBright.bold(link.status)}  ✿ ok: ${chalk.magentaBright.bold(link.ok)}\n ---`));
        } else {
            console.log(chalk.blueBright.bold(`✿ href: ${chalk.cyan(link.href)}  ✿ status: ${chalk.cyanBright.bold(link.status)}  ✿ fail: ${chalk.redBright.bold(link.ok)}\n --- \n`));
        }
    })
}

const totalLinks = (arraylinks) => {
    const totalArray = arraylinks.map(link => link.href);
    const uniqueLinks = [...new Set(totalArray)];
    return `${chalk.cyanBright.bold('| | ✧ ✿ ...Stats:... ✿ ✧ | |')}
    ${chalk.blueBright.bold(`\t▷ Total:${totalArray.length} \n\t▷ Unique:${uniqueLinks.length}`)}
    `
};

const totalLinksBroken = (arraylinks) => {
    const totalArray = arraylinks.map(link => link.href);
    const uniqueLinks = [...new Set(totalArray)];
    const brokenLinks = arraylinks.filter(link => link.status != 200)
    return `${chalk.cyanBright.bold(`| | ✧ ✿ ...Statistics with --validate and --stats... ✿ ✧ | |`)}
    ${chalk.blueBright.bold(`\t▷ Total:${totalArray.length} \n\t▷ Unique:${uniqueLinks.length}`, chalk.redBright(`\n\t▷ Broken:${brokenLinks.length} `) )}
    `
}

module.exports = {
    arrayTemplate,
    statusTemplate,
    totalLinks,
    totalLinksBroken
}