import { notification } from 'antd';
import { CloseIcon, SuccessIcon, WarningIcon } from '../components/icons';

const defaultDuration = 4;
const customClassName = 'notification';

export default class AlertService {
  error = (message: string, title = 'Error', duration?: number) => {
    notification.error({
      message: title,
      description: message,
      duration: duration || defaultDuration,
      className: customClassName,
      closeIcon: CloseIcon,
    });
  };

  success = (message: string, title = 'Success', duration?: number) => {
    notification.success({
      message: title,
      description: message,
      duration: duration || defaultDuration,
      className: customClassName,
      icon: SuccessIcon,
      closeIcon: CloseIcon,
    });
  };

  warning = (message: string, title = 'Warning', duration?: number) => {
    notification.warning({
      message: title,
      description: message,
      duration: duration || defaultDuration,
      className: customClassName,
      icon: WarningIcon,
      closeIcon: CloseIcon,
    });
  };

  info = (message: string, title = 'Info', duration?: number) => {
    notification.info({
      message: title,
      description: message,
      duration: duration || defaultDuration,
      className: customClassName,
      closeIcon: CloseIcon,
    });
  };
}

export const alert = new AlertService();
