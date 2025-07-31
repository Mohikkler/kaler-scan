# Deployment Guide - Kaler Scan Centre

This guide will help you deploy your React application to various platforms for preview and production.

## 🚀 Quick Deploy Options

### Option 1: Vercel (Recommended - 2 minutes)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "New Project"
   - Import your repository
   - Click "Deploy"

3. **Add Environment Variables** (in Vercel dashboard)
   - `VITE_GOOGLE_MAPS_API_KEY` = your Google Maps API key
   - `VITE_SUPABASE_URL` = your Supabase URL
   - `VITE_SUPABASE_ANON_KEY` = your Supabase anon key

### Option 2: Netlify (3 minutes)

1. **Build locally**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Drag & drop the `dist` folder
   - Or connect GitHub for automatic deployments

3. **Add Environment Variables** (in Netlify dashboard)
   - Same as Vercel above

### Option 3: GitHub Pages (5 minutes)

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to package.json**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

## 🔧 Pre-deployment Checklist

### ✅ Code Ready
- [ ] All components working
- [ ] No console errors
- [ ] Responsive design tested
- [ ] Images optimized

### ✅ Environment Variables
- [ ] Google Maps API key configured
- [ ] Supabase credentials set
- [ ] Email server configured

### ✅ Build Test
```bash
npm run build
npm run preview
```

## 🌐 Domain Setup

### Custom Domain (Optional)
1. **Vercel**: Add domain in project settings
2. **Netlify**: Add custom domain in site settings
3. **GitHub Pages**: Add CNAME file to repository

### SSL Certificate
- **Vercel**: Automatic HTTPS
- **Netlify**: Automatic HTTPS
- **GitHub Pages**: Automatic HTTPS

## 📱 Mobile Testing

After deployment, test on:
- [ ] iPhone Safari
- [ ] Android Chrome
- [ ] iPad Safari
- [ ] Desktop Chrome
- [ ] Desktop Safari

## 🔍 Performance Optimization

### Before Deployment
1. **Image Optimization**
   - Compress all images
   - Use WebP format where possible
   - Optimize SVG files

2. **Bundle Analysis**
   ```bash
   npm run build
   # Check dist folder size
   ```

3. **Lighthouse Score**
   - Run Lighthouse audit
   - Aim for 90+ score

## 🚨 Common Issues

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Environment Variables
- Ensure all `VITE_` prefixed variables are set
- Check for typos in variable names
- Verify API keys are valid

### Routing Issues
- Ensure `vercel.json` has proper rewrites
- Check that React Router is configured correctly

## 📊 Analytics Setup (Optional)

### Google Analytics
1. Create GA4 property
2. Add tracking code to `index.html`
3. Test in production

### Vercel Analytics
1. Enable in project settings
2. Add analytics component
3. Monitor performance

## 🔄 Continuous Deployment

### Automatic Deployments
- **Vercel**: Every push to main branch
- **Netlify**: Every push to main branch
- **GitHub Pages**: Every push to gh-pages branch

### Preview Deployments
- **Vercel**: Every pull request
- **Netlify**: Every pull request
- **GitHub Pages**: Manual only

## 📞 Support

If you encounter issues:
1. Check the platform's documentation
2. Review build logs
3. Test locally first
4. Check environment variables

## 🎯 Recommended Workflow

1. **Development**: Local development with `npm run dev`
2. **Testing**: Build and preview locally
3. **Staging**: Deploy to Vercel preview
4. **Production**: Deploy to main branch

---

**Happy Deploying! 🚀** 