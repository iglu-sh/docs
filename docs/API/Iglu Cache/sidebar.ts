import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "API/Iglu Cache/iglu-cache-api",
    },
    {
      type: "category",
      label: "UNTAGGED",
      items: [
        {
          type: "doc",
          id: "API/Iglu Cache/get-information-of-cache",
          label: "Get information of {cache}",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
