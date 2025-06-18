import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "API/Iglu Controller/iglu-controller-api",
    },
    {
      type: "category",
      label: "UNTAGGED",
      items: [
        {
          type: "doc",
          id: "API/Iglu Controller/build",
          label: "This route returns user information based on the provided token in the Auhtorization header",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
