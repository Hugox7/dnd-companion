"use client"

import Link from 'next/link'
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';

const formSchema = z.object({
  email: z.string().email("Cet email n'est pas valide"),
  password: z.string().min(6, 'Votre mot de passe doit comporter au moins 6 charactères'),
  name: z.string().min(3, "Votre nom d' utilisateur doit comporter au moins 3 charactères"),
})

export default function SignupForm() {
  const { handleSignup } = useAuth();

  const { handleSubmit, formState, control } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
    }
  });

  const signupLink = (
    <Link href='/auth/login'>
      Connectez-vous ici
    </Link>
  )

  return (
    <div className='max-w-md flex flex-col p-6 bg-neutral rounded-lg'>
        <div className='w-full flex justify-center items-center'>
            <Image width={100} height={100} src='/ddsilver.png' alt='Dungeons and dragons' className='mb-5' />
        </div>
        <form onSubmit={handleSubmit(handleSignup)}>

            <Controller
                name="email"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                    <div className="mb-5 relative">
                        <label className='mb-1 inline-block' htmlFor="email">Adresse email</label>
                        <input className="input w-full mb-2" type="email" id="email" required {...field} />
                        <p className='text-red-500 text-xs'>{formState.errors.email && formState.errors.email.message}</p>
                    </div>
                )}
            />

            <Controller
                name="password"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                    <div className="mb-5">
                        <label className='mb-1 inline-block' htmlFor="password">Mot de passe</label>
                        <input className="input w-full mb-2" type="password" id="password" required {...field} />
                        <p className='text-red-500 text-xs'>{formState.errors.password && formState.errors.password.message}</p>
                    </div>
                )}
            />

               
              <Controller
                name="name"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                    <div className="mb-5">
                        <label className='mb-1 inline-block' htmlFor="name">Nom d'utilisateur</label>
                        <input className="input w-full mb-2" id="name" required {...field} />
                        <p className='text-red-500 text-xs'>{formState.errors.name && formState.errors.name.message}</p>
                    </div>
                )}
              />
    
            
    <button className="btn btn-primary w-full mb-5" type="submit">
            {formState.isSubmitting ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Créer un compte"
            )}
          </button>

        </form>
        <p className='text-xs'>Déjà un compte ? {signupLink}</p>
    </div>
  );
}

