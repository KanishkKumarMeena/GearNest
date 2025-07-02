# 🚀 GearNest - GitHub Deployment Guide

This guide will walk you through deploying your GearNest marketplace to GitHub Pages.

## 📋 Prerequisites

- GitHub account
- Git installed on your computer
- Node.js and npm installed

## 🔧 Setup Instructions

### Step 1: Upload to GitHub

1. **Create a new repository on GitHub**:
   - Go to [github.com](https://github.com) and sign in
   - Click the "+" icon and select "New repository"
   - Name your repository `GearNest`
   - Make it public
   - Don't initialize with README (we already have one)
   - Click "Create repository"

2. **Initialize Git in your project** (if not already done):
   ```bash
   cd /Users/kanishk/Downloads/stellar-hub
   git init
   git add .
   git commit -m "Initial commit: GearNest marketplace"
   ```

3. **Connect to GitHub and push**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/GearNest.git
   git branch -M main
   git push -u origin main
   ```
   
   Replace `YOUR_USERNAME` with your actual GitHub username.

### Step 2: Enable GitHub Pages

1. **Go to your repository on GitHub**
2. **Click on "Settings" tab**
3. **Scroll down to "Pages" section**
4. **Under "Source", select "GitHub Actions"**
5. **Save the settings**

### Step 3: Automatic Deployment

The project includes a GitHub Actions workflow that will automatically:
- Trigger on every push to the main branch
- Install dependencies
- Build the static site
- Deploy to GitHub Pages

Your site will be available at: `https://YOUR_USERNAME.github.io/GearNest/`

### Step 4: Manual Deployment (Alternative)

If you prefer manual deployment:

```bash
# Build for GitHub Pages
npm run build:gh-pages

# Deploy manually
npm run deploy
```

## 🔄 Making Updates

To update your deployed site:

1. Make your changes
2. Commit and push:
   ```bash
   git add .
   git commit -m "Update marketplace features"
   git push
   ```
3. GitHub Actions will automatically rebuild and deploy

## 🛠️ Configuration Details

### Build Scripts
- `npm run build:gh-pages`: Builds for GitHub Pages with proper base path
- `npm run deploy`: Manual deployment using gh-pages package
- `npm run predeploy`: Automatically runs build before deployment

### Static Hosting Features
- ✅ Client-side routing support (SPA)
- ✅ Proper asset paths for GitHub Pages
- ✅ Automatic 404 handling
- ✅ Optimized builds with code splitting
- ✅ GitHub Actions for CI/CD

### Routing Configuration
The app is configured to work with GitHub Pages subdirectory structure:
- Development: `http://localhost:8080`
- Production: `https://username.github.io/GearNest/`

## 🌐 Custom Domain (Optional)

To use a custom domain:

1. **Create CNAME file**:
   ```bash
   echo "yourdomain.com" > public/CNAME
   ```

2. **Update GitHub repository settings**:
   - Go to Settings > Pages
   - Add your custom domain
   - Enable "Enforce HTTPS"

3. **Configure DNS**:
   - Add a CNAME record pointing to `username.github.io`

## 📊 Monitoring

### GitHub Actions Status
- Check the "Actions" tab in your repository for deployment status
- Each push will show build logs and deployment results

### Site Analytics
Consider adding:
- Google Analytics
- GitHub Pages traffic analytics (in repository insights)

## 🐛 Troubleshooting

### Common Issues

1. **Build fails**:
   - Check the Actions log for error details
   - Ensure all dependencies are in package.json
   - Verify Node.js version compatibility

2. **Routing doesn't work**:
   - Verify the basename is correctly set in React Router
   - Check that 404.html is in the public folder

3. **Assets not loading**:
   - Confirm the base path in vite.config.static.ts
   - Check network tab for 404 errors

### Getting Help
- Check GitHub Actions logs
- Review the Issues section of this repository
- Consult GitHub Pages documentation

## 🎉 Success!

Once deployed, your GearNest marketplace will be live and accessible worldwide. Share your link and showcase your modern vehicle parts marketplace!

---

**Happy Coding!** 🚗✨
