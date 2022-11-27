// Import Http Server containing the app
import appServer from './app';

// constants
import { PORT } from './utils/constant';

// Ports
const APP_PORT = PORT || 4001;

appServer?.listen(APP_PORT, (): void => {
    console.log(`Server listening on port ${APP_PORT}`);
});
