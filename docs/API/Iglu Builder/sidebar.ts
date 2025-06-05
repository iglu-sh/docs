import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "API/Iglu Builder/iglu-builder-api",
    },
    {
      type: "category",
      label: "UNTAGGED",
      items: [
        {
          type: "doc",
          id: "API/Iglu Builder/build",
          label: "Start build websocket",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "API/Iglu Builder/healthcheck",
          label: "healthcheck",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
