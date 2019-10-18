const Generator = require('yeoman-generator')
const toHeader = require('js-headercase')
const toPascal = require('js-pascalcase')
const licenses = require('generator-license').licenses

const staticTemplates = {
  '_editorconfig': '.editorconfig',
  '_gitignore': '.gitignore',
  '_huskyrc.js': '.huskyrc.js',
  '_nvmrc': '.nvmrc',
  '_php_cs.dist': '.php_cs.dist',
  '_scrutinizer.yml': '.scrutinizer.yml',
  '_travis.yml': '.travis.yml',
  'phpinsights.php': 'phpinsights.php',
  'phpunit.xml': 'phpunit.xml',
  'src/_gitkeep': 'src/.gitkeep',
  'tests/_gitkeep': 'tests/.gitkeep'
}

const dynamicTemplates = [
  'CHANGELOG.md',
  'composer.json',
  'package.json',
  'README.md'
]

const validateString = (value) => {
  return typeof value === 'string'
}

const validateRequired = (value) => {
  return value.length > 0
}

const validatePackageName = (value) => {
  return /^[a-z_-]+\/[a-z_-]+$/.test(value)
}

const validateEmail = (value) => {
  return validateString(value) && value.includes('@')
}

module.exports = class extends Generator {
  async prompting () {
    this.props = await this.prompt([
      {
        type: 'input',
        name: 'authorName',
        message: 'Author name',
        store: true,
        validate: (value) => {
          return validateString(value) && validateRequired(value)
        }
      },
      {
        type: 'input',
        name: 'authorEmail',
        message: 'Author email',
        store: true,
        validate: validateEmail
      },
      {
        type: 'input',
        name: 'authorWebsite',
        message: 'Author website (optional)',
        store: true
      },
      {
        type: 'input',
        name: 'packageName',
        message: 'Package name (e.g. username/packagename)',
        validate: validatePackageName
      },
      {
        type: 'input',
        name: 'packageDescription',
        message: 'Package description',
        validate: (value) => {
          return validateString(value) && validateRequired(value)
        }
      },
      {
        type: 'list',
        name: 'license',
        message: 'Select a license',
        default: 'MIT',
        choices: licenses,
        store: true,
        validate: (value) => {
          return validateString(value) && validateRequired(value)
        }
      }
    ])
  }

  writing () {
    this._prepProps()
    this._copyFiles()
    this._copyTemplates()

    this.composeWith(require.resolve('generator-license'), {
      name: this.props.authorName,
      email: this.props.authorEmail,
      website: this.props.authorWebsite,
      license: this.props.license,
      output: 'LICENSE.txt'
    })
  }

  _prepProps () {
    Object.entries(this.props).forEach(([key, value]) => {
      this.props[key] = value.trim()
    })
  }

  _copyFiles () {
    for (const [from, to] of Object.entries(staticTemplates)) {
      this.fs.copy(this.templatePath(from), this.destinationPath(to))
    }
  }

  _copyTemplates () {
    const context = this._templateContext()

    dynamicTemplates.forEach(f => this.fs.copyTpl(
      this.templatePath(f),
      this.destinationPath(f),
      context
    ))
  }

  _templateContext () {
    const autoloadNamespace = this.props.packageName
      .split('/')
      .map(segment => toPascal(segment))
      .join('\\\\')

    const title = toHeader(this.props.packageName.split('/')[1])

    return {
      autoloadNamespace,
      title,
      dateStamp: new Date().toISOString().split('T')[0],
      authorName: this.props.authorName,
      authorEmail: this.props.authorEmail,
      authorWebsite: this.props.authorWebsite,
      license: this.props.license,
      packageName: this.props.packageName,
      packageDescription: this.props.packageDescription
    }
  }
}
