import { Store } from 'vuex'

declare module '@vue/runtime-core' {
    interface State {

    }

    interface ComponentsCustomProperties {
        $store: Store<State>
    }

}