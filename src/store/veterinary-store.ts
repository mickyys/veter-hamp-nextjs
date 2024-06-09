import { Veterinary } from '@/app/interface';
import { create } from 'zustand'
import { persist } from 'zustand/middleware';
import { setCookie } from 'cookies-next';



interface State {
    veterinary: Veterinary[],
    setVeterinary: (veterinary: Veterinary[]) => void,
    getVeterinarySelected: () => Veterinary|undefined
}

export const useVeterinaryStore = create<State>()(
    persist(
        (set, get) => ({
            veterinary: [],
            setVeterinary: (veterinary) => {
                const selected = veterinary.some(v => v.selected === true)
                if (selected) {
                    set({ veterinary })                    
                }else{
                    const listVeterinary = veterinary.map((item,index) => {
                        return {
                            ...item,
                            selected: index === 0 ? true : false
                        }
                    });
                    set({ veterinary: listVeterinary }) 
                }      
                
                setCookie('veterinary', get().veterinary.find((veterinary) => veterinary.selected === true)?.id)      
            },
            getVeterinarySelected: () => {
                const { veterinary } = get();
                return veterinary.find(veterinary => veterinary.selected === true);
            }
        }),
        {
            name: 'veterinary-storage',
        }
    )

)