const fs = require('fs')
const path = require('path')

// Workflow fields match the spec exactly: name, date_created, last_run_date,
// code_js, is_running, options: { userAgent, visibility }.

function makeWorkflowStore(userDataDir) {
  const filePath = path.join(userDataDir, 'workflows.json')

  function readAll() {
    if (!fs.existsSync(filePath)) return []
    try {
      const raw = fs.readFileSync(filePath, 'utf-8')
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  }

  function writeAll(workflows) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true })
    fs.writeFileSync(filePath, JSON.stringify(workflows, null, 2))
  }

  function list() {
    return readAll()
  }

  function create({ name, code_js = '', options = {} }) {
    const workflows = readAll()
    if (workflows.some((w) => w.name === name)) {
      throw new Error(`A workflow named "${name}" already exists`)
    }
    const workflow = {
      name,
      date_created: new Date().toISOString(),
      last_run_date: null,
      code_js,
      is_running: false,
      options: {
        userAgent: options.userAgent || '',
        visibility: options.visibility || 'visible',
      },
    }
    workflows.push(workflow)
    writeAll(workflows)
    return workflow
  }

  function update(name, patch) {
    const workflows = readAll()
    const index = workflows.findIndex((w) => w.name === name)
    if (index === -1) throw new Error(`No workflow named "${name}"`)
    workflows[index] = { ...workflows[index], ...patch }
    writeAll(workflows)
    return workflows[index]
  }

  function remove(name) {
    const workflows = readAll().filter((w) => w.name !== name)
    writeAll(workflows)
  }

  return { list, create, update, remove }
}

module.exports = { makeWorkflowStore }
