import { Groups, ProductAPI, ProductType } from "@/utils/type";

const transformImages = (default_image: { url: string }): { src: string }[] => {
  return [{ src: default_image.url }];
};

function transformOption(input: { groups: Groups }) {
  const options: Array<{
    id: string;
    title: string;
    type: string;
    items: Array<{ id: string; value: string }>;
  }> = [];

  Object.entries(input.groups).forEach(([groupId, group]) => {
    const items: Array<{ id: string; value: string; hex_value?: string }> = [];

    Object.entries(group.attributes).forEach(([attributeId, attribute]) => {
      items.push({
        id: attributeId,
        value: attribute.name,
        hex_value: attribute.html_color_code,
      });
    });

    const option = {
      id: groupId,
      title: group.group_name,
      type: group.group_type,
      items: items,
    };

    options.push(option);
  });

  return {
    options,
  };
}

export const ProductTransformer = (data: ProductAPI): ProductType => {
  return {
    title: data.psdata.name,
    images: data.psdata.images ?? transformImages(data.psdata.default_image),
    price: data.psdata.price,
    options: transformOption({ groups: data.psdata.groups }).options,
    description: data.psdata.description,
    id: String(data.psdata.id_product),
    productAttributeId: data.psdata.id_product_attribute ?? null,
  };
};
