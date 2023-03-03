<script>
// import data from store
import { legoStore } from "./store";
export default {
    name: "LegoMixin",

    computed: {
        userInventory() {
            return legoStore.userInventory;
        }
    },
};
</script>