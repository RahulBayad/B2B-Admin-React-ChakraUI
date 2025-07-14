export function objectToFormData(obj: any, form: FormData = new FormData(), prefix = ''): FormData {
  for (const key in obj) {
    if (obj[key] === null || obj[key] === undefined) continue;

    const formKey = prefix ? `${prefix}[${key}]` : key;
    const value = obj[key];

    if (value instanceof File) {
      form.append(formKey, value);
    } else if (Array.isArray(value)) {
      value.forEach((element, index) => {
        const arrayKey = `${formKey}[${index}]`;
        if (element instanceof File) {
          form.append(arrayKey, element);
        } else if (typeof element === 'object' && element !== null) {
          objectToFormData(element, form, arrayKey);
        } else {
          form.append(arrayKey, element);
        }
      });
    } else if (typeof value === 'object') {
      objectToFormData(value, form, formKey);
      // form.append(formKey, JSON.stringify(value))
    } else {
      form.append(formKey, value);
    }
  }

  return form;
}
