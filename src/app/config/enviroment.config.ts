import { enviroment } from '../../modules/config.module';
export default function checkEnvVars() {
    enviroment.validateRequired()
}
