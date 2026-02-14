const { spawnSync } = require('child_process')
const { cpSync, rmSync, existsSync } = require('fs')
const path = require('path')

const root = __dirname
const frontendDir = path.join(root, '..', 'School Management')
const srcDist = path.join(frontendDir, 'dist')
const destDist = path.join(root, '..', 'dist')

const res = spawnSync('npm', ['run', 'build'], {
  cwd: frontendDir,
  stdio: 'inherit',
  shell: true,
})
if (res.status !== 0) {
  process.stderr.write('Frontend build failed\n')
  process.exit(res.status || 1)
}

if (existsSync(destDist)) {
  rmSync(destDist, { recursive: true, force: true })
}
cpSync(srcDist, destDist, { recursive: true })
process.stdout.write('Copied frontend dist to root/dist\n')

