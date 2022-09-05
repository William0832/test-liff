export default {
  create: (name, payload) => localStorage.addItem(name, JSON.stringify(payload)),
  read: (name) => {
    const item = localStorage.getItem(name)
    if (item == null) return null
    return JSON.parse(item)
  },
  update: (name, payload) => localStorage.setItem(name, JSON.stringify(payload))
}
