import { defineStore } from "pinia";
import { ref } from "vue";

export const useAppStore = defineStore("app", () => {
  const menuGroups = ref([
    {
      title: "menu.base_data",
      prefix: "/database",
      items: [
        {
          label: "menu.product_management",
          icon: "inventory_2",
          path: "/products",
        },
        {
          label: "menu.suppliers_management",
          icon: "business",
          path: "/suppliers",
        },
        {
          label: "menu.item_unit_define_management",
          icon: "straighten",
          path: "/item-unit-define",
        },
        {
          label: "menu.currency_unit_management",
          icon: "payments",
          path: "/currency-unit",
        },
        {
          label: "menu.vat_management",
          icon: "percent",
          path: "/vat-management",
        },
        {
          label: "menu.purchase_request_management",
          icon: "shopping_cart",
          path: "/purchase-request",
        },
      ],
    },
  ]);
  const isMainLoading = ref(false);
  const setMainLoading = (v) => {
    isMainLoading.value = v;
  };

  return { menuGroups, isMainLoading, setMainLoading };
});
