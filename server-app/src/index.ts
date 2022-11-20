// Import Http Server containing the app
import appServer from './app';

// Ports
const PORT = process.env.PORT || 4001;

appServer?.listen(PORT, (): void => {
    console.log(`Server listening on port ${PORT}`);
});
