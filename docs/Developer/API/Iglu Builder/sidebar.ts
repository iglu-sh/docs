import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "Developer/API/Iglu Builder/iglu-builder-api",
    },
    {
      type: "category",
      label: "UNTAGGED",
      items: [
        {
          type: "doc",
          id: "Developer/API/Iglu Builder/build",
          label: "/api/v1/build",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "Developer/API/Iglu Builder/healthcheck",
          label: "/api/v1/healthcheck",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
