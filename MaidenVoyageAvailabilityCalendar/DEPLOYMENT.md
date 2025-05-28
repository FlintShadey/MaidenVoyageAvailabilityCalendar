# Deployment Guide - Maiden Voyage Availability Calendar

This guide covers deploying the Maiden Voyage Availability Calendar to various hosting platforms.

## Prerequisites

1. **Complete Supabase Setup**: Follow `SUPABASE_SETUP.md` to configure your database
2. **Environment Variables**: Ensure your `.env` file has valid Supabase credentials
3. **Build the Project**: Run `npm run build` to create production files

## GitHub Pages Deployment (Recommended)

### Quick Deploy

```bash
npm run deploy
```

### Manual Setup

1. **Configure Repository Settings**:

   - Go to your GitHub repository
   - Navigate to Settings → Pages
   - Select "Deploy from a branch"
   - Choose "gh-pages" branch

2. **Update Base URL** (if needed):

   ```javascript
   // vite.config.js
   export default defineConfig({
     base: "/your-repo-name/", // Only if not using custom domain
     // ...rest of config
   });
   ```

3. **Deploy**:
   ```bash
   npm run build
   npm run deploy
   ```

## Netlify Deployment

### Option 1: Drag & Drop

1. Run `npm run build`
2. Drag the `dist` folder to [netlify.com/drop](https://netlify.com/drop)

### Option 2: Git Integration

1. Connect your GitHub repository to Netlify
2. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. **Environment Variables** (in Netlify dashboard):
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key

## Vercel Deployment

### CLI Deployment

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in your project directory
3. Follow the prompts

### Git Integration

1. Connect your repository at [vercel.com](https://vercel.com)
2. **Environment Variables**:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

## Environment Variables for Production

### Required Variables

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Platform-Specific Configuration

#### GitHub Pages

- Add variables to GitHub Secrets (for GitHub Actions)
- Or embed in build process (less secure)

#### Netlify

- Add in Site Settings → Environment Variables

#### Vercel

- Add in Project Settings → Environment Variables

## Custom Domain Setup

### GitHub Pages

1. Add `CNAME` file to `/public` directory:
   ```
   yourdomain.com
   ```
2. Configure DNS with your domain provider

### Netlify/Vercel

1. Add custom domain in platform dashboard
2. Update DNS records as instructed

## SSL/HTTPS

All modern hosting platforms (GitHub Pages, Netlify, Vercel) provide free SSL certificates automatically.

## Performance Optimization

### Build Optimization

```bash
# Analyze bundle size
npm run build -- --analyze

# Optimize for production
npm run build
```

### Recommended `vite.config.js` additions:

```javascript
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["vue", "vuetify"],
          calendar: ["v-calendar"],
        },
      },
    },
  },
  // ...rest of config
});
```

## Monitoring & Analytics

### Supabase Dashboard

- Monitor database usage
- View real-time connections
- Check for errors

### Platform Analytics

- Enable analytics in your hosting platform
- Monitor page views and performance

## Troubleshooting

### Common Issues

1. **Environment Variables Not Loading**:

   - Ensure variables start with `VITE_`
   - Rebuild after adding variables
   - Check platform-specific variable configuration

2. **Build Failures**:

   - Run `npm run build` locally first
   - Check for TypeScript/linting errors
   - Verify all dependencies are in `package.json`

3. **Database Connection Issues**:

   - Verify Supabase URL and key are correct
   - Check Supabase project is active
   - Ensure RLS policies allow access

4. **404 Errors on Refresh**:
   - Configure SPA fallback on your hosting platform
   - For GitHub Pages, this is handled automatically

### Debug Commands

```bash
# Check build locally
npm run build && npm run preview

# Test environment variables
echo $VITE_SUPABASE_URL

# Clear build cache
rm -rf dist node_modules/.vite
npm install
npm run build
```

## Security Considerations

1. **Environment Variables**:

   - Never commit `.env` to version control
   - Use platform environment variables for production
   - The anon key is safe to expose (it's public by design)

2. **Supabase Security**:

   - Review Row Level Security policies
   - Monitor usage in Supabase dashboard
   - Consider rate limiting for high-traffic scenarios

3. **HTTPS**:
   - Always use HTTPS in production
   - Supabase requires HTTPS for connections

## Backup Strategy

1. **Database Backup**:

   - Supabase provides automatic backups
   - Export data regularly via SQL queries
   - Keep sample data scripts updated

2. **Code Backup**:
   - Use Git for version control
   - Tag releases: `git tag v1.0.0`
   - Consider multiple remote repositories

## Updates & Maintenance

1. **Dependency Updates**:

   ```bash
   npm update
   npm audit fix
   ```

2. **Supabase Updates**:

   - Monitor Supabase changelog
   - Test in staging before production updates

3. **Content Updates**:
   - User names or date ranges can be updated in `App.vue`
   - Logo can be replaced in `/src/assets/`

## Support

For deployment issues:

1. Check the platform's documentation
2. Review build logs for specific errors
3. Test the build process locally first
4. Ensure all environment variables are correctly set
