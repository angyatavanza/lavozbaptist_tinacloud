import type { Collection } from "tinacms";

const Coordinator: Collection = {
  label: "Coordinators",
  name: "coordinator",
  path: "content/coordinators",
  format: "md",
  fields: [
    {
      type: "string",
      label: "Name",
      name: "name",
      isTitle: true,
      required: true,
    },
    {
      type: "image",
      label: "Avatar",
      name: "avatar",
      // @ts-ignore
      uploadDir: () => "coordinators",
    },
  ],
};
export default Coordinator;
