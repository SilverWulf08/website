export function setText(id, value) {
  const node = document.getElementById(id);
  if (node) node.innerText = value;
}
