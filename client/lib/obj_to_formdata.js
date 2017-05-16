function isObject(obj) {
  return obj === Object(obj);
}

const appendValues = (obj, formData, arrName) => {
  Object.keys(obj).forEach(key => {
    if (isObject(obj[key])) {
      return appendValues(obj[key], formData, key);
    } else if (typeof arrName == 'string') {
      formData.append(`${arrName}[${key}]`, obj[key]);
    } else {
      formData.append(key, obj[key]);
    }
  });

  return formData;
};

let objToFormData = ob => {
  let data = new FormData();

  data = appendValues(ob, data);

  // Object.keys(ob).forEach(key => {
  // 	if(typeof ob[key] == 'object') {
  // 		Object.keys(ob[key]).forEach(subkey => {
  // 			data.append(`${key}[subkey]`, ob[key][subkey]);
  // 		});
  // 	}
  // 	data.append(key, ob[key]);
  // });
  return data;
};

export default objToFormData;
