import { Attributes } from 'src';
import { AttributeValue } from '.';

/**
 * Format attribute value objects to key-pair values
 *
 * @param vals - Attribute values
 * @returns formatted attributes
 */
export function formatAttributeValues(vals: AttributeValue[]): Attributes[] {
  const attributes: Attributes[] = [];

  vals.map((val) => {
    let foundKey = attributes.find((att) => att.key === val.attributeKey.name);

    if (foundKey === undefined) {
      foundKey = {
        key: val.attributeKey.name,
        value: [val.name],
      };
      attributes.push(foundKey);
    } else {
      foundKey.value.push(val.name);
    }
    return attributes;
  });

  return attributes;
}
