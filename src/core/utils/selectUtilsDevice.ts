export const selectAll = (list: any, key = "deviceId") =>
  list.map((item: any) => item[key]);

export const selectOne = (selected: any, deviceId: string) => {
  const selectedIndex = selected.indexOf(deviceId);
  let newSelected: string[] = [];

  if (selectedIndex === -1) {
    newSelected = newSelected.concat(selected, deviceId);
  } else if (selectedIndex === 0) {
    newSelected = newSelected.concat(selected.slice(1));
  } else if (selectedIndex === selected.length - 1) {
    newSelected = newSelected.concat(selected.slice(0, -1));
  } else if (selectedIndex > 0) {
    newSelected = newSelected.concat(
      selected.slice(0, selectedIndex),
      selected.slice(selectedIndex + 1)
    );
  }

  return newSelected;
};
