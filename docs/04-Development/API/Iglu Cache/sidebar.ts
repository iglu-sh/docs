import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "Development/API/Iglu Cache/iglu-cache-api",
    },
    {
      type: "category",
      label: "UNTAGGED",
      items: [
        {
          type: "doc",
          id: "Development/API/Iglu Cache/api-v-1-cache-cache",
          label: "/api/v1/cache/{cache}",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "Development/API/Iglu Cache/cache-nix-cache-info",
          label: "/{cache}/nix-cache-info",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
