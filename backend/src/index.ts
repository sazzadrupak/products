import app from './app';
import migration from './config/migration';
const port = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
  console.log('Running in development mode');
  migration();
}
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
