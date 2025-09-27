# 🚀 GitHub Pages Deployment Guide

This guide will help you deploy the PlasmaCrime website to GitHub Pages.

## 📋 Prerequisites

- GitHub account
- Git installed on your computer
- Terminal/Command Prompt access

## 🔧 Setup Steps

### 1. Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click "New repository" (green button)
3. Repository name: `plasma-crime`
4. Description: `Prison-themed meme token website`
5. Make it **Public** (required for free GitHub Pages)
6. **Don't** initialize with README (we already have files)
7. Click "Create repository"

### 2. Connect Local Repository to GitHub

```bash
# Add remote origin (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/plasma-crime.git

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: PlasmaCrime prison-themed website"

# Push to GitHub
git push -u origin main
```

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section (left sidebar)
4. Under **Source**, select **GitHub Actions**
5. The workflow will automatically deploy your site

### 4. Access Your Live Site

- Your site will be available at: `https://YOUR_USERNAME.github.io/plasma-crime/`
- It may take 5-10 minutes for the first deployment
- Future pushes to `main` branch will automatically update the site

## 🔄 Updating the Site

To update your live site:

```bash
# Make your changes to files
# Then commit and push:

git add .
git commit -m "Update: describe your changes"
git push origin main
```

The site will automatically redeploy within a few minutes.

## 🛠 Troubleshooting

### If deployment fails:
1. Check the **Actions** tab in your GitHub repository
2. Look for failed workflow runs
3. Check the logs for error messages

### If images don't load:
1. Ensure all image files are in the `images/criminals/` folder
2. Check that file names match exactly (case-sensitive)
3. Verify file permissions

### If site doesn't update:
1. Wait 5-10 minutes for GitHub Pages to process
2. Clear your browser cache
3. Check if the Actions workflow completed successfully

## 📁 File Structure

```
plasma-crime/
├── .github/workflows/deploy.yml  # GitHub Actions workflow
├── images/criminals/             # Criminal mugshot images
├── index.html                    # Main HTML file
├── styles.css                    # CSS styles
├── script.js                     # JavaScript functionality
├── README.md                     # Documentation
└── .gitignore                    # Git ignore rules
```

## 🎯 Next Steps

1. Replace `YOUR_USERNAME` in the README.md with your actual GitHub username
2. Update the live demo link in README.md
3. Customize the content as needed
4. Share your live site!

---

**Happy Deploying! 🚀**
