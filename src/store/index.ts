import { createStore, useStore as baseUseStore, Store} from "vuex"
import { InjectionKey } from "vue"
import { managerUserStore, managerUserState} from './modules/manageruser'

export interface GlobalDataState {
    managerUser: managerUserState
}

export const key: InjectionKey<Store<GlobalDataState>> = Symbol()

export const store: Store<GlobalDataState> = createStore<GlobalDataState>({
    modules: {
        managerUser: managerUserStore
    }
})

export function useStore() {
    return baseUseStore(key)
}
