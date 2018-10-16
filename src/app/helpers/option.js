export default function Option(label, key = label, icon = null) {
  if (!(this instanceof Option)) {
    return new Option(label, key, icon);
  }
  this.label = label;
  this.key = key;
  this.icon = icon;
}
