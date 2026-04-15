# Vercel Deployment Guide

## Fix: ERR_PNPM_OUTDATED_LOCKFILE Error

### Problem
```
ERR_PNPM_OUTDATED_LOCKFILE  Cannot install with "frozen-lockfile" because pnpm-lock.yaml is not up to date
```

### Solution
Update `vercel.json` dengan:
```json
{
  "buildCommand": "pnpm run build",
  "installCommand": "pnpm install --no-frozen-lockfile",
  "framework": "nextjs",
  "outputDirectory": ".next"
}
```

Key: Use `--no-frozen-lockfile` agar pnpm bisa install di CI environment Vercel.

## Prerequisites
- GitHub repository synced
- Environment variables configured in Vercel
- pnpm workspace properly set up
- Lock file updated: `pnpm install --no-frozen-lockfile`

## Environment Variables in Vercel

Add these environment variables in Vercel project settings:

### Frontend Variables
```
NEXT_PUBLIC_SUPABASE_URL=https://zecqskgvmfyorhxzhoeu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
NEXT_PUBLIC_API_URL=https://api-gateway.vercel.app
```

### API Gateway (if deploying separately)
```
PORT=3001
CORS_ORIGIN=https://yourdomain.vercel.app
DOCTORS_SERVICE_URL=https://service-doctors.vercel.app
SERVICES_SERVICE_URL=https://service-services.vercel.app
AUTH_SERVICE_URL=https://service-auth.vercel.app
NODE_ENV=production
```

## Deployment Options

### Option 1: Frontend Only (Recommended for MVP)
Deploy hanya Next.js frontend ke Vercel, gunakan Supabase direct.

**vercel.json:**
```json
{
  "buildCommand": "pnpm build",
  "installCommand": "pnpm install"
}
```

**Setup di Vercel:**
1. Connect GitHub repository
2. Vercel auto-detect Next.js
3. Add environment variables
4. Deploy

### Option 2: Full Microservices Stack
Deploy semua services ke Vercel (memerlukan payment tier).

**Struktur:**
- Frontend → Vercel
- API Gateway → Vercel Function / Docker
- Microservices → Vercel Function / Docker

**Alternatif:** Deploy ke cloud lain:
- Railway.app
- Render.com
- Fly.io
- AWS Lambda

## Common Vercel Deployment Errors

### Error 1: pnpm-lock.yaml Out of Date
```
ERR_PNPM_OUTDATED_LOCKFILE Cannot install with "frozen-lockfile"
```

**Solution:**
```bash
# Local
pnpm install

# Commit & push
git add pnpm-lock.yaml
git commit -m "update: sync pnpm lock file"
git push
```

### Error 2: Missing Package Version
```
ERR_PNPM_NO_MATCHING_VERSION No matching version found for jsonwebtoken@^9.1.2
```

**Solution:**
Update to valid version in package.json:
```json
{
  "dependencies": {
    "jsonwebtoken": "^9.0.3"  // Changed from ^9.1.2
  }
}
```

### Error 3: Build Command Failed
```
Error: Command "npm run build" exited with 1
```

**Solutions:**
1. Check build logs carefully
2. Run `pnpm build` locally first
3. Check for TypeScript errors: `pnpm -r --filter '@' build`
4. Verify environment variables are set

### Error 4: Module Not Found
```
Cannot find module 'shared-types'
```

**Solution:**
```bash
# Ensure workspace dependencies are resolved
pnpm -F shared-types build

# Verify in all package.json:
# "shared-types": "workspace:*"
```

## Pre-deployment Checklist

- [ ] `pnpm install` runs without errors locally
- [ ] `pnpm build` completes successfully
- [ ] No TypeScript errors: `pnpm tsc --noEmit`
- [ ] All environment variables configured in Vercel
- [ ] `.env.local` NOT committed to Git
- [ ] `.gitignore` includes `.env*` files
- [ ] pnpm-lock.yaml is up to date
- [ ] All dependencies have valid versions

## Deployment Steps

### 1. Local Testing
```bash
# Clean install
rm -r node_modules pnpm-lock.yaml
pnpm install

# Build
pnpm build

# Check errors
pnpm tsc --noEmit
```

### 2. Update Lock File
```bash
pnpm install

# Commit if changed
git add pnpm-lock.yaml
git commit -m "update: sync pnpm lock file"
```

### 3. Push to GitHub
```bash
git push origin main
```

### 4. Vercel Auto Deploy
- Vercel webhook triggers automatically
- Check deployment logs for errors
- Verify build succeeded

## Production Environment Variables

### For Frontend (.env.production)
```
NEXT_PUBLIC_API_URL=https://yourdomain.com/api
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here
```

### Set in Vercel Dashboard
1. Go to Project Settings
2. Environment Variables
3. Add variables
4. Redeploy or trigger new deployment

## Alternative: API Gateway on Different Platform

If you want to deploy microservices separately:

### Option 1: Railway
```bash
# Deploy API Gateway
railway link
railway deploy
```

### Option 2: Render
```bash
# Connect GitHub & deploy
# Render auto-detects Node.js app
```

### Option 3: Docker on any cloud
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm -F api-gateway build
EXPOSE 3001
CMD ["pnpm", "-F", "api-gateway", "start"]
```

## Monitoring & Debugging

### Vercel Deployment Logs
1. Go to Vercel Dashboard
2. Select Project
3. Click "Deployments"
4. View logs in real-time

### Common Log Messages
```
✓ Analyzing source files
✓ Detected "next.js" version "16.2.3"
✓ Installing dependencies
✓ Building project
✓ Uploading build cache
✓ Deployment complete
```

If any step fails, check the error log for details.

## Rollback Failed Deployment

```bash
# View deployment history
vercel list

# Rollback to previous version
vercel alias <deployment-url> my-project.vercel.app
```

## Performance Tips

1. **Optimize Images** - Use Next.js Image optimization
2. **Cache Static Assets** - Configure cache headers
3. **Reduce Bundle Size** - Use dynamic imports
4. **Monitor Performance** - Use Vercel Analytics

## Support & Resources

- [Vercel Docs](https://vercel.com/docs)
- [pnpm in CI/CD](https://pnpm.io/continuous-integration)
- [Next.js Deployment](https://nextjs.org/learn-pages-router/basics/deploying-nextjs-app/deploy)
