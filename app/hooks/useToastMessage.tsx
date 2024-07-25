import { Notifier, NotifierComponents } from "react-native-notifier";

const useToastMessage = () => {
  const showToast = ({
    title,
    desc = "",
    type,
    ...toastProps
  }: {
    title: string;
    desc?: string;
    type: "error" | "success" | "info";
  }) => {
    const toastParams = {
      title,
      description: desc,
      duration: 2000,
      showAnimationDuration: 500,
      hideOnPress: false,
      Component: NotifierComponents.Alert,
      componentProps: {
        alertType: type,
      },
      ...toastProps,
    };
    Notifier.showNotification(toastParams);
  };

  return {
    showToast,
  };
};

export default useToastMessage;
