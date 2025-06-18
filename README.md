# Wamia Magento Documentation Website

A comprehensive documentation website for Magento 2 / Adobe Commerce frontend development, built with Next.js and optimized for GitHub Pages hosting.

## 🌟 Features

- **261 Documentation Pages** covering all aspects of Magento 2 frontend development
- **Responsive Design** with Tailwind CSS
- **Fast Loading** with Next.js static generation
- **SEO Optimized** with proper meta tags and sitemap
- **GitHub Pages Ready** for free hosting
- **Search Friendly** structure for easy content discovery

## 📚 Documentation Coverage

This website includes comprehensive documentation for:

### Frontend Development
- **Themes**: Creation, customization, inheritance, and deployment
- **Layouts**: XML instructions, management, and best practices
- **Templates**: Email templates, overrides, and walkthroughs
- **CSS**: Preprocessing, custom styles, responsive design
- **JavaScript**: jQuery widgets, RequireJS, mixins, and debugging

### UI Components
- **70+ Components**: Complete reference for all Magento UI components
- **Concepts**: Data binding, configuration flow, and architecture
- **How-to Guides**: Practical examples and implementation guides

### Page Builder
- **Content Types**: Creating and customizing content types
- **Architecture**: Events, data store, and configurations
- **Migration**: Tools and guides for content migration
- **Styling**: Overriding and customizing Page Builder styles

## 🚀 Quick Start

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/wamia-magento-docs.git
   cd wamia-magento-docs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Building for Production

1. **Build static website**
   ```bash
   npm run export
   ```

2. **Serve locally** (optional)
   ```bash
   npx serve out/
   ```

## 📦 Deployment

### Automatic GitHub Pages Deployment

This project includes a GitHub Actions workflow that automatically:
1. Builds the website on every push to `main`/`master`
2. Deploys to GitHub Pages
3. Makes it available at `https://YOUR_USERNAME.github.io/wamia-magento-docs`

### Manual Deployment

1. **Build the website**
   ```bash
   npm run export
   ```

2. **Deploy the `out/` folder** to any static hosting service:
   - GitHub Pages
   - Netlify
   - Vercel
   - AWS S3
   - Any web server

## 🛠️ Project Structure

```
wamia-magento-docs/
├── docs/                    # Markdown documentation files
│   ├── guide/              # Frontend development guides
│   ├── javascript/         # JavaScript documentation
│   ├── page-builder/       # Page Builder documentation
│   └── ui-components/      # UI Components reference
├── lib/                    # Utility functions
├── pages/                  # Next.js pages
├── scripts/               # Build scripts
├── styles/                # Global styles
├── out/                   # Generated static website (after build)
└── public/                # Static assets
```

## 📊 Statistics

- **Total Pages**: 261 HTML pages
- **Website Size**: ~29MB optimized
- **Build Time**: ~2 minutes
- **Technologies**: Next.js 15, React 19, Tailwind CSS 4

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for local development:

```env
NODE_ENV=development
```

### Next.js Configuration

The project uses static export configuration in `next.config.js`:

```javascript
module.exports = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/wamia-magento-docs' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/wamia-magento-docs' : ''
}
```

## 📝 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run export` | Build and export static website |
| `npm run deploy` | Alias for export |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Adobe Commerce Team** for the original documentation
- **Next.js Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **GitHub Pages** for free hosting

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/YOUR_USERNAME/wamia-magento-docs/issues) page
2. Create a new issue with detailed information
3. Provide steps to reproduce any problems

---

**Built with ❤️ for the Magento community**
