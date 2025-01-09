Web Link:  https://financial-data-filtering-app-nine.vercel.app/

# Financial Data Filtering App

A React application that fetches and displays Apple Inc.'s financial data, allowing users to filter and sort various financial metrics.

## Features

- Display financial data in a responsive table
- Filter data by:
  - Date range
  - Revenue range
  - Net Income range
- Sort data by:
  - Date
  - Revenue
  - Net Income
- Responsive design for both desktop and mobile devices
- Real-time filtering and sorting
- Currency formatting for better readability

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 16.x or higher)
- npm (usually comes with Node.js)

## Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd financial-data-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_FMP_API_KEY=your_api_key_here
```

Replace `your_api_key_here` with your Financial Modeling Prep API key. You can get a free API key by signing up at [Financial Modeling Prep](https://financialmodelingprep.com/developer/docs/).

### 4. Configure the API Key

In `components/FinancialApp.tsx`, update the API key:

```typescript
const response = await fetch(
  `https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=${process.env.NEXT_PUBLIC_FMP_API_KEY}`
);
```

### 5. Run the Development Server

```bash
npm run dev
```

The application will start and be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
financial-data-app/
├── app/
│   └── page.tsx
├── components/
│   └── FinancialApp.tsx
├── public/
├── styles/
│   └── globals.css
└── package.json
```

## Available Scripts

- `npm run dev` - Runs the development server
- `npm run build` - Builds the application for production
- `npm start` - Runs the built application
- `npm run lint` - Runs ESLint to check code quality

## Troubleshooting

### Common Issues

1. **API Key Issues**
   - Ensure your API key is correctly set in the `.env.local` file
   - Verify that the API key is active and has the necessary permissions

2. **Installation Problems**
   - Try deleting the `node_modules` folder and `package-lock.json` file
   - Run `npm install` again

3. **Build Errors**
   - Make sure all dependencies are properly installed
   - Check for any TypeScript errors in your code

### Getting Help

If you encounter any issues:
1. Check the console for error messages
2. Verify all environment variables are set correctly
3. Ensure all dependencies are installed
4. Try clearing your browser cache

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details