import {useToast} from 'react-native-toast-notifications';

const toast = useToast();

export const toastNotification = (title, type, color) => {
  return toast.show(title, {
    type: type,
    dangerColor: color,
    placement: 'bottom',
    duration: 3000,
    animationType: 'slide-in',
  });
};
