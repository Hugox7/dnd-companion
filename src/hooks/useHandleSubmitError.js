import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";

export const useHandleSubmitError = () => {
    const toast = useToast();

    const displayGenericErrorToast = (title = 'Erreur') => {
      return toast({
        title,
        description: "Une erreur s'est produite, merci de réessayer plus tard",
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: "bottom-left",
      });
    }

    const handleLoginError = useCallback((error) => {
        if (error?.message === 'Invalid login credentials') {
            return toast({
              title: 'Erreur de connexion',
              description: 'Nous ne parvenons pas à trouver de compte avec cette adresse email et ce mot de passe',
              status: 'error',
              duration: 9000,
              isClosable: true,
              position: "bottom-left",
            });
        }
          displayGenericErrorToast('Erreur de connexion');
    }, [toast])

    const handleSignUpError = useCallback(() => {
      if (error?.message === 'User already registered') {
        return toast({
          title: 'Erreur',
          description: 'Un compte utilisant cette adresse email est déjà enregistré',
          status: 'error',
          duration: 9000,
          isClosable: true,
          position: "bottom-left",
        });
      }
      displayGenericErrorToast();
    }, [toast]);
    

    return {
      displayGenericErrorToast,
      handleLoginError,
      handleSignUpError,
    };
    
  }
