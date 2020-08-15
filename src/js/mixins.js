const mixin = {
    computed: {
        isAdmin: (vm) => vm.$store.state.isAdmin,

        currentBookId: (vm) => vm.$store.state.currentBookId,
    },

    methods: {
        sortByIndex(value) {
            value.sort((a, b) => {
                return a.index - b.index;
            });
        },
    }
};

export default mixin;