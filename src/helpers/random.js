// RANDOM --------------------------------------------------------------------------------------------

const Random = {
  int: (min, max) => Math.round(Math.random() * (max - min)) + min,
  dec: (min, max) => Math.random() * (max - min) + min,
  bool: () => Math.random() > 0.5,
};

Random.prop = ({ min, max }) => {
  if (min % 1 === 0 && max % 1 === 0) {
    return Random.int(min, max);
  }
  return Random.dec(min, max);
};

Random.prop2 = ({ min, max }, comp) => Random.prop({ min, max }) * comp;

Random.shuffle = (array) => {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
  return array;
}

Random.insertRandom = (array, value) => {
  array.splice(Random.int(0,array.length), 0, value);
}

export { Random };