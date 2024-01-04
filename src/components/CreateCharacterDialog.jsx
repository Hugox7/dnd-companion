"use client"

import { ALIGNMENTS_LIST, CLASSES_LIST, RACES_LIST } from "@/constants/dndApiResources";
import { useCurrentUser } from "@/hooks/useCurrentUser";
// import { useHandleSubmitError } from "@/hooks/useHandleSubmitError";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

export default function CreateCharacterDialog() {

  const router = useRouter();
  const { id: userId } = useCurrentUser();
  // const { displayGenericErrorToast } = useHandleSubmitError();

  const { handleSubmit, formState, control, reset } = useForm({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      race: '',
      class: '',
      level: 1,
      alignment: '',
      historic: '',
    }
  });

  const handleCreate = async (values) => {
    try {
      const { data } = await supabase.from('characters').insert({
        user: userId,
        ...values
      }).select();
      return router.push('app/character/' + data[0].id);
    } catch {
      // displayGenericErrorToast();
    }
  }

  return (
    <dialog id="create_character_modal" className="modal">
      <div className="modal-box w-11/12 max-w-xl">
        <h3 className="font-bold text-lg mb-4">Crééz votre personnage</h3>
        <p className="mb-6 text-justify">
            Pour commencer, choisissez sa race, sa classe, son niveau et son alignement. Vous pouvez également lui attribuer un historique.
        </p>
        <form onSubmit={handleSubmit(handleCreate)} method="dialog">

          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <div className="mb-4">
                <label className='mb-1 inline-block' htmlFor="name">Nom</label>
                <input type="text" className="input w-full mb-2 bg-neutral input-bordered" id="name" {...field} />
                <p className='text-red-500 text-xs'>{formState.errors.name && formState.errors.name.message}</p>
              </div>
            )}
          />

          <Controller
            name="race"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <div className="mb-5 relative">
                <label className='mb-1 inline-block' htmlFor="race">Race</label>
                <select className="select select-bordered w-full mb-2 bg-neutral" id="race" {...field}>
                  <option selected hidden disabled value=""></option>
                  {RACES_LIST.map((race) => (
                    <option key={race.index} value={race.index}>{race.fr}</option>
                  ))}
                </select>
                <p className='text-red-500 text-xs'>{formState.errors.race && formState.errors.race.message}</p>
              </div>
            )}
          />

          <Controller
            name="class"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <div className="mb-5 relative">
                <label className='mb-1 inline-block' htmlFor="class">Classe</label>
                <select className="select select-bordered w-full mb-2 bg-neutral" id="class" {...field}>
                  <option selected hidden disabled value=""></option>
                  {CLASSES_LIST.map((el) => (
                    <option key={el.index} value={el.index}>{el.fr}</option>
                  ))}
                </select>
                <p className='text-red-500 text-xs'>{formState.errors.class && formState.errors.class.message}</p>
              </div>
            )}
          />

          <Controller
            name="level"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <div className="mb-5 relative">
                <label className='mb-1 inline-block' htmlFor="level">Niveau <span className="font-bold">{field.value}</span></label>
                <input type="range" min={1} max="60" className="range" step="1" {...field} />
                <p className='text-red-500 text-xs'>{formState.errors.class && formState.errors.class.message}</p>
              </div>
            )}
          />

          <Controller
            name="alignment"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <div className="mb-5 relative">
                <label className='mb-1 inline-block' htmlFor="alignment">Alignement</label>
                <select className="select select-bordered w-full mb-2 bg-neutral" id="alignment" {...field}>
                  <option selected hidden disabled value=""></option>
                  {ALIGNMENTS_LIST.map((el) => (
                    <option key={el.index} value={el.index}>{el.fr}</option>
                  ))}
                </select>
                <p className='text-red-500 text-xs'>{formState.errors.alignment && formState.errors.alignment.message}</p>
              </div>
            )}
          />

          <Controller
            name="historic"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <div className="mb-4">
                <label className='mb-1 inline-block' htmlFor="historic">Historique</label>
                <input type="text" className="input w-full mb-2 bg-neutral input-bordered" id="historic" {...field} />
                <p className='text-red-500 text-xs'>{formState.errors.historic && formState.errors.historic.message}</p>
              </div>
            )}
          />

          <button onClick={()=>document.getElementById('create_character_modal').close()} className="btn mr-2 btn-outline">
            Annuler
          </button>
          <button type="submit" className="btn btn-primary">
            {formState.isSubmitting ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Créer"
            )}
          </button>

        </form>
      </div>
    </dialog>
  );
}